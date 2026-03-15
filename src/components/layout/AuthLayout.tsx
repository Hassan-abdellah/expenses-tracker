import { authRoutes } from "@/data/routePaths";
import { useAuth } from "@clerk/react";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface AuthLayoutProps {
  children: ReactNode;
  redirectTo?: string;
}

const AuthLayout = ({
  children,
  redirectTo = authRoutes.login,
}: AuthLayoutProps) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  if (!isSignedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default AuthLayout;
