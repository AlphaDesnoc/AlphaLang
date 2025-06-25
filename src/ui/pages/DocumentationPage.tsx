export function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Documentation
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Apprenez à maîtriser AlphaLang avec nos guides complets et nos références API
          </p>
        </div>

        {/* Navigation rapide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Démarrage rapide</h3>
            <p className="text-slate-400">Commencez votre premier programme en quelques minutes</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Référence API</h3>
            <p className="text-slate-400">Documentation complète de toutes les fonctions</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Tutoriels</h3>
            <p className="text-slate-400">Guides pas à pas pour maîtriser le langage</p>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
              <nav className="space-y-2">
                <a href="#introduction" className="block text-slate-400 hover:text-white transition-colors py-1">Introduction</a>
                <a href="#syntax" className="block text-slate-400 hover:text-white transition-colors py-1">Syntaxe de base</a>
                <a href="#variables" className="block text-slate-400 hover:text-white transition-colors py-1">Variables</a>
                <a href="#functions" className="block text-slate-400 hover:text-white transition-colors py-1">Fonctions</a>
                <a href="#loops" className="block text-slate-400 hover:text-white transition-colors py-1">Boucles</a>
                <a href="#examples" className="block text-slate-400 hover:text-white transition-colors py-1">Exemples</a>
              </nav>
            </div>
          </div>

          {/* Contenu */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6" id="introduction">Introduction à AlphaLang</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed mb-6">
                  AlphaLang est un langage de programmation moderne conçu pour l'apprentissage interactif. 
                  Il combine simplicité d'usage et puissance expressive pour offrir une expérience d'apprentissage optimale.
                </p>

                <h3 className="text-2xl font-semibold text-white mb-4 mt-8" id="syntax">Syntaxe de base</h3>
                
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`// Commentaire
afficher("Bonjour le monde!")

// Variables
soit nom = "AlphaLang"
soit version = 1.0`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4 mt-8" id="variables">Variables et types</h3>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  AlphaLang supporte plusieurs types de données natifs :
                </p>

                <ul className="text-slate-300 space-y-2 mb-6">
                  <li>• <span className="text-blue-400 font-mono">texte</span> - Chaînes de caractères</li>
                  <li>• <span className="text-green-400 font-mono">nombre</span> - Nombres entiers et décimaux</li>
                  <li>• <span className="text-purple-400 font-mono">booleen</span> - Valeurs vraies ou fausses</li>
                  <li>• <span className="text-yellow-400 font-mono">liste</span> - Collections d'éléments</li>
                </ul>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`soit nom: texte = "Alice"
soit age: nombre = 25
soit actif: booleen = vrai
soit scores: liste = [10, 20, 30]`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
