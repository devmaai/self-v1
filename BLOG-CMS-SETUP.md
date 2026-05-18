# Blog + CMS setup (TinaCMS)

This site now has a Git-backed blog with a gated editor.

- **Public visitors** read posts at `/blog` and `/blog/<slug>`. No login.
- **Your staff** log in at `/admin`, write/edit/update posts in a visual editor.
- Each save becomes a Markdown file in `content/posts/` committed to the repo,
  which triggers a Vercel redeploy. The post is live in ~1 minute.

Nothing about editing requires a developer once the one-time setup below is done.

---

## One-time setup (do this once)

### 1. Push this repo to GitHub
TinaCMS commits posts through GitHub, so the site must live in a GitHub repo
that Vercel deploys from.

### 2. Create a Tina Cloud project
1. Go to <https://app.tina.io> and sign in with the GitHub account that owns the repo.
2. **Create a project** → connect the repository for this site.
3. Set the project branch to `main` (or your production branch).
4. Open the project → **Overview**. Copy:
   - **Client ID** → `NEXT_PUBLIC_TINA_CLIENT_ID`
   - **Token**: Tokens tab → New Token → Type **Content (Read-only)**,
     Git Branches **main** → create → copy into `TINA_TOKEN`.
     (There is no read/write token. The token only reads content; editor
     saves are authorized per invited user under **Collaborators**.)

### 3. Add environment variables in Vercel
Project → Settings → Environment Variables (Production + Preview):

| Name | Value |
|---|---|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | the Client ID from Tina Cloud |
| `TINA_TOKEN` | the token from Tina Cloud |
| `NEXT_PUBLIC_TINA_BRANCH` | `main` |

`.env.example` lists the same variables for local use. Copy it to `.env` for
local development (`.env` is gitignored).

### 4. Invite your staff as editors
In Tina Cloud → project → **Users** → invite each staff member by email.
They only need a Tina login; no GitHub account, no code access. You control
exactly who can edit — this is the "credentials only for client use" part.

### 5. Deploy
Vercel runs `npm run build`, which is `tinacms build && next build`.
After deploy, the editor lives at `https://yourdomain.com/admin`.

---

## Day-to-day: publishing a blog post

1. Go to `https://yourdomain.com/admin` and log in.
2. **Blog Posts → Create New.**
3. Fill in Title, Publish date, Excerpt, optional Cover image, and the Body
   (visual editor — headings, bold, lists, links, images).
4. Keep **Published** checked to make it live; uncheck to hide it from the site.
5. **Save.** Tina commits the file and Vercel redeploys automatically.

To edit or update an existing post, open it in the same list, change it, save.
To unpublish, uncheck **Published** and save (the file stays in the repo but
disappears from the public site).

---

## How it works (for developers)

- `tina/config.ts` — the `post` collection schema (stored in `content/posts`, `.md`).
- `lib/posts.ts` — reads the Markdown files with `gray-matter` at build time.
- `app/blog/page.tsx` — the post list (reuses `PageHero` + `CardGrid`).
- `app/blog/[slug]/page.tsx` — a single post, body rendered with `react-markdown`.
- Public pages read the committed Markdown directly, so the site stays static and
  does not depend on Tina Cloud being up — Tina Cloud is only the editor + auth.

### Local development
- `npm run dev` runs Tina + Next together; editor at `http://localhost:3000/admin`.
- `npm run dev:next` runs only Next (no editor) if you just want the site.
- `npm run build` is the production build (Tina + Next). `npm run build:next`
  builds only Next and is useful for quickly checking the site compiles.
