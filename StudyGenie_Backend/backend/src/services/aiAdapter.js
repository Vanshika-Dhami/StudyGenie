// Your supplied AI files are imported as-is.
// This adapter only maps their outputs to the shapes
// the existing frontend already expects.

import { generateNotes } from "../../../AI/generators/notesGenerator.js";
import { generateSummary } from "../../../AI/generators/summaryGenerator.js";
import { generateFlashcards } from "../../../AI/generators/flashcardGenerator.js";
import { generateQuiz } from "../../../AI/generators/quizGenerator.js";
import { generateMindMap } from "../../../AI/generators/mindMapGenerator.js";
import { generateQuestions } from "../../../AI/generators/questionsGenerator.js";
import { chatWithLecture } from "../../../AI/generators/chatGenerator.js";
import { generateSmartRevision } from "../../../AI/generators/smartRevisionGenerator.js";

export {
  generateNotes,
  generateSummary,
  generateQuiz,
  generateMindMap,
  generateQuestions,
  chatWithLecture,
};

export async function flashcardsForFrontend(transcript, language = "en") {
  const cards = await generateFlashcards(transcript, language);

  return cards.map((card) => ({
    front: card.front || card.question,
    back: card.back || card.answer,
  }));
}

export async function revisionAdapter(
  quizQuestions,
  attempt,
  lectureContent,
  language = "en",
) {
  const revision = await generateSmartRevision(
    quizQuestions,
    attempt,
    lectureContent,
    language,
  );

  revision.overallPerformance = {
    score: attempt.score,
    total: attempt.total,
    percentage: attempt.percentage,
  };

  const textParts = [
    "Overall Performance",
    `${attempt.score}/${attempt.total} (${attempt.percentage}%)`,
    "\nWeak Topics",
  ];

  if (Array.isArray(revision.weakTopics)) {
    revision.weakTopics.forEach((item) => {
      textParts.push(`\n${item.topic} - ${item.priority}`);

      if (item.whyWeak) {
        textParts.push(`Why weak: ${item.whyWeak}`);
      }

      if (item.revisionNote) {
        textParts.push(`Revision: ${item.revisionNote}`);
      }

      if (item.definition) {
        textParts.push(`Definition: ${item.definition}`);
      }

      if (item.keyPoint) {
        textParts.push(`Remember: ${item.keyPoint}`);
      }

      if (item.formula) {
        textParts.push(`Formula: ${item.formula}`);
      }

      if (item.example) {
        textParts.push(`Example: ${item.example}`);
      }

      if (item.mistake) {
        if (item.mistake.question) {
          textParts.push(`Question: ${item.mistake.question}`);
        }

        if (item.mistake.studentAnswer) {
          textParts.push(`Your answer: ${item.mistake.studentAnswer}`);
        }

        if (item.mistake.correctAnswer) {
          textParts.push(`Correct answer: ${item.mistake.correctAnswer}`);
        }
      }
    });
  }

  textParts.push("\nStrong Topics");

  if (Array.isArray(revision.strongTopics)) {
    revision.strongTopics.forEach((item) => {
      textParts.push(`${item.topic}${item.reason ? ": " + item.reason : ""}`);
    });
  }

  return {
    revision,
    text: textParts.join("\n"),
  };
}
