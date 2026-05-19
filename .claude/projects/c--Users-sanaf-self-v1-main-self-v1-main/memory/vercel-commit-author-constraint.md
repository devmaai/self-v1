---
name: vercel-commit-author-constraint
description: Commits to self-v1 must be authored as dev.maaiagency@gmail.com or Vercel deploys are blocked
metadata:
  type: project
---

The `self-v1` Vercel project is under the **Hobby-plan** team `dev-maai's projects` (owner `dev-maai` / dev.maaiagency@gmail.com). Vercel blocks deploys whose Git commit author is not a team member, and Hobby plan cannot add members.

**Why:** Sana's commits (Sana0523 / sanafathimanadaf23@gmail.com) get rejected by Vercel's author check.

**How to apply:** This repo has a local git identity set (`git config user.email dev.maaiagency@gmail.com`, `user.name dev-maai`) so commits pass. Do not change it. If deploys start failing with "X is not a member of this team", verify the commit author is dev.maaiagency@gmail.com. Related: TinaCMS setup in [[tinacms-blog-setup]] — BLOG-CMS-SETUP.md.
