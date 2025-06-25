import type { PropsWithChildren, ReactNode, Ref } from "react";
import clsx from "clsx";

type Props = PropsWithChildren<{
  padded?: boolean;
  className?: string;
  divRef?: Ref<HTMLDivElement>;
  title?: ReactNode;
}>;

export function Card({ children, padded, className, divRef, title }: Props) {
  return (
    <section
      className={clsx(
        "bg-slate-800 border border-slate-700 rounded-lg overflow-hidden",
        padded && "p-4",
        className
      )}
      ref={divRef}
    >
      {title && (
        <header className="px-4 py-3 border-b border-slate-700 bg-slate-900/50">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </header>
      )}
      {children}
    </section>
  );
}
