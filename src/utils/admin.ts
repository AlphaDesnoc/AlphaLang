import { PermissionService } from '../firebase/permissions';

// Méthode utilitaire pour définir le premier owner
// À utiliser une seule fois lors de la configuration initiale
export async function setupOwner(userEmail: string): Promise<void> {
  console.log('🔧 Configuration du propriétaire initial...');
  
  // Remplacez cette email par votre propre email
  const ADMIN_EMAIL = 'delta@gmail.com';
  
  if (userEmail !== ADMIN_EMAIL) {
    throw new Error('Email non autorisé pour devenir propriétaire');
  }
  
  // Cette fonction devrait être appelée manuellement dans la console du navigateur
  // ou via un script d'administration une seule fois
  console.log('⚠️ Cette fonction doit être appelée manuellement');
  console.log('📧 Email autorisé:', ADMIN_EMAIL);
  console.log('');
  console.log('Pour définir un utilisateur comme owner, exécutez dans la console:');
  console.log('');
  console.log('// 1. Connectez-vous avec le compte admin');
  console.log('// 2. Récupérez l\'UID de l\'utilisateur:');
  console.log('const user = firebase.auth().currentUser;');
  console.log('console.log("UID:", user.uid);');
  console.log('');
  console.log('// 3. Utilisez cet UID pour définir l\'owner:');
  console.log('await PermissionService.setOwner("USER_UID_HERE", "votre-email@example.com");');
}

// Fonction helper pour les développeurs
export function showAdminInstructions(): void {
  console.log('📋 Instructions d\'administration AlphaLang');
  console.log('==========================================');
  console.log('');
  console.log('🔑 Pour définir un propriétaire initial:');
  console.log('1. Modifiez ADMIN_EMAIL dans src/firebase/permissions.ts');
  console.log('2. Créez un compte avec cet email');
  console.log('3. Ouvrez la console du navigateur');
  console.log('4. Exécutez: await PermissionService.setOwner(user.uid, "votre-email@example.com")');
  console.log('');
  console.log('👥 Gestion des utilisateurs:');
  console.log('- Owner: peut tout faire, y compris créer des admins');
  console.log('- Admin: peut gérer les utilisateurs normaux, pas les owners');
  console.log('- User: utilisateur normal');
  console.log('');
  console.log('🔒 Pages protégées:');
  console.log('- /documentation: utilisateurs connectés seulement');
  console.log('- /exercises: utilisateurs connectés seulement');
  console.log('- /exercise-workspace: utilisateurs connectés seulement');
  console.log('- /account: utilisateurs connectés seulement');
  console.log('- /admin: admins et owners seulement');
  console.log('');
  console.log('💡 Pour tester les permissions:');
  console.log('1. Créez plusieurs comptes');
  console.log('2. Définissez un owner');
  console.log('3. Utilisez /admin pour changer les rôles');
}

// Exporter les fonctions pour qu'elles soient disponibles globalement en dev
if (typeof window !== 'undefined') {
  (window as any).setupOwner = setupOwner;
  (window as any).showAdminInstructions = showAdminInstructions;
}
