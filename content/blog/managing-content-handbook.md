---
title: "Managing the website: a non-technical handbook"
description: A plain-language guide for the team on editing content, adding images and components, uploading changes, and publishing the site — no coding background required.
date: 2026-10-29
author: The Acteamo Team
tag: Handbook
tags:
  - handbook
  - content
  - publishing
  - how-to
---

This guide explains how anyone on the team — no coding background required — can
update the Acteamo website: write and edit content, add images and ready-made
components, upload the changes, and publish them live.

The whole site is built from simple **Markdown** text files. Editing the site
mostly means editing text, which you can do right from your web browser.

::callout{type="tip" title="The 30-second version"}
Edit a `.md` text file on GitHub → write a short note describing your change →
click **Commit**. The site rebuilds and goes live automatically a couple of
minutes later. That's it.
::

## 1. Tools for creating and editing content

### Where the content lives

All text lives in two folders in the project:

- **`content/blog/`** — add a `.md` file here and it becomes a **blog post**
  (it shows up automatically on the Blog page).
- **`content/`** (outside `blog/`) — add a `.md` file here and it becomes a
  **standalone page**. For example, `content/pricing.md` becomes the
  `/pricing` page.

You never have to touch any code to add a post or a page — just add or edit a
text file.

### Option A — Edit in your browser (easiest, recommended)

Best for small edits and new posts. No installation needed.

1. Open the repository on GitHub (see Section 2).
2. Browse to the file you want to change, e.g. `content/blog/`.
3. Click the **pencil icon** (✏️ *Edit*) in the top-right of the file.
4. Make your changes, then click **Commit changes**.

To create a **new** post from the browser: open the `content/blog/` folder,
click **Add file → Create new file**, name it something like
`my-new-post.md`, paste your content, and commit.

> Tip: press the **`.`** (period) key on any GitHub repo page to open a full
> in-browser editor (a complete VS Code in your browser) — great for editing
> several files at once.

### Option B — Edit on your computer with VS Code

Best for larger changes or previewing the site before publishing.

1. Install [VS Code](https://code.visualstudio.com/) and get a copy of the
   project (see Section 2).
2. Open the folder in VS Code and edit the `.md` files.
3. (Optional) Preview locally by running `npm install` once, then `npm run dev`,
   and open `http://localhost:3000`.

Any Markdown editor works too (Typora, Obsidian, etc.) — the files are plain
text.

### How to write a post

Every file starts with a short settings block (called *front matter*) between
`---` lines, followed by your content:

```md
---
title: Why we love calm planning        # required
description: A one-line summary.          # shows on cards + Google + social
date: 2026-10-29                          # controls the order of posts
author: The Acteamo Team                  # optional
tag: Product                              # the label shown on the card
tags: [planning, focus]                   # keywords for search engines
---

Write your content here in plain text.

## A heading

- A bullet
- **Bold** and *italic* text
- A [link](https://www.acteamo.com)
```

### Adding images

Put image files in the **`public/images/`** folder, then reference them from the
site root:

```md
![A short description of the image](/images/my-picture.png)
```

The description in the brackets is important — it's read aloud by screen readers
and used by search engines, so write something meaningful.

### Adding ready-made components

Beyond plain text, you can drop in pre-built design elements. Just paste these
snippets into any post or page:

**Highlight box** (types: `tip`, `info`, `warning`, `success`):

```md
::callout{type="success" title="Good to know"}
Your highlighted message goes here.
::
```

**Button:**

```md
:button-link[Start for free]{to="https://my.acteamo.com/auth/register"}
:button-link[Read the blog]{to="/blog" variant="secondary"}
```

**YouTube video** (use the id from the video's URL):

```md
::youtube{id="dQw4w9WgXcQ" title="Product demo"}
::
```

::callout{type="info" title="Want a live reference?"}
The post **“Writing rich posts with images and components”** shows every one of
these in action — open it and click *Edit* to copy the exact syntax.
::

## 2. Accessing the codebase and uploading changes

The project lives in one place on GitHub:

```
https://github.com/vukadinFE/acteamo-landing
```

You'll need a GitHub account with access to this repository (ask the repo owner
to invite you as a collaborator if you can't open it).

### Uploading from the browser

When you edit a file on GitHub and click **Commit changes**, that *is* the
upload — your change is saved to the project immediately. You can commit:

- **directly to `main`** (publishes right away), or
- **to a new branch + Pull Request** (recommended) so a colleague can review it
  before it goes live.

For anything important, the Pull Request path is safer: GitHub walks you through
it after you click Commit — just choose *“Create a new branch… and start a pull
request.”*

### Uploading from your computer (VS Code / Git)

If you edit locally, you save (“push”) your changes with three steps:

```bash
git add .
git commit -m "Short note describing the change"
git push
```

If you work on a branch, open a Pull Request on GitHub and merge it when ready.

::callout{type="warning" title="One habit worth keeping"}
Always write a short, clear note (the *commit message*) describing what you
changed, e.g. *“Add Q3 pricing blog post”*. It becomes the project's history and
makes it easy to see who changed what.
::

## 3. Publishing — triggering a rebuild

You don't run anything manually to publish. The site **rebuilds and deploys
itself** whenever changes reach the `main` branch.

### It happens automatically

- Commit directly to `main`, **or** merge a Pull Request into `main`.
- A process called **GitHub Actions** immediately rebuilds the whole site
  (regenerating every page, including your new content) and publishes it.
- Give it **1–3 minutes**, then refresh the live site.

### Watching it happen (and confirming success)

1. In the repository, open the **Actions** tab.
2. You'll see your change listed with a spinning amber dot (running).
3. A green ✓ means it published successfully; a red ✗ means something failed —
   open it to read the message, or ask a developer.

### Publishing manually (rarely needed)

If you ever need to re-publish without changing a file (for example, to retry a
failed run):

1. Open the **Actions** tab → **Deploy to GitHub Pages**.
2. Click **Run workflow → Run workflow**.

## Quick reference

| I want to… | Do this |
| --- | --- |
| Add a blog post | Create a `.md` file in `content/blog/` |
| Add a page | Create a `.md` file in `content/` |
| Add an image | Put it in `public/images/`, reference `/images/name.png` |
| Add a button / box / video | Paste the component snippets from Section 1 |
| Publish | Commit to `main` (or merge a PR) — it deploys automatically |
| Check it published | Open the **Actions** tab, wait for the green ✓ |

Questions or something not working? Reach out to the development team and
include a link to your commit or Pull Request.

:button-link[Open the repository]{to="https://github.com/vukadinFE/acteamo-landing"}
