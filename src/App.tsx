import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router";
import ExpensesListPage from "./pages/ExpensesListPage";
import Navbar from "./components/layout/Navbar";
import CreateExpensesForm from "@/components/expenses/CreateExpensesForm";
const App = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route index element={<CreateExpensesForm />} />
        <Route path="/expenses" element={<ExpensesListPage />} />
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
