import { useEffect, useRef } from "react";
import { Card } from "./Card.tsx";
import { initializeEditor } from "../signals/editor.ts";
import clsx from "clsx";

type Props = {
  defaultValue?: string;
  className?: string;
};

export function Editor({ defaultValue, className }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeEditor(divRef.current!, defaultValue);
  }, []);

  return <Card className={clsx(className)} divRef={divRef} />;
}
