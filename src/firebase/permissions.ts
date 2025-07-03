import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './config';
import { UserRole } from './auth';

export interface UserPermissions {
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PermissionService {
  private static readonly USERS_COLLECTION = 'users';

  // Créer un profil utilisateur avec rôle par défaut
  static async createUserProfile(uid: string, email: string, displayName?: string): Promise<UserPermissions> {
    const userProfile: UserPermissions = {
      uid,
      email,
      role: 'user', // Rôle par défaut
      displayName,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Vérifier s'il s'agit du premier utilisateur (qui devient owner)
    const isFirstUser = await this.isFirstUser();
    if (isFirstUser) {
      userProfile.role = 'owner';
    }

    await setDoc(doc(db, this.USERS_COLLECTION, uid), userProfile);
    return userProfile;
  }

  // Obtenir le profil utilisateur
  static async getUserProfile(uid: string): Promise<UserPermissions | null> {
    try {
      const userDoc = await getDoc(doc(db, this.USERS_COLLECTION, uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as UserPermissions;
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil utilisateur:', error);
      return null;
    }
  }

  // Obtenir le rôle d'un utilisateur
  static async getUserRole(uid: string): Promise<UserRole> {
    const profile = await this.getUserProfile(uid);
    return profile?.role || 'user';
  }

  // Mettre à jour le rôle d'un utilisateur (seuls admin et owner peuvent le faire)
  static async updateUserRole(targetUid: string, newRole: UserRole, adminUid: string): Promise<boolean> {
    try {
      const adminRole = await this.getUserRole(adminUid);
      
      // Vérifier les permissions
      if (!this.canManageUsers(adminRole)) {
        throw new Error('Permissions insuffisantes');
      }

      // Un admin ne peut pas créer d'owner ou modifier un owner
      if (adminRole === 'admin') {
        const targetCurrentRole = await this.getUserRole(targetUid);
        if (newRole === 'owner' || targetCurrentRole === 'owner') {
          throw new Error('Seul un owner peut gérer les rôles owner');
        }
      }

      // Un owner ne peut pas se rétrograder lui-même
      if (adminUid === targetUid && adminRole === 'owner' && newRole !== 'owner') {
        throw new Error('Un owner ne peut pas changer son propre rôle');
      }

      await updateDoc(doc(db, this.USERS_COLLECTION, targetUid), {
        role: newRole,
        updatedAt: new Date()
      });

      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      return false;
    }
  }

  // Vérifier si un utilisateur peut gérer d'autres utilisateurs
  static canManageUsers(role: UserRole): boolean {
    return role === 'admin' || role === 'owner';
  }

  // Vérifier si un utilisateur peut accéder aux fonctionnalités admin
  static canAccessAdmin(role: UserRole): boolean {
    return role === 'admin' || role === 'owner';
  }

  // Vérifier si un utilisateur est owner
  static isOwner(role: UserRole): boolean {
    return role === 'owner';
  }

  // Vérifier s'il s'agit du premier utilisateur
  private static async isFirstUser(): Promise<boolean> {
    try {
      // Cette implémentation simple suppose qu'aucun utilisateur n'existe encore
      // Dans une vraie application, vous pourriez avoir une collection ou un document spécial pour tracker cela
      return false; // Pour simplifier, nous ne rendons personne owner automatiquement
    } catch (error) {
      console.error('Erreur lors de la vérification du premier utilisateur:', error);
      return false;
    }
  }

  // Récupérer tous les utilisateurs (pour les admins/owners)
  static async getAllUsers(): Promise<UserPermissions[]> {
    try {
      const usersCollection = collection(db, this.USERS_COLLECTION);
      const snapshot = await getDocs(usersCollection);
      
      const users: UserPermissions[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as UserPermissions);
      });
      
      return users;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return [];
    }
  }

  // Méthode pour définir manuellement le premier owner (à utiliser une seule fois)
  static async setOwner(uid: string, adminEmail: string): Promise<boolean> {
    try {
      // Vérification plus souple - accepter n'importe quel email pour faciliter le debug
      // Dans un environnement de production, vous devriez être plus strict
      console.log(`Tentative de définition du rôle owner pour ${adminEmail}`);
      
      await updateDoc(doc(db, this.USERS_COLLECTION, uid), {
        role: 'owner',
        updatedAt: new Date()
      });

      console.log('Rôle owner défini avec succès');
      return true;
    } catch (error) {
      console.error('Erreur lors de la définition de l\'owner:', error);
      return false;
    }
  }

  // Méthode pour forcer la mise à jour du rôle (debug uniquement)
  static async forceUpdateRole(uid: string, newRole: UserRole): Promise<boolean> {
    try {
      console.log(`Mise à jour forcée du rôle pour ${uid}: ${newRole}`);
      
      await updateDoc(doc(db, this.USERS_COLLECTION, uid), {
        role: newRole,
        updatedAt: new Date()
      });

      console.log('Rôle mis à jour avec succès');
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour forcée du rôle:', error);
      return false;
    }
  }
}
