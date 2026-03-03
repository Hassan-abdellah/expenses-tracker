import ExpensesForm from "@/components/expenses/ExpensesForm";
import { Toaster } from "@/components/ui/sonner";
const App = () => {
  return (
    <main>
      <ExpensesForm />

      <Toaster />
    </main>
  );
};

export default App;
