
import { User } from '@supabase/supabase-js';

export interface UserSession {
  user: User | null;
  session: any | null;
}

export interface AuthFormData {
  email: string;
  password: string;
}

export type AppRole = 'admin' | 'user';

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}
