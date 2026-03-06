import ExpenseCard from "@/components/expenses/ExpenseCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { expeneseType } from "@/types";
import { getExpenses } from "@/utils/expenses";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ExpensesListPage = () => {
  const [expenses, setExpenses] = useState<expeneseType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component

    const fetchExpenses = async () => {
      setIsLoading(true);

      const { expenses, error } = await getExpenses();

      // Only update state if the component is still mounted
      if (isMounted) {
        if (error) {
          toast.error(error?.message, { position: "top-right" });
        } else {
          setExpenses(expenses || []);
        }
        setIsLoading(false);
      }
    };

    fetchExpenses();

    // Cleanup function to set the flag when component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array is correct for "on mount" data fetching

  return (
    <section className="h-screen flex items-center justify-center my-40">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card className="w-150" key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-2/3 bg-light-gray" />
                <Skeleton className="h-4 w-1/2 bg-light-gray" />
              </CardHeader>
              <CardContent>
                <Skeleton className="aspect-video w-full bg-light-gray" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      {expenses.length > 0 ? (
        <div className="flex flex-col gap-2 items-center justify-center">
          {expenses.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default ExpensesListPage;
