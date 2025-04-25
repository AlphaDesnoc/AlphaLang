import { Editor } from "../components/Editor.tsx";
import { Output } from "../components/Output.tsx";
import { Actions } from "../components/Actions.tsx";

export function LiveCodePage() {
  return (
    <div className="w-full h-full flex flex-col">
      <header className="flex justify-between items-center p-2 h-1/20">
        <h1 className="text-2xl font-bold">Live Coding</h1>
        <Actions />
      </header>
      <main className="flex-1 flex flex-row gap-2 p-2 h-19/20">
        <div className="h-full w-1/2">
            <Editor className="h-full w-full"/>
        </div>
        <div className="h-full w-1/2">
          <Output />
        </div>
      </main>
    </div>
  );
}
