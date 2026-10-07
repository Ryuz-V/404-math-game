import { UserQuiz, QuizQuestion } from '../types/quiz';
import { saveUserQuizToDb, deleteUserQuizFromDb } from '../app/actions/quizzes';

const QUIZ_STORAGE_KEY = 'math404_user_quizzes';

export const DEFAULT_USER_QUIZZES: UserQuiz[] = [];

export function getUserQuizzes(): UserQuiz[] {
  if (typeof window === 'undefined') return DEFAULT_USER_QUIZZES;
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(DEFAULT_USER_QUIZZES));
      return DEFAULT_USER_QUIZZES;
    }
    const parsed = JSON.parse(raw);
    let quizzes = Array.isArray(parsed) ? parsed : DEFAULT_USER_QUIZZES;
    
    // Remove the old hardcoded 'user-quiz-1' if it exists in local storage
    if (quizzes.some(q => q.id === 'user-quiz-1')) {
      quizzes = quizzes.filter(q => q.id !== 'user-quiz-1');
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(quizzes));
    }
    
    return quizzes;
  } catch (err) {
    console.error('Failed to load user quizzes from localStorage', err);
    return DEFAULT_USER_QUIZZES;
  }
}

export function saveUserQuiz(quiz: UserQuiz): UserQuiz[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getUserQuizzes();
    const existingIndex = current.findIndex(q => q.id === quiz.id);
    let updated: UserQuiz[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = {
        ...quiz,
        updatedAt: new Date().toISOString(),
        editedTimeAgo: 'Just now'
      };
    } else {
      updated = [
        {
          ...quiz,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          editedTimeAgo: 'Just now'
        },
        ...current
      ];
    }
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(updated));
    
    // Sync to DB (fire-and-forget)
    saveUserQuizToDb(quiz).catch(err => console.error("Failed to sync to DB", err));
    
    return updated;
  } catch (err) {
    console.error('Failed to save quiz to localStorage', err);
    return [];
  }
}

export function deleteUserQuiz(quizId: string): UserQuiz[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getUserQuizzes();
    const updated = current.filter(q => q.id !== quizId);
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(updated));
    
    // Sync delete to DB (fire-and-forget)
    deleteUserQuizFromDb(quizId).catch(err => console.error("Failed to delete from DB", err));
    
    return updated;
  } catch (err) {
    console.error('Failed to delete quiz from localStorage', err);
    return [];
  }
}

/**
 * Intelligent Document & Text Parser to convert raw texts/notes into structured Quiz Questions
 */
export function parseDocumentToQuestions(rawText: string): QuizQuestion[] {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  const questions: QuizQuestion[] = [];
  
  let currentQuestion: Partial<QuizQuestion> | null = null;
  let currentChoices: { id: string; text: string; isCorrect: boolean }[] = [];
  let questionCounter = 1;

  const pushCurrentQuestion = () => {
    if (currentQuestion && currentQuestion.questionText) {
      // Ensure at least 2 choices exist
      const choices = currentChoices.length >= 2 ? currentChoices : [
        { id: `c-${Date.now()}-1`, text: 'Correct / Option A', isCorrect: true },
        { id: `c-${Date.now()}-2`, text: 'Wrong / Option B', isCorrect: false },
        { id: `c-${Date.now()}-3`, text: 'Option C', isCorrect: false },
        { id: `c-${Date.now()}-4`, text: 'Option D', isCorrect: false }
      ];

      // Ensure at least one choice is marked correct
      if (!choices.some(c => c.isCorrect) && choices.length > 0) {
        choices[0].isCorrect = true;
      }

      questions.push({
        id: `q-${Date.now()}-${questionCounter++}`,
        questionText: currentQuestion.questionText,
        type: 'multiple_choice',
        required: true,
        image: '',
        choices,
        randomizeOrder: false,
        estimationTimeMins: 2,
        points: 10,
        explanation: currentQuestion.explanation || ''
      });
    }
    currentQuestion = null;
    currentChoices = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line looks like a question number: e.g. "1. ...", "Soal 1:", "Q1:", or starts with "?"
    const questionMatch = line.match(/^(\d+[\.\)]|Soal\s*\d+[:\.]?|Q\d+[:\.]?|\?)\s*(.*)/i);
    
    // Check if line looks like an option: e.g. "A. ...", "a) ...", "[x] ...", "(A) ..."
    const optionMatch = line.match(/^(\([A-Ea-e]\)|[A-Ea-e][\.\)]|\[[ xX]\]|[-*])\s*(.*)/);

    if (questionMatch && !optionMatch) {
      pushCurrentQuestion();
      currentQuestion = {
        questionText: questionMatch[2] || line
      };
    } else if (optionMatch && currentQuestion) {
      const optLetter = optionMatch[1].toLowerCase();
      const optText = optionMatch[2] || line;
      const isMarkedCorrect = optLetter.includes('x') || line.toLowerCase().includes('(kunci)') || line.toLowerCase().includes('(jawaban)') || line.toLowerCase().includes('*');
      
      currentChoices.push({
        id: `c-${Date.now()}-${currentChoices.length + 1}`,
        text: optText.replace(/\(kunci\)|\(jawaban\)|\*/gi, '').trim(),
        isCorrect: isMarkedCorrect
      });
    } else if (line.toLowerCase().startsWith('pembahasan:') || line.toLowerCase().startsWith('penjelasan:') || line.toLowerCase().startsWith('explanation:')) {
      if (currentQuestion) {
        currentQuestion.explanation = line.replace(/^(pembahasan|penjelasan|explanation):/i, '').trim();
      }
    } else {
      if (currentQuestion && currentChoices.length === 0) {
        // Append multi-line question text
        currentQuestion.questionText = `${currentQuestion.questionText} ${line}`;
      } else if (!currentQuestion && line.length > 5) {
        // Fallback create question
        pushCurrentQuestion();
        currentQuestion = { questionText: line };
      }
    }
  }

  pushCurrentQuestion();

  // If no questions were parsed, generate a default sample from the text
  if (questions.length === 0) {
    questions.push({
      id: `q-${Date.now()}-1`,
      questionText: rawText.slice(0, 150) || 'Apa konsep utama dari materi ini?',
      type: 'multiple_choice',
      required: true,
      image: '',
      choices: [
        { id: 'c1', text: 'Answer Choice A (Benar)', isCorrect: true },
        { id: 'c2', text: 'Answer Choice B', isCorrect: false },
        { id: 'c3', text: 'Answer Choice C', isCorrect: false },
        { id: 'c4', text: 'Answer Choice D', isCorrect: false }
      ],
      randomizeOrder: false,
      estimationTimeMins: 2,
      points: 10
    });
  }

  return questions;
}
