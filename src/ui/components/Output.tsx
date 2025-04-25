import { Card } from "./Card.tsx";
import { OutputIcon } from "./Icons.tsx";
import { useError, useOutput } from "../signals/editor.ts";

export function Output() {
  const output = useOutput();
  const error = useError();
  console.log("reRender");
  return (
    <Card
      padded
      title={
        <div className="flex items-center gap-2 bg-gray-100 p-3 mb-2">
          <OutputIcon size={20} /> Sortie
        </div>
      }
      className="h-full w-full overflow-auto"
    >
      <pre>
        <code className="text-xs font-mono p-0 m-0">{error ?? output}</code>
      </pre>
    </Card>
  );
}
