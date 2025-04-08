
import { User } from '@supabase/supabase-js';

export interface UserSession {
  user: User | null;
  session: any | null;
}

export interface AuthFormData {
  email: string;
  password: string;
}
