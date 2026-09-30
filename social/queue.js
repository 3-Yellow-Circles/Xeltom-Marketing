// Prints every upcoming post across all month folders as JSON, oldest first, for
// scheduling through the Buffer MCP. Each entry has platform, text, imageUrl and
// dueAt (ISO time with the Sydney offset).
//
// Usage (from the repo root): node social/queue.js

const { loadMonth, allMonths } = require("./calendar");

const now = Date.now();
const upcoming = allMonths()
  .flatMap((month) => loadMonth(month).posts)
  .filter((p) => new Date(p.dueAt).getTime() > now)
  .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));

console.log(JSON.stringify(upcoming, null, 2));
