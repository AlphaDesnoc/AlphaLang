import { PermissionService } from '../firebase/permissions';

/**
 * Service intégré pour gérer les exercices avec les permissions
 */
export class ExercisePermissionService {
  
  /**
   * Vérifie si l'utilisateur peut créer des exercices officiels
   */
  static async canCreateOfficialExercises(userId: string): Promise<boolean> {
    try {
      const profile = await PermissionService.getUserProfile(userId);
      if (!profile) return false;
      
      return profile.role === 'admin' || profile.role === 'owner';
    } catch (error) {
      console.error('Erreur lors de la vérification des permissions:', error);
      return false;
    }
  }

  /**
   * Obtient le statut d'un utilisateur pour la création d'exercices
   */
  static async getExerciseCreationStatus(userId: string): Promise<{
    canCreate: boolean;
    canCreateOfficial: boolean;
    role: string;
  }> {
    try {
      const profile = await PermissionService.getUserProfile(userId);
      if (!profile) {
        return {
          canCreate: true,
          canCreateOfficial: false,
          role: 'user'
        };
      }
      
      return {
        canCreate: true, // Tout utilisateur connecté peut créer des exercices
        canCreateOfficial: profile.role === 'admin' || profile.role === 'owner',
        role: profile.role
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du statut:', error);
      return {
        canCreate: true,
        canCreateOfficial: false,
        role: 'user'
      };
    }
  }

  /**
   * Formate un exercice avec des informations d'affichage enrichies
   */
  static formatExerciseDisplay(exercise: any) {
    return {
      ...exercise,
      isOfficial: exercise.official || false,
      displayBadges: {
        official: exercise.official,
        difficulty: exercise.difficulty,
        category: exercise.category
      }
    };
  }

  /**
   * Filtre les exercices par statut officiel
   */
  static filterExercisesByStatus(exercises: any[], showOnlyOfficial: boolean = false) {
    if (!showOnlyOfficial) {
      return exercises;
    }
    
    return exercises.filter(exercise => exercise.official === true);
  }

  /**
   * Trie les exercices avec les officiels en premier
   */
  static sortExercisesWithOfficial(exercises: any[]) {
    return exercises.sort((a, b) => {
      // Les exercices officiels en premier
      if (a.official && !b.official) return -1;
      if (!a.official && b.official) return 1;
      
      // Puis par date de création (plus récents en premier)
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    });
  }

  /**
   * Vérifie si un utilisateur peut supprimer un exercice
   */
  static async canDeleteExercise(userId: string, exercise: any): Promise<boolean> {
    try {
      // Le créateur peut toujours supprimer son exercice
      if (exercise.createdBy === userId) {
        return true;
      }
      
      // Les admins/owners peuvent supprimer n'importe quel exercice
      const profile = await PermissionService.getUserProfile(userId);
      if (profile && (profile.role === 'admin' || profile.role === 'owner')) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erreur lors de la vérification des permissions de suppression:', error);
      return false;
    }
  }

  /**
   * Obtient les permissions d'un utilisateur pour un exercice spécifique
   */
  static async getExercisePermissions(userId: string, exercise: any): Promise<{
    canEdit: boolean;
    canDelete: boolean;
    isCreator: boolean;
    isAdmin: boolean;
  }> {
    try {
      const isCreator = exercise.createdBy === userId;
      const profile = await PermissionService.getUserProfile(userId);
      const isAdmin = profile ? (profile.role === 'admin' || profile.role === 'owner') : false;
      
      console.log('🔍 Permissions pour exercice:', {
        userId,
        exerciseId: exercise.id,
        exerciseCreatedBy: exercise.createdBy,
        isCreator,
        userRole: profile?.role,
        isAdmin,
        canDelete: isCreator || isAdmin
      });
      
      return {
        canEdit: isCreator || isAdmin,
        canDelete: isCreator || isAdmin,
        isCreator,
        isAdmin
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des permissions:', error);
      return {
        canEdit: false,
        canDelete: false,
        isCreator: false,
        isAdmin: false
      };
    }
  }
}
