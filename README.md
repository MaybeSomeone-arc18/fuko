# [Fuko](https://main.d2punv4aorsj85.amplifyapp.com/)

**Focused Opportunities, built for clarity.**

Fuko ingests open opportunities (GitHub issues, bounties, hackathons, competitions) and returns only the ones that match a user's real profile. Instead of a searchable list, it produces a small ranked set, each result annotated with the signals that produced the match.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="AWS" src="https://img.shields.io/badge/AWS-232F3E?logo=amazonaws&logoColor=white">
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-black">
</p>

---

## Core principle

Most platforms index everything and rely on filters. Fuko inverts that: an opportunity is shown only when it matches the profile.

> **Opportunity type is a preference, not a relevance signal.**

Selecting "Hackathon" records intent. It does not qualify every hackathon. Type can raise ranking, but a match requires at least one concrete profile signal: a skill, an interest, or a location. Results that rely on type alone are excluded. Every reason shown maps to a real matched field.

---

## Two streams

Opportunities are classified by engagement model, not by source:

- **Contribute:** remote, skill-based work such as GitHub issues, bounties, and contribution campaigns. Ranked by skill and tech overlap. Location is ignored.
- **Near you:** in-person events such as hackathons, meetups, and college competitions. Ranked by location first, then interest.

---

## Matching engine

- **Relevance gate.** An opportunity qualifies only with at least one concrete signal (matched skill, interest, or location). Type-only matches are dropped.
- **Token-accurate comparison.** Matching runs on whole tokens with safe normalization. `cli` does not match `client`, and acronyms such as `CSS`, `AWS`, and `iOS` are preserved.
- **Metadata enrichment.** GitHub opportunities are enriched with each repository's real languages and topics, so a reason like `Matched on TypeScript · Python` reflects the actual stack. Nothing is inferred from titles or descriptions.
- **Deterministic reveal.** Results load five at a time with true counts. If three qualify, three are shown. If none qualify, the feed returns an explicit empty state.

---

## Design

- Three themes: Light, Dark, and Funky. Light and Dark are minimal; Funky adds color and motion.
- Spring-based interactions, including a "considering" transition that renders the ranking pass before results resolve.
- All motion respects `prefers-reduced-motion`.

---

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion |
| Data and sync | AWS DynamoDB, Lambda, SAM (automated opportunity sync) |
| Sources | GitHub (issues, contribution campaigns), [Brabble.ai](https://brabble.ai) (events) |

---

## Getting started

Prerequisites: Node.js 18+ and npm.

```bash
git clone https://github.com/MaybeSomeone-arc18/fuko.git
cd fuko
npm install
cp .env.local.example .env.local   # set the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For local development without AWS, set `USE_MOCK_DB=true` to use an in-memory store.

### Environment variables

| Variable | Description | Default |
|---|---|---|
| `GITHUB_TOKEN` | Raises the GitHub API rate limit for enriching opportunities with repo languages and topics. A classic token with no scopes (or `public_repo`) is enough. | none |
| `DYNAMODB_REGION` | AWS region for the opportunities table. | `ap-south-1` |
| `DYNAMODB_TABLE_NAME` | DynamoDB table name. | `FukoOpportunities` |
| `USE_MOCK_DB` | Set to `true` to bypass AWS and use an in-memory store. | `false` |

---

## Data and enrichment

Opportunities sync from their sources into DynamoDB. A backfill script enriches GitHub records with real technology signals (languages and topics), which makes skill matching structural rather than keyword-based:

```bash
npx tsx --env-file=.env.local scripts/enrich-github.ts
```

Enrichment is resumable and non-destructive: it writes only on a successful fetch and skips records that already have data.

---

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Landing
│   ├── profile/              # Onboarding (intent vs. identity)
│   ├── opportunities/        # The feed (Contribute / Near you)
│   │   └── [id]/             # Opportunity detail
│   ├── about/                # Product overview
│   └── components/           # Shared UI
├── lib/
│   ├── matching.ts           # Relevance gate and ranking
│   ├── motion.ts             # Spring presets and motion variants
│   ├── theme.tsx             # Light / Dark / Funky
│   ├── db/                   # DynamoDB access
│   └── sources/              # GitHub and Brabble adapters
└── scripts/                  # Enrichment and sync tooling
```

---

## Roadmap

**In progress**
- [ ] **Editable profiles:** change saved skills, interests, and location anytime; the feed re-resolves live.
- [ ] **Deeper taxonomy:** more skills, topics, and opportunity types for precise profiles.
- [ ] **Dynamic Funky theme:** richer motion and reactive elements.
- [ ] **Ongoing UI refinement** across all surfaces.

**Planned**
- [ ] **Google sign-in** with a full guest mode.
- [ ] **Encrypted, portable profiles.**
- [ ] **Saved opportunities and deadline reminders.**
- [ ] **More sources:** GitLab, Devpost, Unstop.
- [ ] **Richer event data:** themes and tracks so "Near you" ranks on interest, not location alone.

**Exploring**
- [ ] Ranking that adapts to saves and skips.
- [ ] A weekly digest of newly matching opportunities.

---

## License

MIT. See [`LICENSE`](LICENSE).
