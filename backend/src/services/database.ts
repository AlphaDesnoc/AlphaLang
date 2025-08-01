import { Database } from "bun:sqlite";
import { Exercise, ExerciseProgress, ExerciseSubmission, User } from "../types/index.js";

export class DatabaseService {
  private db: Database;

  constructor(dbPath: string = "./data/alphalang.db") {
    this.db = new Database(dbPath);
    this.initializeTables();
    this.seedData();
  }

  private initializeTables() {
    // Table des exercices
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS exercises (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        difficulty TEXT NOT NULL CHECK (difficulty IN ('facile', 'moyen', 'difficile')),
        category TEXT NOT NULL,
        instructions TEXT NOT NULL,
        starterCode TEXT NOT NULL,
        solution TEXT NOT NULL,
        testCases TEXT NOT NULL, -- JSON
        hints TEXT NOT NULL, -- JSON
        concepts TEXT NOT NULL, -- JSON
        estimatedTime INTEGER NOT NULL,
        points INTEGER NOT NULL,
        official BOOLEAN NOT NULL DEFAULT 0,
        createdBy TEXT NOT NULL DEFAULT 'system',
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);

    // Ajouter les colonnes manquantes si elles n'existent pas
    try {
      this.db.exec(`ALTER TABLE exercises ADD COLUMN official BOOLEAN NOT NULL DEFAULT 0`);
    } catch (e) {
      // Colonne existe déjà
    }
    
    try {
      this.db.exec(`ALTER TABLE exercises ADD COLUMN createdBy TEXT NOT NULL DEFAULT 'system'`);
    } catch (e) {
      // Colonne existe déjà
    }

    // Table des utilisateurs
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        displayName TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);

