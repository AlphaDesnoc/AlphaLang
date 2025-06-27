import React, { useState, useEffect, useRef } from 'react';
import { ExerciseService } from '../../services/ExerciseService';
import { Exercise, ExerciseResult } from '../../types/exercise';
import { MagicBackground } from '../components/MagicBackground';
import { useStats } from '../contexts/StatsContext';
import { useAuth } from '../contexts/AuthContext';
import { editor as MonacoEditor } from "monaco-editor/esm/vs/editor/editor.api";

export const ExerciseWorkspace: React.FC = () => {
  const { user } = useAuth();
  const { markExerciseCompleted } = useStats();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [result, setResult] = useState<ExerciseResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState<boolean[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [loading, setLoading] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const allExercises = await ExerciseService.getAllExercises();
        setExercises(allExercises);
        if (allExercises.length > 0) {
          setSelectedExercise(allExercises[0]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des exercices:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  useEffect(() => {
    if (editorRef.current && selectedExercise) {
      // Nettoyer l'ancien éditeur
      if (monacoEditorRef.current) {
        monacoEditorRef.current.dispose();
      }

      // Créer un nouvel éditeur
      const editor = MonacoEditor.create(editorRef.current, {
        value: selectedExercise.starterCode,
        language: 'javascript',
        theme: 'vs-dark',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        automaticLayout: true,
        padding: { top: 10 },
      });

      monacoEditorRef.current = editor;
      setShowHints(new Array(selectedExercise.hints.length).fill(false));
      setResult(null);
      setShowSolution(false);

      return () => {
        editor.dispose();
      };
    }
  }, [selectedExercise]);

  const handleRunTests = async () => {
    if (!selectedExercise || !monacoEditorRef.current) return;
    
    setIsRunning(true);
    try {
      const currentCode = monacoEditorRef.current.getValue();
      const testResult = await ExerciseService.runExerciseTests(selectedExercise, currentCode);
      setResult(testResult);
      
      // Marquer l'exercice comme terminé si réussi et utilisateur connecté
      if (testResult.passed && user) {
        await markExerciseCompleted(selectedExercise.id, {
          ...testResult,
          points: selectedExercise.points || 10
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'exécution des tests:', error);
      setResult({
        passed: false,
        score: 0,
        passedTests: 0,
        totalTests: selectedExercise.testCases.length,
        errors: [`Erreur lors de l'exécution: ${error}`],
        output: ''
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleShowHint = (index: number) => {
    setShowHints(prev => {
      const newHints = [...prev];
      newHints[index] = true;
      return newHints;
    });
  };

  const handleReset = () => {
    if (selectedExercise && monacoEditorRef.current) {
      monacoEditorRef.current.setValue(selectedExercise.starterCode);
      setResult(null);
      setShowSolution(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'moyen': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'difficile': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-slate-900 flex items-center justify-center">
        <MagicBackground />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white mb-4">Chargement des exercices...</h1>
        </div>
      </div>
    );
  }

  if (!selectedExercise) {
    return (
      <div className="relative min-h-screen bg-slate-900 flex items-center justify-center">
        <MagicBackground />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Chargement des exercices...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-900">
      <MagicBackground />
      
      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl font-bold text-white">{selectedExercise.title}</h1>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getDifficultyColor(selectedExercise.difficulty)}`}>
                    {selectedExercise.difficulty}
                  </span>
                  <span className="text-slate-400 text-sm">{selectedExercise.category}</span>
                  <span className="text-slate-400 text-sm">{selectedExercise.points} pts</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={selectedExercise.id}
                onChange={(e) => {
                  const exercise = exercises.find(ex => ex.id === e.target.value);
                  if (exercise) setSelectedExercise(exercise);
                }}
                className="px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {exercises.map(exercise => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.title}
                  </option>
                ))}
              </select>
              <button
                onClick={handleReset}
                className="px-3 py-2 text-sm text-slate-300 hover:text-white border border-slate-600 rounded-lg hover:border-slate-500 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleRunTests}
                disabled={isRunning}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isRunning ? 'Exécution...' : 'Tester'}
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left panel - Instructions */}
          <div className="w-1/3 bg-slate-800/30 backdrop-blur-sm border-r border-slate-700/50 overflow-y-auto">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-3">Description</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{selectedExercise.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-3">Instructions</h2>
                <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {selectedExercise.instructions}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-3">Concepts</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.concepts.map((concept, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-md"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-3">Tests</h2>
                <div className="space-y-3">
                  {selectedExercise.testCases.map((testCase, index) => (
                    <div key={index} className="bg-slate-700/30 rounded-lg p-3">
                      <div className="text-sm text-slate-300 mb-2">{testCase.description}</div>
                      {testCase.input.length > 0 && (
                        <div className="text-xs text-slate-400">
                          Entrée: {JSON.stringify(testCase.input)}
                        </div>
                      )}
                      <div className="text-xs text-slate-400">
                        Sortie attendue: {JSON.stringify(testCase.expectedOutput)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hints */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-3">Indices</h2>
                <div className="space-y-2">
                  {selectedExercise.hints.map((hint, index) => (
                    <div key={index} className="border border-slate-600/50 rounded-lg">
                      {showHints[index] ? (
                        <div className="p-3 text-sm text-slate-300 bg-yellow-500/10">
                          💡 {hint}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleShowHint(index)}
                          className="w-full p-3 text-sm text-slate-400 hover:text-slate-300 hover:bg-slate-700/30 rounded-lg transition-colors text-left"
                        >
                          💡 Cliquer pour voir l'indice {index + 1}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-3">Solution</h2>
                {showSolution ? (
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
                      {selectedExercise.solution}
                    </pre>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSolution(true)}
                    className="w-full p-3 text-sm text-slate-400 hover:text-slate-300 hover:bg-slate-700/30 border border-slate-600/50 rounded-lg transition-colors"
                  >
                    🔓 Voir la solution
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right panel - Editor and Results */}
          <div className="flex-1 flex flex-col">
            {/* Editor */}
            <div className="flex-1 border-b border-slate-700/50">
              <div 
                ref={editorRef}
                className="h-full w-full"
                style={{ minHeight: '400px' }}
              />
            </div>

            {/* Results */}
            <div className="h-1/3 bg-slate-800/30 backdrop-blur-sm overflow-y-auto">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Résultats</h3>
                
                {result ? (
                  <div className="space-y-4">
                    {/* Score */}
                    <div className={`p-3 rounded-lg border ${
                      result.passed 
                        ? 'bg-green-500/20 border-green-500/30 text-green-300' 
                        : 'bg-red-500/20 border-red-500/30 text-red-300'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          {result.passed ? '✅ Tous les tests réussis!' : '❌ Certains tests ont échoué'}
                        </span>
                        <span className="text-sm">
                          Score: {result.score}% ({result.passedTests}/{result.totalTests})
                        </span>
                      </div>
                    </div>

                    {/* Test Details */}
                    <div className="space-y-2">
                      {selectedExercise.testCases.map((testCase, index) => {
                        const passed = index < result.passedTests;
                        return (
                          <div 
                            key={index}
                            className={`p-3 rounded-lg border ${
                              passed 
                                ? 'bg-green-500/10 border-green-500/20' 
                                : 'bg-red-500/10 border-red-500/20'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-300">
                                {passed ? '✅' : '❌'} Test {index + 1}: {testCase.description}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Output */}
                    {result.output && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-2">Sortie du programme:</h4>
                        <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm text-slate-300">
                          {result.output}
                        </div>
                      </div>
                    )}

                    {/* Errors */}
                    {result.errors.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-red-300 mb-2">Erreurs:</h4>
                        <div className="space-y-2">
                          {result.errors.map((error, index) => (
                            <div key={index} className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                              <span className="text-sm text-red-300">{error}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-slate-400 mb-4">
                      <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p>Cliquez sur "Tester" pour exécuter votre code</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
