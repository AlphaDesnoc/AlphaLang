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
  official: boolean; // Indique si l'exercice est officiel (créé par admin/owner)
  createdBy: string; // UID de l'utilisateur qui a créé l'exercice
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseProgress {
  id: string;
  exerciseId: string;
  userId: string;
  completed: boolean;
  attempts: number;
  lastAttempt: string;
  bestScore: number;
  timeSpent: number; // en secondes
  hintsUsed: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseResult {
  passed: boolean;
  score: number;
  passedTests: number;
  totalTests: number;
  errors: string[];
  output: string;
  executionTime: number; // en ms
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseSubmission {
  id: string;
  exerciseId: string;
  userId: string;
  code: string;
  result: ExerciseResult;
  submittedAt: string;
}

export interface CreateExerciseRequest {
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
  estimatedTime: number;
  points: number;
  createdBy: string;
}

export interface UpdateExerciseRequest extends Partial<CreateExerciseRequest> {}

export interface SubmitExerciseRequest {
  exerciseId: string;
  code: string;
  userId?: string;
}

export interface ExerciseStats {
  totalExercises: number;
  exercisesByDifficulty: Record<string, number>;
  exercisesByCategory: Record<string, number>;
  totalUsers: number;
  totalSubmissions: number;
  averageScore: number;
}
