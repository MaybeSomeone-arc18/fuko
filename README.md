# [Fuko](https://main.d2punv4aorsj85.amplifyapp.com/)

**Opportunities, without the search.**

Fuko reads every open opportunity — GitHub issues, bounties, hackathons, competitions — and surfaces only the few that genuinely fit *you*. No infinite lists, no filtering through noise. You tell it who you are; it hands you what's worth your attention, each with a reason.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="AWS" src="https://img.shields.io/badge/AWS-232F3E?logo=amazonaws&logoColor=white">
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-black">
</p>

---

## Why Fuko is different

Most opportunity platforms show you everything and let you filter. Fuko works the other way around: **the default is silence.** Something appears in your feed *only* because it matched you — not because it's trending, and not just because it exists.

The rule that makes this work:

> **Opportunity type is intent, never relevance.**

Selecting "Hackathon" tells Fuko you're interested in hackathons — it does **not** mean "show me every hackathon." A hackathon that also matches your skills ranks higher. A hackathon that matches nothing about you never appears. Every match reason shown is real and traceable.

That single principle is the difference between a personalized feed and yet another search box with a nicer UI.

---

## Two streams

Fuko splits opportunities by how you actually engage with them:

- **Contribute** — remote, skill-based open work: GitHub issues, open-source bounties, contribution campaigns. Location doesn't matter here. Ranked by how closely your tech stack matches.
- **Near you** — time-and-place events you attend in person: hackathons, meetups, college competitions. Ranked by location first, then interest.

---

## How matching works

- **Relevance gate.** An opportunity enters your feed only with at least one real profile signal — a matched skill, interest, or location. Type-only matches are excluded by design.
- **Token-accurate matching.** Comparisons are whole-token, with safe normalization — so `cli` never falsely matches `client`, and acronyms like `CSS`, `AWS`, and `iOS` are preserved.
- **Real enrichment, never inference.** GitHub opportunities are enriched with each repo's actual languages and topics, so a reason like `Matched on TypeScript · Python` reflects the real tech stack — never guessed from a title or description.
- **Progressive, honest reveal.** Five at a time, with true counts. If only three things genuinely fit you, Fuko shows three. If nothing fits yet, it says so — it never pads the feed to look busy.

---

## Design

- A calm, editorial base in **Light** and **Dark**, plus a playful **Funky** theme.
- Spring-based microinteractions and a "considering" reveal that visualizes Fuko weighing every opportunity down to your few.
- Accessible by default — all motion respects `prefers-reduced-motion`.

---

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion |
| Data & sync | AWS DynamoDB · Lambda · SAM (automated opportunity sync) |
| Sources | GitHub (issues & contribution campaigns) · [Brabble.ai](https://brabble.ai) (events) |

---

## Getting started

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/MaybeSomeone-arc18/fuko.git
cd fuko
npm install
cp .env.local.example .env.local   # fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> For quick local development without AWS, set `USE_MOCK_DB=true` to use an in-memory store.

### Environment variables

| Variable | Description | Default |
|---|---|---|
| `GITHUB_TOKEN` | Raises the GitHub API rate limit for enriching opportunities with repo languages/topics. A classic token with no scopes (or `public_repo`) is enough. | — |
| `DYNAMODB_REGION` | AWS region for the opportunities table. | `ap-south-1` |
| `DYNAMODB_TABLE_NAME` | DynamoDB table name. | `FukoOpportunities` |
| `USE_MOCK_DB` | Set to `true` to bypass AWS and use an in-memory store. | `false` |

---

## Data & enrichment

Opportunities are synced from their sources into DynamoDB. A backfill script enriches GitHub opportunities with real technology signals (repo languages and topics), which is what makes skill matching genuine rather than keyword-based:

```bash
npx tsx --env-file=.env.local scripts/enrich-github.ts
```

The enrichment is resumable and non-destructive — it only writes when a fetch succeeds and skips already-enriched records.

---

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Landing
│   ├── profile/              # Onboarding (intent vs. identity)
│   ├── opportunities/        # The feed (Contribute / Near you)
│   │   └── [id]/             # Opportunity detail
│   ├── about/                # What Fuko is
│   └── components/           # Shared UI
├── lib/
│   ├── matching.ts           # Relevance gate + ranking
│   ├── motion.ts             # Spring presets & motion variants
│   ├── theme.tsx             # Light / Dark / Funky
│   ├── db/                   # DynamoDB access
│   └── sources/              # GitHub & Brabble adapters
└── scripts/                  # Enrichment & sync tooling
```

---

## Roadmap

- Google sign-in with a full guest mode
- Encrypted, portable user profiles
- More sources (GitLab, Devpost, Unstop, and beyond)
- Saved opportunities and deadline reminders

---

## License

MIT — see [`LICENSE`](LICENSE).
