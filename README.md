# Top Shot · Round 2 Reactivation Review

A swipe-through review experience for Magic's May 4–10 reactivation proposal. Built for the team to give yes / no / needs-work feedback per piece in ~4 minutes.

## What's in it

- **/** — landing, sets reviewer name
- **/review** — Tinder-style swipe deck (14 pieces: emails, X threads, Discord pin, calendar, strategy, decisions, A/B variants)
- **/calendar** — visual May 4–10 timeline
- **/admin** — feedback dashboard (per-piece tally, raw notes, who said what)
- **/api/feedback** — POST + GET (storage = commits to this repo's `feedback/` directory)

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Froham%2Ftopshot-review&env=GH_TOKEN,GH_REPO,GH_BRANCH&envDescription=GitHub+token+with+repo+write+%28for+storing+feedback%29&envLink=https%3A%2F%2Fgithub.com%2Fsettings%2Ftokens&project-name=topshot-review)

### Required env vars

| Name | Value |
|---|---|
| `GH_TOKEN` | A GitHub personal access token with `repo` scope. Used server-side only. |
| `GH_REPO` | `roham/topshot-review` |
| `GH_BRANCH` | `main` |

Without env vars set, the app still runs — feedback POSTs return `{persisted: false}` and the admin view shows a setup prompt.

## Stack

Next.js 14 · Tailwind · Framer Motion · No DB (feedback = git commits)

## Why git as the database

Zero infra to provision. Every feedback submission is a commit, audit-ready, versioned. Concurrent writes don't collide because each writes a new file (timestamp + random suffix). For a small team review tool this is robust enough and removes a deploy-step.
