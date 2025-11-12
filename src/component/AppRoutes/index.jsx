import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import config from "@/config";

function AppRoutes({ routes }) {
  return (
    <Routes>
      {routes.map((route, index) => {
        const LayoutComponent = route.layout;
        const Component = route.component;

        // Bọc Component chính bằng ProtectedRoute nếu cần
        const Element = Component ? (
          route.protected ? (
            <ProtectedRoute>
              <Component />
            </ProtectedRoute>
          ) : (
            <Component />
          )
        ) : null;

        const shouldRenderIndex = route.path !== config.routes.notifications;

        {shouldRenderIndex && Element && <Route index element={Element} />}

        // Tạo Layout Wrapper. Nếu không có Layout, nó sẽ chỉ render <Outlet />
        // Điều này cho phép các route con vẫn được render ngay cả khi không có layout cha.
        const Layout = LayoutComponent ? <LayoutComponent /> : <Outlet />;

        return (
          <Route key={index} path={route.path} element={Layout}>
            {/* Route cho trang chính (nếu có component) */}
            {Element && <Route index element={Element} />}
            
            {/* Render các route con (nếu có) */}
            {route.children &&
              route.children.map((child, childIndex) => {
                const ChildComponent = child.component;
                if (!ChildComponent) return null;
                
                const ChildElement = child.protected ? (
                  <ProtectedRoute>
                    <ChildComponent />
                  </ProtectedRoute>
                ) : (
                  <ChildComponent />
                );
                
                return (
                  <Route key={childIndex} index={child.index} path={child.path} element={ChildElement} />
                );
              })}
          </Route>
        );
      })}
    </Routes>
  );
}

export default AppRoutes;
