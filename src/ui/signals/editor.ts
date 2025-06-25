import {
  editor as MonacoEditor,
  MarkerSeverity,
} from "monaco-editor/esm/vs/editor/editor.api";
import { langId } from "../monaco.ts";
import { signal } from "@maverick-js/signals";
import { interpret } from "../../lang/interpreter.ts";
import { CodeError } from "../../lang/errors.ts";
import { useSignalValue } from "../hooks/useSignalValue.ts";

let editor: MonacoEditor.IStandaloneCodeEditor | null = null;
const $out = signal([] as string[]);
const $error = signal(null as string | null);
const stdOut = {
  push: (s: string) => {
    $out.set((v) => [...v, s]);
  },
  clear: () => {
    $out.set([]);
  },
};

export function initializeEditor(el: HTMLElement, initialValue: string = "") {
  // Nettoyage de l'ancien éditeur s'il existe
  if (editor) {
    editor.dispose();
  }
  
  editor = MonacoEditor.create(el, {
    value: initialValue,
    language: langId,
    theme: 'vs-dark',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 16,
    automaticLayout: true,
    padding: { top: 14 },
    readOnly: false, // S'assurer que l'éditeur est éditable
    scrollbar: {
      verticalScrollbarSize: 8,
      verticalSliderSize: 5,
      horizontalScrollbarSize: 8,
      horizontalSliderSize: 5,
    },
    // Configuration pour permettre l'édition
    quickSuggestions: { other: true, strings: true },
    wordWrap: 'on',
    lineNumbers: 'on',
    glyphMargin: true,
    folding: true,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
  });
  
  // S'assurer que l'éditeur a le focus pour l'édition
  editor.focus();
}

export function runCode() {
  if (!editor) {
    return;
  }
  const source = editor.getModel()?.getValue() ?? "";
  $error.set(null);
  try {
    stdOut.clear();
    interpret(source, stdOut);
    MonacoEditor.removeAllMarkers("lang");
  } catch (e) {
    if (e instanceof CodeError) {
      $error.set(e.withSource(source));
      MonacoEditor.setModelMarkers(editor.getModel()!, "lang", [
        {
          severity: MarkerSeverity.Error,
          ...e.getMarker(source),
        },
      ]);
    } else {
      throw e;
    }
  }
}

export function useOutput() {
  return useSignalValue($out).join("\n");
}

export function useError() {
  return useSignalValue($error);
}

export function clearOutput() {
  stdOut.clear();
  $error.set(null);
}
