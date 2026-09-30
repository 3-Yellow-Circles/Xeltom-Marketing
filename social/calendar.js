// Turns a month's posts.js into one entry per post (day x platform), with the final
// text, image URL and scheduled time. Shared by build.js (CSVs) and queue.js (Buffer MCP)
// so both always produce the same posts.

const fs = require("fs");
const path = require("path");

const SITE = "https://register.xeltom.com";
const IMAGE_ROOT = "https://3-yellow-circles.github.io/Xeltom-Marketing/social";
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

const loadMonth = (month) => {
  const calendar = require(path.join(__dirname, month, "posts.js"));
  const posts = [];
  calendar.days.forEach((day, i) => {
    const date = dateFor(calendar.startDate, i);
    PLATFORMS.forEach((platform) => {
      const time = calendar.times[platform];
      posts.push({
        month,
        day: i + 1,
        platform,
        text: `${day[platform].replace(/\{link\}/g, registerLink(platform))}\n\n${calendar.hashtags[platform]}`,
        imageUrl: `${IMAGE_ROOT}/${month}/day-${pad(i + 1)}.png`,
        altText: `Xeltom: ${altText(day.img)}`,
        date,
        time,
        dueAt: `${date}T${time}:00${sydneyOffset(date, time)}`
      });
    });
  });
  return { calendar, posts };
};

const allMonths = () =>
  fs.readdirSync(__dirname).filter((f) => /^\d{4}-\d{2}$/.test(f) && fs.existsSync(path.join(__dirname, f, "posts.js"))).sort();

module.exports = { PLATFORMS, pad, loadMonth, allMonths };
