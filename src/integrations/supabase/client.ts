// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://utpfmpankfomoqyxglis.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0cGZtcGFua2ZvbW9xeXhnbGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMDQwMzYsImV4cCI6MjA1OTY4MDAzNn0.kpCKKCzUNh3tzBCpdx_8hfI7tUaGg-oIP4_UM63i2ik";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);