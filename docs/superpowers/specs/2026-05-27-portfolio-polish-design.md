# Portfolio Polish Design — Prelegal

**Date:** 2026-05-27  
**Scope:** Documentation + CI/CD (Option B)  
**Goal:** Make the prelegal project portfolio-ready for backend engineer and AI engineer roles, demonstrating full-stack AI product development, backend quality, and agentic development methodology.

---

## Context

Prelegal is a SaaS legal document drafter: users chat with an AI to fill in fields for 11 CommonPaper agreement types, then download the completed document. It demonstrates:

- AI-powered structured output extraction (LiteLLM → OpenRouter → Cerebras)
- Full-stack TypeScript + Python architecture
- Multi-user JWT auth with document persistence
- Single-container Docker deployment

The project sits alongside `tv-invest-advisor` (RAG pipeline), `finally` (AI trading platform), and `asset-management` (Postgres-for-everything) in the portfolio. `tv-invest-advisor` sets the README quality bar.

---

## What We're Building

Three deliverables:

1. **README.md rewrite** — replace placeholder with a portfolio-quality README matching `tv-invest-advisor` style
2. **GitHub Actions CI** — four-job pipeline on push/PR to main
3. **Minor housekeeping** — CLAUDE.md status update, FastAPI docstrings, .env.example verification

---

## Design

### 1. README.md

File: `/README.md`

**Sections (in order):**

| Section | Notes |
|---|---|
| One-liner + badge row | Project description; no emojis (matches tv-invest-advisor minimalist style) |
| Overview paragraph | 3-4 sentences: what it does, who it's for, what it demonstrates |
| Architecture diagram | ASCII: Browser → FastAPI → SQLite; FastAPI → LiteLLM → OpenRouter/Cerebras |
| Tech stack table | Two columns: Layer / Technology |
| Quick start (Docker) | `cp .env.example .env`, fill key, `./scripts/start-linux.sh` — running in <5 min |
| Quick start (local dev) | Backend: `uv run uvicorn ...`, Frontend: `npm run dev` |
| Project structure | Directory tree with one-line annotations, top two levels |
| Key design decisions | 4 entries, each with a "why" sentence (see below) |
| AI development methodology | 2 paragraphs: spec-driven, CLAUDE.md context injection, agentic dev |
| API reference | Table: method, path, auth, description; request/response shapes for 2-3 key endpoints |
| Development | lint + test commands for backend and frontend |

**Key design decisions to document:**

1. **Structured outputs for field extraction** — LLM responses are typed Pydantic models, not free text; extraction errors surface as validation failures, not silent bad data
2. **Static Next.js export served by FastAPI** — eliminates Node runtime in production, single origin, no CORS; same pattern as `finally` and `tv-invest-advisor`
3. **Single-container Docker deployment** — multi-stage build (Node build stage + Python runtime); frontend compiled to `static/`, served via `StaticFiles`; one `docker run` command for reviewers
4. **Per-document Pydantic extraction models** — each of the 11 document types has its own extraction schema and system prompt in `backend/app/documents/`; adding a new document type is additive, not a modification of shared logic

**Style rules:**
- No emojis
- Match `tv-invest-advisor` prose density (concise, no padding sentences)
- ASCII diagram, not Mermaid (renders in all contexts)

---

### 2. GitHub Actions CI

File: `.github/workflows/ci.yml`

**Triggers:** `push` to `main`, `pull_request` targeting `main`

**Jobs:**

| Job | Steps |
|---|---|
| `backend-test` | checkout → install uv → `uv sync` → `uv run pytest` |
| `backend-lint` | checkout → install uv → `uv sync` → `uv run black --check .` + `uv run flake8 .` |
| `frontend-test` | checkout → `npm ci` → `npm run test -- --run` (vitest) |
| `frontend-lint` | checkout → `npm ci` → `npm run lint` |
| `docker-build` | checkout → `docker build .` (confirms image compiles; no push) |

**Python version:** 3.12 (matches Dockerfile)  
**Node version:** 22 (matches Dockerfile)  
**Secrets needed:** none (tests use mock/in-memory; no real OPENROUTER_API_KEY required in CI)

Backend tests must not require a real API key — confirm existing tests use mocks or set `OPENROUTER_API_KEY=test` in CI env.

---

### 3. Housekeeping

**CLAUDE.md:**
- Update PL-7 status entry: remove "Expected completion: March 17, 2026" placeholder date
- Mark PL-7 as Done with a brief summary of what was built

**FastAPI docstrings:**
- Add `summary=` and `description=` to `@router.post/get` decorators on the 5-6 most important endpoints (auth login/signup, chat select, chat doc, documents save/list)
- This makes `/docs` (Swagger UI) readable for a reviewer — free win, no logic changes

**.env.example:**
- Verify no real API key is present
- Ensure all required variables are listed with placeholder values and comments

---

## Out of Scope

- Expanding test coverage beyond what already exists (separate task)
- Pre-commit hooks (adds complexity, not in Option B)
- Alembic migrations
- Accessibility or mobile testing
- Any functional code changes

---

## Success Criteria

- `README.md` matches `tv-invest-advisor` quality: architecture diagram, tech stack table, key design decisions, API reference, quick start
- CI pipeline passes on the current codebase without modification
- A reviewer can clone the repo, read the README, and have the app running in under 5 minutes
- `/docs` endpoint on the running backend shows meaningful route descriptions
