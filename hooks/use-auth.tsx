'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { authService, User, AuthState } from '@/lib/auth';
import { logger } from '@/lib/logger';

const AuthContext = createContext<{
  authState: AuthState;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, username: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}>({
  authState: { user: null, loading: true, error: null },
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  signOut: async () => {},
  refreshUser: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      // Check if Supabase is properly configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
        logger.warn('Supabase not configured - using mock user');
        setAuthState({
          user: {
            id: supabaseUser.id,
            email: supabaseUser.email || 'demo@scrum0.dev',
            username: supabaseUser.user_metadata?.username || 'demo_user',
            full_name: supabaseUser.user_metadata?.full_name || 'Demo User',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          loading: false,
          error: null,
        });
        return;
      }

      const { profile, error } = await authService.getUserProfile(supabaseUser.id);
      
      if (error) {
        logger.error('Failed to fetch user profile', { error: error.message });
        setAuthState(prev => ({ ...prev, error: 'Failed to load user profile', loading: false }));
        return;
      }

      setAuthState({
        user: profile,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      logger.error('Error fetching user profile', { error: error.message });
      setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
    }
  };

  const refreshUser = async () => {
    try {
      const { session, error } = await authService.getSession();
      
      if (error) {
        setAuthState({ user: null, loading: false, error: error.message });
        return;
      }

      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setAuthState({ user: null, loading: false, error: null });
      }
    } catch (error: any) {
      logger.error('Error refreshing user', { error: error.message });
      setAuthState({ user: null, loading: false, error: error.message });
    }
  };

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
      logger.warn('Supabase not configured - using demo mode');
      setAuthState({
        user: {
          id: 'demo-user-id',
          email: email,
          username: email.split('@')[0],
          full_name: 'Demo User',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        loading: false,
        error: null,
      });
      return { success: true };
    }

    const { data, error } = await authService.signIn(email, password);
    
    if (error) {
      setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
      return { success: false, error: error.message };
    }

    if (data.user) {
      await fetchUserProfile(data.user);
    }

    return { success: true };
  };

  const signUp = async (email: string, password: string, username: string, fullName?: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
      logger.warn('Supabase not configured - using demo mode');
      setAuthState({
        user: {
          id: 'demo-user-id',
          email: email,
          username: username,
          full_name: fullName || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        loading: false,
        error: null,
      });
      return { success: true };
    }

    const { data, error } = await authService.signUp(email, password, username, fullName);
    
    if (error) {
      setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
      return { success: false, error: error.message };
    }

    if (data.user) {
      await fetchUserProfile(data.user);
    }

    return { success: true };
  };

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    await authService.signOut();
    setAuthState({ user: null, loading: false, error: null });
  };

  useEffect(() => {
    // Get initial session
    refreshUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        logger.info('Auth state changed', { event, userId: session?.user?.id });
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setAuthState({ user: null, loading: false, error: null });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    authState,
    signIn,
    signUp,
    signOut,
    refreshUser,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthState();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};