# CLAUDE.md

Xeltom's social media posts. Each month is a folder, `social/<yyyy-mm>/`, holding `posts.js` (the calendar), the rendered `day-XX.png` images, and optionally `reels.js` plus a `reels/<slug>/` HyperFrames project per reel. GitHub Pages serves the images so Buffer can fetch them by URL. Videos are too big for git: they live in the Cloudflare R2 bucket `xeltom-marketing`, served at `https://media.xeltom.com/`.

Reels replace image posts on at least 3 days a week (Monday, Wednesday and Friday by default): on a reel day every platform posts the reel instead of the image, using the captions in `reels.js`.

## RULES
- Never run any git commands without the user's approval.
- Never read env files or credentials. `.env` holds the R2 upload keys; scripts load it with `node --env-file=.env`, never open or print it.

## "Generate more posts"
1. Check which months already exist and what's been covered, so new posts don't repeat earlier ideas.
2. Write `social/<yyyy-mm>/posts.js`, using the previous month's file as the template (same `times` and `hashtags`, new `startDate`, 30 days). The first new day follows the last scheduled day.
3. Every feature claim must match the real app. Check /Users/regulus2/Documents/projects/xeltom (read its CLAUDE.md, never its .env files). Only use real testimonials, word for word, and never invent numbers.
4. Writing rules: Australian English, no emojis, no em dashes, a plain natural voice, no AI tells (choppy fragment triplets, "It's not X, it's Y", "Here's the thing", hype words). Instagram allows 5 hashtags at most.
5. Before building, let the user review the posts.
6. Run `node social/build.js <yyyy-mm>` from the repo root (about 40s, needs Chrome), then look at a few images.
7. Ask the user to approve the commit and push, or to do it themselves. The images must be live before scheduling. Check with curl that `https://3-yellow-circles.github.io/Xeltom-Marketing/social/<yyyy-mm>/day-01.png` returns 200.

## "Make the reels" (part of "Generate more posts")
1. Pick the month's reel days (Monday, Wednesday and Friday unless the user says otherwise) and propose a concept per reel: hook, story beats, what real app footage it uses. The user approves the concepts before anything is built.
2. Add each reel to `social/<yyyy-mm>/reels.js` with `day`, `slug` and LinkedIn, Facebook and Instagram captions (same writing rules as posts).
3. Build each reel as a HyperFrames project in `social/<yyyy-mm>/reels/<slug>/`, starting from the most recent finished reel as the template (`social/2026-10/reels/file-names/`): copy it, then rewrite `BRIEF.md`, `STORYBOARD.md`, `SCRIPT.md` and the frames. Follow the `/product-launch-video` workflow (load the `hyperframes` skill first).
   - Format 1080x1920, 20 to 30 seconds, preset `blue-professional` recoloured to the brand (teal #19b59b, navy #142038), fonts Space Grotesk and Inter from `assets/fonts/`.
   - Voice: HeyGen voice `bb9907f77f44479996299a56bb04ac49` (chosen by the user). Music bed and SFX from HeyGen. Requires `npx hyperframes auth status` to show signed in; if not, ask the user to run `npx hyperframes auth login` in their own terminal.
   - Captions: white words with no background, the spoken word turns teal. Light frames get a short navy fade behind the caption band.
   - Real app footage and stills come from `xeltom-lead-collection/public/assets/screenshots/` (only clean stills without a cursor or localhost bar for hero images). Every claim must match the app.
   - On-screen text is short motion-graphics copy, never the narration sentence.
4. Run `npx hyperframes lint` and `check`, inspect snapshots, then let the user preview (`npx hyperframes preview --background`) before rendering to `renders/video.mp4`.
5. Upload: `node --env-file=.env social/upload-video.js social/<yyyy-mm>/reels/<slug>/renders/video.mp4 social/<yyyy-mm>/<slug>.mp4`, then check the printed URL returns 200.

## "Schedule them" / "Top up Buffer"
Buffer's free plan allows only 10 scheduled posts per channel, so scheduling means topping each channel up to 10.

- Organisation: "My organization" `6abd760f2b4822c214c006b7`, timezone Australia/Sydney.
- Channels: LinkedIn `6abd79eeea19ca0bde390c99`, Facebook `6abd7cdaea19ca0bde395faa`, Instagram `6abd79c5ea19ca0bde3909d9`.

1. Run `node social/queue.js`. It prints every upcoming post across all months as JSON, oldest first, with `platform`, `kind` (`image` or `reel`), `text`, `dueAt`, and either `imageUrl` + `altText` or `videoUrl`.
2. Use `list_posts` (status `scheduled`) to see what each channel already has queued. A calendar post counts as already queued if the same channel has a post with the same `dueAt` instant. Compare the instants, since Buffer returns UTC.
3. For each channel, create the earliest missing posts until it has 10 scheduled. Use `create_post` with `mode: customScheduled`, `schedulingType: automatic`, `dueAt` and `text`.
   - Image posts: `assets: [{ image: { url, metadata: { altText } } }]`. Facebook needs `metadata.facebook.type: "post"`. Instagram needs `metadata.instagram: { type: "post", shouldShareToFeed: true }`.
   - Reels: `assets: [{ video: { url: videoUrl } }]`. Facebook needs `metadata.facebook.type: "reel"`. Instagram needs `metadata.instagram: { type: "reel", shouldShareToFeed: true }`. LinkedIn takes the video as a normal post (no metadata).
4. Before creating any post, confirm its image or video URL returns 200. A reel whose video isn't uploaded yet blocks that day: report it rather than skipping ahead.
5. Report to the user what was added, per channel, with the date range. Also report any posts in `error` status, and when the calendar runs out (so the next month needs writing).
