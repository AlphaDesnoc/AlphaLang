import { useEffect, useRef } from "react";
import { Card } from "./Card.tsx";
import { initializeEditor } from "../signals/editor.ts";
import clsx from "clsx";

type Props = {
  defaultValue?: string;
  className?: string;
};

export function Editor({ defaultValue = "", className }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      // Petit délai pour s'assurer que le DOM est prêt
      const timer = setTimeout(() => {
        initializeEditor(divRef.current!, defaultValue);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [defaultValue]);

  return (
    <Card 
      className={clsx("h-full border-0 rounded-none bg-slate-900", className)} 
      divRef={divRef} 
    />
  );
}
