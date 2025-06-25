import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { exercisesRouter } from './routes/exercises.js';
import { statsRouter } from './routes/stats.js';

const app = new Hono();

// Configuration CORS
app.use('/*', cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://alphadesnoc.github.io'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes de santé
app.get('/', (c) => {
  return c.json({
    success: true,
    message: 'AlphaLang Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (c) => {
  return c.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Routes API
app.route('/api/exercises', exercisesRouter);
app.route('/api/stats', statsRouter);

// Middleware de gestion des erreurs 404
app.notFound((c) => {
  return c.json({
    success: false,
    error: 'Route non trouvée',
    path: c.req.path
  }, 404);
});

// Middleware de gestion des erreurs
app.onError((err, c) => {
  console.error('Erreur serveur:', err);
  return c.json({
    success: false,
    error: 'Erreur interne du serveur',
    message: err.message
  }, 500);
});

const port = process.env.PORT || 3001;

console.log(`🚀 Serveur AlphaLang Backend démarré sur le port ${port}`);
console.log(`📖 API disponible sur http://localhost:${port}`);
console.log(`🔧 Routes disponibles:`);
console.log(`   GET  /                     - Informations API`);
console.log(`   GET  /health               - Statut de santé`);
console.log(`   GET  /api/exercises        - Liste des exercices`);
console.log(`   GET  /api/exercises/:id    - Détails d'un exercice`);
console.log(`   POST /api/exercises        - Créer un exercice`);
console.log(`   POST /api/exercises/:id/submit - Soumettre une solution`);
console.log(`   GET  /api/stats            - Statistiques générales`);

export default {
  port,
  fetch: app.fetch,
};
