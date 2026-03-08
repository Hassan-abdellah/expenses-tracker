import type { expeneseType } from "@/types";
import { supabase } from "../supabase/createClient";
import { format } from "date-fns";

export const createExpense = async (data: expeneseType) => {
  const { error } = await supabase
    .from("expenses")
    .insert({
      effective_date: format(data.effective_date, "dd-MM-yyyy"),
      label: data.label,
      description: data.description,
      amount: Number(data.amount),
    })
    .single();

  return { error };
};

// Define the return type
type GetExpensesResponse = {
  expenses: expeneseType[] | [];
  error: Error | null;
};

export const getExpenses = async (): Promise<GetExpensesResponse> => {
  const { data, error } = await supabase.from("expenses").select("*");
  return {
    expenses: data as expeneseType[] | [],
    error,
  };
};

export const deleteExpense = async (expenseId: number) => {
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", expenseId);

  return {
    error: error?.message,
  };
};
