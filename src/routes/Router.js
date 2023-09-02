import { lazy } from "react";
import { Navigate } from "react-router-dom";
import UnverifiedProperties from "../views/ui/UnverifiedProperties.js";
import ProtectedRoute from "../views/ui/ProtectedRoute.js";
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const Login = lazy(()=>import("../views/ui/Login"));
const Signup = lazy(()=>import("../views/ui/Signup"));
const MyAccount = lazy(()=>import("../views/ui/MyAccount.js"))
/*****Routes******/

// Function to wrap routes with the ProtectedRoute component
const wrapRoutesWithProtection = (routes, redirectTo) => {
  return routes.map((route) => {
    // Wrap each route with ProtectedRoute
    return {
      ...route,
      element: (
        <ProtectedRoute
          element={route.element}
          redirectTo={redirectTo}
          key={route.path} // Add a unique key to avoid React warnings
        />
      ),
    };
  });
};
const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: wrapRoutesWithProtection([
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter   /> },
      { path: "/unverifiedproperties", exact: true, element: <UnverifiedProperties /> },
      { path: "/signup", exact: true, element: <Signup/> },
      { path: "/myaccount", exact: true, element: <MyAccount/> },
    ], '/login'),
  },{ path: "/login", element: <Login/> },
];

export default ThemeRoutes;
