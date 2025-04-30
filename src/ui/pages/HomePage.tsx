import { Link } from "@tanstack/react-router";
import { LangIcon, BookIcon, ChallengeIcon, PlayIcon } from "../components/Icons.tsx";
import { MagicBackground } from "../components/MagicBackground";
import { FeatureCard } from "../components/FeatureCard";

export function HomePage() {
  return (
    <MagicBackground>
      <div className="flex flex-col items-center gap-4 max-w-xl animate-fadein">
        <span className="drop-shadow-[0_0_16px_rgba(99,102,241,0.7)] animate-pop">
          <LangIcon size={80} />
        </span>
        <h1 className="text-5xl font-extrabold text-white text-center animate-glow drop-shadow-[0_0_32px_rgba(168,85,247,0.7)]">
          Bienvenue sur AlphaLang
        </h1>
        <p className="text-xl text-white/90 text-center animate-fadein2">
          La plateforme pour apprendre, pratiquer et relever des défis de code en direct&nbsp;!
        </p>
        <Link
          to="/livecoding"
          className="mt-4 px-10 py-4 bg-gradient-to-r from-blue-600 via-fuchsia-500 to-purple-600 hover:from-fuchsia-500 hover:to-blue-600 text-white rounded-full text-xl font-bold shadow-xl transition-all duration-300 flex items-center gap-3 hover:scale-105 focus:ring-4 focus:ring-fuchsia-300 border-2 border-white/80"
        >
          <PlayIcon size={28} />
          Commencer
        </Link>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <FeatureCard
            icon={<span className="animate-float2"><ChallengeIcon size={40} /></span>}
            title="Résolvez des challenges"
            description="Progressez grâce à des exercices variés et adaptés à tous les niveaux."
            titleColor="text-fuchsia-700"
            className="animate-fadein3"
          />
          <FeatureCard
            icon={<span className="animate-float3"><PlayIcon size={40} /></span>}
            title="Codez en direct"
            description="Testez vos solutions instantanément dans un environnement interactif."
            titleColor="text-blue-700"
            className="animate-fadein4"
          />
          <FeatureCard
            icon={<span className="animate-float"><BookIcon size={40} /></span>}
            title="Progressez à votre rythme"
            description="Suivez votre évolution et débloquez de nouveaux défis au fil de votre apprentissage."
            titleColor="text-purple-700"
            className="animate-fadein5"
          />
        </div>
      </div>
    </MagicBackground>
  );
}
