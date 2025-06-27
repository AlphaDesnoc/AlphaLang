import { Exercise, ExerciseResult, ExerciseProgress } from '../types/exercise';

const API_BASE_URL = 'http://localhost:3001/api';

export class ApiService {
  
  // Exercices
  static async getAllExercises(): Promise<Exercise[]> {
    const response = await fetch(`${API_BASE_URL}/exercises`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des exercices');
    }
    const result = await response.json();
    return result.data || [];
  }

  static async getExerciseById(id: string): Promise<Exercise> {
    const response = await fetch(`${API_BASE_URL}/exercises/${id}`);
    if (!response.ok) {
      throw new Error('Exercice non trouvé');
    }
    const result = await response.json();
    return result.data;
  }

  static async getExercisesByCategory(category: string): Promise<Exercise[]> {
    const response = await fetch(`${API_BASE_URL}/exercises?category=${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des exercices');
    }
    const result = await response.json();
    return result.data || [];
  }

  static async getExercisesByDifficulty(difficulty: string): Promise<Exercise[]> {
    const response = await fetch(`${API_BASE_URL}/exercises?difficulty=${encodeURIComponent(difficulty)}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des exercices');
    }
    const result = await response.json();
    return result.data || [];
  }

  // Exécution d'exercices
  static async runExerciseTests(exerciseId: string, code: string): Promise<ExerciseResult> {
    const response = await fetch(`${API_BASE_URL}/exercises/${exerciseId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, userId: 'default-user' }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de l\'exécution du code');
    }

    const result = await response.json();
    return result.data.result;
  }

  // Progression utilisateur
  static async getUserProgress(userId: string): Promise<ExerciseProgress[]> {
    const response = await fetch(`${API_BASE_URL}/exercises/progress/${userId}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de la progression');
    }
    const result = await response.json();
    return result.data || [];
  }

  static async updateUserProgress(progress: ExerciseProgress): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progress),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la progression');
    }
  }

  static async updateProgress(exerciseId: string, userId: string, progressData: Partial<ExerciseProgress>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/exercises/${exerciseId}/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, ...progressData }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la progression');
    }
  }

  // Statistiques
  static async getExerciseStats(): Promise<{
    totalExercises: number;
    completedExercises: number;
    totalPoints: number;
    earnedPoints: number;
    averageScore: number;
  }> {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des statistiques');
    }
    return response.json();
  }

  static async getCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories');
    }
    return response.json();
  }

  // Statistiques utilisateur individuelles
  static async getUserStats(userId: string): Promise<{
    solvedChallenges: number;
    totalPoints: number;
    level: string;
    completedExercises: string[];
    totalAttempts: number;
    averageScore: number;
  }> {
    const response = await fetch(`${API_BASE_URL}/stats/${userId}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des statistiques utilisateur');
    }
    const result = await response.json();
    return result.data;
  }

  static async updateUserStats(userId: string, exerciseId: string, result: ExerciseResult): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/stats/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        exerciseId, 
        passed: result.passed,
        score: result.score,
        points: result.passed ? await this.getExercisePoints(exerciseId) : 0
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour des statistiques utilisateur');
    }
  }

  private static async getExercisePoints(exerciseId: string): Promise<number> {
    try {
      const exercise = await this.getExerciseById(exerciseId);
      return exercise.points || 10; // valeur par défaut
    } catch {
      return 10;
    }
  }
}
