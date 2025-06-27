export function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Documentation AlphaLang
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Guide complet du langage de programmation AlphaLang - Syntaxe, fonctions et exemples
          </p>
        </div>

        {/* Navigation rapide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Syntaxe</h3>
            <p className="text-slate-400">Mots-clés et structure du langage</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Variables</h3>
            <p className="text-slate-400">Types de données et déclarations</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Fonctions</h3>
            <p className="text-slate-400">Créer et utiliser des fonctions</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Boucles</h3>
            <p className="text-slate-400">Structures de répétition</p>
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
                <a href="#operators" className="block text-slate-400 hover:text-white transition-colors py-1">Opérateurs</a>
                <a href="#conditions" className="block text-slate-400 hover:text-white transition-colors py-1">Conditions</a>
                <a href="#loops" className="block text-slate-400 hover:text-white transition-colors py-1">Boucles</a>
                <a href="#functions" className="block text-slate-400 hover:text-white transition-colors py-1">Fonctions</a>
                <a href="#arrays" className="block text-slate-400 hover:text-white transition-colors py-1">Tableaux</a>
                <a href="#stdlib" className="block text-slate-400 hover:text-white transition-colors py-1">Bibliothèque standard</a>
                <a href="#examples" className="block text-slate-400 hover:text-white transition-colors py-1">Exemples</a>
              </nav>
            </div>
          </div>

          {/* Contenu */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Introduction à AlphaLang</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed mb-6">
                    AlphaLang est un langage de programmation moderne conçu pour l'apprentissage interactif. 
                    Il combine simplicité d'usage et puissance expressive pour offrir une expérience d'apprentissage optimale.
                  </p>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Le langage supporte à la fois la syntaxe française et anglaise, permettant aux apprenants 
                    de programmer dans leur langue maternelle.
                  </p>
                </div>
              </section>

              {/* Syntaxe de base */}
              <section id="syntax" className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Syntaxe de base</h2>
                
                <h3 className="text-2xl font-semibold text-white mb-4">Commentaires</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`// Ceci est un commentaire sur une ligne
afficher("Bonjour le monde!")  // Commentaire en fin de ligne`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Affichage</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`afficher("Bonjour!")           // Français
print("Hello!")               // Anglais`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Mots-clés bilingues</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Français</h4>
                    <ul className="text-slate-300 space-y-1 text-sm font-mono">
                      <li>• <span className="text-yellow-400">var</span> - déclarer une variable</li>
                      <li>• <span className="text-yellow-400">si</span> - condition</li>
                      <li>• <span className="text-yellow-400">sinon</span> - sinon</li>
                      <li>• <span className="text-yellow-400">alors</span> - alors</li>
                      <li>• <span className="text-yellow-400">tantque</span> - boucle while</li>
                      <li>• <span className="text-yellow-400">pour</span> - boucle for</li>
                      <li>• <span className="text-yellow-400">pourchaque</span> - boucle foreach</li>
                      <li>• <span className="text-yellow-400">dans</span> - dans/in</li>
                      <li>• <span className="text-yellow-400">fonction</span> - fonction</li>
                      <li>• <span className="text-yellow-400">retourner</span> - return</li>
                      <li>• <span className="text-yellow-400">vrai</span> / <span className="text-yellow-400">faux</span> - booléens</li>
                      <li>• <span className="text-yellow-400">et</span> / <span className="text-yellow-400">ou</span> - logique</li>
                      <li>• <span className="text-yellow-400">fin</span> - fin de bloc</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="text-lg font-semibold text-green-400 mb-2">Anglais</h4>
                    <ul className="text-slate-300 space-y-1 text-sm font-mono">
                      <li>• <span className="text-yellow-400">var</span> - declare variable</li>
                      <li>• <span className="text-yellow-400">if</span> - condition</li>
                      <li>• <span className="text-yellow-400">else</span> - else</li>
                      <li>• <span className="text-yellow-400">then</span> - then</li>
                      <li>• <span className="text-yellow-400">while</span> - while loop</li>
                      <li>• <span className="text-yellow-400">for</span> - for loop</li>
                      <li>• <span className="text-yellow-400">foreach</span> - foreach loop</li>
                      <li>• <span className="text-yellow-400">in</span> - in</li>
                      <li>• <span className="text-yellow-400">function</span> - function</li>
                      <li>• <span className="text-yellow-400">return</span> - return</li>
                      <li>• <span className="text-yellow-400">true</span> / <span className="text-yellow-400">false</span> - booleans</li>
                      <li>• <span className="text-yellow-400">and</span> / <span className="text-yellow-400">or</span> - logic</li>
                      <li>• <span className="text-yellow-400">end</span> - end block</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Variables */}
              <section id="variables" className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Variables et types</h2>
                
                <h3 className="text-2xl font-semibold text-white mb-4">Déclaration de variables</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`var nom = "Alice"              // Chaîne de caractères
var age = 25                   // Nombre entier
var taille = 1.75              // Nombre décimal
var actif = vrai               // Booléen
var scores = [10, 20, 30]      // Tableau`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Types de données</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Types primitifs</h4>
                    <ul className="text-slate-300 space-y-2">
                      <li>• <span className="text-yellow-400 font-mono">Chaîne</span> - <code className="text-green-400">"Hello"</code></li>
                      <li>• <span className="text-yellow-400 font-mono">Nombre</span> - <code className="text-green-400">42</code>, <code className="text-green-400">3.14</code></li>
                      <li>• <span className="text-yellow-400 font-mono">Booléen</span> - <code className="text-green-400">vrai</code>, <code className="text-green-400">faux</code></li>
                      <li>• <span className="text-yellow-400 font-mono">Null</span> - <code className="text-green-400">null</code></li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="text-lg font-semibold text-purple-400 mb-2">Types composés</h4>
                    <ul className="text-slate-300 space-y-2">
                      <li>• <span className="text-yellow-400 font-mono">Tableau</span> - <code className="text-green-400">[1, 2, 3]</code></li>
                      <li>• <span className="text-yellow-400 font-mono">Fonction</span> - <code className="text-green-400">fonction()</code></li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Opérateurs */}
              <section id="operators" className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Opérateurs</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Opérateurs arithmétiques</h3>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                      <pre className="text-green-400 font-mono text-sm">
{`var a = 10
var b = 3

afficher(a + b)    // Addition: 13
afficher(a - b)    // Soustraction: 7
afficher(a * b)    // Multiplication: 30
afficher(a / b)    // Division: 3.33...`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Opérateurs de comparaison</h3>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                      <pre className="text-green-400 font-mono text-sm">
{`var x = 5
var y = 10

afficher(x == y)    // Égalité: faux
afficher(x != y)    // Différence: vrai
afficher(x < y)     // Inférieur: vrai
afficher(x > y)     // Supérieur: faux
afficher(x <= y)    // Inférieur ou égal: vrai
afficher(x >= y)    // Supérieur ou égal: faux`}
                      </pre>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Opérateurs logiques</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`var a = vrai
var b = faux

afficher(a et b)    // ET logique: faux
afficher(a ou b)    // OU logique: vrai
afficher(!a)        // NON logique: faux`}
                  </pre>
                </div>
              </section>

              {/* Conditions */}
              <section id="conditions" className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Structures conditionnelles</h2>
                
                <h3 className="text-2xl font-semibold text-white mb-4">Conditions simples</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`var age = 18

si age >= 18 alors
    afficher("Vous êtes majeur")
fin

// Avec sinon
si age >= 18 alors
    afficher("Majeur")
sinon
    afficher("Mineur")
fin`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Conditions complexes</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`var age = 25
var permis = vrai

si age >= 18 et permis alors
    afficher("Peut conduire")
sinon
    afficher("Ne peut pas conduire")
fin`}
                  </pre>
                </div>
              </section>

              {/* Boucles */}
              <section id="loops" className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Boucles</h2>
                
                <h3 className="text-2xl font-semibold text-white mb-4">Boucle while (tantque)</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`var i = 0
tantque i < 5 alors
    afficher(i)
    i = i + 1
fin

// Affiche: 0, 1, 2, 3, 4`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Boucle for (pour)</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`pour i entre 1 et 5 alors
    afficher(i)
fin

// Affiche: 1, 2, 3, 4, 5`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Boucle foreach (pourchaque)</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`var fruits = ["pomme", "banane", "orange"]

pourchaque fruit dans fruits alors
    afficher("J'aime les " + fruit)
fin

// Alternative en anglais
foreach item in fruits then
    print(item)
end`}
                  </pre>
                </div>
              </section>

              {/* Fonctions */}
              <section id="functions" className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Fonctions</h2>
                
                <h3 className="text-2xl font-semibold text-white mb-4">Déclaration de fonction</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`fonction saluer(nom)
    afficher("Bonjour " + nom)
fin

// Appel de fonction
saluer("Alice")`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Fonctions avec valeur de retour</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`fonction additionner(a, b)
    retourner a + b
fin

var resultat = additionner(5, 3)
afficher(resultat)  // Affiche: 8`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Fonctions avec plusieurs paramètres</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`fonction calculerMoyenne(notes)
    var somme = 0
    pourchaque note dans notes alors
        somme = somme + note
    fin
    retourner somme / taille(notes)
fin

var mesNotes = [15, 18, 12, 16]
var moyenne = calculerMoyenne(mesNotes)
afficher("Moyenne: " + moyenne)`}
                  </pre>
                </div>
              </section>

              {/* Tableaux */}
              <section id="arrays" className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Tableaux</h2>
                
                <h3 className="text-2xl font-semibold text-white mb-4">Création et accès</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`var nombres = [1, 2, 3, 4, 5]
var couleurs = ["rouge", "vert", "bleu"]

// Accès aux éléments
afficher(nombres[0])     // Premier élément: 1
afficher(couleurs[2])    // Troisième élément: "bleu"

// Modification
nombres[0] = 10
afficher(nombres[0])     // Affiche: 10`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Tableaux multidimensionnels</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`var matrice = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

afficher(matrice[1][2])  // Affiche: 6`}
                  </pre>
                </div>
              </section>

              {/* Bibliothèque standard */}
              <section id="stdlib" className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Bibliothèque standard</h2>
                
                <h3 className="text-2xl font-semibold text-white mb-4">Fonctions mathématiques</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`var nombre = 3.7
afficher(arrondir(nombre))    // Arrondit: 4`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Fonctions sur les tableaux</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`var liste = [1, 2, 3, 4, 5]
afficher(taille(liste))       // Taille du tableau: 5`}
                  </pre>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <h4 className="text-blue-200 font-medium mb-2">Fonctions disponibles</h4>
                  <ul className="text-blue-200/80 text-sm space-y-1">
                    <li>• <span className="text-yellow-400 font-mono">arrondir(nombre)</span> - Arrondit un nombre</li>
                    <li>• <span className="text-yellow-400 font-mono">taille(tableau)</span> - Retourne la taille d'un tableau</li>
                    <li>• <span className="text-yellow-400 font-mono">afficher(valeur)</span> - Affiche une valeur</li>
                  </ul>
                </div>
              </section>

              {/* Exemples */}
              <section id="examples" className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Exemples pratiques</h2>
                
                <h3 className="text-2xl font-semibold text-white mb-4">Calculatrice simple</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`fonction calculer(a, b, operation)
    si operation == "+" alors
        retourner a + b
    sinon si operation == "-" alors
        retourner a - b
    sinon si operation == "*" alors
        retourner a * b
    sinon si operation == "/" alors
        si b != 0 alors
            retourner a / b
        sinon
            afficher("Erreur: division par zéro")
        fin
    fin
fin

var resultat = calculer(10, 5, "+")
afficher("Résultat: " + resultat)`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Tri d'un tableau</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`fonction trierTableau(tableau)
    var n = taille(tableau)
    pour i entre 0 et n-1 alors
        pour j entre 0 et n-i-2 alors
            si tableau[j] > tableau[j+1] alors
                var temp = tableau[j]
                tableau[j] = tableau[j+1]
                tableau[j+1] = temp
            fin
        fin
    fin
    retourner tableau
