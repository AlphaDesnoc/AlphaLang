import { Hono } from 'hono';
import { DatabaseService } from '../services/database.js';
import { ExerciseExecutionService } from '../services/execution.js';
import { CreateExerciseRequest, SubmitExerciseRequest, UpdateExerciseRequest } from '../types/index.js';

const exercisesRouter = new Hono();
const db = new DatabaseService();
const executionService = new ExerciseExecutionService();

// GET /exercises - Récupérer tous les exercices
exercisesRouter.get('/', (c) => {
  try {
    const { category, difficulty } = c.req.query();
    
    let exercises;
    if (category) {
      exercises = db.getExercisesByCategory(category);
    } else if (difficulty) {
      exercises = db.getExercisesByDifficulty(difficulty);
    } else {
      exercises = db.getAllExercises();
    }
    
    return c.json({ 
      success: true, 
      data: exercises,
      total: exercises.length 
    });
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// GET /exercises/:id - Récupérer un exercice par ID
exercisesRouter.get('/:id', (c) => {
  try {
    const id = c.req.param('id');
    const exercise = db.getExerciseById(id);
    
    if (!exercise) {
      return c.json({ 
        success: false, 
        error: 'Exercice non trouvé' 
      }, 404);
    }
    
    return c.json({ 
      success: true, 
      data: exercise 
    });
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// POST /exercises - Créer un nouvel exercice
exercisesRouter.post('/', async (c) => {
  try {
    const body = await c.req.json() as CreateExerciseRequest;
    
    // Validation des données
    if (!body.title || !body.description || !body.difficulty) {
      return c.json({
        success: false,
        error: 'Champs requis manquants: title, description, difficulty'
      }, 400);
    }
    
    const exerciseData = {
      id: crypto.randomUUID(),
      ...body
    };
    
    const exercise = db.createExercise(exerciseData);
    
    return c.json({ 
      success: true, 
      data: exercise 
    }, 201);
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// POST /exercises/:id/submit - Soumettre une solution pour un exercice
exercisesRouter.post('/:id/submit', async (c) => {
  try {
    const exerciseId = c.req.param('id');
    const body = await c.req.json() as SubmitExerciseRequest;
    
    // Vérifier que l'exercice existe
    const exercise = db.getExerciseById(exerciseId);
    if (!exercise) {
      return c.json({
        success: false,
        error: 'Exercice non trouvé'
      }, 404);
    }
    
    // Valider la syntaxe du code
    const syntaxValidation = executionService.validateSyntax(body.code);
    if (!syntaxValidation.valid) {
      return c.json({
        success: false,
        error: 'Erreurs de syntaxe',
        details: syntaxValidation.errors
      }, 400);
    }
    
    // Exécuter le code et tester
    const result = await executionService.executeExercise(exercise, body.code);
    
    // Sauvegarder la soumission
    const submission = db.createSubmission({
      exerciseId,
      userId: body.userId,
      code: body.code,
      result
    });
    
    return c.json({
      success: true,
      data: {
        submission,
        result
      }
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// GET /exercises/:id/submissions - Récupérer les soumissions pour un exercice
exercisesRouter.get('/:id/submissions', (c) => {
  try {
    const exerciseId = c.req.param('id');
    const submissions = db.getSubmissionsByExercise(exerciseId);
    
    return c.json({
      success: true,
      data: submissions,
      total: submissions.length
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// POST /exercises/:id/validate - Valider le code sans sauvegarder
exercisesRouter.post('/:id/validate', async (c) => {
  try {
    const exerciseId = c.req.param('id');
    const body = await c.req.json();
    
    const exercise = db.getExerciseById(exerciseId);
    if (!exercise) {
      return c.json({
        success: false,
        error: 'Exercice non trouvé'
      }, 404);
    }
    
    // Valider uniquement la syntaxe
    const syntaxValidation = executionService.validateSyntax(body.code);
    
    return c.json({
      success: true,
      data: {
        syntaxValid: syntaxValidation.valid,
        syntaxErrors: syntaxValidation.errors
      }
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// POST /exercises/:id/run - Exécuter un exercice
exercisesRouter.post('/:id/run', async (c) => {
  try {
    const exerciseId = c.req.param('id');
    const body = await c.req.json() as { code: string };
    
    if (!body.code) {
      return c.json({
        success: false,
        error: 'Code requis'
      }, 400);
    }
    
    const exercise = db.getExerciseById(exerciseId);
    if (!exercise) {
      return c.json({
        success: false,
        error: 'Exercice non trouvé'
      }, 404);
    }
    
    // Exécuter le code
    const result = await executionService.executeExercise(exercise, body.code);
    
    return c.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// GET /exercises/progress/:userId - Récupérer la progression d'un utilisateur
exercisesRouter.get('/progress/:userId', (c) => {
  try {
    const userId = c.req.param('userId');
    const progress = db.getUserProgress(userId);
    
    return c.json({
      success: true,
      data: progress,
      total: progress.length
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// POST /exercises/:id/progress - Mettre à jour la progression pour un exercice
exercisesRouter.post('/:id/progress', async (c) => {
  try {
    const exerciseId = c.req.param('id');
    const body = await c.req.json();
    
    if (!body.userId) {
      return c.json({
        success: false,
        error: 'userId requis'
      }, 400);
    }
    
    const progressData = {
      exerciseId,
      userId: body.userId,
      completed: body.completed || false,
      attempts: body.attempts || 1,
      lastAttempt: new Date().toISOString(),
      bestScore: body.bestScore || 0,
      timeSpent: body.timeSpent || 0,
      hintsUsed: body.hintsUsed || 0
    };
    
    const progress = db.updateProgress(progressData);
    
    return c.json({
      success: true,
      data: progress
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

export { exercisesRouter };
