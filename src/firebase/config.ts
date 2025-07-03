import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration Firebase - À remplacer par vos vraies clés
const firebaseConfig = {
  apiKey: "AIzaSyA6LcGKfw80nTzF1lOIa1iq6ZqYhRw4Sns",
  authDomain: "alphalang-af1d8.firebaseapp.com",
  projectId: "alphalang-af1d8",
  storageBucket: "alphalang-af1d8.firebasestorage.app",
  messagingSenderId: "205112272147",
  appId: "1:205112272147:web:529ef7d5110b9152cae6e6",
  measurementId: "G-B5P7X6W8HX"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Auth
export const auth = getAuth(app);

// Initialiser Firestore
export const db = getFirestore(app);

export default app;
