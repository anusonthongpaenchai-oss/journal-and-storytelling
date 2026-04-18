import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../ui/LodingScreen";

/* ================= Types ================= */

interface ProtectedRouteProps {
  isLoading: boolean | null;
  isAuthenticated: boolean;
  userRole: string | null;
  requiredRole?: string;
  allowedRoles?: string[];
  redirectTo?: string;
  children: ReactNode;
}

/* ================= Component ================= */

function ProtectedRoute({
  isLoading,
  isAuthenticated,
  userRole,
  requiredRole,
  allowedRoles,
  redirectTo = "/login",
  children,
}: ProtectedRouteProps) {
  if (isLoading === null || (isLoading && !isAuthenticated)) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  const normalizedAllowedRoles = allowedRoles ?? (requiredRole ? [requiredRole] : []);
  const hasRoleAccess =
    normalizedAllowedRoles.length === 0
      ? true
      : normalizedAllowedRoles.includes(userRole ?? "");

  if (!isAuthenticated || !hasRoleAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
