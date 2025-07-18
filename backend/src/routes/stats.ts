import { Hono } from 'hono';
import { DatabaseService } from '../services/database.js';

const statsRouter = new Hono();
const db = new DatabaseService();

// GET /stats - Récupérer les statistiques générales
statsRouter.get('/', (c) => {
  try {
    const stats = db.getStats();
    
    return c.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// GET /stats/categories - Récupérer les catégories disponibles
statsRouter.get('/categories', (c) => {
  try {
    const exercises = db.getAllExercises();
    const categories = [...new Set(exercises.map(e => e.category))];
    
    return c.json({
      success: true,
      data: categories
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// GET /stats/difficulties - Récupérer les niveaux de difficulté
statsRouter.get('/difficulties', (c) => {
  try {
    const difficulties = ['facile', 'moyen', 'difficile'];
    
    return c.json({
      success: true,
      data: difficulties
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// GET /stats/:userId - Récupérer les statistiques d'un utilisateur spécifique
statsRouter.get('/:userId', (c) => {
  try {
    const userId = c.req.param('userId');
    const userStats = db.getUserStats(userId);
    
    return c.json({
      success: true,
      data: userStats
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

// POST /stats/:userId - Mettre à jour les statistiques d'un utilisateur
statsRouter.post('/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const { exerciseId, passed, score, points } = await c.req.json();
    
    db.updateUserStats(userId, exerciseId, passed, score, points);
    
    return c.json({
      success: true,
      message: 'Statistiques mises à jour avec succès'
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

export { statsRouter };
