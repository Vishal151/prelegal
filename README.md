# Prelegal

AI-powered legal document drafter for 11 CommonPaper agreement types.

## Overview

Prelegal lets users describe what they need in plain English; an AI assistant guides them through filling in every required field and generates a formatted, print-ready document. The backend uses structured LLM outputs to reliably extract field values from conversational input — every response is a typed Pydantic model, not free text.

Built as a portfolio project demonstrating AI-integrated backend engineering, multi-user SaaS architecture, and single-container deployment.

## Architecture

```
Browser (Next.js static)
    │
    │  REST API + HTTPOnly cookie auth
    ▼
FastAPI (port 8000)
    ├── Auth        JWT creation · bcrypt · session cookie
    ├── Chat        LiteLLM → OpenRouter → Cerebras (GPT-OSS-120B)
    ├── Documents   SQLite via SQLAlchemy (save / load / list)
    └── Static      Next.js export mounted at /
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| Backend | FastAPI, Python 3.12, SQLAlchemy, Pydantic v2 |
| AI | LiteLLM, OpenRouter, Cerebras inference (GPT-OSS-120B) |
| Auth | JWT (python-jose), bcrypt, HTTPOnly session cookie (30-day) |
| Database | SQLite |
| Containerisation | Docker multi-stage build, single container |

## Quick Start

### Docker (recommended)

```bash
cp .env.example .env
# Open .env and add your OPENROUTER_API_KEY
./scripts/start-linux.sh   # or start-mac.sh / start-windows.ps1
```

Open http://localhost:8000. API docs at http://localhost:8000/docs.

To stop: `./scripts/stop-linux.sh`

### Local development

**Backend:**

```bash
cd backend
cp ../.env.example ../.env   # add OPENROUTER_API_KEY
uv run uvicorn app.main:app --reload --port 8000
```

**Frontend** (separate terminal):

```bash
cd frontend
npm install
npm run dev   # http://localhost:3000
```

In local dev the frontend runs on port 3000 and proxies API calls to the backend on 8000. For full production parity use Docker.

## Project Structure

```
prelegal/
├── backend/
│   ├── app/
│   │   ├── documents/      # per-document Pydantic extraction models + system prompts
│   │   ├── routers/        # FastAPI route handlers: auth, chat, documents, health
│   │   ├── ai_service.py   # LiteLLM wrapper: extract_fields(), extraction_to_field_dict()
│   │   ├── auth_utils.py   # JWT creation, bcrypt hashing/verification
│   │   ├── models.py       # SQLAlchemy ORM: User, SavedDocument
│   │   └── main.py         # app init, lifespan, static file serving
│   ├── tests/              # pytest unit tests (auth, chat, documents, registry)
│   └── pyproject.toml
├── frontend/
│   ├── app/                # Next.js App Router: 12 routes (login + chat + 11 doc types)
│   ├── components/         # DocCreator, ChatPanel, per-document Form + Preview (46 components)
│   ├── lib/                # API clients, field definitions, form helpers
│   └── __tests__/          # Vitest unit tests (65) + Playwright E2E
├── templates/              # 12 CommonPaper legal document templates (Markdown)
├── scripts/                # start/stop for Mac, Linux, Windows
├── catalog.json            # document type metadata used by both frontend and backend
└── Dockerfile              # multi-stage: Node 22 build → Python 3.12 runtime
```

## Key Design Decisions

**Structured outputs for field extraction** — LLM responses are typed Pydantic models, not free text. Each document type defines its own extraction schema in `backend/app/documents/`. A malformed LLM response raises a Pydantic `ValidationError` rather than silently writing bad data into a legal document.

**Per-document extraction models** — adding a new document type means creating one file in `backend/app/documents/` with a Pydantic model and a system prompt. No shared logic changes. The registry in `registry.py` auto-discovers registered types.

**Static Next.js export served by FastAPI** — `output: 'export'` in `next.config.ts` produces a `static/` directory. FastAPI mounts it at `/`. Single origin, no CORS configuration, no Node.js runtime in production.

**Single-container Docker deployment** — multi-stage build: Node 22 compiles the frontend, Python 3.12 runs the backend. The compiled frontend lands in `static/` inside the image. One `docker run` command gives reviewers a fully functional instance.

## AI Development Methodology

This project was built entirely through agentic development with Claude Code. Each feature was driven by a Jira ticket, converted to a spec, broken into an implementation plan, and executed task-by-task by Claude agents in isolated git worktrees. `CLAUDE.md` provides Claude with persistent project context — architecture constraints, AI design patterns, colour scheme — so agents never need re-briefing across sessions.

A custom Cerebras skill (`skills/cerebras/SKILL.md`) encapsulates the LiteLLM + OpenRouter configuration, meaning any agent can produce correctly-wired AI calls without consulting API docs. Structured outputs were chosen for field extraction specifically because they make LLM failures explicit: a bad response raises a validation error rather than producing a silently corrupted document.

## API Reference

### `POST /api/auth/signup`

```json
{ "email": "user@example.com", "password": "secret", "name": "Alice" }
```

Creates a user account and sets an HTTPOnly session cookie.
Response: `{ "id": 1, "email": "user@example.com", "name": "Alice" }`

### `POST /api/auth/login`

```json
{ "email": "user@example.com", "password": "secret" }
```

Authenticates and sets the session cookie. Same response shape as signup.

### `POST /api/chat/select`

Identifies which document type the user wants from a freeform conversation.

```json
{
  "messages": [{ "role": "user", "content": "I need a mutual NDA" }]
}
```

Response: `{ "reply": "...", "confirmed_doc_type": "nda" | null }`

### `POST /api/chat/{doc_type}`

Extracts form fields for a specific document type from the conversation.

```json
{
  "messages": [{ "role": "user", "content": "Party A is Acme Corp" }]
}
```

Response: `{ "reply": "...", "fields": { "party1Company": "Acme Corp" } }`

Valid `doc_type` values: `nda`, `csa`, `sla`, `dpa`, `psa`, `baa`, `pilot`, `partnership`, `design-partner`, `software-license`, `ai-addendum`

### `POST /api/documents`

Save or update a document for the current user (upsert by doc_type). Requires auth cookie.

### `GET /api/documents`

List all saved documents for the current user. Requires auth cookie.

### `GET /api/health`

`{ "status": "ok" }`

## Development

```bash
# Backend — test and lint
cd backend
uv run pytest
uv run black --check .
uv run flake8 app/ tests/

# Frontend — test and lint
cd frontend
npm test
npm run lint
```
