// hooks/useExpenses.ts
import { useQuery } from "@tanstack/react-query";
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

// // Fetch single post
// export const usePost = (id: string) => {
//   return useQuery({
//     queryKey: postKeys.detail(id),
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("posts")
//         .select(
//           `
//           *,
//           profile:profiles(username, avatar_url)
//         `,
//         )
//         .eq("id", id)
//         .single();

//       if (error) throw error;
//       return data as Post;
//     },
//     enabled: !!id, // Only run if id exists
//   });
// };

// // Create post mutation
// export const useCreatePost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (
//       newPost: Database["public"]["Tables"]["posts"]["Insert"],
//     ) => {
//       const { data, error } = await supabase
//         .from("posts")
//         .insert(newPost)
//         .select()
//         .single();

//       if (error) throw error;
//       return data;
//     },
//     onSuccess: () => {
//       // Invalidate and refetch posts list
//       queryClient.invalidateQueries({ queryKey: postKeys.lists() });
//     },
//   });
// };

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