fin

var nombres = [64, 34, 25, 12, 22, 11, 90]
var nombresTries = trierTableau(nombres)
afficher(nombresTries)`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Jeu de devinette</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`fonction devinerNombre()
    var nombreSecret = 42
    var tentatives = 0
    var trouve = faux
    
    afficher("Devinez le nombre entre 1 et 100!")
    
    tantque !trouve alors
        // Simulation d'une entrée utilisateur
        var proposition = 42  // Remplacer par une vraie entrée
        tentatives = tentatives + 1
        
        si proposition == nombreSecret alors
            afficher("Bravo! Vous avez trouvé en " + tentatives + " tentatives!")
            trouve = vrai
        sinon si proposition < nombreSecret alors
            afficher("Trop petit!")
        sinon
            afficher("Trop grand!")
        fin
    fin
fin

devinerNombre()`}
                  </pre>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">Gestion d'une liste de tâches</h3>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`var taches = []

fonction ajouterTache(tache)
    // Ajouter à la fin du tableau
    var index = taille(taches)
    taches[index] = tache
    afficher("Tâche ajoutée: " + tache)
fin

fonction afficherTaches()
    afficher("=== Liste des tâches ===")
    si taille(taches) == 0 alors
        afficher("Aucune tâche")
    sinon
        pour i entre 0 et taille(taches)-1 alors
            afficher((i+1) + ". " + taches[i])
        fin
    fin
