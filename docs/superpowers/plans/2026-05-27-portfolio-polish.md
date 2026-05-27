# Portfolio Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the prelegal project portfolio-ready: rewrite README to tv-invest-advisor quality, add GitHub Actions CI, and fix housekeeping items (lint tooling, FastAPI Swagger summaries, CLAUDE.md status, .env.example).

**Architecture:** No functional changes. Three independent work streams: (1) documentation — README.md rewrite and CLAUDE.md update; (2) tooling — black/flake8 added to backend, .flake8 config, CI workflow; (3) housekeeping — FastAPI route summaries for Swagger readability and .env.example comments.

**Tech Stack:** GitHub Actions, uv (black, flake8), FastAPI decorator params, Markdown

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `README.md` | Rewrite | Portfolio-quality project overview |
| `.github/workflows/ci.yml` | Create | CI: test + lint + docker-build |
| `backend/pyproject.toml` | Modify | Add black and flake8 to dev deps |
| `backend/.flake8` | Create | Exclude .venv, set max-line-length=120 |
| `backend/app/routers/auth.py` | Modify | Add summary= to key route decorators |
| `backend/app/routers/chat.py` | Modify | Add summary= to key route decorators |
| `backend/app/routers/documents.py` | Modify | Add summary= to key route decorators |
| `CLAUDE.md` | Modify | Add PL-7 Done section |
| `.env.example` | Modify | Add comments for each variable |

---

## Task 1: Add lint tooling to backend

**Files:**
- Modify: `backend/pyproject.toml`
- Create: `backend/.flake8`

- [ ] **Step 1: Add black and flake8 as dev dependencies**

```bash
cd backend
uv add --dev "black>=24.0.0" "flake8>=7.0.0"
```

Expected: pyproject.toml `[dependency-groups] dev` now includes black and flake8.

- [ ] **Step 2: Create .flake8 config**

Create `backend/.flake8`:

```ini
[flake8]
max-line-length = 120
extend-ignore = E203, W503
exclude =
    .venv,
    __pycache__,
    .git,
    *.egg-info
```

- [ ] **Step 3: Run black to format existing code**

```bash
cd backend
uv run black .
```

Expected: black reformats any files that need it (likely minimal changes — existing code is already clean).

- [ ] **Step 4: Verify black --check passes**

```bash
cd backend
uv run black --check .
```

Expected output ends with: `All done! ✨ 🍰 ✨` or `N files would be left unchanged.` No `would reformat` lines.

- [ ] **Step 5: Verify flake8 passes on source code**

```bash
cd backend
uv run flake8 app/ tests/
```

Expected: no output (clean). If errors appear, fix them:
- `E501` (line too long): unlikely with max-line-length=120, but shorten the line if it appears
- `F401` (unused import): remove the import
- `E302` (expected 2 blank lines): add the blank lines

- [ ] **Step 6: Commit**

```bash
git add backend/pyproject.toml backend/.flake8 backend/uv.lock
git commit -m "chore: add black and flake8 lint tooling to backend"
```

---

## Task 2: Rewrite README.md

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace README.md with the full portfolio-quality version**

Write `README.md` with this exact content:

````markdown
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
````

- [ ] **Step 2: Verify the README renders correctly**

```bash
cat README.md | wc -l
```

Expected: 150+ lines. Skim the output to confirm all sections are present: Overview, Architecture, Tech Stack, Quick Start, Project Structure, Key Design Decisions, AI Development Methodology, API Reference, Development.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for portfolio presentation"
```

---

## Task 3: Add FastAPI route summaries for Swagger readability

**Files:**
- Modify: `backend/app/routers/auth.py`
- Modify: `backend/app/routers/chat.py`
- Modify: `backend/app/routers/documents.py`

- [ ] **Step 1: Add summary= to auth routes**

In `backend/app/routers/auth.py`, update the four route decorators to add `summary=`:

```python
@router.post("/signup", response_model=UserResponse, summary="Create a new account")
def signup(body: SignupRequest, response: Response, db: Session = Depends(get_db)):
    """Create a new user account and set a session cookie."""
```

```python
@router.post("/login", response_model=UserResponse, summary="Sign in")
def login(body: LoginRequest, response: Response, db: Session = Depends(get_db)):
    """Authenticate and set a 30-day session cookie."""
```

```python
@router.post("/logout", summary="Sign out")
def logout(response: Response):
    """Clear the session cookie."""
```

```python
@router.get("/me", response_model=MeResponse, summary="Current user")
def me(user: User | None = Depends(get_optional_user)):
    """Return the authenticated user or null if not logged in."""
```

- [ ] **Step 2: Add summary= to chat routes**

In `backend/app/routers/chat.py`:

```python
@router.post("/select", response_model=SelectResponse, summary="Select document type")
def chat_select(body: ChatRequest):
    """Identify which document type the user wants from a freeform conversation."""
```

```python
@router.post("/{doc_type}", response_model=ChatResponse, summary="Extract document fields")
def chat_extract(doc_type: str, body: ChatRequest):
    """Extract form fields for a specific document type from the conversation."""
