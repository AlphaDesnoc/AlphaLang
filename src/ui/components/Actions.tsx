import { PlayIcon } from "./Icons.tsx";
import { runCode } from "../signals/editor.ts";

export function Actions() {
  return (
    <div className="border-[#32354f] border-1 rounded-sm">
      <button onClick={runCode} type="button" className="color-[#ffbf00] text-sm pt-1 pb-1 pl-2 pr-2 flex items-center gap-1 bg-[#1A1B26] hover:bg-[#C0CAF5]">
        <PlayIcon />
        Exécuter
      </button>
    </div>
  );
}
