# Xeltom Marketing

Social post images and the scripts that build them. GitHub Pages serves this repo so Buffer can fetch the images by URL.

## Monthly routine

1. Make a folder for the month, e.g. `social/2026-11/`, and write its `posts.js` (copy the previous month's as a template and set `startDate`).
2. From the repo root, run `node social/build.js 2026-11`. It needs Google Chrome installed.
3. Commit and push. The images are live at `https://3-yellow-circles.github.io/Xeltom-Marketing/social/2026-11/day-01.png` about a minute later.
4. In Buffer, bulk upload the CSVs from `social/2026-11/output/` to the matching channel. They come in batches of 10 days (`linkedin-days-01-10.csv` and so on) because Buffer only takes 10 scheduled posts per channel. Upload days 1 to 10 first, days 11 to 20 on the evening of day 10, and days 21 to 30 on the evening of day 20. The CSVs are not committed.

To rewrite the CSVs without re-rendering the images, add `--csv-only`.

## Reels

At least 3 days a week (Monday, Wednesday and Friday) are reels instead of images. Each month's `reels.js` lists the reel days with their captions, and each reel is a HyperFrames project in `social/<yyyy-mm>/reels/<slug>/` with a music bed, AI voiceover and captions.

Rendered videos are not committed. They are uploaded to the Cloudflare R2 bucket and served from `https://media.xeltom.com/`:

```
node --env-file=.env social/upload-video.js social/<yyyy-mm>/reels/<slug>/renders/video.mp4 social/<yyyy-mm>/<slug>.mp4
```

`.env` (not committed) holds `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, `R2_BUCKET` and `R2_PUBLIC_URL`. Reels need the Buffer MCP to post as Reels; the CSVs only carry the video link.

## Writing rules

Australian English, no emojis, no em dashes, plain natural voice, and every claim must match what Xeltom actually does. Instagram allows 5 hashtags at most.

## Scheduling with Claude

Buffer is connected to Claude Code through the Buffer MCP (`claude mcp add --scope user --transport http buffer https://mcp.buffer.com/mcp`). Instead of uploading CSVs, ask Claude to "top up Buffer". It fills each channel back up to 10 scheduled posts from the calendar. `CLAUDE.md` has the details.
