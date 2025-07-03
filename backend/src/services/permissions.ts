/**
 * Service pour gérer les permissions utilisateur côté backend
 * Intégré avec Firebase pour les vrais rôles utilisateur
 */

export interface UserPermissions {
  canCreateOfficialExercises: boolean;
  role: 'user' | 'admin' | 'owner';
}

export class PermissionService {
  // Configuration temporaire avec des UIDs réels
  // TODO: Remplacer par un appel à Firebase/Firestore
  private static mockUsers: Record<string, UserPermissions> = {
    // Exemples - remplacez par les vrais UIDs
    'admin-user-1': { canCreateOfficialExercises: true, role: 'admin' },
    'owner-user-1': { canCreateOfficialExercises: true, role: 'owner' },
    'default-user': { canCreateOfficialExercises: false, role: 'user' },
    
    // TODO: Ajoutez votre UID Firebase ici
    // 'VOTRE_UID_FIREBASE': { canCreateOfficialExercises: true, role: 'owner' },
  };

  /**
   * Ajoute temporairement un utilisateur avec des permissions
   * Méthode utilitaire pour les tests
   */
  static addTempUser(userId: string, role: 'user' | 'admin' | 'owner') {
    this.mockUsers[userId] = {
      canCreateOfficialExercises: role === 'admin' || role === 'owner',
      role: role
    };
    console.log(`Utilisateur temporaire ajouté: ${userId} avec le rôle ${role}`);
  }

  /**
   * Vérifie les permissions d'un utilisateur
   * @param userId - ID de l'utilisateur
   * @returns Les permissions de l'utilisateur
   */
  static getUserPermissions(userId: string): UserPermissions {
    console.log(`[DEBUG] Vérification des permissions pour l'utilisateur: ${userId}`);
    
    // Vérifier d'abord les utilisateurs configurés
    if (this.mockUsers[userId]) {
      console.log(`[DEBUG] Utilisateur trouvé avec le rôle: ${this.mockUsers[userId].role}`);
      return this.mockUsers[userId];
    }
    
    // TODO: Intégration Firebase
    // const firebaseRole = await this.getFirebaseUserRole(userId);
    // if (firebaseRole) {
    //   return {
    //     canCreateOfficialExercises: firebaseRole === 'admin' || firebaseRole === 'owner',
    //     role: firebaseRole
    //   };
    // }
    
    console.log(`[DEBUG] Utilisateur non trouvé, permissions par défaut (user)`);
    return { canCreateOfficialExercises: false, role: 'user' };
  }

  /**
   * Vérifie si un utilisateur peut créer des exercices officiels
   * @param userId - ID de l'utilisateur
   * @returns true si l'utilisateur peut créer des exercices officiels
   */
  static canCreateOfficialExercises(userId: string): boolean {
    const permissions = this.getUserPermissions(userId);
    return permissions.canCreateOfficialExercises;
  }

  /**
   * Détermine si un exercice doit être marqué comme officiel
   * @param userId - ID de l'utilisateur créateur
   * @returns true si l'exercice doit être officiel
   */
  static shouldMarkAsOfficial(userId: string): boolean {
    return this.canCreateOfficialExercises(userId);
  }

  /**
   * Liste tous les utilisateurs configurés (pour debug)
   */
  static listConfiguredUsers(): Record<string, UserPermissions> {
    return { ...this.mockUsers };
  }
}
