import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { ChallengePage } from "./pages/ChallengePage.tsx";
import { LiveCodePage } from "./pages/LiveCode.tsx";
import { DocumentationPage } from "./pages/DocumentationPage.tsx";
import { AccountPage } from "./pages/AccountPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { ExercisesPage } from "./pages/ExercisesPage.tsx";
import { ExerciseWorkspace } from "./pages/ExerciseWorkspace.tsx";
import { CreateExercisePage } from "./pages/CreateExercisePage.tsx";
import { RoleDebugPage } from "./pages/RoleDebugPage.tsx";
import { Sidebar } from "./components/Sidebar.tsx";
import { AuthGuard } from "./components/AuthGuard.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { ChallengeDefinition } from "../type.challenge.ts";
import { useAuth } from "./contexts/AuthContext";
import { AuthLoader } from "./components/AuthLoader";

const rootRoute = createRootRoute({
  component: () => {
    const { loading } = useAuth();
    
    if (loading) {
      return <AuthLoader />;
    }
    
    return (
      <div className="flex h-screen bg-slate-900">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    );
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const challengeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/challenges/$slug",
  loader: ({ params }) => {
    return fetch("/challenges/" + params.slug + ".json").then((res) =>
      res.json(),
    ) as Promise<ChallengeDefinition>;
  },
  component: ChallengePage,
});

export const livecodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/livecoding",
  component: LiveCodePage,
});

export const documentationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/documentation",
  component: DocumentationPage,
});

export const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: AccountPage,
});

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

export const exercisesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exercises",
  component: ExercisesPage,
});

export const exerciseWorkspaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exercise-workspace",
  component: ExerciseWorkspace,
});

export const createExerciseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exercises/create",
  component: () => (
    <AuthGuard>
      <CreateExercisePage />
    </AuthGuard>
  ),
});

export const roleDebugRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/debug/roles",
  component: () => (
    <AuthGuard>
      <RoleDebugPage />
    </AuthGuard>
  ),
});

const routeTree = rootRoute.addChildren([indexRoute, livecodeRoute, documentationRoute, accountRoute, adminRoute, exercisesRoute, exerciseWorkspaceRoute, createExerciseRoute, roleDebugRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
