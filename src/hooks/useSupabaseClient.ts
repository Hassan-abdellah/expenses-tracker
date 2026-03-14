import { useSession } from "@clerk/react";
import { createClient } from "@supabase/supabase-js";

export const useSupabaseClient = () => {
  const { session } = useSession();
  const supabaseClient = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    {
      async accessToken() {
        return session?.getToken() ?? null;
      },
    },
  );

  return supabaseClient;
};
