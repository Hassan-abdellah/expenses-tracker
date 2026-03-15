import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router";
import ExpensesListPage from "./pages/Expenses/ExpensesListPage";
import Navbar from "./components/layout/Navbar";
import CreateExpensesForm from "@/components/expenses/CreateExpensesForm";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";

const App = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route index element={<CreateExpensesForm />} />
        <Route path="/expenses" element={<ExpensesListPage />} />
        <Route path="/auth/sign-up" element={<RegisterPage />} />
        <Route path="/auth/sign-in" element={<LoginPage />} />
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
