import { useState, useEffect } from 'react';
import { AuthService } from '../../firebase/auth';
import { PermissionService } from '../../firebase/permissions';
import { Card } from '../components/Card';

interface RoleDebugInfo {
  uid: string;
  email: string | null;
  currentRole: string;
  hasProfile: boolean;
  profileData?: any;
}

export function RoleDebugPage() {
  const [debugInfo, setDebugInfo] = useState<RoleDebugInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDebugInfo();
  }, []);

  const loadDebugInfo = async () => {
    setLoading(true);
    try {
      const user = await AuthService.getCurrentUser();
      if (!user) {
        setMessage('Aucun utilisateur connecté');
        return;
      }

      const profile = await PermissionService.getUserProfile(user.uid);
      
      setDebugInfo({
        uid: user.uid,
        email: user.email,
        currentRole: user.role,
        hasProfile: !!profile,
        profileData: profile
      });
    } catch (error) {
      console.error('Erreur lors du chargement des informations de debug:', error);
      setMessage('Erreur lors du chargement des informations');
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (role: string) => {
    if (!debugInfo) return;
    
    setLoading(true);
    try {
      await PermissionService.createUserProfile(
        debugInfo.uid,
        debugInfo.email || '',
        undefined
      );
      
      setMessage(`Profil créé avec le rôle ${role}`);
      await loadDebugInfo();
    } catch (error) {
      console.error('Erreur lors de la création du profil:', error);
      setMessage('Erreur lors de la création du profil');
    } finally {
      setLoading(false);
    }
  };

  const setOwnerRole = async () => {
    if (!debugInfo || confirmEmail !== debugInfo.email) {
      setMessage('Email de confirmation incorrect');
      return;
    }

    setLoading(true);
    try {
      const success = await PermissionService.setOwner(debugInfo.uid, confirmEmail);
      if (success) {
        setMessage('Rôle owner défini avec succès. Rechargez la page.');
        await loadDebugInfo();
      } else {
        setMessage('Erreur lors de la définition du rôle owner');
      }
    } catch (error) {
      console.error('Erreur lors de la définition du rôle owner:', error);
      setMessage('Erreur lors de la définition du rôle owner');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !debugInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Debug des Rôles Utilisateur</h1>
          
          {message && (
            <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-200">
              {message}
            </div>
          )}

          {debugInfo && (
            <div className="space-y-6">
              {/* Informations actuelles */}
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Informations Actuelles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <span className="font-medium">UID:</span>
                    <div className="font-mono text-sm break-all">{debugInfo.uid}</div>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <div>{debugInfo.email}</div>
                  </div>
                  <div>
                    <span className="font-medium">Rôle Actuel:</span>
                    <div className={`font-semibold ${
                      debugInfo.currentRole === 'owner' ? 'text-red-400' :
                      debugInfo.currentRole === 'admin' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {debugInfo.currentRole}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Profil Firestore:</span>
                    <div className={debugInfo.hasProfile ? 'text-green-400' : 'text-red-400'}>
                      {debugInfo.hasProfile ? 'Existe' : 'Manquant'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Actions</h2>
                
                <div className="space-y-4">
                  <button
                    onClick={loadDebugInfo}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    {loading ? 'Chargement...' : 'Actualiser les Informations'}
                  </button>

                  {!debugInfo.hasProfile && (
                    <div className="space-y-2">
                      <p className="text-yellow-400">Aucun profil Firestore trouvé. Créer un profil :</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => createProfile('user')}
                          disabled={loading}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                        >
                          Créer en tant qu'Utilisateur
                        </button>
                        <button
                          onClick={() => createProfile('admin')}
                          disabled={loading}
                          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                        >
                          Créer en tant qu'Admin
                        </button>
                      </div>
                    </div>
                  )}

                  {debugInfo.currentRole !== 'owner' && (
                    <div className="space-y-3 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <h3 className="text-lg font-medium text-red-400">
                        ⚠️ Définir comme Owner (Attention!)
                      </h3>
                      <p className="text-red-300 text-sm">
                        Cette action vous donnera tous les droits administrateur. 
                        Confirmez votre email pour procéder.
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={confirmEmail}
                          onChange={(e) => setConfirmEmail(e.target.value)}
                          placeholder="Confirmez votre email"
                          className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                        />
                        <button
                          onClick={setOwnerRole}
                          disabled={loading || confirmEmail !== debugInfo.email}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                        >
                          Définir Owner
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Détails du profil */}
              {debugInfo.profileData && (
                <div className="bg-gray-800/50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-white mb-4">Détails du Profil</h2>
                  <pre className="text-gray-300 text-sm bg-gray-900/50 p-4 rounded overflow-auto">
                    {JSON.stringify(debugInfo.profileData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <h3 className="text-yellow-400 font-medium mb-2">Instructions d'utilisation :</h3>
            <ol className="text-yellow-200 text-sm space-y-1 list-decimal list-inside">
              <li>Vérifiez vos informations actuelles</li>
              <li>Si aucun profil n'existe, créez-en un</li>
              <li>Pour devenir owner, confirmez votre email et cliquez sur "Définir Owner"</li>
              <li>Rechargez la page après avoir changé votre rôle</li>
            </ol>
          </div>
        </Card>
      </div>
    </div>
  );
}
