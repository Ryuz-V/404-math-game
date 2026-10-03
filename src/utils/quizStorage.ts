import { UserQuiz, QuizQuestion } from '../types/quiz';

const QUIZ_STORAGE_KEY = 'math404_user_quizzes';

export const DEFAULT_USER_QUIZZES: UserQuiz[] = [
  {
    id: 'user-quiz-1',
    title: 'UI Design Fundamentals & Best Practice',
    summary: 'Master the core principles of UI/UX design, visual hierarchy, typography, and interactive components.',
    category: 'UI/UX',
    tags: ['UI/UX', 'Design System'],
    bannerColor: '#d8b4fe',
    accuracy: 85,
    completion: 90,
    isDraft: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    editedTimeAgo: '2h ago',
    authorName: 'You',
    passingScore: 75,
    resultPassedMessage: 'Awesome job! You mastered the UI Design Fundamentals!',
    resultFailedMessage: 'Good effort! Review the questions and try again.',
    questions: [
      {
        id: 'q1',
        questionText: 'What does UI stand for in the context of design?',
        type: 'multiple_choice',
        required: true,
        image: '',
        choices: [
          { id: 'c1', text: 'User Integration', isCorrect: false },
          { id: 'c2', text: 'User Interface', isCorrect: true },
          { id: 'c3', text: 'Universal Interaction', isCorrect: false },
          { id: 'c4', text: 'User Involvement', isCorrect: false }
        ],
        randomizeOrder: false,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'UI stands for User Interface, which refers to the visual layout of the elements that a user interacts with.'
      },
      {
        id: 'q2',
        questionText: 'Which aspect of UI design focuses on the contrast and visual hierarchy?',
        type: 'multiple_choice',
        required: true,
        image: '',
        choices: [
          { id: 'c1', text: 'Visual Design & Layout', isCorrect: true },
          { id: 'c2', text: 'Database Normalization', isCorrect: false },
          { id: 'c3', text: 'Server Latency', isCorrect: false },
          { id: 'c4', text: 'API Gateway Routing', isCorrect: false }
        ],
        randomizeOrder: false,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Visual hierarchy guides the user attention to key elements first through sizing, color, and spacing.'
      },
      {
        id: 'q3',
        questionText: 'Why is maintaining consistency critical in a design system?',
        type: 'multiple_choice',
        required: true,
        image: '',
        choices: [
          { id: 'c1', text: 'It reduces cognitive load and enhances familiarity', isCorrect: true },
          { id: 'c2', text: 'It makes the file size larger', isCorrect: false },
          { id: 'c3', text: 'It prevents developers from modifying code', isCorrect: false },
          { id: 'c4', text: 'It eliminates the need for user testing', isCorrect: false }
        ],
        randomizeOrder: false,
        estimationTimeMins: 2,
        points: 10,
        explanation: 'Consistency helps users predict how elements behave, minimizing confusion.'
      }
    ]
  }
];

export function getUserQuizzes(): UserQuiz[] {
  if (typeof window === 'undefined') return DEFAULT_USER_QUIZZES;
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(DEFAULT_USER_QUIZZES));
      return DEFAULT_USER_QUIZZES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_USER_QUIZZES;
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
        { id: `c-${Date.now()}-1`, text: 'Benar / Option A', isCorrect: true },
        { id: `c-${Date.now()}-2`, text: 'Salah / Option B', isCorrect: false },
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
        { id: 'c1', text: 'Pilihan Jawaban A (Benar)', isCorrect: true },
        { id: 'c2', text: 'Pilihan Jawaban B', isCorrect: false },
        { id: 'c3', text: 'Pilihan Jawaban C', isCorrect: false },
        { id: 'c4', text: 'Pilihan Jawaban D', isCorrect: false }
      ],
      randomizeOrder: false,
      estimationTimeMins: 2,
      points: 10
    });
  }

  return questions;
}
