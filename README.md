# AI Orbit — Business AI directory

AI Orbit is a Next.js 16 App Router directory for discovering business AI tools. The landing page keeps the curated visual experience, while tools, functions, and submissions are backed by Prisma when a database is available.

## Local setup

Requirements: Node.js 20+ and a PostgreSQL database.

```bash
npm install
Copy-Item .env.example .env       # PowerShell; then set DATABASE_URL
npm run db:validate
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Never commit `.env` or expose `DATABASE_URL`. The application validates the variable before opening Prisma.

## Routes

- `/` — AI Orbit directory and submission form
- `/business/tools` — database-backed tool listing
- `/business/tools/[slug]` — database-backed tool detail
- `/business/functions` — database-backed business functions
- `/business/functions/[slug]` — function detail with tools, resources, and examples
- `/business/submit` — dedicated tool submission form
- `/business/saved` — browser-local saved tool shortlist
- `GET /api/tools`, `GET /api/tools/[slug]`
- `GET /api/business-tools`, `GET /api/business-tools/[slug]`
- `GET /api/business-tools/[slug]/related`
- `GET /api/business-functions`
- `GET|POST /api/submissions`

The compatibility directory accepts `q`, `function`, `tag`, `pricing` (`FREE`, `FREEMIUM`, or `PAID`), `api`, `openSource`, `page`, `pageSize` (1–100), and `sort` (`name`, `newest`, `featured`, or `adoption`). It returns `data` plus `pagination`. The legacy `/api/tools` route remains available and accepts `search` and `limit`. Submission payloads are validated with Zod.

Saved tools are intentionally browser-local because this demo does not have an authentication provider. A public admin moderation route and server-backed `User`/`Bookmark` models are deferred until auth and authorization are available; submissions remain persisted with review fields for that integration.

## Production deployment

Set `DATABASE_URL` in the hosting provider's encrypted environment settings, then run:

```bash
npm ci
npm run db:generate
npm run db:push       # or use your reviewed Prisma migration workflow
npm run build
npm start
```

For Vercel, configure the PostgreSQL/Neon connection string as a production environment variable and deploy from the repository. Review database backups, connection pooling, and migration approvals before promoting schema changes.
