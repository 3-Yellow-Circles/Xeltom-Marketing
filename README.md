# Xeltom Marketing

Social post images and the scripts that build them. GitHub Pages serves this repo so Buffer can fetch the images by URL.

## Monthly routine

1. Make a folder for the month, e.g. `social/2026-11/`, and write its `posts.js` (copy the previous month's as a template and set `startDate`).
2. From the repo root, run `node social/build.js 2026-11`. It needs Google Chrome installed.
3. Commit and push. The images are live at `https://3-yellow-circles.github.io/Xeltom-Marketing/social/2026-11/day-01.png` about a minute later.
4. In Buffer, bulk upload the three CSVs from `social/2026-11/output/` (LinkedIn, Facebook, Instagram). The CSVs are not committed.

## Writing rules

Australian English, no emojis, no em dashes, plain natural voice, and every claim must match what Xeltom actually does. Instagram allows 5 hashtags at most.
