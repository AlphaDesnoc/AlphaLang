import React, { useState, useEffect } from 'react';
import { PermissionGuard, usePermissions } from '../components/PermissionGuard';
import { PermissionService, UserPermissions } from '../../firebase/permissions';
import { UserRole } from '../../firebase/auth';

interface UserRoleCardProps {
  userProfile: UserPermissions;
  currentUserRole: UserRole;
  onRoleUpdate: (uid: string, newRole: UserRole) => Promise<void>;
}

const UserRoleCard: React.FC<UserRoleCardProps> = ({ userProfile, currentUserRole, onRoleUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'admin':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-green-500/20 text-green-300 border-green-500/30';
    }
  };

  const canModifyRole = (targetRole: UserRole) => {
    if (currentUserRole === 'owner') return true;
    if (currentUserRole === 'admin') {
      return targetRole !== 'owner' && userProfile.role !== 'owner';
    }
    return false;
  };

  const handleRoleChange = async (newRole: UserRole) => {
    if (!canModifyRole(newRole) || newRole === userProfile.role) return;
    
    setIsUpdating(true);
    try {
      await onRoleUpdate(userProfile.uid, newRole);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {userProfile.displayName || 'Utilisateur sans nom'}
          </h3>
          <p className="text-slate-400 text-sm">{userProfile.email}</p>
          <p className="text-slate-500 text-xs mt-1">
            Inscrit le {userProfile.createdAt.toLocaleDateString()}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(userProfile.role)}`}>
          {userProfile.role}
        </div>
      </div>

      {canModifyRole(userProfile.role) && (
        <div className="flex gap-2">
          {(['user', 'admin', 'owner'] as UserRole[]).map((role) => {
            if (!canModifyRole(role)) return null;
            
            return (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                disabled={isUpdating || role === userProfile.role}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  role === userProfile.role
                    ? getRoleColor(role)
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-50'
                }`}
              >
                {isUpdating ? '...' : role}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export function AdminPage() {
  return (
    <PermissionGuard requireAdmin>
      <AdminContent />
    </PermissionGuard>
  );
}

function AdminContent() {
  const { user, isOwner } = usePermissions();
  const [users, setUsers] = useState<UserPermissions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      // Récupérer tous les utilisateurs depuis Firestore
      const allUsers = await PermissionService.getAllUsers();
      setUsers(allUsers);
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (targetUid: string, newRole: UserRole) => {
    if (!user) return;
    
    try {
      setError('');
      setSuccess('');
      
      const success = await PermissionService.updateUserRole(targetUid, newRole, user.uid);
      
      if (success) {
        setSuccess('Rôle mis à jour avec succès');
        // Recharger les utilisateurs
        await loadUsers();
      } else {
        setError('Erreur lors de la mise à jour du rôle');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la mise à jour du rôle');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Administration
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Gestion des utilisateurs et des permissions
          </p>
          {isOwner && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
              <svg className="w-5 h-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
              </svg>
              <span className="text-purple-300 font-medium">Propriétaire</span>
            </div>
          )}
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <p className="text-green-200">{success}</p>
          </div>
        )}

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{users.length}</p>
                <p className="text-slate-400">Utilisateurs</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'admin' || u.role === 'owner').length}
                </p>
                <p className="text-slate-400">Administrateurs</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'owner').length}
                </p>
                <p className="text-slate-400">Propriétaires</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-500/20 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'user').length}
                </p>
                <p className="text-slate-400">Utilisateurs normaux</p>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des utilisateurs */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Gestion des utilisateurs</h2>
            <button
              onClick={loadUsers}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {loading ? 'Chargement...' : 'Actualiser'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {users.map((userProfile) => (
              <UserRoleCard
                key={userProfile.uid}
                userProfile={userProfile}
                currentUserRole={user?.role || 'user'}
                onRoleUpdate={handleRoleUpdate}
              />
            ))}
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun utilisateur</h3>
              <p className="text-slate-400">
                Aucun utilisateur n'a été trouvé
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
