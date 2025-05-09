
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, ADMIN_EMAIL, ADMIN_PASSWORD } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserSession } from '@/types/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  session: UserSession;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  demoLogin: () => Promise<void>;
  adminLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<UserSession>({ user: null, session: null });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession({ user: session.user, session });
      }
      setIsLoading(false);
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (currentSession) {
          setSession({ user: currentSession.user, session: currentSession });
        } else {
          setSession({ user: null, session: null });
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "An error occurred during sign in.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Account created!",
        description: "Please check your email to confirm your account.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async () => {
    try {
      setIsLoading(true);
      // Use a predefined demo account
      const { error } = await supabase.auth.signInWithPassword({
        email: "demo@hallbliss.com",
        password: "demo12345"
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Demo mode activated!",
        description: "You are now logged in with a demo account.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Demo login failed",
        description: "Failed to log in with demo account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async () => {
    try {
      setIsLoading(true);
      // Use admin credentials
      const { data, error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      });
      
      if (error) {
        throw error;
      }

      // Set admin role metadata if not already set
      if (!data.user?.user_metadata?.role) {
        await supabase.auth.updateUser({
          data: { role: 'admin' }
        });
      }
      
      toast({
        title: "Admin mode activated!",
        description: "You are now logged in as an administrator.",
      });
      
      // Redirect directly to admin dashboard
      navigate('/admin');
    } catch (error: any) {
      toast({
        title: "Admin login failed",
        description: error.message || "Failed to log in as administrator. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signUp, signOut, demoLogin, adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
