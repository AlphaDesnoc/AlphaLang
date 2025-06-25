import { PropsWithChildren } from "react";

export function MagicBackground({ children }: PropsWithChildren) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-slate-900">
      {/* Fond animé magique - version sombre */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 opacity-90" />
      {/* Particules lumineuses sombres */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="animate-float absolute top-1/4 left-1/3 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="animate-float2 absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="animate-float3 absolute top-2/3 right-1/2 w-16 h-16 bg-indigo-500/10 rounded-full blur-2xl" />
      </div>
      {children}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease-in-out infinite;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadein { animation: fadein 1.2s cubic-bezier(.4,0,.2,1) both; }
        .animate-fadein2 { animation: fadein 1.8s cubic-bezier(.4,0,.2,1) both; }
        .animate-fadein3 { animation: fadein 2.2s cubic-bezier(.4,0,.2,1) both; }
        .animate-fadein4 { animation: fadein 2.6s cubic-bezier(.4,0,.2,1) both; }
        .animate-fadein5 { animation: fadein 3s cubic-bezier(.4,0,.2,1) both; }
        @keyframes pop {
          0% { transform: scale(0.7); opacity: 0; }
          80% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-pop { animation: pop 1.1s cubic-bezier(.4,0,.2,1) both; }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 32px #a855f7, 0 0 8px #60a5fa; }
          50% { text-shadow: 0 0 64px #818cf8, 0 0 16px #f472b6; }
        }
        .animate-glow { animation: glow 2.5s ease-in-out infinite alternate; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float2 { animation: float 5.5s ease-in-out infinite; }
        .animate-float3 { animation: float 6.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
} 