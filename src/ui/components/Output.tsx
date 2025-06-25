import { useError, useOutput } from "../signals/editor.ts";

export function Output() {
  const error = useError();
  const output = useOutput();
  const displayText = (error ?? output) || "// Prêt à exécuter votre code AlphaLang...\n// Cliquez sur 'Exécuter' pour voir les résultats ici.";
  
  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden bg-slate-900 p-4">
      <pre className="w-full min-h-0">
        <code className="text-sm font-mono text-green-400 leading-relaxed whitespace-pre-wrap break-words block">
          {displayText}
        </code>
      </pre>
    </div>
  );
}
