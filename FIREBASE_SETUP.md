# Configuration Firebase pour AlphaLang

## 1. Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Ajouter un projet"
3. Donnez un nom à votre projet (ex: "alphalang-auth")
4. Suivez les étapes de configuration

## 2. Activer l'authentification

1. Dans la console Firebase, allez dans "Authentication"
2. Cliquez sur "Commencer"
3. Dans l'onglet "Sign-in method", activez "Email/Password"
4. Activez "Email/Password" (première option)

## 3. Obtenir la configuration

1. Allez dans "Paramètres du projet" (icône engrenage)
2. Descendez jusqu'à "Vos apps"
3. Cliquez sur l'icône web "</>"
4. Donnez un nom à votre app (ex: "alphalang-web")
5. Copiez la configuration qui apparaît

## 4. Mettre à jour la configuration

Remplacez le contenu du fichier `src/firebase/config.ts` avec votre vraie configuration :

```typescript
const firebaseConfig = {
  apiKey: "votre-api-key",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet-id",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "votre-app-id"
};
```

## 5. Règles de sécurité (optionnel)

Si vous utilisez Firestore plus tard, vous pouvez configurer les règles de sécurité dans l'onglet "Firestore Database" > "Règles".

## 6. Test

Une fois configuré, vous pouvez :
- Créer des comptes utilisateur
- Se connecter/déconnecter
- Voir les utilisateurs dans la console Firebase > Authentication > Users

## Fonctionnalités disponibles

✅ **Inscription** avec email, mot de passe et nom d'affichage
✅ **Connexion** avec email et mot de passe  
✅ **Déconnexion**
✅ **État d'authentification** persistant
✅ **Interface utilisateur** intégrée dans la sidebar
✅ **Gestion d'erreurs** avec messages en français
✅ **Chargement** et états de loading
✅ **Design moderne** avec Tailwind CSS
