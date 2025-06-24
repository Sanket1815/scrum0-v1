import { supabase } from './supabase';
import { logger } from './logger';

export interface User {
  id: string;
  email: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const authService = {
  // Sign up with email, password, and username
  signUp: async (email: string, password: string, username: string, fullName?: string) => {
    try {
      logger.info('Attempting user signup', { email, username });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: fullName || '',
          },
        },
      });

      if (error) {
        logger.error('Signup error', { error: error.message });
        throw error;
      }

      logger.info('User signup successful', { userId: data.user?.id });
      return { data, error: null };
    } catch (error: any) {
      logger.error('Signup failed', { error: error.message });
      return { data: null, error };
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      logger.info('Attempting user signin', { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        logger.error('Signin error', { error: error.message });
        throw error;
      }

      logger.info('User signin successful', { userId: data.user?.id });
      return { data, error: null };
    } catch (error: any) {
      logger.error('Signin failed', { error: error.message });
      return { data: null, error };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      logger.info('User signing out');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        logger.error('Signout error', { error: error.message });
        throw error;
      }

      logger.info('User signout successful');
      return { error: null };
    } catch (error: any) {
      logger.error('Signout failed', { error: error.message });
      return { error };
    }
  },

  // Get current user session
  getSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        logger.error('Get session error', { error: error.message });
        throw error;
      }

      return { session, error: null };
    } catch (error: any) {
      logger.error('Get session failed', { error: error.message });
      return { session: null, error };
    }
  },

  // Get user profile
  getUserProfile: async (userId: string): Promise<{ profile: User | null; error: any }> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        logger.error('Get user profile error', { error: error.message, userId });
        throw error;
      }

      return { profile: data, error: null };
    } catch (error: any) {
      logger.error('Get user profile failed', { error: error.message, userId });
      return { profile: null, error };
    }
  },

  // Update user profile
  updateProfile: async (userId: string, updates: Partial<User>) => {
    try {
      logger.info('Updating user profile', { userId, updates });
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Update profile error', { error: error.message, userId });
        throw error;
      }

      logger.info('Profile updated successfully', { userId });
      return { data, error: null };
    } catch (error: any) {
      logger.error('Update profile failed', { error: error.message, userId });
      return { data: null, error };
    }
  },

  // Check if username is available
  checkUsernameAvailability: async (username: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();

      if (error && error.code === 'PGRST116') {
        // No rows returned, username is available
        return { available: true, error: null };
      }

      if (error) {
        logger.error('Username check error', { error: error.message });
        throw error;
      }

      // Username exists
      return { available: false, error: null };
    } catch (error: any) {
      logger.error('Username availability check failed', { error: error.message });
      return { available: false, error };
    }
  },
};