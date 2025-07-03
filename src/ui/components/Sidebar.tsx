
import { Link } from "@tanstack/react-router";
import { LangIcon, ChallengeIcon, BookIcon, MenuIcon, XIcon, LogInIcon, LogOutIcon } from "./Icons.tsx";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePermissions } from "./PermissionGuard";
import { LoginForm } from "./LoginForm";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const { isAdmin } = usePermissions();

  // Fermer le dropdown quand la sidebar se ferme
  useEffect(() => {
    if (!isOpen) {
      setIsUserMenuOpen(false);
    }
  }, [isOpen]);

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <>
      <aside
        className={`h-screen bg-slate-900/95 backdrop-blur-md border-r border-slate-800 transition-all duration-300 flex-shrink-0 ${
          isOpen ? 'w-72' : 'w-16'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {isOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <LangIcon size={28} />
                </div>
                <span className="text-white font-semibold text-lg">AlphaLang</span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors duration-200"
          >
            {isOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/"
            className={`group flex items-center rounded-lg p-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 ${
              isOpen ? 'justify-start' : 'justify-center'
            }`}
          >
            <div className={`flex items-center justify-center ${isOpen ? 'w-6 h-6' : 'w-8 h-8'}`}>
              <LangIcon size={isOpen ? 24 : 28} />
            </div>
            {isOpen && (
              <span className="ml-3 font-medium opacity-0 animate-[fadeIn_0.2s_ease-in_0.1s_both]">
                Accueil
              </span>
            )}
          </Link>

          <Link
            to="/livecoding"
            className={`group flex items-center rounded-lg p-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 ${
              isOpen ? 'justify-start' : 'justify-center'
            }`}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <ChallengeIcon size={24} />
            </div>
            {isOpen && (
              <span className="ml-3 font-medium opacity-0 animate-[fadeIn_0.2s_ease-in_0.1s_both]">
                Live Coding
              </span>
            )}
          </Link>

          <Link
            to="/exercises"
            className={`group flex items-center rounded-lg p-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 ${
              isOpen ? 'justify-start' : 'justify-center'
            }`}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            {isOpen && (
              <span className="ml-3 font-medium opacity-0 animate-[fadeIn_0.2s_ease-in_0.1s_both]">
                Exercices
              </span>
            )}
          </Link>

          <Link
            to="/documentation"
            className={`group flex items-center rounded-lg p-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 ${
              isOpen ? 'justify-start' : 'justify-center'
            }`}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <BookIcon size={24} />
            </div>
            {isOpen && (
              <span className="ml-3 font-medium opacity-0 animate-[fadeIn_0.2s_ease-in_0.1s_both]">
                Documentation
              </span>
            )}
          </Link>

          {/* Lien Administration - seulement pour les admins */}
          {isAdmin && (
            <Link
              to="/admin"
              className={`group flex items-center rounded-lg p-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 ${
                isOpen ? 'justify-start' : 'justify-center'
              }`}
            >
              <div className="flex items-center justify-center w-6 h-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              {isOpen && (
                <span className="ml-3 font-medium opacity-0 animate-[fadeIn_0.2s_ease-in_0.1s_both]">
                  Administration
                </span>
              )}
            </Link>
          )}
        </nav>

        {/* Menu utilisateur - visible dans les deux états */}
        <div className={`absolute ${isOpen ? 'left-4 right-4 bottom-4' : 'left-2 right-2 bottom-4'}`} ref={dropdownRef}>
          {user ? (
            <>
              {/* Menu dropdown - seulement si sidebar ouverte et utilisateur connecté */}
              {isUserMenuOpen && isOpen && (
                <div className="mb-2 bg-slate-800 rounded-lg border border-slate-700 shadow-lg">
                  <div className="p-2 space-y-1">
                    <Link 
                      to="/account"
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded-md transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <span>Mon compte</span>
                    </Link>
                    <hr className="my-1 border-slate-600" />
                    <button 
                      onClick={logout}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded-md transition-colors"
                    >
                      <LogOutIcon size={16} />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Profil utilisateur connecté */}
              <button 
                onClick={() => {
                  if (isOpen) {
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }
                }}
                className={`bg-slate-800/80 rounded-lg border border-slate-700 transition-colors ${
                  isOpen 
                    ? 'w-full p-3 opacity-0 animate-[fadeIn_0.3s_ease-in_0.2s_both] hover:bg-slate-800' 
                    : 'w-12 h-12 flex items-center justify-center mx-auto cursor-default'
                }`}
              >
                {isOpen ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-sm font-medium text-white truncate">
                        {user.displayName || user.email?.split('@')[0] || 'Utilisateur'}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-xs text-slate-400 truncate">{user.email}</div>
                        {(user.role === 'admin' || user.role === 'owner') && (
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            user.role === 'owner' 
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {user.role}
                          </span>
                        )}
                      </div>
                    </div>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className={`text-slate-400 transition-transform flex-shrink-0 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                  </div>
                )}
              </button>
            </>
          ) : (
            /* Bouton de connexion pour utilisateur non connecté */
            <button 
              onClick={() => setShowLoginForm(true)}
              className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg border border-blue-500/50 transition-all hover:from-blue-700 hover:to-purple-700 ${
                isOpen 
                  ? 'w-full p-3 opacity-0 animate-[fadeIn_0.3s_ease-in_0.2s_both]' 
                  : 'w-12 h-12 flex items-center justify-center mx-auto'
              }`}
            >
              {isOpen ? (
                <div className="flex items-center space-x-3">
                  <LogInIcon size={20} />
                  <span className="text-white font-medium">Se connecter</span>
                </div>
              ) : (
                <LogInIcon size={20} />
              )}
            </button>
          )}
        </div>
      </aside>

      {/* Modal de connexion */}
      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
    </>
  );
}
