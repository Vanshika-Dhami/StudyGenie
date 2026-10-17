# StudyGenie setup

## 1. Install

Use Node.js 22 or newer and Python 3.11 or 3.12. Extract the ZIP into a new folder. In PowerShell, from the `StudyGenie` project folder:

```powershell
npm.cmd run install:all
cd StudyGenie_Backend\backend
py -3.11 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r python\requirements.txt
Copy-Item .env.example .env
```

Edit `StudyGenie_Backend/backend/.env`. Enter your own Supabase URL, public anon key, **server-only** service role key, and Gemini API key. The example sets Gemini 3.5 Flash for generation and 3.5 Flash-Lite for fallback and transcript cleaning. Confirm the model IDs are available to your Google account; use `npm.cmd run models:list` from the backend folder if generation reports an unavailable model. Keep the service role key out of frontend files.

The backend uses its own `.venv` when present. First Faster-Whisper use may download a model. The existing yt-dlp and Faster-Whisper pipeline was preserved.

## 2. Update Supabase

Open Supabase SQL Editor for the project configured in `.env`. Run these files **in order**:

1. `StudyGenie_Backend/backend/sql/schema.sql`
2. `StudyGenie_Backend/backend/sql/002_feature_persistence.sql`
3. `StudyGenie_Backend/backend/sql/003_source_reuse.sql`

If you already ran the first two files for the previous build, run **only `003_source_reuse.sql`**. This adds an atomic lecture-reuse function and does not delete, archive, or alter existing lecture rows. It must be installed before submitting new links with this build.

For an existing database, the second migration adds one saved record per `(source_id, feature_type)`. It keeps the newest record for each feature and moves earlier duplicates into `generated_content_archive`. It also links existing quizzes to the latest saved Quiz, creates per-lecture chat history, and adds generation locks. It does not delete your transcripts, users, attempts, or older quizzes. All three SQL files can be run again. Stop an older backend process before applying the migration and starting this version.

Enable Supabase email/password auth and configure the allowed redirect URLs for `http://127.0.0.1:5500` and/or `http://localhost:5500`. If you use Google login, enable that provider too.

## 3. Start

In one terminal, from `StudyGenie/StudyGenie_Backend/backend`:

```powershell
npm.cmd start
```

In a second terminal, from the `StudyGenie` project folder:

```powershell
npm.cmd run dev:frontend
```

Open `http://127.0.0.1:5500/login.html`. The frontend expects the backend at `http://localhost:4000`. To use another backend address, set `window.STUDYGENIE_API_BASE_URL` before `js/api.js` loads. If you change the frontend port, update `FRONTEND_ORIGIN` in the backend `.env` to include the exact browser origin. Serve the frontend over HTTP rather than opening HTML with `file://`.

## 4. Use

Sign in and paste a YouTube lecture URL. The backend downloads audio, transcribes once, saves the cleaned transcript, and generates Notes first in the selected English, Hindi, or Hinglish language. Choose a saved lecture from the Dashboard to reopen it. Each tool card shows `Generate` or `Open` according to its saved state. Open a feature repeatedly without using Gemini again. There is no Regenerate control; the backend also rejects forced regeneration. Submitting the same video again reuses the existing ready or active lecture for that user, including shortened YouTube links. Its original language and saved tools remain intact; the language selector applies to new videos. Old incomplete rows stay in the database but are hidden from the picker. Chat saves each question and answer, using relevant parts of the saved cleaned transcript. Smart Revision unlocks after a completed Quiz. A new quiz attempt makes the previous revision stale; requesting Smart Revision then creates one new plan for that attempt.

Unicode fonts for Hindi text, digits, and mathematical symbols are bundled. The right panel links to separate pages for Notes, Summary, Mind Map, Flashcards, Quiz, Important Questions, Chat, and Smart Revision. Markdown, formulas, and map graphics are rendered by libraries included in `frontend/Genie final/vendor`; their licenses are alongside them. Supabase Auth still loads from the existing Supabase browser CDN, so sign-in needs browser internet access.

The Resume Studying card restores the most recently opened ready lecture on this browser/account, falling back to the latest ready lecture. It shows saved tool progress and quiz completion from Supabase. Workspace links and dashboard selection use `sourceId` in the URL, including reload/back navigation. Saved Important Questions are preserved; the expanded answer prompt applies to newly generated questions only.

`npm.cmd start` and `npm.cmd run dev` keep the backend running without automatic restarts. Use `npm.cmd run dev:watch` only when you want restarts during development.

## Checks and limits

Run `npm.cmd run check` and `npm.cmd test` from the project folder. Python worker checks: `python StudyGenie_Backend/backend/python/transcribe_youtube.py --help` and `python -m unittest discover -s tests -p 'test_*.py'`.

Automated checks use mock data; they do not connect to your Supabase/Gemini account or download a live YouTube video. After setup, verify one short public lecture end to end. Gemini and Supabase are used only when configured with your credentials. Multiple simultaneous feature requests are serialized using a database lease; a request interrupted after Gemini responds but before saving may need a retry and could consume another call.
