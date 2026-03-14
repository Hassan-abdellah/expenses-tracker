import type { expeneseType, expensesFilterType } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSupabaseClient } from "./useSupabaseClient";
import { format } from "date-fns";

type params = {
  autoFetch: boolean;
};

const defaultParams: params = {
  autoFetch: true,
};
export const useExpenses = (params: params = defaultParams) => {
  const supabase = useSupabaseClient();

  const [expenses, setExpenses] = useState<expeneseType[] | []>([]);
  const [expense, setExpense] = useState<expeneseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // filter expesnses
  const fetchFilteredExpenses = async (filters?: expensesFilterType) => {
    setIsLoading(true);

    let query = supabase
      .from("expenses")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.startDate) {
      query = query.gte("effective_date", filters.startDate);
    }
    if (filters?.endDate) {
      query = query.lte("effective_date", filters.endDate);
    }
    if (filters?.effectiveDate) {
      query = query.eq("effective_date", filters.effectiveDate);
    }
    if (filters?.id) {
      query = query.eq("id", filters.id);
    }

    const { data: expenses, error } = await query;
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

    const { data: expense, error } = await supabase
      .from("expenses")
      .select()
      .eq("id", id)
      .single();
    // Only update state if the component is still mounted
    if (error) {
      toast.error(error?.message, { position: "top-right" });
    } else {
      setExpense(expense);
    }
    setIsLoading(false);
  };

  //   type GetExpenseResponse = {
  //   error: Error | null;
  // };

  // create Expense
  const createExpense = async (
    data: expeneseType,
  ): Promise<{ error: Error | null }> => {
    // Parse the dd-MM-yyyy string to a Date object
    const [day, month, year] = data.effective_date.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day); // month is 0-indexed

    const { error } = await supabase
      .from("expenses")
      .insert({
        effective_date: format(dateObj, "yyyy-MM-dd"),
        label: data.label,
        description: data.description,
        amount: Number(data.amount),
      })
      .single();

    return {
      error,
    };
  };

  // delete expense from DB and UI
  const deleteExpense = async (expenseId: number) => {
    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", expenseId);

    if (error) {
      toast.error(error?.message, { position: "top-right" });
    } else {
      // delete expense form UI
      setExpenses((prev) => prev.filter((item) => item.id !== expenseId));
      toast.success("Deleted Successfully");
    }
  };

  // update expense from DB and UI
  const updateExpense = async (
    expenseId: number,
    data: expeneseType,
  ): Promise<{ error: Error | null }> => {
    // Parse the dd-MM-yyyy string to a Date object
    const [day, month, year] = data.effective_date.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day); // month is 0-indexed

    const { error, data: expense } = await supabase
      .from("expenses")
      .update({
        effective_date: format(dateObj, "yyyy-MM-dd"),
        label: data.label,
        description: data.description,
        amount: Number(data.amount),
      })
      .eq("id", expenseId)
      .select()
      .single();

    if (error) {
      toast.error(error?.message, { position: "top-right" });
    } else {
      toast.success("Updated Successfully", { position: "top-right" });
      // update expense in UI
      setExpenses((prev) =>
        prev.map((item) =>
          item.id == expense.id ? { ...item, ...expense } : item,
        ),
      );
    }

    return { error };
  };

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component

    const fetchExpenses = async () => {
      setIsLoading(true);

      const { data: expenses, error } = await supabase
        .from("expenses")
        .select("*")
        .order("created_at", { ascending: false });
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
    updateExpense,
    createExpense,
  };
};
