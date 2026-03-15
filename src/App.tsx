import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router";
import ExpensesListPage from "./pages/Expenses/ExpensesListPage";
import Navbar from "./components/layout/Navbar";
import CreateExpensesForm from "@/components/expenses/CreateExpensesForm";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import { authRoutes, expesnsesRoutes } from "./data/routePaths";
import AuthLayout from "./components/layout/AuthLayout";

const App = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route
          index
          element={
            <AuthLayout>
              <CreateExpensesForm />
            </AuthLayout>
          }
        />
        <Route
          path={expesnsesRoutes.list}
          element={
            <AuthLayout>
              <ExpensesListPage />
            </AuthLayout>
          }
        />
        <Route path={authRoutes.register} element={<RegisterPage />} />
        <Route path={authRoutes.login} element={<LoginPage />} />
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
