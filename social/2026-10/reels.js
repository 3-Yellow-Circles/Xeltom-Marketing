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
    },
    {
      day: 14,
      slug: "relief-note",
      linkedin: "You're covering a class tomorrow, and the handover note says the lesson plan is \"somewhere\".\n\nIn Xeltom, every course has its resources sorted by type: lesson plans, assessment guides, trainer tools, links and videos. Every resource also has its own page explaining what it's for and how to use it, so a relief trainer can pick up a class they've never taught.\n\nRegister your interest: {link}",
      facebook: "Covering a class and the lesson plan is \"somewhere\"? In Xeltom, every course has its resources sorted by type, and every resource explains what it's for and how to use it. Register your interest: {link}",
      instagram: "Covering a class and the lesson plan is \"somewhere\"? In Xeltom, every course has its resources sorted by type, and every resource explains how to use it. Link in bio."
    },
    {
      day: 16,
      slug: "fifteen-minutes",
      linkedin: "Class starts in 15 minutes and you need one more activity.\n\nIn Xeltom, trainers search the whole library by keyword and filter by course, subject or category, so the right resource is a search away.\n\nHarry, a trainer at EQC Institute, put it this way: \"...so I had about 15 minutes before class. I jumped on Xeltom and checked the trainer support material and there was a bunch of links and resources that I could use.\"\n\nRegister your interest: {link}",
      facebook: "15 minutes until class and you need one more activity? In Xeltom, the right resource is a search away. Register your interest: {link}",
      instagram: "15 minutes until class and you need one more activity? In Xeltom, the right resource is a search away. Link in bio."
    },
    {
      day: 19,
      slug: "audit-day",
      linkedin: "\"Who last changed this assessment guide, and when?\"\n\nIn Xeltom, every resource shows who uploaded it, who last updated it and when. Super admins also see every change across the RTO in one activity feed.\n\nIt won't do your audit for you, but it means that question always has a clear answer.\n\nRegister your interest: {link}",
      facebook: "The auditor asks who last changed a resource, and when. In Xeltom, every resource shows exactly that. Register your interest: {link}",
      instagram: "The auditor asks who last changed a resource, and when. In Xeltom, every resource shows who uploaded it, who last updated it and when. Link in bio."
    }
  ]
};
