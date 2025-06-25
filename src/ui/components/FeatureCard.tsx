import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  titleColor?: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, titleColor = "text-gray-800", className = "" }: FeatureCardProps) {
  return (
    <div className={`group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${className}`}>
      {/* Gradient overlay au hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 rounded-2xl"></div>
      
      {/* Contenu */}
      <div className="relative z-10">
        <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
          <div className="text-white">
            {icon}
          </div>
        </div>
        
        <h3 className={`text-2xl font-bold mb-4 ${titleColor} group-hover:text-white transition-colors duration-300`}>
          {title}
        </h3>
        
        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
          {description}
        </p>
        
        {/* Flèche */}
        <div className="flex items-center mt-6 text-slate-500 group-hover:text-white transition-all duration-300">
          <span className="text-sm font-medium">En savoir plus</span>
          <svg className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl transition-opacity duration-500 -z-10"></div>
    </div>
  );
} 