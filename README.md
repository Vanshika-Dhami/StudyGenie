# 🧞 StudyGenie

### Your AI-Powered Lecture Study Workspace

StudyGenie transforms YouTube lectures into organized study materials, helping students learn, practice, and revise more effectively.

## ✨ Features

- 📝 **Notes** — Generate and save structured study notes.
- 📚 **Summary** — Review the key concepts from a lecture.
- 🧠 **Mind Maps** — Visualize connections between important topics.
- 🃏 **Flashcards** — Practice active recall.
- ❓ **Quiz** — Test your understanding of lecture content.
- 🎯 **Important Questions** — Prepare with exam-focused questions.
- 💬 **Lecture Chat** — Ask questions about lecture content.
- 🔄 **Smart Revision** — Use quiz-based revision to revisit topics that need more practice.
- 💾 **Saved Study Materials** — Keep generated learning resources organized in your lecture workspace.

## 🚀 How It Works

1. Add a YouTube lecture.
2. Let StudyGenie process the available lecture content.
3. Generate study materials using AI.
4. Save and revisit your notes and other resources.
5. Practice with quizzes and use Smart Revision to reinforce your learning.

## 🛠️ Technologies

StudyGenie uses a web frontend, a Node.js backend, Python-based processing, AI integration, and database services.

For the exact configuration and setup requirements, see `SETUP.md`.

## ⚙️ Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/Vanshika-Dhami/StudyGenie.git
   cd StudyGenie
   ```

2. Read `SETUP.md` and configure the required environment variables.

3. Install the dependencies and configure the database as described in the setup documentation.

4. Start the frontend and backend using the documented commands.

### Existing Users: Database Migration

If you are upgrading from the previous persistence build, run the following SQL migration before starting the updated backend:

`StudyGenie_Backend/backend/sql/003_source_reuse.sql`

Follow the migration instructions in `SETUP.md`. Existing lecture rows are retained by this migration.

## 📄 Save Study Tools as PDF

PDF export is available for:

- Notes
- Summary
- Mind Map

Click **Save as PDF** and select **Save as PDF** in the browser's print dialog.

The export uses the displayed saved content, including formulas and the visual mind map, with print-friendly formatting.

**Note:** Flashcards, Smart Revision, Quiz/results, and Important Questions do not currently have PDF download buttons.

See `PDF_EXPORT_CHECKLIST.md` for additional details.

## 📂 Project Documentation

- `SETUP.md` — Installation and configuration instructions.
- `PRESENTATION_CHECKLIST.md` — Checklist for the project demonstration.
- `CHANGELOG.md` — Project changes and updates.
- `TEST_REPORT.md` — Verification results and live-testing limitations.
- `PDF_EXPORT_CHECKLIST.md` — PDF export details and verification.

## 🔐 Security

- Keep API keys, passwords, and service-role credentials private.
- Store real credentials in local environment files or secure deployment environment variables.
- Never commit real secrets to GitHub.
- Use `.env.example` only for placeholder values.

## 🎯 Project Goal

StudyGenie aims to reduce the time students spend manually preparing study materials by bringing lecture-based notes, visual learning, quizzes, and revision tools together in one workspace.

---

**StudyGenie — Learn smarter. Practice better. Revise confidently.** 📚

