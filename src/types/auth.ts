
export interface UserSession {
  user: {
    id: string;
    email: string;
  } | null;
  session: any | null;
}

export interface AuthFormData {
  email: string;
  password: string;
}
