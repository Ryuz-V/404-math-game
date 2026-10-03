export interface QuizChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  image?: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  type: 'multiple_choice' | 'multiple_answer' | 'true_false';
  required: boolean;
  image?: string;
  choices: QuizChoice[];
  randomizeOrder?: boolean;
  estimationTimeMins: number;
  points: number;
  explanation?: string;
}

export interface UserQuiz {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  bannerColor: string;
  accuracy: number;
  completion: number;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
  editedTimeAgo: string;
  authorName: string;
  passingScore?: number;
  resultPassedMessage?: string;
  resultFailedMessage?: string;
  questions: QuizQuestion[];
}