```

- [ ] **Step 3: Add summary= to document routes**

In `backend/app/routers/documents.py`:

```python
@router.get("", response_model=list[DocumentListItem], summary="List documents")
def list_documents(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List all saved documents for the current user, ordered by most recently updated."""
```

```python
@router.post("", response_model=DocumentResponse, summary="Save document")
def save_document(
    body: SaveDocumentRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Save or update a document. Upserts by (user_id, doc_type) — one saved doc per type per user."""
```

```python
@router.get("/{doc_type}", response_model=DocumentResponse, summary="Load document")
def load_document(
    doc_type: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Load the saved document for a specific doc type."""
```

```python
@router.delete("/{document_id}", summary="Delete document")
def delete_document(
    document_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete a saved document by ID."""
```

- [ ] **Step 4: Verify backend still starts cleanly**

```bash
cd backend
uv run python -c "from app.main import app; print('OK')"
```

Expected: `OK` with no import errors.

- [ ] **Step 5: Re-run black to ensure formatting is consistent**

```bash
cd backend
uv run black app/routers/auth.py app/routers/chat.py app/routers/documents.py
uv run black --check .
```

Expected: `All done!` — no files reformatted.

- [ ] **Step 6: Commit**

```bash
git add backend/app/routers/auth.py backend/app/routers/chat.py backend/app/routers/documents.py
git commit -m "docs: add Swagger summaries to FastAPI route decorators"
```

---

## Task 4: Update CLAUDE.md and .env.example

**Files:**
- Modify: `CLAUDE.md`
- Modify: `.env.example`

- [ ] **Step 1: Add PL-7 section to CLAUDE.md**

In `CLAUDE.md`, after the PL-6 section (which ends around line 91), append:

```markdown

### PL-7: Multi-user auth, document persistence, and UI polish (Done)
- Real JWT authentication replacing the fake login: `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- HTTPOnly session cookie (30-day TTL), bcrypt password hashing, JWT via python-jose
- Document persistence: `POST /api/documents`, `GET /api/documents`, `GET /api/documents/{doc_type}`, `DELETE /api/documents/{id}`
- SQLAlchemy `SavedDocument` model (user_id, doc_type, fields_json, chat_json, updated_at)
- Sidebar shows saved documents with per-document resume from last chat state
- UI polish: nav header with user info and logout, consistent colour scheme across all pages
```

- [ ] **Step 2: Update .env.example with comments**

Replace the contents of `.env.example` with:

```bash
# Required: OpenRouter API key for LLM inference via Cerebras
# Get yours at https://openrouter.ai/keys
OPENROUTER_API_KEY=

# Optional: override the JWT signing secret
# Defaults to "dev-secret-change-in-prod" — set this in production
# JWT_SECRET=change-me-in-production
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md .env.example
git commit -m "docs: add PL-7 status to CLAUDE.md and improve .env.example"
```

---

## Task 5: Add GitHub Actions CI

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create the workflows directory**

```bash
mkdir -p .github/workflows
```

- [ ] **Step 2: Create .github/workflows/ci.yml**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: backend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install uv
        run: pip install uv
      - name: Install dependencies
        run: uv sync --dev
      - name: Run tests
        run: uv run pytest
        env:
          OPENROUTER_API_KEY: test

  backend-lint:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: backend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install uv
        run: pip install uv
      - name: Install dependencies
        run: uv sync --dev
      - name: Check formatting
        run: uv run black --check .
      - name: Lint
        run: uv run flake8 app/ tests/

  frontend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm
          cache-dependency-path: frontend/package-lock.json
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  frontend-lint:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm
          cache-dependency-path: frontend/package-lock.json
      - name: Install dependencies
        run: npm ci
      - name: Lint
        run: npm run lint

  docker-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t prelegal:ci .
```

- [ ] **Step 3: Verify the YAML is syntactically valid**

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/ci.yml'))" && echo "YAML valid"
```

Expected: `YAML valid`

- [ ] **Step 4: Commit and push**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add GitHub Actions workflow (test, lint, docker-build)"
git push origin main
```

- [ ] **Step 5: Verify CI passes on GitHub**

Navigate to the Actions tab on GitHub: `https://github.com/Vishal151/prelegal/actions`

All five jobs (`backend-test`, `backend-lint`, `frontend-test`, `frontend-lint`, `docker-build`) should show green. If any job fails:

- **backend-test fails**: Check if a test imports something that needs OPENROUTER_API_KEY — the `env: OPENROUTER_API_KEY: test` in the job should cover this. If a test uses `litellm.completion` without mocking, add a `unittest.mock.patch` in that test.
- **backend-lint fails**: Run `uv run black --check .` and `uv run flake8 app/ tests/` locally to reproduce, fix, commit, and push.
- **frontend-test fails**: Run `npm test` locally to reproduce.
- **frontend-lint fails**: Run `npm run lint` locally — likely a missing ESLint rule or type error. Fix and push.
- **docker-build fails**: Run `docker build .` locally to reproduce.

---

## Verification Checklist

After all tasks complete:

- [ ] `README.md` has all sections: Overview, Architecture, Tech Stack, Quick Start (Docker + local), Project Structure, Key Design Decisions (4 entries), AI Development Methodology, API Reference, Development
- [ ] `backend/.flake8` exists and excludes `.venv`
- [ ] `uv run black --check .` passes in `backend/`
- [ ] `uv run flake8 app/ tests/` passes in `backend/`
- [ ] `npm test` passes (65 tests) in `frontend/`
- [ ] `npm run lint` passes in `frontend/`
- [ ] All 5 GitHub Actions jobs are green on the main branch
- [ ] `CLAUDE.md` has a PL-7 section
- [ ] `.env.example` has comments explaining each variable
- [ ] `/docs` on a running backend shows readable route summaries in all three routers
