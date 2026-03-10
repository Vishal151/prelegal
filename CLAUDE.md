# Prelegal Project

## Overview

This is a SaaS product to allow users to draft legal agreements based on templates in the templates directory.
The user can carry out AI chat in order to establish what document they want and how to fill in the fields.
The available documents are covered in the catalog.json file in the project root, included here:

@catalog.json

The AI chat is implemented for the Mutual NDA document.

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

### PL-5: AI Chat for Mutual NDA (Done)
- AI chat panel in left sidebar with tabbed UI (AI Chat / Form tabs)
- Backend `POST /api/chat/nda` endpoint using LiteLLM via OpenRouter with Cerebras
- Structured Outputs (`NdaExtraction` Pydantic model) for single-call field extraction + reply
- Real-time NDA preview updates as AI extracts fields from conversation
- Form tab still accessible for manual edits after AI populates fields
- `ai_service.py` handles LLM calls, `routers/chat.py` handles HTTP boundary
- 8 backend tests (pytest), 11 new frontend unit tests (Vitest), 14 E2E tests unchanged
- Start scripts pass `.env` to Docker container via `--env-file`

### PL-6: Expand to all supported legal document types (Done)
- AI-first document selection: `/chat` page with `POST /api/chat/select` endpoint
- Document catalog sidebar showing all 11 document types with direct navigation
- Generic `DocCreator` component reused across all document types (AI Chat + Form + Preview)
- Generic `POST /api/chat/{doc_type}` endpoint with document registry dispatch
- `documents/` package: per-document Pydantic extraction models and system prompts for all 11 types
- Handcrafted JSX previews and manual form tabs for each document type
- Unsupported document handling: AI suggests closest available alternative
- Supported documents: Mutual NDA, CSA, SLA, Design Partner, PSA, DPA, Partnership, Software License, Pilot, BAA, AI Addendum
- 15 backend tests (pytest), 65 frontend unit tests (Vitest)
