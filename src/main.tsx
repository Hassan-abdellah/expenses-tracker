import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/react";
import { authRoutes } from "./data/routePaths.ts";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signUpUrl={authRoutes.register}
      signInUrl={authRoutes.login}
      afterSignOutUrl={authRoutes.login}
    >
      <BrowserRouter>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
