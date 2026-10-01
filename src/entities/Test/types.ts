export interface TestOption {
  text: string;
  isCorrect?: boolean;
}

export interface TestQuestion {
  id?: string;
  _id?: string;
  text: string;
  options: TestOption[];
}

export interface Test {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  questions: TestQuestion[];
  createdAt: string;
  topicId?: string;
  isGeneral?: boolean;
}

export interface TestAnswer {
  questionId: string;
  selectedOption: number;
}

export interface TestResultAnswer {
  questionId: string;
  questionText: string;
  selectedOption: number;
  selectedOptionText: string;
  isCorrect: boolean;
  correctOption: number;
  correctOptionText: string;
}

export interface TestResult {
  score: number;
  totalQuestions: number;
  completedAt: string;
  submittedAt: string;
  answers: TestResultAnswer[];
}

export interface TestState {
  tests: Test[];
  currentTest: Test | null;
  testResults: TestResult[];
  total: number;
  page: number;
  pages: number;
  loading: boolean;
  error: string | null;
  remainingMinutes: number | null;
}

export interface CreateTestPayload {
  title: string;
  description?: string;
  questions: {
    text: string;
    options: { text: string; isCorrect: boolean }[];
  }[];
}

export interface GetTestsParams {
  page?: number;
  limit?: number;
  title?: string;
  isGeneral?: boolean;
}

export interface RateLimitError {
  msg: string;
  remainingMinutes: number;
}