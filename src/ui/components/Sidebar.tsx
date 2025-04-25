import { Link } from "@tanstack/react-router";
import { LangIcon, ChallengeIcon, BookIcon } from "./Icons.tsx";
import { useState } from "react";

export function Sidebar() {
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-1/30 hover:w-1/10 transition-all duration-300 bg-gray-100 h-screen flex flex-col gap-4 p-4"
    >
      <Link
        to="/"
        title="Home"
        className={hovered ? "opacity-100 mb-10" : "opacity-50 mb-10"}
      >
        <LangIcon hovered={hovered} />
      </Link>
      <Link
        to="/livecoding"
        title="Live Coding"
        className={hovered ? "opacity-100 hover:text-gray-400" : "opacity-50 hover:text-gray-400"}
      >
        <ChallengeIcon hovered={hovered} />
      </Link>
      <Link
        to="/documentation"
        title="Documentation"
        className={hovered ? "opacity-100 hover:text-gray-400" : "opacity-50 hover:text-gray-400"}
      >
        <BookIcon hovered={hovered} />
      </Link>
    </aside>
  );
}
