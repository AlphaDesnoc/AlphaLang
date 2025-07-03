import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User,
  updateProfile,
  deleteUser
} from 'firebase/auth';
import { auth } from './config';
import { PermissionService } from './permissions';

export type UserRole = 'user' | 'admin' | 'owner';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
}

export class AuthService {
  // Inscription avec email et mot de passe
  static async register(email: string, password: string, displayName?: string): Promise<AuthUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Mettre à jour le profil avec le nom d'affichage
      if (displayName) {
        await updateProfile(user, { displayName });
        // Recharger l'utilisateur pour récupérer les nouvelles données
        await user.reload();
      }

      // Créer le profil utilisateur avec rôle dans Firestore
      const userProfile = await PermissionService.createUserProfile(
        user.uid, 
        user.email || email, 
        displayName
      );
      
      // Récupérer l'utilisateur mis à jour
      const updatedUser = auth.currentUser;
      
      return {
        uid: updatedUser?.uid || user.uid,
        email: updatedUser?.email || user.email,
        displayName: updatedUser?.displayName || displayName || null,
        photoURL: updatedUser?.photoURL || user.photoURL,
        role: userProfile.role
      };
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Connexion avec email et mot de passe
  static async login(email: string, password: string): Promise<AuthUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Récupérer le rôle depuis Firestore
      const role = await PermissionService.getUserRole(user.uid);
      
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role
      };
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Déconnexion
  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error('Erreur lors de la déconnexion');
    }
  }

  // Supprimer le compte utilisateur
  static async deleteAccount(): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Aucun utilisateur connecté');
      }
      
      await deleteUser(user);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Obtenir l'utilisateur actuel
  static async getCurrentUser(): Promise<AuthUser | null> {
    const user = auth.currentUser;
    if (!user) return null;

    // Récupérer le rôle depuis Firestore
    const role = await PermissionService.getUserRole(user.uid);
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role
    };
  }

  // Rafraîchir le profil utilisateur
  static async refreshUserProfile(): Promise<AuthUser | null> {
    const user = auth.currentUser;
    if (!user) return null;
    
    // Recharger les données utilisateur depuis Firebase
    await user.reload();

    // Récupérer le rôle depuis Firestore
    const role = await PermissionService.getUserRole(user.uid);
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role
    };
  }

  // Observer les changements d'état d'authentification
  static onAuthStateChanged(callback: (user: AuthUser | null) => void) {
    return auth.onAuthStateChanged(async (user: User | null) => {
      if (user) {
        // Vérifier si le profil utilisateur existe dans Firestore
        let userProfile = await PermissionService.getUserProfile(user.uid);
        
        // Si le profil n'existe pas, le créer (pour les utilisateurs existants)
        if (!userProfile) {
          userProfile = await PermissionService.createUserProfile(
            user.uid,
            user.email || '',
            user.displayName || undefined
          );
        }
        
        callback({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: userProfile.role
        });
      } else {
        callback(null);
      }
    });
  }

  // Messages d'erreur personnalisés
  private static getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Cette adresse email est déjà utilisée.';
      case 'auth/weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères.';
      case 'auth/invalid-email':
        return 'Adresse email invalide.';
      case 'auth/user-not-found':
        return 'Aucun compte trouvé avec cette adresse email.';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect.';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Réessayez plus tard.';
      case 'auth/requires-recent-login':
        return 'Pour des raisons de sécurité, veuillez vous reconnecter avant de supprimer votre compte.';
      case 'auth/user-disabled':
        return 'Ce compte a été désactivé.';
      default:
        return 'Une erreur s\'est produite. Veuillez réessayer.';
    }
  }
}
