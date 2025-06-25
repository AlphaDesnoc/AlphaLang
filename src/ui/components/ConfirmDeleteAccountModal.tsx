import React, { useState } from 'react';
import { AlertTriangleIcon, TrashIcon } from './Icons';

interface ConfirmDeleteAccountModalProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export const ConfirmDeleteAccountModal: React.FC<ConfirmDeleteAccountModalProps> = ({
  onConfirm,
  onCancel,
  loading
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [understood, setUnderstood] = useState(false);

  const handleConfirm = async () => {
    if (confirmText === 'SUPPRIMER' && understood) {
      await onConfirm();
    }
  };

  const isConfirmEnabled = confirmText === 'SUPPRIMER' && understood && !loading;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-2xl border border-red-500/50 shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <AlertTriangleIcon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Supprimer le compte</h2>
              <p className="text-red-100 text-sm">Cette action est irréversible</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
            <h3 className="text-red-200 font-semibold mb-3 flex items-center space-x-2">
              <AlertTriangleIcon size={18} />
              <span>Attention !</span>
            </h3>
            <ul className="text-red-200/90 text-sm space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Votre compte sera définitivement supprimé</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Tous vos défis et progrès seront perdus</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Cette action ne peut pas être annulée</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Vous devrez créer un nouveau compte pour revenir</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={understood}
                  onChange={(e) => setUnderstood(e.target.checked)}
                  className="w-4 h-4 text-red-600 bg-slate-700 border-slate-600 rounded focus:ring-red-500 focus:ring-2"
                />
                <span className="text-slate-300 text-sm">
                  Je comprends que cette action est irréversible
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Pour confirmer, tapez <span className="text-red-400 font-bold">SUPPRIMER</span> ci-dessous :
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Tapez SUPPRIMER"
                disabled={!understood}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleConfirm}
              disabled={!isConfirmEnabled}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Suppression...</span>
                </>
              ) : (
                <>
                  <TrashIcon size={16} />
                  <span>Supprimer définitivement</span>
                </>
              )}
            </button>
            <button
              onClick={onCancel}
              disabled={loading}
              className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
