import * as monaco from 'monaco-editor';

// Configuration simple sans workers pour éviter les erreurs
// @ts-ignore
self.MonacoEnvironment = {
  getWorker: function () {
    // Retourne un worker factice pour éviter les erreurs
    return {
      postMessage: () => {},
      terminate: () => {},
      addEventListener: () => {},
      removeEventListener: () => {}
    };
  }
};

export { monaco };
