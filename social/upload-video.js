// Uploads a video to the Cloudflare R2 bucket and prints its public URL, for scheduling
// reels through the Buffer MCP. Credentials come from Xeltom-Marketing/.env (never committed):
// R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT, R2_BUCKET, R2_PUBLIC_URL.
//
// Usage (from the repo root):
//   node --env-file=.env social/upload-video.js <local-file> <key>
//   e.g. node --env-file=.env social/upload-video.js social/2026-10/reels/reel-01.mp4 social/2026-10/reel-01.mp4

const fs = require("fs");
const crypto = require("crypto");

const [file, key] = process.argv.slice(2);
if (!file || !key) {
  console.error("Usage: node --env-file=.env social/upload-video.js <local-file> <key>");
  process.exit(1);
}

const required = ["R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_ENDPOINT", "R2_BUCKET", "R2_PUBLIC_URL"];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`Missing in .env: ${missing.join(", ")}`);
  process.exit(1);
}

const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT, R2_BUCKET, R2_PUBLIC_URL } = process.env;

const sha256 = (data) => crypto.createHash("sha256").update(data).digest("hex");
const hmac = (k, data) => crypto.createHmac("sha256", k).update(data).digest();
const encodeKey = (k) => k.split("/").map(encodeURIComponent).join("/");

const contentTypes = { ".mp4": "video/mp4", ".mov": "video/quicktime", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const ext = file.slice(file.lastIndexOf(".")).toLowerCase();
const contentType = contentTypes[ext] || "application/octet-stream";

const body = fs.readFileSync(file);
const host = new URL(R2_ENDPOINT).host;
const path = `/${R2_BUCKET}/${encodeKey(key)}`;
const now = new Date();
const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
const dateStamp = amzDate.slice(0, 8);
const payloadHash = sha256(body);

// AWS Signature Version 4, which R2's S3-compatible API accepts (region "auto").
const headers = { "content-type": contentType, host, "x-amz-content-sha256": payloadHash, "x-amz-date": amzDate };
const signedHeaders = Object.keys(headers).sort().join(";");
const canonicalHeaders = Object.keys(headers).sort().map((h) => `${h}:${headers[h]}\n`).join("");
const canonicalRequest = ["PUT", path, "", canonicalHeaders, signedHeaders, payloadHash].join("\n");
const scope = `${dateStamp}/auto/s3/aws4_request`;
const stringToSign = ["AWS4-HMAC-SHA256", amzDate, scope, sha256(canonicalRequest)].join("\n");
const signingKey = ["auto", "s3", "aws4_request"].reduce((k, part) => hmac(k, part), hmac(`AWS4${R2_SECRET_ACCESS_KEY}`, dateStamp));
const signature = crypto.createHmac("sha256", signingKey).update(stringToSign).digest("hex");

fetch(`https://${host}${path}`, {
  method: "PUT",
  headers: {
    ...headers,
    authorization: `AWS4-HMAC-SHA256 Credential=${R2_ACCESS_KEY_ID}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`
  },
  body
}).then(async (res) => {
  if (!res.ok) {
    console.error(`Upload failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  console.log(`${R2_PUBLIC_URL.replace(/\/$/, "")}/${encodeKey(key)}`);
});
