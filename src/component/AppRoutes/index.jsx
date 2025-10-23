import { Route, Routes } from "react-router-dom";
import routes from "../../routes";
import DefaultLayout from "../layouts/DefaultLayout";
import NoLayout from "../layouts/NoLayout";
import ProtectedRoute from "../ProtectedRoute";
import { Fragment } from "react";

function AppRoutes() {
  return (
    <Routes>
      {routes.map((route, index) => {
        const Component = route.component;
        const RouteWrapper = route.protected ? ProtectedRoute : Fragment;

        if (route.children) {
          // If the route has children, its component acts as a layout for its children
          return (
            <Route key={index} path={route.path} element={<Component />}>
              {route.children.map((childRoute, childIndex) => {
                const ChildComponent = childRoute.component;
                const ChildRouteWrapper = childRoute.protected
                  ? ProtectedRoute
                  : Fragment;
                return (
                  <Route
                    key={childIndex}
                    index={childRoute.index}
                    path={childRoute.index ? undefined : childRoute.path}
                    element={
                      <ChildRouteWrapper>
                        <ChildComponent />
                      </ChildRouteWrapper>
                    }
                  />
                );
              })}
            </Route>
          );
        } else {
          // If the route does not have children, apply the determined layout
          const Layout =
            route.layout === undefined
              ? DefaultLayout
              : route.layout || NoLayout;
          return (
            <Route key={index} path={route.path} element={<Layout />}>
              <Route
                index={route.index}
                path={route.index ? undefined : route.path}
                element={
                  <RouteWrapper>
                    <Component />
                  </RouteWrapper>
                }
              />
            </Route>
          );
        }
      })}
    </Routes>
  );
}

export default AppRoutes;
