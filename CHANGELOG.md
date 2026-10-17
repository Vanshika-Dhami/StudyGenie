# Presentation fixes — 2026-09-22

- Added Resume Studying with the latest visited ready lecture, saved tool count, and persisted quiz completion/score.
- Dashboard selection, feature Workspace/brand links, reload and browser Back preserve sourceId. Added loading skeletons and page-navigation feedback.
- Ready-only lecture picker hides old failed/processing rows. Repeated canonical YouTube URLs reuse the user's ready/active source across languages and concurrent requests. New SQL 003 uses a transaction lock across backend instances; no old study_sources rows are deleted.
- Mapped AI 429, 503, network failures, fallback exhaustion and unexpected generation failures to retryable, user-friendly messages. Saved lecture content stays intact.
- Expanded Important Questions answers to roughly 3–6 useful lines when supported by the lecture. Existing saved answers are preserved.
- Verified independent saved states and zero new AI calls when reopening Notes, Summary, Mind Map, Flashcards, Quiz and Important Questions.
- Kept quiz-based Smart Revision gating, the separate feature pages, Mind Map rendering, fonts and dark/gold design.
- Fixed the misleading loading message on an ungenerated feature; retained Mind Map resize handling after browser Back.
- Normal development start no longer watches/restarts unexpectedly; optional dev:watch remains available.
- Preserved Supabase auth, YouTube/Faster-Whisper, cleaner, Notes pipeline and Gemini model configuration. Gemini changes only annotate failures for API mapping.

## Previous release


- Kept the uploaded project's working authentication, transcription, cleaner, Notes generation, Gemini main/fallback models, and retry behavior.
- Added a Supabase migration for unique saved feature records, archived older duplicates, quiz references, chat history, and generation locks.
- Added cache-first backend routes and per-lecture feature status. Removed Regenerate and rejected forced regeneration at the API.
- Added a saved lecture picker and independent Generate/Open state on Dashboard cards.
- Added separate pages for Notes, Summary, Mind Map, Flashcards, Quiz, Important Questions, Chat, and Smart Revision.
- Rendered Notes and other prose as sanitized Markdown with MathJax formulas; bundled rendering libraries and fonts.
- Built responsive visual Mind Maps from saved JSON with a central topic, branch nodes, child concepts, and connectors.
- Added chat history and bounded keyword retrieval from the stored cleaned transcript; fixed an undefined variable in the existing chat prompt.
- Preserved quiz answer secrecy in public feature responses. Smart Revision requires a completed Quiz.
- Added a local frontend server script, refreshed setup instructions, and automated regression/browser checks.

- Exposed English, Hindi, and Hinglish Notes selection; bundled Unicode fonts and preserved decimal numbers and symbols through transcript cleaning and chunking.
- Smart Revision now updates only when a new quiz attempt is followed by a request for a new plan.

## PDF export repair (2026-09-22)

Shared browser-print PDF export for Notes, Summary and the rendered Mind Map only. Per the updated request, no download button on Flashcards, Smart Revision, Quiz/results or Important Questions. Removed the unused flashcard print deck. Preserved the Notes visibility fix, shared print styling and zero-API export behavior. See PDF_EXPORT_CHECKLIST.md.
