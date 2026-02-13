import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "@/components/ui/LodingScreen";

/* ================= Types ================= */

interface AuthenticationRouteProps {
  isLoading: boolean | null;
  isAuthenticated: boolean;
  children: ReactNode;
}

/* ================= Component ================= */

function AuthenticationRoute({
  isLoading,
  isAuthenticated,
  children,
}: AuthenticationRouteProps) {
  if (isLoading === null || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AuthenticationRoute;
