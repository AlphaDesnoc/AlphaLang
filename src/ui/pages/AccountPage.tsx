import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useStats } from '../contexts/StatsContext';
import { UserIcon, EmailIcon, LockIcon, EyeIcon, EyeOffIcon, TrashIcon } from '../components/Icons';
import { updateProfile, updatePassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { ConfirmDeleteAccountModal } from '../components/ConfirmDeleteAccountModal';
import { useNavigate } from '@tanstack/react-router';

export function AccountPage() {
  const { user, deleteAccount } = useAuth();
  const { stats, loading: statsLoading, refreshStats } = useStats();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // États pour l'édition du profil
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  
  // États pour le changement de mot de passe
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  
  // États pour la suppression de compte
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError('');
    setProfileSuccess('');

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: displayName.trim() || null
        });
        await auth.currentUser.reload();
        setProfileSuccess('Profil mis à jour avec succès !');
        setIsEditing(false);
      }
    } catch (error: any) {
      setProfileError('Erreur lors de la mise à jour du profil.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas.');
      setPasswordLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Le nouveau mot de passe doit contenir au moins 6 caractères.');
      setPasswordLoading(false);
      return;
    }

    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
        setPasswordSuccess('Mot de passe modifié avec succès !');
        setIsChangingPassword(false);
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        setPasswordError('Pour des raisons de sécurité, veuillez vous reconnecter avant de changer votre mot de passe.');
      } else {
        setPasswordError('Erreur lors du changement de mot de passe.');
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setDeleteError('');

    try {
      await deleteAccount();
      navigate({ to: '/' });
    } catch (error: any) {
      setDeleteError(error.message || 'Erreur lors de la suppression du compte.');
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Accès refusé</h2>
          <p className="text-slate-400">Vous devez être connecté pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
              {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Mon compte</h1>
              <p className="text-slate-400">Gérez vos informations personnelles et votre sécurité</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations du profil */}
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <UserIcon size={24} />
                <span>Informations du profil</span>
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Modifier
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nom d'affichage
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre nom d'affichage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <EmailIcon size={20} />
                    </div>
                    <input
                      type="email"
                      value={user.email || ''}
                      disabled
                      className="w-full pl-10 pr-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-slate-300 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">L'adresse email ne peut pas être modifiée</p>
                </div>

                {profileError && (
                  <div className="bg-red-900/50 border border-red-500 rounded-lg p-3">
                    <p className="text-red-200 text-sm">{profileError}</p>
                  </div>
                )}

                {profileSuccess && (
                  <div className="bg-green-900/50 border border-green-500 rounded-lg p-3">
                    <p className="text-green-200 text-sm">{profileSuccess}</p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {profileLoading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setDisplayName(user?.displayName || '');
                      setProfileError('');
                      setProfileSuccess('');
                    }}
                    className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Nom d'affichage</label>
                  <p className="text-white text-lg">
                    {user.displayName || user.email?.split('@')[0] || 'Non défini'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Adresse email</label>
                  <p className="text-white text-lg">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">ID utilisateur</label>
                  <p className="text-slate-300 text-sm font-mono bg-slate-700 px-3 py-2 rounded">{user.uid}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sécurité */}
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <LockIcon size={24} />
                <span>Sécurité</span>
              </h2>
              {!isChangingPassword && (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Changer le mot de passe
                </button>
              )}
            </div>

            {isChangingPassword ? (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pr-12 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nouveau mot de passe"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300"
                    >
                      {showNewPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pr-12 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirmer le mot de passe"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300"
                    >
                      {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                  </div>
                </div>

                {passwordError && (
                  <div className="bg-red-900/50 border border-red-500 rounded-lg p-3">
                    <p className="text-red-200 text-sm">{passwordError}</p>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="bg-green-900/50 border border-green-500 rounded-lg p-3">
                    <p className="text-green-200 text-sm">{passwordSuccess}</p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {passwordLoading ? 'Modification...' : 'Changer le mot de passe'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setNewPassword('');
                      setConfirmPassword('');
                      setPasswordError('');
                      setPasswordSuccess('');
                    }}
                    className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Mot de passe</label>
                  <p className="text-white">••••••••••••</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Dernière modification: Non disponible
                  </p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-blue-200 font-medium mb-2">Conseils de sécurité</h4>
                  <ul className="text-blue-200/80 text-sm space-y-1">
                    <li>• Utilisez un mot de passe d'au moins 6 caractères</li>
                    <li>• Combinez lettres, chiffres et symboles</li>
                    <li>• Évitez les informations personnelles</li>
                    <li>• Changez régulièrement votre mot de passe</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistiques du compte */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Statistiques du compte</h2>
            <button
              onClick={refreshStats}
              disabled={statsLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm flex items-center space-x-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={statsLoading ? 'animate-spin' : ''}>
                <path d="M23 4v6h-6"/>
                <path d="M1 20v-6h6"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
              <span>Actualiser</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Défis résolus</h3>
              <p className="text-2xl font-bold text-green-400">
                {statsLoading ? '...' : (stats?.solvedChallenges || 0)}
              </p>
              <p className="text-slate-400 text-sm">Programmes réussis</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Points</h3>
              <p className="text-2xl font-bold text-blue-400">
                {statsLoading ? '...' : (stats?.totalPoints || 0)}
              </p>
              <p className="text-slate-400 text-sm">Score total</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Niveau</h3>
              <p className="text-2xl font-bold text-purple-400">
                {statsLoading ? '...' : (stats?.level || 'Débutant')}
              </p>
              <p className="text-slate-400 text-sm">Rang actuel</p>
            </div>
          </div>
          
          {/* Statistiques détaillées */}
          {stats && !statsLoading && (
            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tentatives totales:</span>
                  <span className="text-white font-medium">{stats.totalAttempts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Score moyen:</span>
                  <span className="text-white font-medium">{stats.averageScore.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Taux de réussite:</span>
                  <span className="text-white font-medium">
                    {stats.totalAttempts > 0 ? ((stats.solvedChallenges / stats.totalAttempts) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Exercices complétés:</span>
                  <span className="text-white font-medium">{stats.completedExercises.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Zone de danger - Suppression de compte */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur-md rounded-xl border border-red-500/30 p-6">
          <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center space-x-2">
            <TrashIcon size={24} />
            <span>Zone de danger</span>
          </h2>
          
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
            <h3 className="text-red-200 font-semibold mb-3">Supprimer définitivement le compte</h3>
            <p className="text-red-200/80 text-sm mb-4">
              Une fois votre compte supprimé, toutes vos données seront définitivement perdues. 
              Cette action ne peut pas être annulée.
            </p>
            
            {deleteError && (
              <div className="bg-red-900/50 border border-red-500 rounded-lg p-3 mb-4">
                <p className="text-red-200 text-sm">{deleteError}</p>
              </div>
            )}
            
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all flex items-center space-x-2"
            >
              <TrashIcon size={16} />
              <span>Supprimer mon compte</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <ConfirmDeleteAccountModal
          onConfirm={handleDeleteAccount}
          onCancel={() => {
            setShowDeleteModal(false);
            setDeleteError('');
          }}
          loading={deleteLoading}
        />
      )}
    </div>
  );
}
