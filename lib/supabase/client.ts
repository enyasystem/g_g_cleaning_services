// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr"

// Create a single Supabase client for the client-side
// This uses the singleton pattern to ensure only one instance is created
let supabase: ReturnType<typeof createBrowserClient> | undefined

export function getClientSupabase() {
  if (!supabase) {
    supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  }
  return supabase
}
