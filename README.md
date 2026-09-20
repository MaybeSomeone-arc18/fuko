# Fuko

Fuko is a modern web application built using [Next.js](https://nextjs.org), designed for matching and aggregating opportunities in real-time. It features a progressive matching relevance engine, profile-aware feeds, and integrates deeply with AWS DynamoDB for its data layer.

## Technologies Used

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Database:** AWS DynamoDB (using `@aws-sdk/client-dynamodb` and `@aws-sdk/lib-dynamodb`)
- **Language:** TypeScript

## Latest Changes

The recent development has focused on enhancing the opportunity matching engine and improving the feed experience:

- **Progressive Loading & Relevance Gates:** Implemented a matching relevance gate and progressive loading mechanisms for smoother user experience.
- **Feed Presentation:** Improved feed presentation and normalized matching algorithms.
- **DynamoDB Enhancements:** Enforced explicit AWS region for DynamoDB and improved data layer stability.
- **Opportunity Sources:** Froze live opportunity sources and made opportunity matching profile-aware.

## Getting Started

First, ensure you have the required environment variables set up (see `.env.local.example`).

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code issues.
- `npm run test-sync`: Runs the data synchronization Lambda script.
- `npm run test-brabble`: Tests the Brabble source fetcher.
- `npm run test-sources`: Tests all integrated sources.
- `npm run reset-opportunities`: Resets the opportunity data in DynamoDB (ap-south-1 region).
- `npm run reset-opportunities:dry`: Dry-run for resetting opportunity data.
