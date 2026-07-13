---
title: MAAI Publishing Integration Test
date: 2026-07-13T00:00:00.000Z
excerpt: 'Temporary post used to validate the MAAI-to-GitHub publishing workflow. Safe to delete.'
published: false
---

This is a temporary post created to validate the MAAI-to-TinaCMS publishing workflow: generate content, open a branch, commit a Markdown file matching the real `post` collection schema in `tina/config.ts`, and open a pull request for human review.

`published: false` means this post stays out of the public blog list and detail pages even if this branch is merged, until a human flips it to `true`.

## What this test confirms

- The generated file matches the real frontmatter fields: `title`, `date`, `excerpt`, `published`.
- The file lands in the correct collection folder, `content/posts`.
- The filename matches Tina's slugify rule (kebab-case of the title).
- The workflow never commits directly to `main` — only to a review branch.
