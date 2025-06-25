import { Exercise, TestCase, ExerciseResult } from '../types/index.js';
import { interpret } from '../lang/interpreter.js';
import { StdOut } from '../lang/type.js';

export class ExerciseExecutionService {
  /**
   * Exécute le code utilisateur pour un exercice donné
   */
  async executeExercise(exercise: Exercise, userCode: string): Promise<ExerciseResult> {
    const startTime = Date.now();
    
    try {
      // Valider le code utilisateur
      if (!userCode.trim()) {
        return {
          passed: false,
          score: 0,
          passedTests: 0,
          totalTests: exercise.testCases.length,
          errors: ['Le code ne peut pas être vide'],
          output: '',
          executionTime: Date.now() - startTime
        };
      }

      // Exécuter les tests
      const testResults = await this.runTests(exercise.testCases, userCode);
      
      // Calculer le succès global
      const passedTests = testResults.filter(result => result.passed).length;
      const totalTests = testResults.length;
      const passed = passedTests === totalTests;
      const score = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
      
      const result: ExerciseResult = {
        passed,
        score,
        passedTests,
        totalTests,
        errors: testResults.filter(r => !r.passed).map(r => r.error || `Test "${r.name}" échoué`),
        output: testResults.map(r => `${r.name}: ${r.passed ? '✓' : '✗'}`).join('\n'),
        executionTime: Date.now() - startTime
      };

      return result;
    } catch (error: any) {
      return {
        passed: false,
        score: 0,
        passedTests: 0,
        totalTests: exercise.testCases.length,
        errors: [`Erreur d'exécution: ${error.message}`],
        output: '',
        executionTime: Date.now() - startTime
      };
    }
  }

  /**
   * Exécute une série de tests sur le code utilisateur
   */
  private async runTests(tests: TestCase[], userCode: string): Promise<Array<{
    name: string;
    passed: boolean;
    expected?: any;
    actual?: any;
    error?: string;
  }>> {
    const results: Array<{
      name: string;
      passed: boolean;
      expected?: any;
      actual?: any;
      error?: string;
    }> = [];

    for (const test of tests) {
      try {
        const result = await this.runSingleTest(test, userCode);
        results.push(result);
      } catch (error: any) {
        results.push({
          name: test.description,
          passed: false,
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * Exécute un test unique
   */
  private async runSingleTest(test: TestCase, userCode: string): Promise<{
    name: string;
    passed: boolean;
    expected?: any;
    actual?: any;
    error?: string;
  }> {
    try {
      // Pour les tests simples, on exécute juste le code utilisateur
      // et on capture la sortie
      let actualOutput: any = null;
      
      const stdout: StdOut = {
        push: (value: string) => {
          // Si c'est le premier output, on le garde
          if (actualOutput === null) {
            actualOutput = value;
          }
        },
        clear: () => {
          actualOutput = null;
        }
      };
      
      // Exécuter le code utilisateur
      await this.executeWithTimeout(
        () => {
          interpret(userCode, stdout);
          return actualOutput;
        },
        5000 // Timeout de 5 secondes
      );

      // Comparer le résultat
      const passed = this.compareValues(actualOutput, test.expectedOutput);

      return {
        name: test.description,
        passed,
        expected: test.expectedOutput,
        actual: actualOutput
      };
    } catch (error: any) {
      return {
        name: test.description,
        passed: false,
        error: error.message
      };
    }
  }

  /**
   * Exécute une fonction avec un timeout
   */
  private async executeWithTimeout<T>(fn: () => T, timeoutMs: number): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Timeout: L\'exécution a pris trop de temps'));
      }, timeoutMs);

      try {
        const result = fn();
        clearTimeout(timeout);
        resolve(result);
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    });
  }

  /**
   * Compare deux valeurs de manière flexible
   */
  private compareValues(actual: any, expected: any): boolean {
    // Comparaison de strings (en ignorant les espaces/retours à la ligne)
    if (typeof actual === 'string' && typeof expected === 'string') {
      return actual.trim() === expected.trim();
    }
    
    // Comparaison flexible entre string et number (pour les sorties d'affichage)
    if (typeof actual === 'string' && typeof expected === 'number') {
      const numericActual = parseFloat(actual);
      return !isNaN(numericActual) && Math.abs(numericActual - expected) < Number.EPSILON;
    }
    
    if (typeof actual === 'number' && typeof expected === 'string') {
      const numericExpected = parseFloat(expected);
      return !isNaN(numericExpected) && Math.abs(actual - numericExpected) < Number.EPSILON;
    }
    
    // Comparaison de nombres
    if (typeof actual === 'number' && typeof expected === 'number') {
      return Math.abs(actual - expected) < Number.EPSILON;
    }
    
    // Comparaison d'arrays
    if (Array.isArray(actual) && Array.isArray(expected)) {
      if (actual.length !== expected.length) return false;
      return actual.every((item, index) => this.compareValues(item, expected[index]));
    }
    
    // Comparaison d'objets
    if (typeof actual === 'object' && typeof expected === 'object' && actual !== null && expected !== null) {
      const actualKeys = Object.keys(actual).sort();
      const expectedKeys = Object.keys(expected).sort();
      
      if (actualKeys.length !== expectedKeys.length) return false;
      if (!actualKeys.every(key => expectedKeys.includes(key))) return false;
      
      return actualKeys.every(key => this.compareValues(actual[key], expected[key]));
    }
    
    // Comparaison exacte pour les autres types
    return actual === expected;
  }

  /**
   * Évalue une assertion personnalisée
   */
  private evaluateAssertion(assertion: string, output: any): boolean {
    try {
      // Remplacer {output} par la valeur réelle
      const processedAssertion = assertion.replace(/\{output\}/g, JSON.stringify(output));
      
      // Évaluer l'assertion (attention: eval est dangereux en production)
      // TODO: Implémenter un évaluateur sécurisé
      return eval(processedAssertion);
    } catch (error) {
      console.error('Erreur lors de l\'évaluation de l\'assertion:', error);
      return false;
    }
  }

  /**
   * Génère du code de test automatique pour des fonctions simples
   */
  generateAutoTest(functionName: string, inputs: any[], expectedOutput: any): TestCase {
    return {
      input: inputs,
      expectedOutput: expectedOutput,
      description: `Test auto: ${functionName}(${inputs.map(input => 
        typeof input === 'string' ? `"${input}"` : JSON.stringify(input)
      ).join(', ')})`
    };
  }

  /**
   * Valide la syntaxe du code utilisateur
   */
  validateSyntax(code: string): { valid: boolean; error?: string } {
    try {
      // Tenter de parser le code pour vérifier la syntaxe
      const stdout: StdOut = {
        push: () => {},
        clear: () => {}
      };
      
      interpret(code, stdout);
      return { valid: true };
    } catch (error: any) {
      return { 
        valid: false, 
        error: error.message || 'Erreur de syntaxe' 
      };
    }
  }
}
