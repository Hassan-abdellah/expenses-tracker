export type expeneseType = {
  effective_date: string;
  label: string;
  description: string | null;
  amount: string | number;
  created_at?: string;
  id?: number;
  user_id?: string | null | undefined;
};

export type expensesFilterType = {
  startDate?: string;
  endDate?: string;
  effectiveDate?: string;
  id?: number;
};

export type expenseFormValues = {
  effective_date: string;
  label: string;
  description: string;
  amount: string;
};

// types/supabase.ts or types/index.ts
export interface SupabaseError {
  message: string;
  code: string;
  details: string;
  hint: string;
  statusCode?: number; // Optional, might not always be present
}
