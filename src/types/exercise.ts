export interface TestCase {
  input: any[];
  expectedOutput: any;
  description: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  category: string;
  instructions: string;
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  hints: string[];
  concepts: string[];
  estimatedTime: number; // en minutes
  points: number;
}

export interface ExerciseProgress {
  exerciseId: string;
  userId: string;
  completed: boolean;
  attempts: number;
  lastAttempt: Date;
  bestScore: number;
  timeSpent: number; // en secondes
  hintsUsed: number;
}

export interface ExerciseResult {
  passed: boolean;
  score: number;
  passedTests: number;
  totalTests: number;
  errors: string[];
  output: string;
}
