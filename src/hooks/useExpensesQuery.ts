// hooks/useExpensesQuery.ts
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "./useSupabaseClient";
import type { expeneseType, expensesFilterType } from "@/types";

type GetExpenseResponse = {
  error: Error | null;
  data: expeneseType[] | [];
};

// Fetch all expenses
export const useAllExpenses = (filters?: expensesFilterType | null) => {
  const supabase = useSupabaseClient();

  // filter expesnses
  const fetchAllExpenses = async (
    filters?: expensesFilterType | null,
  ): Promise<GetExpenseResponse> => {
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
      data: data as expeneseType[] | [],
      error,
    };
  };

  return useQuery<GetExpenseResponse>({
    queryKey: ["expenses", filters],
    queryFn: () => fetchAllExpenses(filters),
  });
};

// Fetch all expenses
export const useViewExpense = (expenseId: number, enabled: boolean = true) => {
  const supabase = useSupabaseClient();

  // filter expesnses
  const fetchSingleExpense = async (
    expenseId: number,
  ): Promise<expeneseType> => {
    const { data, error } = await supabase
      .from("expenses")
      .select()
      .eq("id", expenseId)
      .single();

    if (error) {
      throw error; // React Query will catch this
    }

    return data as expeneseType; // Return data directly
  };

  return useQuery<expeneseType>({
    queryKey: ["expenses", expenseId],
    queryFn: () => fetchSingleExpense(expenseId),
    enabled: enabled && expenseId ? true : false, // Only run if enabled AND id exists
  });
};

type GetPaginatedExpenseResponse = {
  error: Error | null;
  data: expeneseType[] | [];
  totalCount: number | null;
  nextPage: number | null;
};

// Fetch all expenses
export const usePaginatedExpenses = (filters?: expensesFilterType | null) => {
  const supabase = useSupabaseClient();

  const PAGE_SIZE = 10;

  // filter expesnses
  const fetchAllExpenses = async ({
    pageParam,
  }: {
    pageParam: unknown;
  }): Promise<GetPaginatedExpenseResponse> => {
    // Cast pageParam to number, defaulting to 0
    const currentPage = typeof pageParam === "number" ? pageParam : 0;

    let query = supabase
      .from("expenses")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(currentPage, currentPage + PAGE_SIZE - 1);
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

    const { data, error, count } = await query;
    return {
      data: data as expeneseType[] | [],
      error,
      nextPage: data?.length === PAGE_SIZE ? currentPage + PAGE_SIZE : null,
      totalCount: count,
    };
  };

  const { isFetchingNextPage, isLoading, hasNextPage, fetchNextPage, data } =
    useInfiniteQuery<GetPaginatedExpenseResponse>({
      queryKey: ["expenses", filters],
      queryFn: fetchAllExpenses,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 0,
    });

  return {
    isFetchingNextPage,
    isLoading,
    hasNextPage,
    fetchNextPage,
    data,
  };
};
