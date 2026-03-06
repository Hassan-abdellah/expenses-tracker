import ExpensesForm from "@/components/expenses/ExpensesForm";
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router";
import ExpensesListPage from "./pages/ExpensesListPage";
const App = () => {
  return (
    <main>
      <Routes>
        <Route index element={<ExpensesForm />} />
        <Route path="/expenses" element={<ExpensesListPage />} />
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
