import { useState, useEffect } from 'react';
import { Exercise } from '../../types/exercise';
import { ExerciseService } from '../../services/ExerciseService';
import { ExercisePermissionService } from '../../services/ExercisePermissionService';
import { useAuth } from '../contexts/AuthContext';

interface ExerciseActionsProps {
  exercise: Exercise;
  onDeleted: () => void;
  onEdited?: (exercise: Exercise) => void;
}

export function ExerciseActions({ exercise, onDeleted, onEdited }: ExerciseActionsProps) {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState<{
    canEdit: boolean;
    canDelete: boolean;
    isCreator: boolean;
    isAdmin: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      ExercisePermissionService.getExercisePermissions(user.uid, exercise)
        .then(setPermissions)
        .catch(console.error);
    }
  }, [user, exercise]);

  const handleDelete = async () => {
    if (!user || !permissions?.canDelete) {
      console.log('❌ Suppression refusée:', { user: !!user, canDelete: permissions?.canDelete });
      return;
    }

    console.log('🗑️ Début suppression exercice:', { exerciseId: exercise.id, userId: user.uid });
    setLoading(true);
    try {
      await ExerciseService.deleteExercise(exercise.id, user.uid);
      console.log('✅ Exercice supprimé avec succès');
      onDeleted();
      setShowDeleteConfirm(false);
    } catch (error: any) {
      console.error('❌ Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (onEdited) {
      onEdited(exercise);
    } else {
      // Navigation vers une page d'édition (à implémenter)
      console.log('Édition de l\'exercice:', exercise.id);
    }
  };

  if (!permissions || (!permissions.canEdit && !permissions.canDelete)) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {permissions.canEdit && (
        <button
          onClick={handleEdit}
          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
          title="Modifier l'exercice"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )}

      {permissions.canDelete && (
        <>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Supprimer l'exercice"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          {/* Modal de confirmation de suppression */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-md mx-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Confirmer la suppression
                </h3>
                <p className="text-slate-300 mb-6">
                  Êtes-vous sûr de vouloir supprimer l'exercice "{exercise.title}" ?
                  Cette action est irréversible.
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                    disabled={loading}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Suppression...' : 'Supprimer'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Indicateur de statut */}
      <div className="text-xs text-slate-500">
        {permissions.isCreator && (
          <span className="text-blue-400" title="Vous êtes le créateur">👤</span>
        )}
        {permissions.isAdmin && !permissions.isCreator && (
          <span className="text-purple-400" title="Permissions admin">👑</span>
        )}
      </div>
    </div>
  );
}
