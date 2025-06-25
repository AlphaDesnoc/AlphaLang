import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes.tsx";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
