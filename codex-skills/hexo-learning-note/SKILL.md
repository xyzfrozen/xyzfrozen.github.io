---
name: hexo-learning-note
description: Plan and run a learning workflow, then turn the user's final Markdown into a Hexo blog post in xyzfrozen's blog source. Use when the user invokes this skill to study a topic, collect links/videos and notes in one Markdown document, summarize a completed learning stage, create a Hexo post with `hexo new "title"`, preserve the blog's front matter style, validate with Hexo build, and publish by committing and pushing the `source` branch.
---

# Hexo Learning Note

## Purpose

Use this skill to help xyzfrozen run a learning session and publish the final note to the Hexo blog repository. The workflow has two phases:

1. Start or continue learning: clarify goals, recommend a learning path, and help the user keep links, videos, raw notes, and discussion summaries in one Markdown document.
2. Publish after learning: accept the user's final Markdown, create a Hexo post with the blog's existing structure, build-check it, commit it, and push it.

Do not use `resources.yml`. The user's links, videos, and notes belong in the same `.md` note.

## Blog Assumptions

The blog source repository should be a local clone of:

```text
https://github.com/xyzfrozen/xyzfrozen.github.io.git
branch: source
```

On Ubuntu, prefer:

```bash
~/blog
```

Do not operate on the Windows `E:/blog` path from Ubuntu. Use the Ubuntu clone only.

Identify the blog root by checking for:

```text
_config.yml
package.json
source/_posts/
```

The existing Hexo post style is:

```text
source/_posts/<title-slug>/<title-slug>.md
```

This is normally created by:

```bash
hexo new "title"
```

## Phase 1: Start Learning

When the user gives a topic, begin without requiring a full spec. If important details are missing, ask at most two concise questions, usually:

- target level or deadline
- whether the final post should be public-facing or personal notes

Then produce:

- current learning scope
- stage goals
- suggested resource types to collect
- a Markdown note skeleton the user can paste into Typora or keep in the conversation

Use this skeleton unless the user already has a preferred structure:

```markdown
## Stage Goals

- 

## Learning Resources

### Web Pages

- [title](url)
  - use:
  - note:

### Videos

- [title](url)
  - use:
  - progress:
  - note:

## Raw Notes


## Discussion Summary


## Stage Summary


## Remaining Questions

```

During learning, help the user refine the same document. When summarizing conversations, separate:

- what the user learned
- useful links/videos mentioned by the user
- conclusions from the conversation
- unresolved questions

## Phase 2: Publish Final Note

Only publish when the user says the note is final or asks to upload/publish it.

Before writing files, ensure these fields are known:

- `title`: use the final document title exactly as the user wants it displayed
- `tags`: ask the user if tags are missing; do not invent important tags silently
- `categories`: default to `note`
- `mathjax`: default to `true`

Use the current local time for `date` in this format:

```text
YYYY-MM-DD HH:mm:ss
```

### Create the Post

From the blog root:

```bash
git status --short --branch
git pull --rebase
hexo new "TITLE"
```

Find the generated Markdown under `source/_posts/`. With `post_asset_folder: true`, Hexo usually creates:

```text
source/_posts/TITLE/TITLE.md
```

Replace the generated front matter with:

```yaml
---
title: TITLE
date: YYYY-MM-DD HH:mm:ss
tags:
- TAG1
- TAG2
categories:
- note
mathjax: true
---
```

Then insert the user's final Markdown body after the front matter.

If the user's final Markdown already includes front matter, merge carefully:

- keep the user's title if explicitly provided
- normalize `categories` to `- note` unless the user asks otherwise
- keep user tags
- force `mathjax: true` unless the user asks otherwise
- update `date` to the publish time unless the user asks to preserve the original date

## Content Rules

- Preserve the user's wording in the final note unless asked to polish.
- Keep all web links and video links in the Markdown body.
- Keep images as relative paths whenever possible.
- If the user includes local images, place them in the generated post asset folder and update Markdown links.
- Do not create `resources.yml`.
- Do not publish drafts or raw notes unless the user says they are ready.
- Do not run `hexo deploy`; publication is through GitHub `source` branch and CI.

## Validation And Publish

After creating or editing the post:

```bash
npm run build
git status --short
git add <changed files>
git commit -m "Add learning note: TITLE"
git push
```

If `npm run build` fails, fix the issue before committing. If the failure is unrelated and existed before the change, explain it and ask before publishing.

After pushing, tell the user:

- post file path
- commit hash
- that GitHub Pages and Netlify should deploy from `source`
- any follow-up action if CI fails

## Common Commands

Initial Ubuntu setup:

```bash
git clone -b source https://github.com/xyzfrozen/xyzfrozen.github.io.git ~/blog
cd ~/blog
npm ci
```

Start a publishing session:

```bash
cd ~/blog
git pull --rebase
```

Check generated post paths:

```bash
find source/_posts -maxdepth 2 -name "*.md" | sort
```
