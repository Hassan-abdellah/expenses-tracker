import { createClient } from "@supabase/supabase-js";

export const useSupabaseClient = () => {
  const supabaseClient = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  );

  return supabaseClient;
};
