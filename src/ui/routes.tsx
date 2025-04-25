import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { ChallengePage } from "./pages/ChallengePage.tsx";
import { LiveCodePage } from "./pages/LiveCode.tsx";
import { Sidebar } from "./components/Sidebar.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { ChallengeDefinition } from "../type.challenge.ts";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="flex h-screen w-full">
        <Sidebar />
        <Outlet />
      </div>
    </>
  ),
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
  component: LiveCodePage,
});

const routeTree = rootRoute.addChildren([indexRoute, livecodeRoute, documentationRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
