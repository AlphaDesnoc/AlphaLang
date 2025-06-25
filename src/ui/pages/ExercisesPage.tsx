import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ExerciseService } from '../../services/ExerciseService';
import { Exercise } from '../../types/exercise';
import { MagicBackground } from '../components/MagicBackground';

type ExerciseDifficulty = 'facile' | 'moyen' | 'difficile';

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect: (exercise: Exercise) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onSelect }) => {
  const difficultyColors = {
    facile: 'bg-green-500/20 text-green-300 border-green-500/30',
    moyen: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    difficile: 'bg-red-500/20 text-red-300 border-red-500/30'
  };

  const categoryIcons: Record<string, string> = {
    'Bases': '📚',
    'Variables': '📦',
    'Fonctions': '⚡',
    'Conditions': '🔀',
    'Boucles': '🔄',
    'Algorithmes': '🧮',
    'Structures': '🏗️'
  };

  return (
    <div 
      className="group relative overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(exercise)}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{categoryIcons[exercise.category] || '📋'}</span>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                {exercise.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-md border ${difficultyColors[exercise.difficulty]}`}>
                  {exercise.difficulty}
                </span>
                <span className="text-slate-400 text-sm">{exercise.points} pts</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-slate-300 text-sm mb-4 line-clamp-2">
          {exercise.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {exercise.concepts.slice(0, 3).map((concept, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-md"
              >
                {concept}
              </span>
            ))}
            {exercise.concepts.length > 3 && (
              <span className="px-2 py-1 text-xs bg-slate-600/50 text-slate-400 rounded-md">
                +{exercise.concepts.length - 3}
              </span>
            )}
          </div>
          
          <div className="text-slate-400 text-sm">
            {exercise.testCases.length} test{exercise.testCases.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export const ExercisesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState<ExerciseDifficulty | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await ExerciseService.getAllExercises();
        setExercises(data);
      } catch (error) {
        console.error('Erreur lors du chargement des exercices:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
      const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exercise.concepts.some(concept => concept.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesDifficulty && matchesCategory && matchesSearch;
    });
  }, [exercises, selectedDifficulty, selectedCategory, searchTerm]);

  const handleExerciseSelect = (exercise: Exercise) => {
    // Navigation vers le workspace d'exercices avec l'ID de l'exercice
    navigate({ to: `/exercise-workspace/${exercise.id}` });
  };

  const difficultyOptions: { value: ExerciseDifficulty | 'all'; label: string }[] = [
    { value: 'all', label: 'Toutes' },
    { value: 'facile', label: 'Facile' },
    { value: 'moyen', label: 'Moyen' },
    { value: 'difficile', label: 'Difficile' }
  ];

  const categoryOptions: { value: string | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: 'Toutes', icon: '🌟' },
    { value: 'Bases', label: 'Bases', icon: '📚' },
    { value: 'Variables', label: 'Variables', icon: '📦' },
    { value: 'Fonctions', label: 'Fonctions', icon: '⚡' },
    { value: 'Conditions', label: 'Conditions', icon: '🔀' },
    { value: 'Boucles', label: 'Boucles', icon: '🔄' },
    { value: 'Algorithmes', label: 'Algorithmes', icon: '🧮' },
    { value: 'Structures', label: 'Structures', icon: '🏗️' }
  ];

  const stats = useMemo(() => {
    const totalExercises = exercises.length;
    const byDifficulty = exercises.reduce((acc, exercise) => {
      acc[exercise.difficulty] = (acc[exercise.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<ExerciseDifficulty, number>);
    
    return { totalExercises, byDifficulty };
  }, [exercises]);

  return (
    <div className="relative min-h-screen bg-slate-900">
      <MagicBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-slate-300">Chargement des exercices...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Exercices AlphaLang
          </h1>
          <p className="text-slate-300 text-lg mb-6">
            Pratiquez et améliorez vos compétences en programmation avec des exercices interactifs
          </p>
          
          {/* Quick start button */}
          <div className="mb-6">
            <button
              onClick={() => {
                if (filteredExercises.length > 0) {
                  navigate({ to: `/exercise-workspace/${filteredExercises[0].id}` });
                } else {
                  navigate({ to: '/exercise-workspace' });
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🚀 Commencer les exercices
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{stats.totalExercises}</div>
              <div className="text-slate-400 text-sm">Exercices</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">{stats.byDifficulty.facile || 0}</div>
              <div className="text-slate-400 text-sm">Facile</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">{stats.byDifficulty.moyen || 0}</div>
              <div className="text-slate-400 text-sm">Moyen</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-400">{stats.byDifficulty.difficile || 0}</div>
              <div className="text-slate-400 text-sm">Difficile</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un exercice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-3 pl-12 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            />
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-4">
            {/* Difficulty filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-slate-400 text-sm font-medium self-center mr-2">Difficulté:</span>
              {difficultyOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDifficulty(option.value)}
                  className={`px-3 py-1 text-sm rounded-md border transition-all ${
                    selectedDifficulty === option.value
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      : 'bg-slate-800/50 text-slate-300 border-slate-700/50 hover:bg-slate-800/70'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-slate-400 text-sm font-medium self-center mr-2">Catégorie:</span>
              {categoryOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedCategory(option.value)}
                  className={`px-3 py-1 text-sm rounded-md border transition-all flex items-center space-x-1 ${
                    selectedCategory === option.value
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      : 'bg-slate-800/50 text-slate-300 border-slate-700/50 hover:bg-slate-800/70'
                  }`}
                >
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-slate-400">
            {filteredExercises.length} exercice{filteredExercises.length > 1 ? 's' : ''} trouvé{filteredExercises.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Exercises grid */}
        {filteredExercises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map(exercise => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onSelect={handleExerciseSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucun exercice trouvé</h3>
            <p className="text-slate-400">
              Essayez de modifier vos filtres ou votre recherche
            </p>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
};
