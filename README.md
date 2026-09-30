# Xeltom Marketing

Social post images and the scripts that build them. GitHub Pages serves this repo so Buffer can fetch the images by URL.

## Monthly routine

1. Make a folder for the month, e.g. `social/2026-11/`, and write its `posts.js` (copy the previous month's as a template and set `startDate`).
2. From the repo root, run `node social/build.js 2026-11`. It needs Google Chrome installed.
3. Commit and push. The images are live at `https://3-yellow-circles.github.io/Xeltom-Marketing/social/2026-11/day-01.png` about a minute later.
4. In Buffer, bulk upload the CSVs from `social/2026-11/output/` to the matching channel. They come in batches of 10 days (`linkedin-days-01-10.csv` and so on) because Buffer only takes 10 scheduled posts per channel. Upload days 1 to 10 first, days 11 to 20 on the evening of day 10, and days 21 to 30 on the evening of day 20. The CSVs are not committed.

To rewrite the CSVs without re-rendering the images, add `--csv-only`.

## Writing rules

Australian English, no emojis, no em dashes, plain natural voice, and every claim must match what Xeltom actually does. Instagram allows 5 hashtags at most.

## Scheduling with Claude

Buffer is connected to Claude Code through the Buffer MCP (`claude mcp add --scope user --transport http buffer https://mcp.buffer.com/mcp`). Instead of uploading CSVs, ask Claude to "top up Buffer". It fills each channel back up to 10 scheduled posts from the calendar. `CLAUDE.md` has the details.
