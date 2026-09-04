# Business AI module — handoff

## Current status

- The Next.js app runs locally with `npm run dev`.
- The landing page is a polished AI Orbit-inspired Business directory: hero search, function cards, dense tool table, responsive layout, save state, and a submission modal.
- Tool detail routes work, for example `/business/tools/jasper`.
- `GET` and `POST /api/submissions` work. The current submission store is in-memory and was verified with both a browser submission and an HTTP request.
- `npm run lint` passes.
- `.env` is present locally and contains `DATABASE_URL`; it is intentionally not committed. `.env.example` documents its required shape.

## Files to know

- `src/app/page.tsx` — Business landing page and client interactions.
- `src/app/business/tools/[slug]/page.tsx` — tool detail page.
- `src/app/api/submissions/route.ts` — currently validated in-memory submission API; replace with Prisma persistence next.
- `prisma/schema.prisma` — Neon/PostgreSQL data model for business functions, tools, tags, and submissions.

## Blocker: Prisma install integrity

The local `node_modules` Prisma CLI is corrupted/incompletely unpacked. `npx prisma validate` fails before reading the schema with a missing runtime module error from `fast-check` (`./_internals/TupleArbitrary`). This is an installation issue, not a schema or Neon-URL issue.

Recommended recovery sequence:

1. Ensure `package.json` uses matching Prisma versions (prefer `prisma` and `@prisma/client` `6.15.0`, or both latest stable—do not mix majors).
2. Remove `node_modules` and `package-lock.json`, then run `npm install` in a normal shell with network access. The prior installer reported that some postinstall scripts were not executed.
3. Run `npx prisma validate`, then `npx prisma generate`.
4. Apply the schema with `npx prisma db push` (fastest for this time-boxed demo) or `npx prisma migrate dev --name init`.
5. Add a `src/lib/prisma.ts` singleton and change `src/app/api/submissions/route.ts` to use `prisma.toolSubmission.create()` / `findMany()`.
6. Optionally create a seed script for the existing eight visible tools and six business functions.

## Notes

- Do not expose or commit `.env`.
- The UI does not currently fetch the tool directory from the API; move the static tool data to Prisma/API only after the connection is working, to avoid risking the present, working demo.
- `npm audit` currently reports vulnerabilities from dependencies; do not use `npm audit fix --force` during the demo window.
