// Builds one month of social posts from social/<month>/posts.js:
//   1. a 1080x1080 image per day in social/<month>/ (served by GitHub Pages,
//      because Buffer fetches images by URL)
//   2. Buffer bulk-upload CSVs in social/<month>/output/ (not committed), split into
//      batches of 10 posts per platform because Buffer only takes 10 per upload
//
// Usage (from the repo root): node social/build.js 2026-10
// Add --csv-only to rewrite the CSVs without re-rendering the images.
// Needs Google Chrome installed (used headless to render the images).

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { PLATFORMS, pad, loadMonth } = require("./calendar");

const month = process.argv[2];
if (!/^\d{4}-\d{2}$/.test(month || "")) {
  console.error("Usage: node social/build.js <yyyy-mm>, e.g. node social/build.js 2026-10");
  process.exit(1);
}

const ROOT = path.join(__dirname, "..");
const MONTH_DIR = path.join(__dirname, month);
const OUTPUT_DIR = path.join(MONTH_DIR, "output");
const { calendar, posts } = loadMonth(month);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BATCH_SIZE = 10;
const csvOnly = process.argv.includes("--csv-only");

const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const highlight = (s) => escapeHtml(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');

// ---------- Images ----------

const tick = `<svg viewBox="0 0 16 16" width="26" height="26" fill="#19b59b"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>`;

const cardBody = (img) => {
  switch (img.type) {
    case "question":
      return `<div class="mark">&ldquo;</div><h1 class="title big">${highlight(img.title)}</h1>`;
    case "statement":
      return `<h1 class="title big">${highlight(img.title)}</h1>`;
    case "stat":
      return `<div class="stat">${escapeHtml(img.stat)}</div><h1 class="title">${highlight(img.title)}</h1>${img.sub ? `<p class="sub">${escapeHtml(img.sub)}</p>` : ""}`;
    case "list":
      return `<h1 class="title">${highlight(img.title)}</h1><ul>${img.items.map((i) => `<li><span class="tick">${tick}</span>${escapeHtml(i)}</li>`).join("")}</ul>`;
    case "testimonial":
      return `<div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p class="quote">&ldquo;${escapeHtml(img.quote)}&rdquo;</p><p class="who"><strong>${escapeHtml(img.name)}</strong><br>${escapeHtml(img.role)}</p>`;
    default:
      throw new Error(`Unknown image type: ${img.type}`);
  }
};

const cardHtml = (img) => `<!doctype html><html><head><meta charset="utf-8"><style>
* { margin: 0; box-sizing: border-box; }
body {
  width: 1080px; height: 1080px; overflow: hidden; position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: white;
  background: linear-gradient(135deg, #142038 0%, #1b2b4b 65%, #1f3a5c 100%);
}
.dots { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1.5px, transparent 1.5px); background-size: 28px 28px; }
.wrap { position: absolute; inset: 96px 96px 150px; display: flex; flex-direction: column; justify-content: center; }
.logo { position: absolute; top: 80px; left: 96px; height: 52px; }
.footer { position: absolute; left: 96px; right: 96px; bottom: 80px; display: flex; justify-content: space-between; align-items: center; font-size: 28px; color: rgba(255,255,255,0.6); }
.footer .bar { width: 90px; height: 8px; border-radius: 99px; background: #19b59b; }
.title { font-size: 76px; font-weight: 600; line-height: 1.1; letter-spacing: -0.02em; }
.title.big { font-size: 96px; }
.hl { color: #19b59b; }
.mark { font-size: 220px; line-height: 0.6; color: #19b59b; font-family: Georgia, serif; margin-bottom: 30px; }
.stat { font-size: 300px; font-weight: 700; line-height: 0.9; color: #19b59b; letter-spacing: -0.04em; }
.sub { font-size: 40px; color: rgba(255,255,255,0.7); margin-top: 24px; }
ul { list-style: none; padding: 0; margin-top: 56px; display: flex; flex-direction: column; gap: 30px; }
li { display: flex; align-items: center; gap: 24px; font-size: 44px; }
.tick { flex-shrink: 0; width: 56px; height: 56px; border-radius: 50%; background: rgba(25,181,155,0.15); display: flex; align-items: center; justify-content: center; }
.stars { font-size: 48px; color: #f5b301; letter-spacing: 6px; margin-bottom: 36px; }
.quote { font-size: 52px; line-height: 1.35; font-style: italic; }
.who { font-size: 34px; color: rgba(255,255,255,0.7); margin-top: 44px; line-height: 1.4; }
.who strong { color: white; font-size: 38px; }
</style></head><body>
<div class="dots"></div>
<img class="logo" src="file://${path.join(ROOT, "assets", "xeltom-logo-lockup-white.svg")}">
<div class="wrap">${cardBody(img)}</div>
<div class="footer"><span class="bar"></span><span>register.xeltom.com</span></div>
</body></html>`;

const renderImages = () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "xeltom-social-"));
  calendar.days.forEach((day, i) => {
    const htmlFile = path.join(tmp, `day-${pad(i + 1)}.html`);
    const pngFile = path.join(MONTH_DIR, `day-${pad(i + 1)}.png`);
    fs.writeFileSync(htmlFile, cardHtml(day.img));
    execFileSync(CHROME, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
      "--window-size=1080,1080", "--virtual-time-budget=1500", `--screenshot=${pngFile}`, `file://${htmlFile}`
    ], { stdio: "ignore" });
  });
  fs.rmSync(tmp, { recursive: true, force: true });
};

// ---------- Buffer CSVs ----------

const csvCell = (value) => `"${String(value).replace(/"/g, '""')}"`;

const writeCsvs = () => {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  PLATFORMS.forEach((platform) => {
    const rows = posts
      .filter((p) => p.platform === platform)
      .map((p) => [p.text, p.kind === "reel" ? p.videoUrl : p.imageUrl, "", `${p.date} ${p.time}`]);
    for (let start = 0; start < rows.length; start += BATCH_SIZE) {
      const batch = [["Text", "Image URL", "Tags", "Posting Time"], ...rows.slice(start, start + BATCH_SIZE)];
      const last = Math.min(start + BATCH_SIZE, rows.length);
      const csv = batch.map((r) => r.map(csvCell).join(",")).join("\n") + "\n";
      fs.writeFileSync(path.join(OUTPUT_DIR, `${platform}-days-${pad(start + 1)}-${pad(last)}.csv`), csv);
    }
  });
};

if (!csvOnly) renderImages();
writeCsvs();
console.log(`${csvOnly ? "Wrote" : `Built ${calendar.days.length} images and`} Buffer CSVs in batches of ${BATCH_SIZE} in social/${month}/output/`);
