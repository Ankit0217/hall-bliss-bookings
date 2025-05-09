
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ekpdmsutpkghinkpfbke.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrcGRtc3V0cGtnaGlua3BmYmtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NjM5OTUsImV4cCI6MjA2MjMzOTk5NX0.a8tpHDrGB_1q_vVtbLwmVxtVSGNhehnQ0CymtFjRWdA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Admin credentials for direct login access
export const ADMIN_EMAIL = "admin@hallbliss.com";
export const ADMIN_PASSWORD = "admin123";

// Define our custom database types to use with TypeScript
export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];
