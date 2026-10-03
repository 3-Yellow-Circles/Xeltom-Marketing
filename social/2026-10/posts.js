// Social content calendar: one idea per day, written for each platform.
// Run `node social/build.js 2026-10` (from the repo root) to build the images and Buffer CSVs.
//
// Writing rules: Australian English, no emojis, no em dashes, plain natural voice,
// and every claim must match what Xeltom actually does.
//
// In the text, {link} becomes that platform's tagged registration link.
// Image types: "question" | "statement" | "testimonial" | "stat" | "list".
// In image titles, *asterisks* mark the words shown in teal.

module.exports = {
  startDate: "2026-10-01",
  times: { linkedin: "08:30", facebook: "12:30", instagram: "18:30" },
  hashtags: {
    linkedin: "#RTO #VET #TrainingAndAssessment",
    facebook: "#RTO #VET",
    instagram: "#RTO #VET #TrainingAndAssessment #TrainerLife #AustralianRTO"
  },
  days: [
    {
      img: { type: "question", title: "Where do your lesson plans *actually* live?" },
      linkedin: `A question for RTO trainers and managers.

Where do your lesson plans and assessment guides live at the moment?

SharePoint or OneDrive
Dropbox or Google Drive
Emails and desktops
A bit of everything

Most people we talk to say the last one. Keen to hear how your RTO does it.`,
      facebook: `Where do your RTO's lesson plans and assessment guides live at the moment? SharePoint, Dropbox, emails, desktops, or a bit of everything? Let us know in the comments.`,
      instagram: `Where do your lesson plans live at the moment? SharePoint, Dropbox, your inbox, an old laptop? Let us know in the comments.`
    },
    {
      img: { type: "question", title: "Is this even the *right file?*" },
      linkedin: `Most trainers have downloaded a resource, opened it and realised it wasn't the one they needed.

In Xeltom, every resource has its own page with an overview, recommended usage, screenshots and embedded videos. You can see what it is and how it's meant to be used before you download anything.

It sounds minor, but across a whole training team it adds up to a lot of saved time.`,
      facebook: `Every resource in Xeltom has its own page with an overview, recommended usage, screenshots and videos, so trainers know what they're getting before they download it.`,
      instagram: `Downloaded the wrong file again? In Xeltom, every resource has a preview page with an overview, recommended usage, screenshots and videos, so you know what it is before you download it.`
    },
    {
      img: { type: "list", title: "Name your resources *consistently*", items: ["Course code", "Unit or subject", "Resource type", "Version or date"] },
      linkedin: `A practical tip for RTOs still working out of shared folders.

Agree on one naming pattern for every resource and stick to it. For example: course code, unit, resource type, then version.

CHC33021_InfectionControl_AssessmentGuide_v2

It won't solve everything, but it does put an end to files called "final_FINAL_v3 (1).pdf".`,
      facebook: `A tip for RTOs using shared folders: pick one naming pattern (course code, unit, resource type, version) and use it for every file. It makes a surprising difference.`,
      instagram: `Tip for shared folders: name every resource the same way. Course code, unit, resource type, version. Your relief trainers will thank you.`
    },
    {
      img: { type: "testimonial", quote: "Everything is very easy to find and it's all labelled really well. It's saved me in a pinch a few times.", name: "Harry", role: "Trainer, EQC Institute" },
      linkedin: `"Everything is very easy to find and it's all labelled really well. It's saved me in a pinch a few times."

That's Harry, a trainer at EQC Institute, where more than 60 staff use Xeltom every day.

Feedback like this is the reason it was built in the first place. Trainers shouldn't spend their prep time looking for files.`,
      facebook: `"Everything is very easy to find and it's all labelled really well. It's saved me in a pinch a few times."

Harry, Trainer at EQC Institute`,
      instagram: `"Everything is very easy to find and it's all labelled really well."

Harry, Trainer at EQC Institute`
    },
    {
      img: { type: "question", title: "Covering a class. *Where are they up to?*" },
      linkedin: `It's 8am on a Monday and you've been asked to cover a class you've never taught.

Where are they up to? Where's the lesson plan? What did the last trainer cover?

In a lot of RTOs, finding out means phone calls and a long search through shared drives. In Xeltom, the course has every lesson plan, assessment guide and trainer tool in one place, organised by subject, so a relief trainer can open it and get started.`,
      facebook: `Covering a class at short notice is a lot easier when the course has every lesson plan, assessment guide and trainer tool in one place. That's how Xeltom organises it.`,
      instagram: `Covering a class at short notice? With Xeltom, relief trainers open the course and find everything they need, organised by subject.`
    },
    {
      img: { type: "list", title: "Sound *familiar?*", items: ["Where are all the lesson plans?", "Is this the latest version?", "Where's the marking guide?", "Am I even audit-ready?"] },
      linkedin: `Have you heard any of these in the staffroom lately?

"Where are all the lesson plans?"
"Is this the latest version?"
"Where's the marking guide?"
"What did the last trainer cover?"
"Am I even audit-ready?"

They come up in almost every RTO, and they're the questions Xeltom was built to answer.`,
      facebook: `"Where are all the lesson plans?" "Is this the latest version?" "Where's the marking guide?" How many of these have you heard this week?`,
      instagram: `How many of these have you heard this week? Where are the lesson plans? Is this the latest version? Where's the marking guide? Am I even audit-ready?`
    },
    {
      img: { type: "statement", title: "From the *workshop* to the *classroom* to code" },
      linkedin: `Xeltom's founder spent more than a decade in commercial joinery, moved into web development, then became a trainer and assessor.

Working inside an RTO made one problem obvious. Trainers were losing hours to scattered resources: lesson plans in inboxes, guides nobody was sure were current, relief trainers starting from scratch.

Xeltom was built to fix that for one college first, and now it's being opened up to other RTOs.`,
      facebook: `Joinery, then web development, then training and assessing. Xeltom was built by someone who has seen the resource problem inside an RTO first-hand.`,
      instagram: `From the workshop to the classroom to code. Xeltom was built by a trainer and assessor who dealt with the resource chaos first-hand.`
    },
    {
      img: { type: "question", title: "Who *changed* this, and when?" },
      linkedin: `"Who updated this assessment guide, and when?"

If answering that means digging through old email threads, it's going to be a stressful question at audit time.

Xeltom keeps an activity trail of who added and updated each resource, along with when it was last updated and how often it's been downloaded. When someone asks, the answer is already there.`,
      facebook: `Xeltom keeps a record of who added and updated each resource, and when. Handy when an auditor asks.`,
      instagram: `Who changed this, and when? Xeltom keeps a record of who added and updated every resource, so you always have the answer.`
    },
    {
      img: { type: "statement", title: "One file in *five folders*" },
      linkedin: `An assessment guide gets copied into five course folders, then edited a little differently in each one. A few months later, nobody knows which copy is current.

In Xeltom, a single resource can be attached to several courses or subjects. Update it once and it's up to date everywhere it's used.`,
      facebook: `In Xeltom, one resource can be attached to several courses and subjects. Update it once and every course has the current version.`,
      instagram: `The same file copied into five folders usually ends up as five versions. In Xeltom you update it once and it's current everywhere it's used.`
    },
    {
      img: { type: "testimonial", quote: "Having clear visibility on when a document / resource has been updated also really helps.", name: "Trent Moffat", role: "Trainer, EQC Institute" },
      linkedin: `"The overall structure of lesson plans, links, videos etc. makes finding info really easy. Also having clear visibility on when a document / resource has been updated also really helps."

Trent Moffat, Trainer at EQC Institute

Knowing a resource is current matters in VET. It means trainers can deliver with confidence instead of second-guessing what they've been given.`,
      facebook: `"Having clear visibility on when a document / resource has been updated also really helps."

Trent Moffat, Trainer at EQC Institute`,
      instagram: `"The overall structure of lesson plans, links, videos etc. makes finding info really easy."

Trent Moffat, Trainer at EQC Institute`
    },
    {
      img: { type: "statement", title: "Every faculty sees *what it needs*" },
      linkedin: `Larger RTOs often end up with one of two problems: everyone can see everything, or nobody can find anything.

Xeltom uses workspaces to solve this. Each faculty, department or campus gets its own space with its own users, courses and resources. Admins look after their own workspaces, and the organisation owner can see across all of them.`,
      facebook: `Workspaces in Xeltom give each faculty, department or campus its own space, so staff see the courses and resources that are relevant to them.`,
      instagram: `One RTO, several faculties. Xeltom workspaces give each department its own organised space.`
    },
    {
      img: { type: "stat", stat: "3", title: "months *free*", sub: "for RTOs that register before launch" },
      linkedin: `Xeltom is launching soon, and RTOs that register before launch get a free 3-month trial.

That's enough time to bring your resources across, set up your courses and workspaces, and see how your team uses it before committing.

After launch, the standard trial will be 1 month.

Register your interest here: {link}`,
      facebook: `RTOs that register before launch get 3 months of Xeltom free. After launch, the trial will be 1 month. Register here: {link}`,
      instagram: `Register before launch and your RTO gets 3 months of Xeltom free. After launch it's 1 month. Link in bio.`
    },
    {
      img: { type: "question", title: "What *takes up* most of your prep time?" },
      linkedin: `For the trainers and assessors here: what takes up the most time in your week outside of actual teaching?

Finding resources, formatting documents, chasing paperwork, something else?

We're interested in the answers, because they help decide what gets built next.`,
      facebook: `Trainers and assessors, what takes up the most time in your week outside of teaching? We'd like to hear it.`,
      instagram: `Trainers: what takes up most of your time outside of teaching? Tell us in the comments.`
    },
    {
      img: { type: "question", title: "Could a relief trainer find it in *two minutes?*" },
      linkedin: `Here's a simple test for your RTO.

Could a relief trainer, with no warning, find the right lesson plan and assessment guide for today's class in under two minutes?

If the honest answer is "probably not", that's the gap Xeltom was built to close.`,
      facebook: `Could a relief trainer find today's lesson plan in under two minutes at your RTO?`,
      instagram: `Could a relief trainer find today's lesson plan in under two minutes at your RTO?`
    },
    {
      img: { type: "statement", title: "Files, *links* and *videos* together" },
      linkedin: `SharePoint and Dropbox store files well, but a lot of good training material isn't a file.

The YouTube demonstration, the industry website, the online quiz tool. They tend to end up in emails and bookmarks, and they often leave when the trainer does.

In Xeltom, links and videos sit alongside your files, organised by course and subject like everything else.`,
      facebook: `SharePoint and Dropbox store files. Xeltom keeps your links and videos alongside them, organised by course and subject.`,
      instagram: `Not every good resource is a file. Xeltom keeps your links and videos alongside your files, all organised by course.`
    },
    {
      img: { type: "testimonial", quote: "I had about 15 minutes before class. I jumped on Xeltom and there was a bunch of links and resources that I could use.", name: "Harry", role: "Trainer, EQC Institute" },
      linkedin: `"I needed to add more activities to make my class more fun and engaging. I also like to leave things a bit last minute so I had about 15 minutes before class. I jumped on Xeltom and checked the trainer support material and there was a bunch of links and resources that I could use."

Harry, Trainer at EQC Institute

Fifteen minutes before class is when a good resource library really earns its keep.`,
      facebook: `"I had about 15 minutes before class. I jumped on Xeltom and checked the trainer support material and there was a bunch of links and resources that I could use."

Harry, Trainer at EQC Institute`,
      instagram: `Fifteen minutes before class and needing more activities? Harry found what he needed in Xeltom.

Harry, Trainer at EQC Institute`
    },
    {
      img: { type: "list", title: "Audit prep: a *resource* check", items: ["Is every resource current?", "Is it clearly labelled?", "Do you know who changed it?", "Can it be found quickly?"] },
      linkedin: `If there's an audit coming up, it's worth running through a quick resource check:

Is every lesson plan and assessment guide the current version?
Is each one clearly labelled by course and unit?
Can you show who updated it and when?
Could a trainer, or an auditor, find it in under a minute?

If any of those give you pause, it's better to sort it out now than on the day.`,
      facebook: `A quick pre-audit check: are your resources current, clearly labelled, traceable, and easy to find? Worth checking before the auditor does.`,
      instagram: `Pre-audit check: current versions, clear labels, a record of changes, and easy to find. How does your RTO go?`
    },
    {
      img: { type: "statement", title: "Switching is *easy*" },
      linkedin: `A common worry about moving to a new system is how long it'll take to move everything across.

With Xeltom, admins can drop in a ZIP of files and assign each one to a course or subject, and import users and courses in bulk from a spreadsheet. There's no need to upload files one at a time.`,
      facebook: `Moving across to Xeltom doesn't mean uploading files one at a time. You can bulk import files from a ZIP, and users and courses from a spreadsheet.`,
      instagram: `Moving from SharePoint or Dropbox? Xeltom lets you bulk import your files, users and courses.`
    },
    {
      img: { type: "stat", stat: "60+", title: "staff use Xeltom *every day*", sub: "at EQC Institute" },
      linkedin: `Xeltom started as an internal tool at EQC Institute.

Today more than 60 staff there use it every day to find, preview and manage their training and assessment resources, and it's now being opened up to other RTOs.`,
      facebook: `More than 60 staff at EQC Institute use Xeltom every day. Now it's being opened up to other RTOs.`,
      instagram: `More than 60 staff at EQC Institute use Xeltom every day, and it's now opening up to other RTOs.`
    },
    {
      img: { type: "list", title: "A new trainer's *first day*", items: ["Course overview", "Current lesson plans", "Assessment guides", "Who to ask"] },
      linkedin: `Onboarding a new trainer? A few things make their first day much easier:

1. The course overview and qualification structure
2. Current lesson plans for their first sessions
3. The assessment and marking guides they'll need
4. A name to contact when something's missing

The fewer places they need to look, the sooner they feel confident in front of a class.`,
      facebook: `Onboarding a new trainer? Course overview, current lesson plans, assessment guides and someone to ask. The fewer places they have to look, the better.`,
      instagram: `A new trainer's first day goes better with the course overview, current lesson plans, assessment guides and someone to ask, all in one place.`
    },
    {
      img: { type: "stat", stat: "9", title: "*releases* since May", sub: "with more on the way" },
      linkedin: `Some behind-the-scenes progress: Xeltom has had 9 releases since May 2026.

Those have added organisations and workspaces, a new dashboard, video support, trash tools, categories, assessor-only access and richer resource details. Most of it came from feedback from the trainers using it every day.`,
      facebook: `Xeltom has had 9 releases since May 2026, most of them shaped by feedback from trainers using it every day.`,
      instagram: `9 releases since May, most of them shaped by the trainers who use Xeltom every day.`
    },
    {
      img: { type: "statement", title: "Your *personalised* dashboard" },
      linkedin: `Every Xeltom user gets their own dashboard, whether they're a trainer, assessor or admin.

It shows their saved resources, recently added resources across their courses, and their recent activity, so they can start the day without digging through folders.`,
      facebook: `Every Xeltom user has their own dashboard with saved resources, recently added material and their recent activity.`,
      instagram: `Saved resources, what's new and your recent activity, all on your own Xeltom dashboard.`
    },
    {
      img: { type: "testimonial", quote: "This allowed me to login and grab what I needed to and pull together a great lesson plan with ease.", name: "Timothy Daly", role: "Trainer, EQC Institute" },
      linkedin: `"Teaching a class on my new laptop was hard because all of my resources were saved on my old laptop. This allowed me to login and grab what I needed to and pull together a great lesson plan with ease."

Timothy Daly, Trainer at EQC Institute

When resources are saved on individual laptops, they leave with the laptop. When they're in one shared library, the whole team can use them.`,
      facebook: `"This allowed me to login and grab what I needed to and pull together a great lesson plan with ease."

Timothy Daly, Trainer at EQC Institute`,
      instagram: `New laptop and none of your resources? Timothy logged in to Xeltom and had what he needed.

"This allowed me to login and grab what I needed." Timothy Daly, EQC Institute`
    },
    {
      img: { type: "statement", title: "The right access for *every role*" },
      linkedin: `Not every resource is meant for everyone.

Xeltom has roles for trainers, trainer-assessors, admins and organisation owners, and assessor-only resources are only visible to the people who assess.

Combined with workspaces, it means staff see what's relevant to them and nothing they shouldn't.`,
      facebook: `Xeltom has roles for trainers, assessors and admins, and keeps assessor-only resources visible only to assessors.`,
      instagram: `Trainer, assessor and admin roles in Xeltom, with assessor-only resources kept for assessors.`
    },
    {
      img: { type: "statement", title: "Every course, *neatly organised*" },
      linkedin: `Open any course in Xeltom and its resources are grouped by subject and type: assessment guides, lesson plans, trainer tools, links, videos and general course resources.

There's no working through nested folders, and whoever teaches it next knows exactly where to look.`,
      facebook: `Every course in Xeltom is organised by subject and type: assessment guides, lesson plans, trainer tools, links and videos.`,
      instagram: `Every course in Xeltom is organised by subject and by type, so whoever teaches it next knows where to look.`
    },
    {
      img: { type: "stat", stat: "3x", title: "the *free trial*", sub: "when you register before launch" },
      linkedin: `A reminder about Xeltom's launch offer.

RTOs that register their interest before launch get a 3-month free trial. RTOs that sign up after launch get 1 month.

Registering takes under a minute and there's no obligation: {link}`,
      facebook: `Register before launch for a 3-month free trial. After launch it will be 1 month. It takes under a minute: {link}`,
      instagram: `Register before launch for a 3-month free trial. After launch it will be 1 month. Link in bio.`
    },
    {
      img: { type: "list", title: "Why *recommended usage* matters", items: ["What it's for", "When to use it", "How to deliver it", "What to watch for"] },
      linkedin: `A resource without context is only half useful.

A short note on recommended usage covers what it's for, when it fits into the unit, and how to deliver it well. That turns a file into something any trainer can pick up and use with confidence.

That's why every resource in Xeltom has space for an overview and recommended usage on its own page.`,
      facebook: `Every Xeltom resource has an overview and recommended usage, so any trainer can pick it up and use it with confidence.`,
      instagram: `A file on its own is only half useful. Every Xeltom resource has an overview and recommended usage so trainers know how to use it.`
    },
    {
      img: { type: "list", title: "Coming *next*", items: ["Classes", "Timetabling", "Email notifications", "Shared tasks"] },
      linkedin: `What's planned for Xeltom next (timing and details may change):

Classes and timetabling with a live calendar
Email notifications
Shared tasks and to-do lists
An in-app assistant

The aim is one place to manage the day-to-day running of an RTO, not only its files.`,
      facebook: `Planned for Xeltom: classes, timetabling, email notifications, shared tasks and an in-app assistant. Details may change as we build.`,
      instagram: `Planned for Xeltom: classes, timetabling, notifications and shared tasks. Details may change as we build.`
    },
    {
      img: { type: "testimonial", quote: "I use it daily to find current lesson plans, resources and links that help me deliver 11/10 training.", name: "Timothy Daly", role: "Trainer, EQC Institute" },
      linkedin: `"Xeltom is fantastic! Honestly, I couldn't do my job the same way without it. I use it daily to find current lesson plans, resources and links that help me deliver 11/10 training to students that deserve the best from us."

Timothy Daly, Trainer at EQC Institute

This is the whole point: trainers putting their energy into students instead of searching for files.`,
      facebook: `"Honestly, I couldn't do my job the same way without it."

Timothy Daly, Trainer at EQC Institute`,
      instagram: `"Honestly, I couldn't do my job the same way without it."

Timothy Daly, Trainer at EQC Institute`
    },
    {
      img: { type: "statement", title: "Built inside a *real RTO*" },
      linkedin: `Xeltom was built inside an RTO by a trainer and assessor, to fix problems trainers deal with every day.

More than 60 staff at EQC Institute use it daily. Files are stored privately, each organisation's data is kept separate, and access is based on each person's role.

If your RTO is ready to get its resources organised, register before launch for a 3-month free trial: {link}`,
      facebook: `Built inside a real RTO and used daily by more than 60 staff. Register before launch for a 3-month free trial: {link}`,
      instagram: `Built inside a real RTO and used by more than 60 staff every day. Register before launch for a 3-month free trial. Link in bio.`
    }
  ]
};
