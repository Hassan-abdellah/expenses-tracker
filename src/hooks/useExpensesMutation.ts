// hooks/useExpensesMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "./useSupabaseClient";
import type { expeneseType } from "@/types";
import { format } from "date-fns";

// // Create post mutation
export const useExpensesMutation = () => {
  const supabase = useSupabaseClient();

  const queryClient = useQueryClient();

  // Create Expense

  const createExpense = useMutation({
    mutationFn: async (data: expeneseType) => {
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
          user_id: data.user_id,
        })
        .single();

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  // update expense
  const updateExpense = useMutation({
    mutationFn: async ({
      expenseId,
      data,
    }: {
      expenseId: number;
      data: expeneseType;
    }) => {
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
        throw error;
      }

      return { expense };
    },
    // Optimistic update
    onMutate: async (variables) => {
      const { expenseId, data } = variables;
      await queryClient.cancelQueries({ queryKey: ["expenses"] });

      const previousExpenses = queryClient.getQueryData<expeneseType[]>([
        "expenses",
      ]);

      // Optimistically update
      if (previousExpenses) {
        queryClient.setQueryData<expeneseType[]>(["expenses"], (old) =>
          old?.map((expense) =>
            expense.id === expenseId
              ? {
                  ...expense,
                  ...data,
                  id: expense.id,
                }
              : expense,
          ),
        );
      }

      // Return context with previous data
      return { previousExpenses };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousExpenses) {
        queryClient.setQueryData(["expenses"], context.previousExpenses);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  //   Delete Expense

  const deleteExpense = useMutation({
    mutationFn: async (expenseId: number) => {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", expenseId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  return {
    createExpense,
    updateExpense,
    deleteExpense,
    isDeleting: deleteExpense.isPending,
  };
};

// // Update post mutation
// export const useUpdatePost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, ...updates }: Partial<Post> & { id: string }) => {
//       const { data, error } = await supabase
//         .from("posts")
//         .update(updates)
//         .eq("id", id)
//         .select()
//         .single();

//       if (error) throw error;
//       return data;
//     },
//     onSuccess: (data) => {
//       // Update individual post cache
//       queryClient.setQueryData(postKeys.detail(data.id), data);
//       // Invalidate lists
//       queryClient.invalidateQueries({ queryKey: postKeys.lists() });
//     },
//   });
// };

// // Delete post mutation
// export const useDeletePost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id: string) => {
//       const { error } = await supabase.from("posts").delete().eq("id", id);

//       if (error) throw error;
//       return id;
//     },
//     onSuccess: (deletedId) => {
//       // Remove from cache
//       queryClient.removeQueries({ queryKey: postKeys.detail(deletedId) });
//       // Invalidate lists
//       queryClient.invalidateQueries({ queryKey: postKeys.lists() });
//     },
//   });
// };
