import React from 'react';
import { useStats } from '../contexts/StatsContext';
import { useAuth } from '../contexts/AuthContext';

// Composant de test pour vérifier les statistiques
export const StatsTest: React.FC = () => {
  const { user } = useAuth();
  const { stats, loading, refreshStats, markExerciseCompleted } = useStats();

  const handleTestExerciseCompletion = async () => {
    if (!user) {
      alert('Vous devez être connecté pour tester cette fonctionnalité');
      return;
    }

    // Simuler la réussite d'un exercice
    await markExerciseCompleted('hello-world', {
      passed: true,
      score: 85,
      passedTests: 3,
      totalTests: 3,
      errors: [],
      output: 'Test réussi!',
      points: 10
    });

    alert('Exercice marqué comme réussi! Vérifiez vos statistiques.');
  };

  if (!user) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 rounded">
        <p className="text-red-700">Vous devez être connecté pour voir les statistiques</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Test des Statistiques</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold">Utilisateur</h3>
          <p>ID: {user.uid}</p>
          <p>Email: {user.email}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold">Statistiques {loading && '(Chargement...)'}</h3>
          {stats ? (
            <div>
              <p>Défis résolus: {stats.solvedChallenges}</p>
              <p>Points totaux: {stats.totalPoints}</p>
              <p>Niveau: {stats.level}</p>
              <p>Tentatives: {stats.totalAttempts}</p>
              <p>Score moyen: {stats.averageScore.toFixed(1)}%</p>
              <p>Exercices complétés: {stats.completedExercises.length}</p>
            </div>
          ) : (
            <p>Aucune statistique disponible</p>
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={refreshStats}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Chargement...' : 'Actualiser les statistiques'}
        </button>
        
        <button
          onClick={handleTestExerciseCompletion}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Tester la réussite d'un exercice
        </button>
      </div>
    </div>
  );
};
