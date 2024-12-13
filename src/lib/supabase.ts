import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)
