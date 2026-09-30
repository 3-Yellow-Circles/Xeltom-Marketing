# CLAUDE.md

Xeltom's social media posts. Each month is a folder, `social/<yyyy-mm>/`, holding `posts.js` (the calendar) and the rendered `day-XX.png` images. GitHub Pages serves this repo so Buffer can fetch the images by URL.

## RULES
- Never run any git commands without the user's approval.
- Never read env files or credentials.

## "Generate more posts"
1. Check which months already exist and what's been covered, so new posts don't repeat earlier ideas.
2. Write `social/<yyyy-mm>/posts.js`, using the previous month's file as the template (same `times` and `hashtags`, new `startDate`, 30 days). The first new day follows the last scheduled day.
3. Every feature claim must match the real app. Check /Users/regulus2/Documents/projects/xeltom (read its CLAUDE.md, never its .env files). Only use real testimonials, word for word, and never invent numbers.
4. Writing rules: Australian English, no emojis, no em dashes, a plain natural voice, no AI tells (choppy fragment triplets, "It's not X, it's Y", "Here's the thing", hype words). Instagram allows 5 hashtags at most.
5. Before building, let the user review the posts.
6. Run `node social/build.js <yyyy-mm>` from the repo root (about 40s, needs Chrome), then look at a few images.
7. Ask the user to approve the commit and push, or to do it themselves. The images must be live before scheduling. Check with curl that `https://3-yellow-circles.github.io/Xeltom-Marketing/social/<yyyy-mm>/day-01.png` returns 200.

## "Schedule them" / "Top up Buffer"
Buffer's free plan allows only 10 scheduled posts per channel, so scheduling means topping each channel up to 10.

- Organisation: "My organization" `6abd760f2b4822c214c006b7`, timezone Australia/Sydney.
- Channels: LinkedIn `6abd79eeea19ca0bde390c99`, Facebook `6abd7cdaea19ca0bde395faa`, Instagram `6abd79c5ea19ca0bde3909d9`.

1. Run `node social/queue.js`. It prints every upcoming post across all months as JSON, oldest first, with `platform`, `text`, `imageUrl`, `altText` and `dueAt`.
2. Use `list_posts` (status `scheduled`) to see what each channel already has queued. A calendar post counts as already queued if the same channel has a post with the same `dueAt` instant. Compare the instants, since Buffer returns UTC.
3. For each channel, create the earliest missing posts until it has 10 scheduled. Use `create_post` with `mode: customScheduled`, `schedulingType: automatic`, `dueAt`, `text` and `assets: [{ image: { url, metadata: { altText } } }]`. Facebook needs `metadata.facebook.type: "post"`. Instagram needs `metadata.instagram: { type: "post", shouldShareToFeed: true }`.
4. Before creating any post, confirm its image URL returns 200.
5. Report to the user what was added, per channel, with the date range. Also report any posts in `error` status, and when the calendar runs out (so the next month needs writing).
