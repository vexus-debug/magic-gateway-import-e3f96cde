import { PageSkeleton } from "@/components/PageSkeleton";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { session, roles, loading } = useAuth();

  if (loading) {
    return <PageSkeleton />;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes("super_admin")) {
    return <Navigate to="/select-clinic" replace />;
  }

  return <>{children}</>;
}
