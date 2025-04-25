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
    <div className={`flex flex-col items-center bg-white/80 rounded-2xl shadow-xl p-6 backdrop-blur-md ${className}`}>
      <span>{icon}</span>
      <h2 className={`font-bold mt-5 mb-5 text-lg w-full text-center ${titleColor}`}>{title}</h2>
      <p className="text-sm text-gray-700 text-center">{description}</p>
    </div>
  );
} 