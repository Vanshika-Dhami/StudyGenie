# PDF export checklist

PDF download is available only on **Notes, Summary and Mind Map**. Flashcards, Smart Revision, Quiz (including results) and Important Questions have no download button.

The PDF uses the displayed saved text, formulas and visual Mind Map, with readable paper colors and pagination. It does not regenerate content or call Gemini/backend APIs. Choose **Save as PDF** in the browser print dialog; Mind Map uses landscape. This is the same content, formatted for paper rather than a pixel-for-pixel screenshot of the screen theme.

## Quick check

1. Open saved Operators in C Notes in light and dark mode. Check bold words, formulas and the final Keywords section are visible.
2. Save Notes as PDF; check the first and last pages, formulas, tables and code. The exact saved test notes produced nine non-blank pages; all 451 non-formula text fragments were preserved.
3. Save Summary and Mind Map. Check the map branches/connectors and landscape layout.
4. Open Flashcards, Smart Revision, Important Questions and Quiz. Confirm no PDF button; flip/advance cards and complete Quiz normally. No PDF button should appear on Quiz results.
5. Cancel printing, then repeat it. Check the original page and Workspace navigation still work.
6. Browser Network tools should show no /api/ requests during export.

## Verification

Edge/Chromium browser print checks cover the three export pages, repeat/cancel restoration, zero backend requests, and exact saved Operators in C Notes/Mind Map. Other feature interactions use local fixtures. Existing Notes light/dark/mobile checks and the earlier full browser regression suite passed. Backend, auth and API source remain unchanged. No live login, transcription or new AI generation was performed. The OS Save dialog and Firefox/Safari have not been automated/tested.

The original missing-word bug was white emphasized text on a white light-mode surface. The blank PDF path used an off-screen fixed-position HTML clone and html2canvas. Shared theme-aware prose and live-DOM browser printing replace those mechanisms.

Extract the clean ZIP into a fresh folder and restore your own .env locally. No new migration or dependency is required for this PDF update. The archive excludes secrets, node_modules, .venv, caches and temporary files.

Run `node tests/print-smoke.cjs` with Playwright available to repeat the browser checks. STUDYGENIE_BROWSER can select an installed Chromium/Edge executable; STUDYGENIE_TEST_OUTPUT selects the scratch output folder.
