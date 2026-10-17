# StudyGenie

A lecture workspace with saved Notes, Summary, Mind Map, Flashcards, Quiz and Important Questions, plus lecture chat and quiz-based Smart Revision.

Start with SETUP.md. Existing users of the previous persistence build must run backend/sql/003_source_reuse.sql under StudyGenie_Backend, then start the updated backend. No existing lecture rows are removed.

See PRESENTATION_CHECKLIST.md for tomorrow's demo, CHANGELOG.md for changes, and TEST_REPORT.md for verification and live-test limits.

This release builds on STUDTY23.zip from the previous StudyGenie repair task, retaining its feature pages, rendering libraries and persistence migration.

### Save study tools as PDF

PDF buttons are available only on **Notes, Summary and Mind Map**. Click **Save as PDF**, then choose **Save as PDF** in the browser print dialog. The export uses the displayed saved content, including formulas and the visual Mind Map; paper colors are optimized for readability. Flashcards, Smart Revision, Quiz/results and Important Questions have no download button. See PDF_EXPORT_CHECKLIST.md.
