import { authRoutes } from "@/data/routePaths";
import { useAuth } from "@clerk/react";
import { Navigate, Outlet } from "react-router";
import Navbar from "./Navbar";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import { TooltipProvider } from "../ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface AuthLayoutProps {
  redirectTo?: string;
}

const AuthLayout = ({ redirectTo = authRoutes.login }: AuthLayoutProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  const isMobile = useIsMobile();
  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  if (!isSignedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <TooltipProvider>
      {!isMobile ? <Navbar /> : null}
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        {isMobile ? <Navbar /> : null}
      </SidebarProvider>
      <main>
        <Outlet />
      </main>
    </TooltipProvider>
  );
};

export default AuthLayout;
