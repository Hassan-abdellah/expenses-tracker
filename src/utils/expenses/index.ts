import type { expeneseType, expensesFilterType } from "@/types";
import { supabase } from "../supabase/createClient";
import { format } from "date-fns";

// Define the return type
type GetExpenseResponse = {
  expense: expeneseType | null;
  error: Error | null;
};

// Creat expense
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
// update expense
export const updateExpense = async (
  expenseId: number | undefined,
  data: expeneseType,
): Promise<GetExpenseResponse> => {
  const { error, data: expense } = await supabase
    .from("expenses")
    .update({
      effective_date: format(data.effective_date, "dd-MM-yyyy"),
      label: data.label,
      description: data.description,
      amount: Number(data.amount),
    })
    .eq("id", expenseId)
    .select()
    .single();

  return { error, expense: expense as expeneseType | null };
};

// Define the return type
type GetExpensesResponse = {
  expenses: expeneseType[] | [];
  error: Error | null;
};

// get expenses list
export const getExpenses = async (
  filters?: expensesFilterType,
): Promise<GetExpensesResponse> => {
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

  const { data, error } = await query;
  return {
    expenses: data as expeneseType[] | [],
    error,
  };
};

// delete certain expense
export const deleteExpense = async (expenseId: number) => {
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", expenseId);

  return {
    error: error?.message,
  };
};

// get certain expense
export const getExpense = async (
  expenseId: number,
): Promise<GetExpenseResponse> => {
  const { error, data } = await supabase
    .from("expenses")
    .select()
    .eq("id", expenseId)
    .single();

  return {
    error: error,
    expense: data as expeneseType | null,
  };
};
