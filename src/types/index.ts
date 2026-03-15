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
