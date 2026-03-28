import { Toaster } from "@/components/ui/sonner";
import AppRoutes from "./components/layout/AppRoutes";
import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      <AppRoutes />
      <Toaster />
    </Fragment>
  );
};

export default App;
