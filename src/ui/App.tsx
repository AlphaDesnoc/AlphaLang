import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { StatsProvider } from "./contexts/StatsContext";

export function App() {
  return (
    <AuthProvider>
      <StatsProvider>
        <RouterProvider router={router} />
      </StatsProvider>
    </AuthProvider>
  );
}
