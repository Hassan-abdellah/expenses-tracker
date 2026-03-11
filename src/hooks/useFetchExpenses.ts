import type { expeneseType, expensesFilterType } from "@/types";
import { getExpense, getExpenses } from "@/utils/expenses";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type params = {
  autoFetch: boolean;
};

const defaultParams: params = {
  autoFetch: true,
};
export const useFetchExpenses = (params: params = defaultParams) => {
  const [expenses, setExpenses] = useState<expeneseType[] | []>([]);
  const [expense, setExpense] = useState<expeneseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // filter expesnses
  const fetchFilteredExpenses = async (filters?: expensesFilterType) => {
    setIsLoading(true);

    const { expenses, error } = await getExpenses(filters);
    // Only update state if the component is still mounted
    if (error) {
      toast.error(error?.message, { position: "top-right" });
    } else {
      setExpenses(expenses || []);
    }
    setIsLoading(false);
  };

  const fetchSingleExpense = async (id: number) => {
    setIsLoading(true);

    const { expense, error } = await getExpense(id);
    // Only update state if the component is still mounted
    if (error) {
      toast.error(error?.message, { position: "top-right" });
    } else {
      setExpense(expense);
    }
    setIsLoading(false);
  };

  // delete expense from UI
  const deleteExpense = (id: number) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  // update expense from UI
  const handleUpdateExpens = (expense: expeneseType) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id == expense.id ? { ...item, ...expense } : item,
      ),
    );
  };

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
    if (params.autoFetch) {
      fetchExpenses();
    }

    // Cleanup function to set the flag when component unmounts
    return () => {
      isMounted = false;
    };
  }, [params.autoFetch]); // Empty dependency array is correct for "on mount" data fetching

  return {
    isLoading,
    expenses,
    expense,
    setExpenses,
    fetchFilteredExpenses,
    deleteExpense,
    fetchSingleExpense,
    handleUpdateExpens,
  };
};
