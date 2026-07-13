---
title: MAAI Publishing Integration Test
date: 2026-07-13T00:00:00.000Z
excerpt: 'Temporary test post used to validate the MAAI-to-GitHub-to-Tina publishing workflow. Safe to close without merging.'
published: true
---

This is a temporary test post created to validate the MAAI blog-publishing automation end to end: branch creation, committing a Markdown file in the exact `content/posts` schema, and opening a pull request for human review.

## What this confirms

- The generated file matches the real Tina `post` collection schema (title, date, excerpt, published, body).
- The file lands in `content/posts/` on a dedicated branch, not directly on `main`.
- A pull request is opened for Kriti to review the Vercel preview before anything merges.

This post should not be merged. Once the workflow is confirmed, this branch and PR can be closed and deleted.
