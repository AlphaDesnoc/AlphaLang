import { Editor } from "../components/Editor.tsx";
import { Output } from "../components/Output.tsx";
import { PlayIcon, SubmitIcon, ClearIcon } from "../components/Icons.tsx";
import { runCode, clearOutput } from "../signals/editor.ts";

export function LiveCodePage() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col">
      {/* Header moderne */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <PlayIcon size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Live Coding</h1>
              <p className="text-sm text-slate-400">Environnement de développement interactif</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={runCode}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
          >
            <SubmitIcon size={16} />
            <span className="ml-2 font-medium">Exécuter</span>
          </button>
          <button 
            onClick={clearOutput}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-200 shadow-lg"
          >
            <ClearIcon size={16} />
            <span className="ml-2 font-medium">Clear</span>
          </button>
        </div>
      </header>

      {/* Layout principal */}
      <main className="flex-1 flex overflow-hidden">
        {/* Panel de gauche - Éditeur */}
        <div className="flex-1 flex flex-col border-r border-slate-700">
          {/* Header de l'éditeur */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-3 text-sm text-slate-400 font-mono">main.alpha</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span>AlphaLang</span>
              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
              <span>UTF-8</span>
            </div>
          </div>
          
          {/* Éditeur */}
          <div className="flex-1 relative bg-slate-900">
            <Editor 
              className="h-full w-full" 
              defaultValue={`POUR I ENTRE 0 ET 100
  AFFICHER("Compteur: " + I)
FIN`}
            />
          </div>
          
          {/* Footer de l'éditeur */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-t border-slate-700 text-xs text-slate-400">
            <div className="flex items-center space-x-4">
              <span>Ligne 1, Colonne 1</span>
              <span>•</span>
              <span>Espaces: 2</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>AlphaLang v1.0</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Prêt</span>
              </span>
            </div>
          </div>
        </div>

        {/* Panel de droite - Output */}
        <div className="w-96 flex flex-col bg-slate-900">
          {/* Header de l'output */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
            <h3 className="text-sm font-medium text-white">Console</h3>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Actif</span>
            </div>
          </div>
          
          {/* Output content */}
          <div className="flex-1 overflow-hidden">
            <Output />
          </div>
        </div>
      </main>

      {/* Status bar */}
      <footer className="flex items-center justify-between px-6 py-2 bg-slate-900 border-t border-slate-700 text-xs text-slate-400">
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Compilation en cours...</span>
          </span>
          <span>Dernière exécution: 14:32:05</span>
        </div>
        <div className="flex items-center space-x-6">
          <span>Mémoire: 2.1MB</span>
          <span>Temps: 0.025s</span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>En ligne</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
