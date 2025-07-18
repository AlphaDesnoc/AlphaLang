import { Link } from "@tanstack/react-router";
import { LangIcon, BookIcon, ChallengeIcon, PlayIcon } from "../components/Icons.tsx";
import { FeatureCard } from "../components/FeatureCard";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Overlay avec pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:24px_24px] pointer-events-none"></div>
      
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo et titre */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
              <LangIcon size={48} />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              Bienvenue sur{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AlphaLang
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              La plateforme professionnelle pour apprendre, pratiquer et relever des défis de code en direct
            </p>
          </div>

          {/* Bouton CTA */}
          <div className="mb-16">
            <Link
              to="/livecoding"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              <PlayIcon size={24} />
              <span className="ml-3">Commencer maintenant</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Grid des features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<ChallengeIcon size={48} />}
              title="Exercices pratiques"
              description="Maîtrisez AlphaLang avec des exercices progressifs, des cas de test automatisés et un système de validation en temps réel."
              titleColor="text-blue-400"
            />
            <FeatureCard
              icon={<PlayIcon size={48} />}
              title="Codez en direct"
              description="Testez vos solutions instantanément dans un environnement interactif optimisé pour les performances."
              titleColor="text-purple-400"
            />
            <FeatureCard
              icon={<BookIcon size={48} />}
              title="Documentation complète"
              description="Apprenez AlphaLang avec une documentation détaillée, des exemples pratiques et des guides étape par étape."
              titleColor="text-emerald-400"
            />
          </div>
        </div>

        {/* Statistiques */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1000+</div>
            <div className="text-slate-400">Défis disponibles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-slate-400">Développeurs actifs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
            <div className="text-slate-400">Temps de disponibilité</div>
          </div>
        </div>
      </div>

      {/* Section About */}
      <div className="relative bg-gradient-to-br from-slate-800 via-blue-800 to-slate-800 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[length:32px_32px] pointer-events-none"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              L'histoire derrière{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AlphaLang
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <h3 className="text-2xl font-semibold text-white mb-4">Notre Vision</h3>
                <p className="text-slate-300 leading-relaxed">
                  Tout a commencé par une frustration personnelle : pourquoi était-il si difficile de trouver une plateforme 
                  qui combine à la fois l'apprentissage d'un langage de programmation et la pratique interactive ? 
                  En tant que développeur passionné, j'ai toujours cru que la meilleure façon d'apprendre est de <em>faire</em>.
                </p>
              </div>
              
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <h3 className="text-2xl font-semibold text-white mb-4">Le Défi</h3>
                <p className="text-slate-300 leading-relaxed">
                  L'idée d'AlphaLang est née d'un désir de créer quelque chose d'unique : un langage de programmation simple 
                  mais puissant, couplé à une plateforme d'apprentissage moderne. Pendant 4 mois intensifs, de avril à juillet 2025, 
                  j'ai travaillé sans relâche pour transformer cette vision en réalité.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <h3 className="text-2xl font-semibold text-white mb-4">L'Impact</h3>
                <p className="text-slate-300 leading-relaxed">
                  AlphaLang n'est pas juste un projet technique - c'est une passion qui vise à rendre la programmation 
                  accessible à tous. Chaque ligne de code a été écrite avec l'intention de créer une expérience 
                  d'apprentissage fluide et engageante.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
                <h3 className="text-2xl font-semibold text-white mb-4">Portfolio Project</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Ce projet représente l'aboutissement de mon parcours à{" "}
                  <a 
                    href="https://www.holbertonschool.fr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    Holberton School
                  </a>
                  , où j'ai acquis les compétences nécessaires pour mener à bien un projet de cette envergure.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-slate-400">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                    </svg>
                    Avril - Juillet 2025
                  </div>
                  <div className="text-sm text-slate-400">•</div>
                  <div className="text-sm text-blue-400">Portfolio Project</div>
                </div>
              </div>
            </div>
          </div>

          {/* Developer Section */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Le Développeur</h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Un projet personnel développé avec passion et dédié à l'innovation dans l'éducation technologique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {/* Developer Profile */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 text-center group hover:border-blue-500/30 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">A</span>
              </div>
              <h4 className="text-2xl font-semibold text-white mb-3">Mickael Chauvin</h4>
              <p className="text-slate-400 mb-6">Developpeur Full-Stack & Createur</p>
              <div className="mb-6">
                <p className="text-slate-300 text-sm leading-relaxed">
                  Passionné par la création d'outils éducatifs innovants, j'ai développé AlphaLang de A à Z 
                  pour offrir une expérience d'apprentissage unique et accessible à tous les développeurs.
                </p>
              </div>
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://linkedin.com/in/mickaelchauvin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors transform hover:scale-110"
                  title="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/AlphaDesnoc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors transform hover:scale-110"
                  title="GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Project Repository Card */}
            <div className="bg-gradient-to-br from-slate-900/80 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 text-center group hover:border-blue-400/50 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
                </svg>
              </div>
              <h4 className="text-2xl font-semibold text-white mb-3">Code Source</h4>
              <p className="text-slate-400 mb-6">Explorez le repository complet du projet AlphaLang</p>
              <div className="mb-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  Découvrez l'architecture, le code source, et contribuez au développement d'AlphaLang. 
                  Projet open-source disponible sous licence MIT.
                </p>
              </div>
              <a 
                href="https://github.com/AlphaDesnoc/AlphaLang" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 font-semibold"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
                </svg>
                Voir sur GitHub
                <svg className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
