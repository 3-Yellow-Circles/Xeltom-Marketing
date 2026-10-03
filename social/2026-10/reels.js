// October 2026 reels. Each reel replaces that day's image post on every platform: the
// video is posted as a Reel on Instagram and Facebook and as a video on LinkedIn.
//
// slug: the reel's project folder (social/2026-10/reels/<slug>/) and its video file on
//       R2 (https://media.xeltom.com/social/2026-10/<slug>.mp4).
// Captions follow the same writing rules as posts.js; {link} and hashtags are added
// the same way.

module.exports = {
  reels: [
    {
      day: 12,
      slug: "file-names",
      linkedin: "Assessment_FINAL_v2.docx. Assessment_FINAL_v2_USE THIS ONE.docx. Copy of Assessment (3).docx.\n\nMost RTOs have a folder like this somewhere. The file names aren't really the problem. The problem is that nobody can be sure which version is current.\n\nIn Xeltom, each resource lives in one place with one current copy, and every resource shows who last updated it and when.\n\nRegister your interest: {link}",
      facebook: "Which one's the real assessment? In Xeltom there's one current copy of every resource, and you can see who last updated it. Register your interest: {link}",
      instagram: "Which one's the real assessment? In Xeltom, every resource has one current copy, and you can see who last updated it and when. Link in bio."
    }
  ]
};
