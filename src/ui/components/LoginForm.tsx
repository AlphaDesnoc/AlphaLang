import React, { useState } from 'react';
import { EmailIcon, LockIcon, EyeIcon, EyeOffIcon, UserIcon, LogInIcon } from './Icons';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormProps {
  onClose: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, displayName);
      }
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      {/* Background pattern overlay similaire à HomePage */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[length:32px_32px] pointer-events-none"></div>
      
      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10"></div>
        
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative group">
          {/* Gradient background overlay avec le même style que les FeatureCards */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
          
          {/* Close button modernisé */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-300 group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:rotate-90 transition-transform duration-300">
              <path d="m18 6-12 12"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>

          <div className="relative p-8 sm:p-10">
            {/* Header modernisé */}
            <div className="text-center mb-10">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <LogInIcon size={32} />
                </div>
                {/* Anneau lumineux autour de l'icône */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-600/30 blur-md -z-10 group-hover:blur-lg transition-all duration-500"></div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
                {isLogin ? 'Connexion' : 'Créer un compte'}
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                {isLogin ? 'Accédez à votre espace AlphaLang' : 'Rejoignez la communauté AlphaLang'}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom d'affichage (inscription uniquement) */}
              {!isLogin && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-300">
                    Nom d'affichage
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300">
                      <UserIcon size={20} />
                    </div>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 hover:bg-white/5 transition-all duration-300"
                      placeholder="Votre nom"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-300">
                  Adresse email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300">
                    <EmailIcon size={20} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 hover:bg-white/5 transition-all duration-300"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-300">
                  Mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300">
                    <LockIcon size={20} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 hover:bg-white/5 transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                  </button>
                </div>
                {!isLogin && (
                  <p className="text-xs text-slate-500 mt-2 flex items-start">
                    <svg className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Le mot de passe doit contenir au moins 6 caractères
                  </p>
                )}
              </div>

              {/* Message d'erreur modernisé */}
              {error && (
                <div className="relative overflow-hidden bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5"></div>
                  <div className="relative flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-200 text-sm leading-relaxed">{error}</p>
                  </div>
                </div>
              )}

              {/* Bouton de soumission modernisé */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] transform relative overflow-hidden group"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                
                <div className="relative flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Chargement...</span>
                    </>
                  ) : (
                    <>
                      <LogInIcon size={20} />
                      <span>{isLogin ? 'Se connecter' : 'Créer un compte'}</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Toggle entre connexion et inscription modernisé */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <p className="text-slate-400 mb-4">
                  {isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
                </p>
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setEmail('');
                    setPassword('');
                    setDisplayName('');
                  }}
                  className="inline-flex items-center px-6 py-3 text-sm font-semibold bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-blue-400 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <span>{isLogin ? 'Créer un compte' : 'Se connecter'}</span>
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
