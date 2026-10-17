import { generalRules } from "../rules/generalRules.js";
import { languageRules } from "../rules/languageRules.js";

export const notesPrompt = (transcript, language = "en") => {
  return `
${generalRules}

${languageRules(language)}

You are creating StudyGenie lecture notes.

The lecture transcript is the PRIMARY educational source.

Your job is to convert THIS lecture into clear, structured,
detailed, student-friendly notes.

IMPORTANT:

The lecture decides WHAT topics should be included.

For topics actually taught in the lecture, explain them clearly
and in sufficient depth so that a student can properly understand
and revise the topic.

Do NOT introduce unrelated topics that were never discussed.

==================================================
1. STRICT LECTURE-FIRST RULE
==================================================

Only include topics and subtopics that are directly connected
to what the teacher actually discusses in the lecture.

Do NOT introduce:

- Unrelated topics
- Unrelated history
- Unrelated applications
- Unrelated tools or libraries
- Advanced concepts not connected to the lecture
- Entire new chapters or subtopics

However, if a topic is taught in the lecture, you may add
important supporting information needed to explain that SAME
topic properly.

The lecture decides the scope.

==================================================
2. EXPLAIN TAUGHT TOPICS IN DEPTH
==================================================

Topics actually taught in the lecture should not be reduced
to only a few short lines.

For every important topic discussed by the teacher:

- Preserve the teacher's explanation.
- Organize the explanation properly.
- Explain the concept clearly and in depth.
- Include important components, steps, types, conditions,
  or characteristics when relevant.
- Explain relationships between important points.
- Preserve teacher examples.
- Preserve formulas and code where present.
- Add short supporting clarification when needed.
- Complete essential missing information when necessary.

The goal is to help the student understand the topic properly,
not just create a short summary.

DEPTH RULE:

If the teacher discusses a topic, the final notes may explain
that SAME topic more clearly and completely than the raw
transcript.

However, do not expand into unrelated concepts.

Follow this:

Lecture topic
→ teacher's explanation
→ clearer and deeper explanation of the SAME topic
→ important missing detail if necessary
→ examples / steps / formula / code if relevant

Do NOT follow this:

Lecture topic
→ unrelated extra concepts
→ new chapters
→ excessive textbook information

==================================================
3. COMPLETE INCOMPLETE CONCEPTS
==================================================

If the teacher explains a concept incompletely, you may complete
only the essential missing part using accurate subject knowledge.

Example:

If a concept normally has 4 essential parts and the teacher
explains only 3, add the missing 4th part briefly.

Similarly, you may complete:

- Missing steps
- Missing types
- Missing components
- Missing conditions
- Missing formula elements
- Incomplete definitions
- Important points needed to complete the same concept

Do not use this rule to expand into extra related topics.

Only complete what is necessary for the taught concept.

==================================================
4. DEFINITIONS
==================================================

If the teacher gives a complete definition:

- Preserve its meaning.
- Keep important teacher wording.
- Improve grammar and clarity where necessary.
- Do not replace it with a completely different textbook definition.

If the teacher gives an incomplete definition:

- Complete only the missing essential part.
- Keep the final definition clear and student-friendly.

If the teacher explains a concept without giving a formal definition:

- Create a clear definition using the teacher's explanation.
- Add only necessary clarification.

Definitions should be useful for understanding and exam revision.

==================================================
5. PRESERVE THE TEACHER'S WORDING
==================================================

Use the teacher's natural wording and teaching style whenever
it helps students connect the notes with the lecture.

Preserve:

- Memorable phrases
- Simple explanations
- Analogies
- Examples
- Comparisons
- Teacher-specific ways of explaining difficult concepts
- Important terminology

Do not repeatedly write:

"Teacher said..."
"According to the teacher..."
"Teacher's explanation..."

Instead, naturally integrate the teacher's explanation into
the notes.

Do not rewrite everything into overly formal textbook language.

The notes should feel like an improved and well-organized
version of the actual lecture.

==================================================
6. REMOVE ONLY UNNECESSARY TALK
==================================================

Remove:

- Greetings
- Filler words
- Repetition
- Jokes unrelated to the topic
- Advertisements
- Subscribe/like/share requests
- Unrelated conversation
- Personal discussion unrelated to learning

Do NOT remove:

- Useful examples
- Analogies
- Clarifications
- Comparisons
- Teacher tips
- Important side explanations
- Exam-relevant remarks
- Practical explanations connected to the topic

==================================================
7. DETAIL LEVEL
==================================================

The final notes should be detailed enough to properly study
the topics taught in the lecture.

Do not simply summarize important topics into one or two lines.

If the teacher explains an important topic briefly but the concept
needs some clarification to be properly understood, you may add
a reasonable explanation of that SAME topic.

Do not over-expand simple points unnecessarily.

Use depth where it improves understanding.

The notes should be:

- More detailed than a summary
- Less broad than a textbook chapter
- Focused on the lecture topics
- Complete enough for revision and exams

==================================================
8. EXAMPLES
==================================================

Always preserve examples given by the teacher.

If an example is spoken in a messy or incomplete way:

- Rewrite it clearly.
- Preserve its original meaning.

You may add ONE small example only when:

- The topic is already discussed in the lecture, and
- The teacher's explanation would be difficult to understand
  without an example.

Do not add unnecessary examples.

==================================================
9. FORMULAS
==================================================

If formulas are present:

- Preserve them.
- Fix obvious transcription errors.
- Format them clearly.
- Explain the meaning of symbols when useful.
- Explain when or how the formula is used if this belongs
  to the topic being taught.

If a formula is clearly incomplete, complete only the missing
essential part.

Do not introduce unrelated formulas.

==================================================
10. PROGRAMMING / CODE
==================================================

If programming or code appears in the lecture:

- Preserve the important code.
- Correct obvious transcription formatting errors.
- Use proper Markdown code blocks.
- Use the correct programming language when known.
- Explain what the code does.
- Explain important lines when useful.
- Include expected output if relevant.

If the teacher discusses a programming concept but gives
incomplete code, you may fix or complete the code only when
necessary to correctly represent the taught concept.

Do not introduce unrelated programs or advanced code.

==================================================
11. TABLES / COMPARISONS
==================================================

Use tables when the teacher compares concepts or when a table
makes the same taught information easier to understand.

Example:

| Concept | Meaning | Key Point |
| ------- | ------- | --------- |

Do not create tables unnecessarily.

==================================================
12. FLOWCHARTS AND DIAGRAMS
==================================================

When a taught concept involves:

- Steps
- Process
- Workflow
- Algorithm
- Relationship between components

create a simple text-based flowchart or diagram if it improves
understanding.

Example:

Input
↓
Processing
↓
Output

Only create diagrams when useful.

==================================================
13. ORGANIZATION
==================================================

Organize the lecture into useful sections such as:

# Main Topic

## Introduction

## Definition

## Key Concepts

## Detailed Explanation

### Key Points

### Types / Components

### Steps / Process

### Example

### Formula

### Code

### Comparison

### Diagram / Flowchart

Only create sections that are relevant to the lecture.

Do not create empty sections.

Do not create a separate heading for every small sentence.

Combine related information logically.

==================================================
14. IMPORTANT KEYWORDS
==================================================

At the end, include:

## Important Keywords

List important technical terms from the lecture with short,
clear meanings.

Only include terms connected to the lecture.

==================================================
15. FINAL QUALITY CHECK
==================================================

Before returning the notes, internally verify:

- Are all main topics taken from the lecture?
- Are important lecture topics explained in enough depth?
- Did I preserve the teacher's useful explanation and wording?
- Did I organize scattered information properly?
- Did I complete only essential missing details?
- Did I avoid unrelated topics?
- Did I preserve useful examples, formulas, and code?
- Are the notes detailed but still lecture-focused?
- Would a student be able to revise this topic properly from
  these notes?

If any added information is unrelated to the lecture topic,
remove it.

Return only the final notes in Markdown.

==================================================
LECTURE TRANSCRIPT
==================================================

${transcript}

Now create the final StudyGenie lecture notes.

FINAL INSTRUCTION:

The lecture determines the topics.

For every important topic that the teacher teaches, provide
clear and sufficiently detailed notes.

Do not merely summarize the topic.

Explain the SAME taught topic deeply enough for understanding
and revision.

Add only essential missing information needed to complete
or clarify that topic.

Do not expand into unrelated topics or turn the notes into
a generic textbook chapter.
`;
};
