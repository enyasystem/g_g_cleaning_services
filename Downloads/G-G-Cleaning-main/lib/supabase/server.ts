// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

// Create a Supabase client for Server Components and Server Actions
export function getServerSupabase() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Using anon key for server actions is generally fine for inserts
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `cookies()` may not be available in all environments, e.g. Next.js Edge Runtime.
            console.warn("Could not set cookie in server environment:", error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {
            // The `cookies()` may not be available in all environments, e.g. Next.js Edge Runtime.
            console.warn("Could not remove cookie in server environment:", error)
          }
        },
      },
    },
  )
}

// If you need to perform operations that require service_role key (e.g., bypassing RLS for admin tasks)
// you would create a separate client like this:
export function getServiceRoleSupabase() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use the service_role key here
    {
      auth: {
        persistSession: false, // Service role client doesn't need to persist sessions
      },
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
      },
    },
  )
}
