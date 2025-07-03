import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { TestCase } from '../../types/exercise';
import { ExerciseService } from '../../services/ExerciseService';
import { ExercisePermissionService } from '../../services/ExercisePermissionService';
import { useAuth } from '../contexts/AuthContext';

export function CreateExercisePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<{
    canCreate: boolean;
    canCreateOfficial: boolean;
    role: string;
  } | null>(null);

  // Charger le statut des permissions
  useEffect(() => {
    if (user) {
      ExercisePermissionService.getExerciseCreationStatus(user.uid)
        .then(setPermissionStatus)
        .catch(console.error);
    }
  }, [user]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'facile' as 'facile' | 'moyen' | 'difficile',
    category: '',
    instructions: '',
    starterCode: '',
    solution: '',
    hints: [''],
    concepts: [''],
    estimatedTime: 10,
    points: 10,
    testCases: [
      {
        input: [],
        expectedOutput: '',
        description: 'Test principal'
      }
    ] as TestCase[]
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'hints' | 'concepts', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'hints' | 'concepts') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'hints' | 'concepts', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleTestCaseChange = (index: number, field: keyof TestCase, value: any) => {
    setFormData(prev => ({
      ...prev,
      testCases: prev.testCases.map((tc, i) => 
        i === index ? { ...tc, [field]: value } : tc
      )
    }));
  };

  const addTestCase = () => {
    setFormData(prev => ({
      ...prev,
      testCases: [
        ...prev.testCases,
        {
          input: [],
          expectedOutput: '',
          description: `Test ${prev.testCases.length + 1}`
        }
      ]
    }));
  };

  const removeTestCase = (index: number) => {
    if (formData.testCases.length > 1) {
      setFormData(prev => ({
        ...prev,
        testCases: prev.testCases.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Vous devez être connecté pour créer un exercice');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Validation basique
      if (!formData.title.trim() || !formData.description.trim() || !formData.category.trim()) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      if (formData.testCases.some(tc => !tc.expectedOutput)) {
        throw new Error('Tous les cas de test doivent avoir un résultat attendu');
      }

      const exerciseData = {
        ...formData,
        hints: formData.hints.filter(h => h.trim()),
        concepts: formData.concepts.filter(c => c.trim()),
        createdBy: user.uid
      };

      const exercise = await ExerciseService.createExercise(exerciseData);
      
      navigate({ to: `/exercises/${exercise.id}` });
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de l\'exercice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate({ to: '/exercises' })}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              ← Retour aux exercices
            </button>
            <h1 className="text-3xl font-bold text-white">Créer un exercice</h1>
          </div>

          {/* Statut des permissions */}
          {permissionStatus && (
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {permissionStatus.canCreateOfficial ? '👑' : '📝'}
                </span>
                <div>
                  <p className="text-white font-medium">
                    {permissionStatus.canCreateOfficial 
                      ? 'Exercice officiel' 
                      : 'Exercice communautaire'
                    }
                  </p>
                  <p className="text-sm text-slate-400">
                    {permissionStatus.canCreateOfficial 
                      ? 'En tant qu\'administrateur, votre exercice sera marqué comme officiel.'
                      : 'Votre exercice sera ajouté à la communauté et visible par tous.'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Titre de l'exercice"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Catégorie *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="ex: Bases, Fonctions, Algorithmes"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
                placeholder="Description courte de l'exercice"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Difficulté
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="facile">Facile</option>
                  <option value="moyen">Moyen</option>
                  <option value="difficile">Difficile</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Temps estimé (min)
                </label>
                <input
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => handleInputChange('estimatedTime', parseInt(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Points
                </label>
                <input
                  type="number"
                  value={formData.points}
                  onChange={(e) => handleInputChange('points', parseInt(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min="1"
                />
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Instructions *
              </label>
              <textarea
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={6}
                placeholder="Instructions détaillées pour l'exercice (Markdown supporté)"
                required
              />
            </div>

            {/* Code de départ */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Code de départ
              </label>
              <textarea
                value={formData.starterCode}
                onChange={(e) => handleInputChange('starterCode', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                rows={4}
                placeholder="Code de départ pour l'exercice"
              />
            </div>

            {/* Solution */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Solution *
              </label>
              <textarea
                value={formData.solution}
                onChange={(e) => handleInputChange('solution', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                rows={6}
                placeholder="Solution complète de l'exercice"
                required
              />
            </div>

            {/* Cas de test */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cas de test *
              </label>
              {formData.testCases.map((testCase, index) => (
                <div key={index} className="bg-slate-700/50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-white font-medium">Test {index + 1}</h4>
                    {formData.testCases.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTestCase(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                  
                  <div className="grid gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Description</label>
                      <input
                        type="text"
                        value={testCase.description}
                        onChange={(e) => handleTestCaseChange(index, 'description', e.target.value)}
                        className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-1 text-white text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Résultat attendu *</label>
                      <input
                        type="text"
                        value={testCase.expectedOutput}
                        onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                        className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-1 text-white text-sm"
                        placeholder="ex: Hello, World!"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addTestCase}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                + Ajouter un cas de test
              </button>
            </div>

            {/* Indices */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Indices
              </label>
              {formData.hints.map((hint, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={hint}
                    onChange={(e) => handleArrayChange('hints', index, e.target.value)}
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={`Indice ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('hints', index)}
                    className="text-red-400 hover:text-red-300 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('hints')}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                + Ajouter un indice
              </button>
            </div>

            {/* Concepts */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Concepts couverts
              </label>
              {formData.concepts.map((concept, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={concept}
                    onChange={(e) => handleArrayChange('concepts', index, e.target.value)}
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={`Concept ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('concepts', index)}
                    className="text-red-400 hover:text-red-300 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('concepts')}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                + Ajouter un concept
              </button>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate({ to: '/exercises' })}
                className="px-6 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Annuler
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Création...' : 'Créer l\'exercice'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
