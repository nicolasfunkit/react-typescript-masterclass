# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a React training monorepo containing 12 independent projects demonstrating various React patterns, state management approaches, and full-stack development techniques.

## Common Commands

Most projects use Vite and follow this pattern:

```bash
cd [project-name]
npm install
npm run dev      # Start development server
npm run build    # TypeScript compile + Vite build
npm run lint     # ESLint (strict: --max-warnings 0)
npm run preview  # Preview production build
```

### Project-Specific Commands

**pizza-delivery-app** (most comprehensive testing setup):
```bash
npm run test        # Vitest unit tests
npm run test:ui     # Vitest browser UI
npm run coverage    # Test coverage report
npm run format      # Prettier formatter
```

**Full-stack projects** (redux-paint, test-shop):
```bash
npm run dev         # Runs frontend + backend concurrently
npm run start:server  # Backend only
```

**rest-api** (Deno-based):
```bash
deno task dev       # Watch mode
deno task migrate   # Database migrations
deno task rollback  # Rollback migrations
```

## Architecture

### Frontend Stack
- **React 18.x** with TypeScript 5.x
- **Vite 5.x** as build tool
- **State Management**: Redux Toolkit (redux-paint), TanStack Query (pizza-delivery-app), React Context/Hooks (others)
- **Routing**: TanStack Router (pizza-delivery-app), React Router (test-shop, graphql-react)
- **Styling**: styled-components (trello, test-shop), xp.css (redux-paint), nes.css (test-shop)

### Backend Stack
- **Express.js** (redux-paint, test-shop, trello-backend, test-node)
- **Fastify** (pizza-delivery-api)
- **Oak/Deno** (rest-api)
- **Databases**: SQLite (pizza-delivery-api), PostgreSQL (rest-api), LowDB (redux-paint)

### Testing
- **Vitest** for unit testing (pizza-delivery-app, trello, test-shop)
- **Playwright** for browser testing (pizza-delivery-app)

## Project Categories

**Full-Stack Projects**:
- `redux-paint` - React + Redux + Express + LowDB
- `test-shop` - React + styled-components + Express
- `pizza-delivery-app` + `pizza-delivery-api` - TanStack ecosystem + Fastify + SQLite
- `test-node` - Preact + Express monorepo
- `graphql-react` - Apollo Client + Babel backend

**Frontend-Only**:
- `discogs` - Music catalog with Vite
- `keyboard` - Virtual piano PWA
- `trello` - Kanban with react-dnd

**Backend-Only**:
- `rest-api` - Deno + Oak + PostgreSQL
- `trello-backend` - Express API

## Development Environment

- Node.js 20 (via devcontainer)
- Deno runtime available for rest-api project
- Docker devcontainer with go-task automation
- Default Vite port: 5173
