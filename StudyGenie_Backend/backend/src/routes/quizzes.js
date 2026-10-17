import { Router } from 'express';
import { supabaseAdmin } from '../supabase.js';

export const quizzesRouter = Router();


quizzesRouter.post('/quizzes/:id/submit', async (req, res, next) => {
  try {
    const { data: quiz, error } = await supabaseAdmin.from('quizzes').select('*').eq('id', req.params.id).eq('user_id', req.user.id).single();
    if (error || !quiz) return res.status(404).json({ error: 'Quiz not found.' });
    const answers = Array.isArray(req.body?.answers) ? req.body.answers : [];
    const evaluated = quiz.questions.map((q, i) => {
      const selectedIndex = Number.isInteger(answers[i]) ? answers[i] : -1;
      const selectedAnswer = selectedIndex >= 0 ? q.options?.[selectedIndex] : null;
      return { question: q.question, topic: q.topic || 'Lecture Concepts', selectedIndex, selectedAnswer, correctAnswer: q.correctAnswer, isCorrect: selectedAnswer === q.correctAnswer, explanation: q.explanation };
    });
    const score = evaluated.filter((x) => x.isCorrect).length;
    const total = evaluated.length;
    const percentage = total ? Math.round((score / total) * 100) : 0;
    const { data: attempt, error: attemptError } = await supabaseAdmin.from('quiz_attempts').insert({ quiz_id: quiz.id, source_id: quiz.source_id, user_id: req.user.id, score, total, percentage, answers: evaluated }).select('*').single();
    if (attemptError) throw attemptError;

    const byTopic = new Map();
    for (const row of evaluated) {
      const key = row.topic || 'Lecture Concepts';
      const cur = byTopic.get(key) || { correct: 0, total: 0 };
      cur.total += 1; if (row.isCorrect) cur.correct += 1; byTopic.set(key, cur);
    }
    const topics = [...byTopic.entries()].map(([topic, x]) => ({ topic, accuracy: Math.round((x.correct / x.total) * 100) }));
    const weakTopics = topics.filter((x) => x.accuracy < 60);
    res.json({ attempt, weakTopics });
  } catch (e) { next(e); }
});
