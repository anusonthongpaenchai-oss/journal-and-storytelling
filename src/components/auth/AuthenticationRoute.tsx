import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "@/components/ui/LodingScreen";

/* ================= Types ================= */

interface AuthenticationRouteProps {
  isLoading: boolean | null;
  isAuthenticated: boolean;
  userRole?: string | null;
  requiredRole?: string;
  redirectTo?: string;
  fallbackRedirectTo?: string;
  children: ReactNode;
}

/* ================= Component ================= */

function AuthenticationRoute({
  isLoading,
  isAuthenticated,
  userRole,
  requiredRole,
  redirectTo = "/",
  fallbackRedirectTo = "/",
  children,
}: AuthenticationRouteProps) {
  if (isLoading === null || (isLoading && !isAuthenticated)) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to={fallbackRedirectTo} replace />;
    }

    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

export default AuthenticationRoute;
