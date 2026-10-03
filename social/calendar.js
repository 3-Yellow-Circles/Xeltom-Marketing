// Turns a month's posts.js into one entry per post (day x platform), with the final
// text, image or video URL and scheduled time. Shared by build.js (CSVs) and queue.js
// (Buffer MCP) so both always produce the same posts.
//
// If the month has a reels.js, its days become reels: the day's image post is replaced
// by the reel's video (hosted on Cloudflare R2) and the reel's own captions.

const fs = require("fs");
const path = require("path");

const SITE = "https://register.xeltom.com";
const IMAGE_ROOT = "https://3-yellow-circles.github.io/Xeltom-Marketing/social";
const VIDEO_ROOT = "https://media.xeltom.com/social";
const TIMEZONE = "Australia/Sydney";
const PLATFORMS = ["linkedin", "facebook", "instagram"];

const pad = (n) => String(n).padStart(2, "0");

const registerLink = (platform) =>
  `${SITE}/?utm_source=${platform}&utm_medium=social&utm_campaign=launch_posts`;

const dateFor = (startDate, index) => {
  const d = new Date(`${startDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + index);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
};

// Sydney's UTC offset on a given date, e.g. "+10:00" or "+11:00" (daylight saving).
const sydneyOffset = (date, time) => {
  const probe = new Date(`${date}T${time}:00Z`);
  const name = new Intl.DateTimeFormat("en-AU", { timeZone: TIMEZONE, timeZoneName: "longOffset" })
    .formatToParts(probe).find((p) => p.type === "timeZoneName").value;
  return name.replace("GMT", "") || "+00:00";
};

// Plain-text description of a day's image card, used as alt text.
const altText = (img) => {
  const title = (img.title || "").replace(/\*/g, "");
  if (img.type === "testimonial") return `Quote from ${img.name}, ${img.role}: "${img.quote}"`;
  if (img.type === "stat") return `${img.stat} ${title}${img.sub ? ` ${img.sub}` : ""}`;
  if (img.type === "list") return `${title.replace(/[?:.]$/, "")}: ${img.items.join(", ")}`;
  return title;
};

// The month's reels, keyed by day number (empty when the month has no reels.js).
const loadReels = (month) => {
  const file = path.join(__dirname, month, "reels.js");
  if (!fs.existsSync(file)) return new Map();
  return new Map(require(file).reels.map((reel) => [reel.day, reel]));
};

const loadMonth = (month) => {
  const calendar = require(path.join(__dirname, month, "posts.js"));
  const reels = loadReels(month);
  const posts = [];
  calendar.days.forEach((day, i) => {
    const date = dateFor(calendar.startDate, i);
    const reel = reels.get(i + 1);
    PLATFORMS.forEach((platform) => {
      const time = calendar.times[platform];
      const copy = reel ? reel[platform] : day[platform];
      const media = reel
        ? { kind: "reel", videoUrl: `${VIDEO_ROOT}/${month}/${reel.slug}.mp4` }
        : { kind: "image", imageUrl: `${IMAGE_ROOT}/${month}/day-${pad(i + 1)}.png`, altText: `Xeltom: ${altText(day.img)}` };
      posts.push({
        month,
        day: i + 1,
        platform,
        text: `${copy.replace(/\{link\}/g, registerLink(platform))}\n\n${calendar.hashtags[platform]}`,
        ...media,
        date,
        time,
        dueAt: `${date}T${time}:00${sydneyOffset(date, time)}`
      });
    });
  });
  return { calendar, reels, posts };
};

const allMonths = () =>
  fs.readdirSync(__dirname).filter((f) => /^\d{4}-\d{2}$/.test(f) && fs.existsSync(path.join(__dirname, f, "posts.js"))).sort();

module.exports = { PLATFORMS, pad, loadMonth, allMonths };
