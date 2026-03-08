import type { expeneseType, expensesFilterType } from "@/types";
import { getExpenses } from "@/utils/expenses";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState<expeneseType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return { isLoading, expenses, setExpenses, fetchFilteredExpenses };
};
