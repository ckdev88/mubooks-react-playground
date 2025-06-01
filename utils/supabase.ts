import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const localStorageKey: string = supabaseUrl
    .replace("https://", "sb-")
    .replace(".supabase.co", "-auth-token")

export { supabase, localStorageKey }
