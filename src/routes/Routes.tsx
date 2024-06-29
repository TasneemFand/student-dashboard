import { Outlet, createBrowserRouter } from "react-router-dom";
import { AuthGuard, GuestGuard } from "../auth/guard";
import { Suspense } from "react";
import { SplashScreen } from "../components/loading-screen";
import { DashboardLayout } from "../pages/dashboard/layout";

const authJwt = {
  path: "jwt",
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: "login",
      lazy: async () => {
        const Page = (await import("../pages/auth/login/page")).Login;

        return {
          element: <Page />,
        };
      },
    },
  ],
};

export const router = createBrowserRouter([
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "students",
        lazy: async () => {
          const Page = (await import("../pages/dashboard/students/page")).StudentsPage;

          return {
            element: <Page />,
          };
        },
      },
    ],
  },

  // Auth routes
  {
    path: "auth",
    children: [authJwt],
  },

  // // No match 404
  // { path: '*', element: <Navigate to="/404" replace /> },
]);
