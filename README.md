# DisciplineOS

> AI-Powered Discipline Operating System — turn commitments into measurable action.

DisciplineOS is a behavior-change platform, not a task manager. Its core loop is:

> **Commit → Stake something → Enter Focus → Get measured → Get coached → Keep the promise.**

## Monorepo layout

```
disciplineos/
├─ apps/
│  ├─ web/                # Next.js 15 (App Router) — the product UI
│  └─ api/                # NestJS — REST + WebSocket backend
├─ packages/
│  ├─ ui/                 # Design system (shadcn/ui primitives + variants)
│  ├─ types/              # Shared domain types, DTOs, Zod schemas
│  ├─ ai/                 # Provider-agnostic AI layer (Anthropic/OpenAI/Gemini)
│  ├─ db/                 # Prisma schema + client
│  ├─ config/             # Shared ESLint / TypeScript / Tailwind presets
│  └─ utils/              # Framework-agnostic helpers
├─ docker-compose.yml     # Postgres + Redis for local development
└─ turbo.json             # Turborepo task pipeline
```

Architecture is **feature-sliced**: the `app/` router stays thin (routing + layout),
and all business logic lives in `features/<domain>/{components,hooks,services,schemas,types}`.

## Prerequisites

- Node.js `>= 20`
- pnpm `>= 9` (`npm i -g pnpm`)
- Docker (for local Postgres + Redis)

## Getting started

```bash
pnpm install            # install all workspaces
pnpm docker:up          # start Postgres + Redis
pnpm db:migrate         # apply database migrations
pnpm db:seed            # seed development data
pnpm dev                # run web + api in parallel
```

- Web: http://localhost:3000
- API: http://localhost:4000

## Common scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run all apps in dev mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint the entire monorepo |
| `pnpm typecheck` | Type-check every workspace |
| `pnpm test` | Run unit tests |
| `pnpm db:studio` | Open Prisma Studio |

## Tech stack

**Frontend:** Next.js (App Router), React, TypeScript, TailwindCSS, shadcn/ui,
Framer Motion, TanStack Query, Zustand, React Hook Form, Zod, Recharts.

**Backend:** NestJS, PostgreSQL, Prisma, Redis, JWT auth, WebSockets.

**AI:** Provider-agnostic service layer (Anthropic, OpenAI, Gemini) behind stable interfaces.
# DisciplineOS
