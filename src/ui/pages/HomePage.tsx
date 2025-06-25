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
              title="Résolvez des challenges"
              description="Progressez grâce à des exercices variés et adaptés à tous les niveaux avec un système de scoring avancé."
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
              title="Progressez à votre rythme"
              description="Suivez votre évolution avec des analytics détaillés et débloquez de nouveaux défis progressivement."
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
    </div>
  );
}
