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
  createdAt?: string; // Date de création
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
