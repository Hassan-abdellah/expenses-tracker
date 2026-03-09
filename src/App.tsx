import ExpensesForm from "@/components/expenses/ExpensesForm";
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router";
import ExpensesListPage from "./pages/ExpensesListPage";
import Navbar from "./components/layout/Navbar";
const App = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route index element={<ExpensesForm />} />
        <Route path="/expenses" element={<ExpensesListPage />} />
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