fin

// Utilisation
ajouterTache("Apprendre AlphaLang")
ajouterTache("Faire les exercices")
ajouterTache("Créer un projet")
afficherTaches()`}
                  </pre>
                </div>
              </section>

              {/* Conseils et bonnes pratiques */}
              <section id="tips" className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Conseils et bonnes pratiques</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                    <h3 className="text-green-200 font-semibold mb-3">✅ Bonnes pratiques</h3>
                    <ul className="text-green-200/80 space-y-2 text-sm">
                      <li>• Utilisez des noms de variables descriptifs</li>
                      <li>• Commentez votre code</li>
                      <li>• Indentez correctement vos blocs</li>
                      <li>• Testez vos fonctions avec différents paramètres</li>
                      <li>• Gérez les cas d'erreur (division par zéro, etc.)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                    <h3 className="text-red-200 font-semibold mb-3">❌ À éviter</h3>
                    <ul className="text-red-200/80 space-y-2 text-sm">
                      <li>• Noms de variables trop courts (a, b, x)</li>
                      <li>• Fonctions trop longues</li>
                      <li>• Boucles infinies</li>
                      <li>• Oublier les mots-clés <code>alors</code> et <code>fin</code></li>
                      <li>• Mélanger français et anglais dans le même code</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Ressources */}
              <section id="resources" className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Ressources supplémentaires</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Exercices</h3>
                    <p className="text-slate-400 text-sm">Pratiquez avec nos exercices interactifs</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Éditeur</h3>
                    <p className="text-slate-400 text-sm">Testez votre code en temps réel</p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Communauté</h3>
                    <p className="text-slate-400 text-sm">Rejoignez la communauté AlphaLang</p>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
