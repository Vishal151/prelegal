# Prelegal Project

## Overview

This is a SaaS product to allow users to draft legal agreements based on templates in the templates directory.
The user can carry out AI chat in order to establish what document they want and how to fill in the fields.
The available documents are covered in the catalog.json file in the project root, included here:

@catalog.json

AI chat is implemented for all 11 document types. After login, users land on `/chat` where the AI helps them select a document type, then guides them through filling in the fields.

## Development process

When instructed to build a feature:
1. Use your Atlassian tools to read the feature instructions from Jira
2. Develop the feature - do not skip any step from the feature-dev 7 step process
3. Thoroughly test the feature with unit tests and integration tests and fix any issues
4. Submit a PR using your github tools

## AI design

When writing code to make calls to LLMs, use your Cerebras skill to use LiteLLM via OpenRouter to the `openrouter/openai/gpt-oss-120b` model with Cerebras as the inference provider. You should use Structured Outputs so that you can interpret the results and populate fields in the legal document.

There is an OPENROUTER_API_KEY in the .env file in the project root.

## Technical design

The entire project should be packaged into a Docker container.  
The backend should be in backend/ and be a uv project, using FastAPI.  
The frontend should be in frontend/  
The database should use SQLLite and be created from scratch each time the Docker container is brought up, allowing for a users table with sign up and sign in.  
The frontend is statically exported (`output: 'export'` in next.config.ts) and served via FastAPI.
There should be scripts in scripts/ for:  
```bash
# Mac
scripts/start-mac.sh    # Start
scripts/stop-mac.sh     # Stop

# Linux
scripts/start-linux.sh
scripts/stop-linux.sh

# Windows
scripts/start-windows.ps1
scripts/stop-windows.ps1
```
Backend available at http://localhost:8000

## Color Scheme
- Accent Yellow: `#ecad0a`
- Blue Primary: `#209dd7`
- Purple Secondary: `#753991` (submit buttons)
- Dark Navy: `#032147` (headings)
- Gray Text: `#888888`

## Current implementation status

### PL-3: Mutual NDA creator (Done)
- Form-based NDA creator at `/nda` with live preview and PDF download via `window.print()`
- Side-by-side layout: form (left), NDA document preview (right)
- Covers all Mutual NDA cover page fields (parties, dates, terms, governing law)
- 38 unit tests (Vitest + happy-dom) and 14 E2E tests (Playwright)

### PL-4: V1 foundation (Done)
- FastAPI backend in `backend/` with SQLite database and User model
- Placeholder auth endpoints: `POST /api/auth/login`, `POST /api/auth/signup`
- Health check: `GET /api/health`
- Fake login screen at `/` (navigates to `/chat` on submit, no real auth)
- Multi-stage Dockerfile (Node frontend build + Python runtime), single container
- Start/stop scripts for Mac, Linux, Windows in `scripts/`
- Everything served on port 8000

### PL-5: AI Chat for Mutual NDA (Done, superseded by PL-6)
- Originally built NDA-specific AI chat; now generalized into PL-6's generic architecture
- Start scripts pass `.env` to Docker container via `--env-file`

### PL-6: Expand to all supported legal document types (Done)
- AI-first document selection: `/chat` page with `POST /api/chat/select` endpoint
- Document catalog sidebar showing all 11 document types with direct navigation
- Generic `DocCreator` component reused across all document types (AI Chat + Form + Preview)
- Generic `ChatPanel` component (extracted from NDA-specific `NdaChat`)
- Shared `form-helpers.tsx` for consistent form styling across all document types
- Generic `POST /api/chat/{doc_type}` endpoint with document registry dispatch
- `backend/app/documents/` package: per-document Pydantic extraction models and system prompts
- Generic `ai_service.py` with `extract_fields()` and `extraction_to_field_dict()`
- Handcrafted JSX previews and manual form tabs for each document type
- Unsupported document handling: AI suggests closest available alternative
- Per-document routes: `/nda`, `/csa`, `/sla`, `/design-partner`, `/psa`, `/dpa`, `/partnership`, `/software-license`, `/pilot`, `/baa`, `/ai-addendum`
- 15 backend tests (pytest), 65 frontend unit tests (Vitest)

### PL-7: Multi-user auth, document persistence, and UI polish (Done)
- Real JWT authentication replacing the fake login: `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- HTTPOnly session cookie (30-day TTL), bcrypt password hashing, JWT via python-jose
- Document persistence: `POST /api/documents`, `GET /api/documents`, `GET /api/documents/{doc_type}`, `DELETE /api/documents/{id}`
- SQLAlchemy `SavedDocument` model (user_id, doc_type, fields_json, chat_json, updated_at)
- Sidebar shows saved documents with per-document resume from last chat state
- UI polish: nav header with user info and logout, consistent colour scheme across all pages