    // Table de progression des exercices
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS exercise_progress (
        id TEXT PRIMARY KEY,
        exerciseId TEXT NOT NULL,
        userId TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT 0,
        attempts INTEGER NOT NULL DEFAULT 0,
        lastAttempt TEXT,
        bestScore INTEGER NOT NULL DEFAULT 0,
        timeSpent INTEGER NOT NULL DEFAULT 0,
        hintsUsed INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (exerciseId) REFERENCES exercises (id),
        FOREIGN KEY (userId) REFERENCES users (id),
        UNIQUE(exerciseId, userId)
      )
    `);

    // Table des soumissions
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS exercise_submissions (
        id TEXT PRIMARY KEY,
        exerciseId TEXT NOT NULL,
        userId TEXT,
        code TEXT NOT NULL,
        result TEXT NOT NULL, -- JSON
        submittedAt TEXT NOT NULL,
        FOREIGN KEY (exerciseId) REFERENCES exercises (id),
        FOREIGN KEY (userId) REFERENCES users (id)
      )
    `);

    console.log("✅ Tables de base de données initialisées");
  }

  private seedData() {
    // Vérifier si des exercices existent déjà
    const existingExercises = this.db.prepare("SELECT COUNT(*) as count FROM exercises").get() as { count: number };
    
    if (existingExercises.count > 0) {
      console.log("✅ Données déjà présentes en base");
      return;
    }

    console.log("🌱 Ajout des exercices par défaut...");

    const exercises: Omit<Exercise, 'createdAt' | 'updatedAt'>[] = [
      {
        id: 'hello-world',
        title: 'Hello World',
        description: 'Votre premier programme en AlphaLang',
        difficulty: 'facile',
        category: 'Bases',
        instructions: `Écrivez un programme qui affiche "Hello, World!" à l'écran.

**Objectifs :**
- Utiliser la fonction \`afficher\` pour afficher du texte
- Comprendre la syntaxe de base d'AlphaLang

**Conseil :** La fonction \`afficher\` permet d'afficher du texte à l'écran.`,
        starterCode: `// Écrivez votre code ici\n`,
        solution: `afficher "Hello, World!"`,
        testCases: [
          {
            input: [],
            expectedOutput: "Hello, World!",
            description: "Affiche Hello, World!"
          }
        ],
        hints: [
          "Utilisez la fonction afficher pour afficher du texte",
          "N'oubliez pas les guillemets autour du texte",
          "La syntaxe est: afficher \"votre texte\""
        ],
        concepts: ['afficher', 'chaînes de caractères', 'syntaxe de base'],
        estimatedTime: 5,
        points: 10,
        official: true,
        createdBy: 'system'
      },
      {
        id: 'variables',
        title: 'Variables et calculs',
        description: 'Apprenez à utiliser les variables',
        difficulty: 'facile',
        category: 'Bases',
        instructions: `Créez deux variables \`a\` et \`b\` avec les valeurs 10 et 5, puis affichez leur somme.

**Objectifs :**
- Déclarer des variables
- Effectuer des calculs
- Afficher le résultat

**Syntaxe :** \`var nom = valeur\``,
        starterCode: `// Déclarez vos variables ici\nvar a = 10\nvar b = 5\n\n// Calculez et affichez la somme\n`,
        solution: `var a = 10\nvar b = 5\nafficher a + b`,
        testCases: [
          {
            input: [],
            expectedOutput: 15,
            description: "Affiche la somme de 10 + 5"
          }
        ],
        hints: [
          "Utilisez 'var' pour déclarer une variable",
          "L'opérateur + permet d'additionner deux nombres",
          "Vous pouvez passer une expression à afficher"
        ],
        concepts: ['variables', 'addition', 'afficher'],
        estimatedTime: 8,
        points: 15,
        official: true,
        createdBy: 'system'
      },
      {
        id: 'functions',
        title: 'Première fonction',
        description: 'Créez votre première fonction',
        difficulty: 'moyen',
        category: 'Fonctions',
        instructions: `Créez une fonction appelée \`double\` qui prend un nombre en paramètre et retourne le double de ce nombre.

**Objectifs :**
- Comprendre la syntaxe des fonctions
- Utiliser les paramètres
- Retourner une valeur

**Syntaxe :** \`fonction nom(paramètres) ... fin\``,
        starterCode: `// Créez votre fonction ici\nfonction double(n)\n    // Retournez le double de n\nfin\n\n// Testez votre fonction\nafficher double(5)`,
        solution: `fonction double(n)\n    retourner n * 2\nfin\n\nafficher double(5)`,
        testCases: [
          {
            input: [],
            expectedOutput: 10,
            description: "double(5) retourne 10"
          }
        ],
        hints: [
          "Utilisez 'fonction' pour déclarer une fonction",
          "Le paramètre 'n' représente le nombre d'entrée",
          "Utilisez 'retourner' pour renvoyer une valeur",
          "L'opérateur * permet de multiplier",
          "N'oubliez pas 'fin' pour fermer la fonction"
        ],
        concepts: ['fonctions', 'paramètres', 'retourner', 'multiplication'],
        estimatedTime: 12,
        points: 25,
        official: true,
        createdBy: 'system'
      },
      {
        id: 'fibonacci',
        title: 'Suite de Fibonacci',
        description: 'Calculez la suite de Fibonacci',
        difficulty: 'difficile',
        category: 'Algorithmes',
        instructions: `Créez une fonction \`fibonacci\` qui calcule le n-ième terme de la suite de Fibonacci.

**Rappel :** La suite de Fibonacci commence par 0, 1 et chaque terme suivant est la somme des deux précédents.
- fibonacci(0) = 0
- fibonacci(1) = 1  
- fibonacci(2) = 1
- fibonacci(3) = 2
- fibonacci(4) = 3
- etc.

**Objectifs :**
- Implémenter un algorithme récursif
- Gérer les cas de base
- Comprendre la récursion`,
        starterCode: `fonction fibonacci(n)\n    // Implémentez l'algorithme ici\nfin\n\n// Test\nafficher fibonacci(5)`,
        solution: `fonction fibonacci(n)\n    si n <= 1 alors\n        retourner n\n    fin\n    retourner fibonacci(n - 1) + fibonacci(n - 2)\nfin\n\nafficher fibonacci(5)`,
        testCases: [
          {
            input: [],
            expectedOutput: 5,
            description: "fibonacci(5) = 5"
          }
        ],
        hints: [
          "Utilisez la récursion : une fonction qui s'appelle elle-même",
          "Les cas de base sont fibonacci(0) = 0 et fibonacci(1) = 1",
          "Pour n > 1, retournez la somme des deux termes précédents",
          "Utilisez 'si ... alors ... fin' pour les conditions"
        ],
        concepts: ['récursion', 'algorithmes', 'cas de base', 'mathématiques'],
        estimatedTime: 25,
        points: 50,
        official: true,
        createdBy: 'system'
      }
    ];

    const insertExercise = this.db.prepare(`
      INSERT INTO exercises (
        id, title, description, difficulty, category, instructions,
        starterCode, solution, testCases, hints, concepts,
        estimatedTime, points, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();

    for (const exercise of exercises) {
      insertExercise.run(
        exercise.id,
        exercise.title,
        exercise.description,
        exercise.difficulty,
        exercise.category,
        exercise.instructions,
        exercise.starterCode,
        exercise.solution,
        JSON.stringify(exercise.testCases),
        JSON.stringify(exercise.hints),
        JSON.stringify(exercise.concepts),
        exercise.estimatedTime,
        exercise.points,
        now,
        now
      );
    }

    console.log(`✅ ${exercises.length} exercices ajoutés en base`);
  }

  // Méthodes pour les exercices
  getAllExercises(): Exercise[] {
    const rows = this.db.prepare("SELECT * FROM exercises ORDER BY official DESC, createdAt ASC").all();
    return rows.map(this.mapExerciseFromDb);
  }

  getExerciseById(id: string): Exercise | null {
    const row = this.db.prepare("SELECT * FROM exercises WHERE id = ?").get(id);
    return row ? this.mapExerciseFromDb(row) : null;
  }

  getExercisesByCategory(category: string): Exercise[] {
    const rows = this.db.prepare("SELECT * FROM exercises WHERE category = ? ORDER BY createdAt").all(category);
    return rows.map(this.mapExerciseFromDb);
  }

  getExercisesByDifficulty(difficulty: string): Exercise[] {
    const rows = this.db.prepare("SELECT * FROM exercises WHERE difficulty = ? ORDER BY createdAt").all(difficulty);
    return rows.map(this.mapExerciseFromDb);
  }

  createExercise(exercise: Omit<Exercise, 'createdAt' | 'updatedAt'>): Exercise {
    const now = new Date().toISOString();
    
    const insert = this.db.prepare(`
      INSERT INTO exercises (
        id, title, description, difficulty, category, instructions,
        starterCode, solution, testCases, hints, concepts,
        estimatedTime, points, official, createdBy, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      exercise.id,
      exercise.title,
      exercise.description,
      exercise.difficulty,
      exercise.category,
      exercise.instructions,
      exercise.starterCode,
      exercise.solution,
      JSON.stringify(exercise.testCases),
      JSON.stringify(exercise.hints),
      JSON.stringify(exercise.concepts),
      exercise.estimatedTime,
      exercise.points,
      exercise.official,
      exercise.createdBy,
      now,
      now
    );

    return { ...exercise, createdAt: now, updatedAt: now };
  }

  deleteExercise(exerciseId: string): boolean {
    try {
      // Supprimer d'abord les soumissions liées
      const deleteSubmissions = this.db.prepare("DELETE FROM exercise_submissions WHERE exerciseId = ?");
      deleteSubmissions.run(exerciseId);
      
      // Supprimer les progressions liées
      const deleteProgress = this.db.prepare("DELETE FROM exercise_progress WHERE exerciseId = ?");
      deleteProgress.run(exerciseId);
      
      // Supprimer l'exercice
      const deleteExercise = this.db.prepare("DELETE FROM exercises WHERE id = ?");
      const result = deleteExercise.run(exerciseId);
      
      return result.changes > 0;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'exercice:', error);
      return false;
    }
  }

  // Méthodes pour les soumissions
  createSubmission(submission: Omit<ExerciseSubmission, 'id' | 'submittedAt'>): ExerciseSubmission {
    const id = crypto.randomUUID();
    const submittedAt = new Date().toISOString();
    
    const insert = this.db.prepare(`
      INSERT INTO exercise_submissions (id, exerciseId, userId, code, result, submittedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id,
      submission.exerciseId,
      submission.userId || null,
      submission.code,
      JSON.stringify(submission.result),
      submittedAt
    );

    return { ...submission, id, submittedAt };
  }

  getSubmissionsByExercise(exerciseId: string): ExerciseSubmission[] {
    const rows = this.db.prepare("SELECT * FROM exercise_submissions WHERE exerciseId = ? ORDER BY submittedAt DESC").all(exerciseId);
    return rows.map(this.mapSubmissionFromDb);
  }

  getSubmissionsByUser(userId: string): ExerciseSubmission[] {
    const rows = this.db.prepare("SELECT * FROM exercise_submissions WHERE userId = ? ORDER BY submittedAt DESC").all(userId);
    return rows.map(this.mapSubmissionFromDb);
  }

  // Méthodes de mapping
  private mapExerciseFromDb(row: any): Exercise {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      difficulty: row.difficulty,
      category: row.category,
      instructions: row.instructions,
      starterCode: row.starterCode,
      solution: row.solution,
      testCases: JSON.parse(row.testCases),
      hints: JSON.parse(row.hints),
      concepts: JSON.parse(row.concepts),
      estimatedTime: row.estimatedTime,
      points: row.points,
      official: Boolean(row.official),
      createdBy: row.createdBy,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }

  private mapSubmissionFromDb(row: any): ExerciseSubmission {
    return {
      id: row.id,
      exerciseId: row.exerciseId,
      userId: row.userId,
      code: row.code,
      result: JSON.parse(row.result),
      submittedAt: row.submittedAt
    };
  }

  // Méthodes utilitaires
  getStats() {
    const totalExercises = this.db.prepare("SELECT COUNT(*) as count FROM exercises").get() as { count: number };
    const totalSubmissions = this.db.prepare("SELECT COUNT(*) as count FROM exercise_submissions").get() as { count: number };
    
    const exercisesByDifficulty = this.db.prepare(`
      SELECT difficulty, COUNT(*) as count 
      FROM exercises 
      GROUP BY difficulty
    `).all() as { difficulty: string; count: number }[];

    const exercisesByCategory = this.db.prepare(`
      SELECT category, COUNT(*) as count 
      FROM exercises 
      GROUP BY category
    `).all() as { category: string; count: number }[];

    return {
      totalExercises: totalExercises.count,
      totalSubmissions: totalSubmissions.count,
      exercisesByDifficulty: Object.fromEntries(exercisesByDifficulty.map(e => [e.difficulty, e.count])),
      exercisesByCategory: Object.fromEntries(exercisesByCategory.map(e => [e.category, e.count]))
    };
  }

  // Méthodes pour la progression des utilisateurs
  getUserProgress(userId: string): ExerciseProgress[] {
    const rows = this.db.prepare("SELECT * FROM exercise_progress WHERE userId = ? ORDER BY updatedAt DESC").all(userId);
    return rows.map(this.mapProgressFromDb);
  }

  getExerciseProgress(exerciseId: string, userId: string): ExerciseProgress | null {
    const row = this.db.prepare("SELECT * FROM exercise_progress WHERE exerciseId = ? AND userId = ?").get(exerciseId, userId);
    return row ? this.mapProgressFromDb(row) : null;
  }

  updateProgress(progressData: Omit<ExerciseProgress, 'id' | 'createdAt' | 'updatedAt'>): ExerciseProgress {
    const existing = this.getExerciseProgress(progressData.exerciseId, progressData.userId);
    const now = new Date().toISOString();

    if (existing) {
      // Mettre à jour la progression existante
      const update = this.db.prepare(`
        UPDATE exercise_progress 
        SET completed = ?, attempts = ?, lastAttempt = ?, bestScore = ?, timeSpent = ?, hintsUsed = ?, updatedAt = ?
        WHERE exerciseId = ? AND userId = ?
      `);

      update.run(
        progressData.completed ? 1 : 0,
        progressData.attempts,
        progressData.lastAttempt,
        progressData.bestScore,
        progressData.timeSpent,
        progressData.hintsUsed,
        now,
        progressData.exerciseId,
        progressData.userId
      );

      return { ...existing, ...progressData, updatedAt: now };
    } else {
      // Créer une nouvelle progression
      const id = crypto.randomUUID();
      const insert = this.db.prepare(`
        INSERT INTO exercise_progress (id, exerciseId, userId, completed, attempts, lastAttempt, bestScore, timeSpent, hintsUsed, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      insert.run(
        id,
        progressData.exerciseId,
        progressData.userId,
        progressData.completed ? 1 : 0,
        progressData.attempts,
        progressData.lastAttempt,
        progressData.bestScore,
        progressData.timeSpent,
        progressData.hintsUsed,
        now,
        now
      );

      return { ...progressData, id, createdAt: now, updatedAt: now };
    }
  }

  private mapProgressFromDb(row: any): ExerciseProgress {
    return {
      id: row.id,
      exerciseId: row.exerciseId,
      userId: row.userId,
      completed: row.completed === 1,
      attempts: row.attempts,
      lastAttempt: row.lastAttempt,
      bestScore: row.bestScore,
      timeSpent: row.timeSpent,
      hintsUsed: row.hintsUsed,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }

  close() {
    this.db.close();
  }

  // Statistiques utilisateur
  getUserStats(userId: string) {
    // Récupérer les statistiques de base
    const progressQuery = this.db.prepare(`
      SELECT 
        COUNT(*) as totalAttempts,
        COUNT(CASE WHEN completed = 1 THEN 1 END) as solvedChallenges,
        AVG(CASE WHEN completed = 1 THEN bestScore END) as averageScore,
        GROUP_CONCAT(CASE WHEN completed = 1 THEN exerciseId END) as completedExerciseIds
      FROM exercise_progress 
      WHERE userId = ?
    `);
    
    const progressData = progressQuery.get(userId) as {
      totalAttempts: number;
      solvedChallenges: number;
      averageScore: number | null;
      completedExerciseIds: string | null;
    };

    // Calculer les points totaux
    const pointsQuery = this.db.prepare(`
      SELECT SUM(e.points) as totalPoints
      FROM exercise_progress ep
      JOIN exercises e ON ep.exerciseId = e.id
      WHERE ep.userId = ? AND ep.completed = 1
    `);
    
    const pointsData = pointsQuery.get(userId) as { totalPoints: number | null };

    const totalPoints = pointsData.totalPoints || 0;
    const completedExercises = progressData.completedExerciseIds 
      ? progressData.completedExerciseIds.split(',').filter(id => id)
      : [];

    // Déterminer le niveau basé sur les points
    let level = 'Débutant';
    if (totalPoints >= 1000) {
      level = 'Expert';
    } else if (totalPoints >= 500) {
      level = 'Avancé';
    } else if (totalPoints >= 100) {
      level = 'Intermédiaire';
    }

    return {
      solvedChallenges: progressData.solvedChallenges || 0,
      totalPoints,
      level,
      completedExercises,
      totalAttempts: progressData.totalAttempts || 0,
      averageScore: progressData.averageScore || 0
    };
  }

  updateUserStats(userId: string, exerciseId: string, passed: boolean, score: number, points: number) {
    const now = new Date().toISOString();
    
    // Récupérer ou créer la progression de l'exercice
    const existingProgress = this.getExerciseProgress(exerciseId, userId);
    
    if (existingProgress) {
      // Mettre à jour la progression existante
      const updateQuery = this.db.prepare(`
        UPDATE exercise_progress 
        SET 
          completed = ?,
          attempts = attempts + 1,
          lastAttempt = ?,
          bestScore = MAX(bestScore, ?),
          updatedAt = ?
        WHERE exerciseId = ? AND userId = ?
      `);
      
      updateQuery.run(
        passed ? 1 : 0,
        now,
        score,
        now,
        exerciseId,
        userId
      );
    } else {
      // Créer une nouvelle progression
      const insertQuery = this.db.prepare(`
        INSERT INTO exercise_progress (
          id, exerciseId, userId, completed, attempts, lastAttempt, bestScore, 
          timeSpent, hintsUsed, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const id = `progress_${exerciseId}_${userId}_${Date.now()}`;
      insertQuery.run(
        id,
        exerciseId,
        userId,
        passed ? 1 : 0,
        1,
        now,
        score,
        0,
        0,
        now,
        now
      );
    }
  }
}
