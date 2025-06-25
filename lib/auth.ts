import { supabaseClient } from './supabase';
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
  connectionStatus: {
    connected: boolean;
    configured: boolean;
    error?: string;
  } | null;
}

export const authService = {
  // Check Supabase connection status
  checkConnection: async () => {
    return await supabaseClient.checkConnection();
  },

  // Real-time sign up with immediate database storage
  signUp: async (email: string, password: string, username: string, fullName?: string) => {
    try {
      logger.info('AuthService: Starting signup', { email, username });
      
      // Use the enhanced supabaseClient signup method
      const result = await supabaseClient.auth.signUp(email, password, username, fullName);
      
      if (result.error) {
        logger.error('AuthService: Signup failed', { error: result.error.message });
        return { data: null, error: result.error };
      }

      logger.info('AuthService: Signup successful', { userId: result.data?.user?.id });
      return result;

    } catch (error: any) {
      logger.error('AuthService: Signup process failed', { error: error.message });
      return { data: null, error };
    }
  },

  // Real-time sign in with database validation
  signIn: async (email: string, password: string) => {
    try {
      logger.info('AuthService: Starting signin', { email });
      
      // Use the enhanced supabaseClient signin method
      const result = await supabaseClient.auth.signIn(email, password);
      
      if (result.error) {
        logger.error('AuthService: Signin failed', { error: result.error.message });
        return { data: null, error: result.error };
      }

      logger.info('AuthService: Signin successful', { userId: result.data?.user?.id });
      return result;

    } catch (error: any) {
      logger.error('AuthService: Signin process failed', { error: error.message });
      return { data: null, error };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      logger.info('AuthService: Starting signout');
      
      const result = await supabaseClient.auth.signOut();
      
      if (result.error) {
        logger.error('AuthService: Signout failed', { error: result.error.message });
        return { error: result.error };
      }

      logger.info('AuthService: Signout successful');
      return { error: null };

    } catch (error: any) {
      logger.error('AuthService: Signout process failed', { error: error.message });
      return { error };
    }
  },

  // Get current user session
  getSession: async () => {
    try {
      const { user, error } = await supabaseClient.auth.getUser();
      
      if (error) {
        logger.error('AuthService: Get session failed', { error: error.message });
        return { session: null, error };
      }

      if (!user) {
        return { session: null, error: null };
      }

      // Get full profile from database
      const { data: profile, error: profileError } = await supabaseClient.profiles.getById(user.id);
      
      if (profileError) {
        logger.error('AuthService: Get profile failed', { error: profileError.message });
        return { session: null, error: profileError };
      }

      return { 
        session: { user, profile }, 
        error: null 
      };

    } catch (error: any) {
      logger.error('AuthService: Get session process failed', { error: error.message });
      return { session: null, error };
    }
  },

  // Get user profile from database
  getUserProfile: async (userId: string): Promise<{ profile: User | null; error: any }> => {
    try {
      const { data, error } = await supabaseClient.profiles.getById(userId);
      
      if (error) {
        logger.error('AuthService: Get user profile failed', { error: error.message, userId });
        return { profile: null, error };
      }

      return { profile: data, error: null };

    } catch (error: any) {
      logger.error('AuthService: Get user profile process failed', { error: error.message, userId });
      return { profile: null, error };
    }
  },

  // Update user profile
  updateProfile: async (userId: string, updates: Partial<User>) => {
    try {
      logger.info('AuthService: Updating user profile', { userId, updates });
      
      const { data, error } = await supabaseClient.profiles.updateById(userId, updates);
      
      if (error) {
        logger.error('AuthService: Update profile failed', { error: error.message, userId });
        return { data: null, error };
      }

      logger.info('AuthService: Profile updated successfully', { userId });
      return { data, error: null };

    } catch (error: any) {
      logger.error('AuthService: Update profile process failed', { error: error.message, userId });
      return { data: null, error };
    }
  },

  // Check if username is available
  checkUsernameAvailability: async (username: string) => {
    try {
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();

      if (error && error.code === 'PGRST116') {
        // No rows returned, username is available
        return { available: true, error: null };
      }

      if (error) {
        logger.error('AuthService: Username check failed', { error: error.message });
        return { available: false, error };
      }

      // Username exists
      return { available: false, error: null };

    } catch (error: any) {
      logger.error('AuthService: Username availability check failed', { error: error.message });
      return { available: false, error };
    }
  },
};