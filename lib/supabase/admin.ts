import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * Client cu drepturi depline (service role), folosit doar în cod server-side
 * de încredere (route handlers), niciodată expus către browser. Necesar aici
 * pentru a citi email-ul unui user din auth.users, care nu e altfel accesibil
 * din tabelul public.profiles.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
