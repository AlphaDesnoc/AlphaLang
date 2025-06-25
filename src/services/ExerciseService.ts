// Force Vite HMR update
import { Exercise, ExerciseProgress, ExerciseResult } from '../types/exercise';
import { ApiService } from './ApiService';

export class ExerciseService {
  // Les exercices sont maintenant uniquement gérés par le backend

  static async getAllExercises(): Promise<Exercise[]> {
    // Utiliser uniquement l'API backend, pas de fallback local
    return await ApiService.getAllExercises();
  }

  static async getExerciseById(id: string): Promise<Exercise | undefined> {
    // Utiliser uniquement l'API backend, pas de fallback local
    return await ApiService.getExerciseById(id);
  }

  static async getExercisesByCategory(category: string): Promise<Exercise[]> {
    // Utiliser uniquement l'API backend, pas de fallback local
    return await ApiService.getExercisesByCategory(category);
  }

  static async getExercisesByDifficulty(difficulty: 'facile' | 'moyen' | 'difficile'): Promise<Exercise[]> {
    // Utiliser uniquement l'API backend, pas de fallback local
    return await ApiService.getExercisesByDifficulty(difficulty);
  }

  static async runExerciseTests(exercise: Exercise, userCode: string): Promise<ExerciseResult> {
    // Utiliser uniquement l'API backend pour l'exécution
    return await ApiService.runExerciseTests(exercise.id, userCode);
  }

  static async getCategories(): Promise<string[]> {
    try {
      const exercises = await this.getAllExercises();
      const categories = new Set(exercises.map(ex => ex.category));
      return Array.from(categories);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      return [];
    }
  }

  static async getProgressSummary(progress: ExerciseProgress[]): Promise<{
    totalExercises: number;
    completedExercises: number;
    totalPoints: number;
    earnedPoints: number;
    averageScore: number;
  }> {
    try {
      return await ApiService.getExerciseStats();
    } catch (error) {
      console.error('Erreur API, calcul local:', error);
      
      const exercises = await this.getAllExercises();
      const totalExercises = exercises.length;
      const completedExercises = progress.filter(p => p.completed).length;
      
      const totalPoints = exercises.reduce((sum, ex) => sum + ex.points, 0);
      
      let earnedPoints = 0;
      for (const p of progress) {
        const exercise = exercises.find(ex => ex.id === p.exerciseId);
        if (exercise && p.completed) {
          earnedPoints += Math.round((p.bestScore / 100) * exercise.points);
        }
      }

      const totalScore = progress.reduce((sum, p) => sum + p.bestScore, 0);
      const averageScore = progress.length > 0 ? totalScore / progress.length : 0;

      return {
        totalExercises,
        completedExercises,
        totalPoints,
        earnedPoints,
        averageScore: Math.round(averageScore)
      };
    }
  }

  // Méthodes utilitaires pour la progression
  static async saveProgress(exerciseId: string, userId: string, progressData: Partial<ExerciseProgress>): Promise<void> {
    try {
      await ApiService.updateProgress(exerciseId, userId, progressData);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la progression:', error);
      // Pour l'instant, on ignore l'erreur - on pourrait implémenter un stockage local temporaire
    }
  }

  static async getUserProgress(userId: string): Promise<ExerciseProgress[]> {
    try {
      return await ApiService.getUserProgress(userId);
    } catch (error) {
      console.error('Erreur lors de la récupération de la progression:', error);
      return [];
    }
  }
}
