export type expeneseType = {
  effective_date: string;
  label: string;
  description: string | null;
  amount: string | number;
  created_at?: string;
  id?: number;
};

export type expensesFilterType = {
  startDate?: string;
  endDate?: string;
  effectiveDate?: string;
};
