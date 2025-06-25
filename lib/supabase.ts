import { createClient } from '@supabase/supabase-js';
import { logger } from './logger';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
const isSupabaseConfigured = () => {
  return supabaseUrl && 
         supabaseKey && 
         supabaseUrl !== 'https://placeholder.supabase.co' &&
         supabaseKey !== 'placeholder-key' &&
         supabaseUrl.includes('.supabase.co');
};

if (!isSupabaseConfigured()) {
  logger.error('Supabase configuration invalid or missing', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    urlValid: supabaseUrl?.includes('.supabase.co'),
  });
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);

// Database connection health check
export const checkSupabaseConnection = async (): Promise<{
  connected: boolean;
  configured: boolean;
  error?: string;
}> => {
  const configured = isSupabaseConfigured();
  
  if (!configured) {
    return {
      connected: false,
      configured: false,
      error: 'Supabase environment variables not properly configured',
    };
  }

  try {
    // Test connection with a simple query
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (error) {
      logger.error('Supabase connection test failed', { error: error.message });
      return {
        connected: false,
        configured: true,
        error: error.message,
      };
    }

    logger.info('Supabase connection verified successfully');
    return {
      connected: true,
      configured: true,
    };
  } catch (error: any) {
    logger.error('Supabase connection check failed', { error: error.message });
    return {
      connected: false,
      configured: true,
      error: error.message,
    };
  }
};

// Enhanced helper functions for real-time operations
export const supabaseClient = {
  // Connection utilities
  isConfigured: isSupabaseConfigured,
  checkConnection: checkSupabaseConnection,

  // Real-time auth helpers
  auth: {
    signUp: async (email: string, password: string, username: string, fullName?: string) => {
      try {
        logger.info('Starting real-time signup process', { email, username });
        
        // Check connection first
        const connectionStatus = await checkSupabaseConnection();
        if (!connectionStatus.connected) {
          throw new Error(`Database connection failed: ${connectionStatus.error}`);
        }

        // Check if username is already taken
        const { data: existingUser, error: checkError } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', username)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
          logger.error('Username availability check failed', { error: checkError.message });
          throw new Error('Failed to verify username availability');
        }

        if (existingUser) {
          throw new Error('Username is already taken');
        }

        // Sign up the user with Supabase Auth
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
          logger.error('Supabase auth signup failed', { error: error.message });
          throw error;
        }

        if (!data?.user) {
          throw new Error('User creation failed - no user data returned');
        }

        logger.info('Auth user created, inserting profile', { userId: data.user.id });
        
        // Insert profile immediately (real-time)
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            username,
            full_name: fullName || '',
          });

        if (insertError) {
          logger.error('Profile insertion failed', { error: insertError.message });
          // Clean up auth user if profile creation fails
          await supabase.auth.signOut();
          throw new Error(`Profile creation failed: ${insertError.message}`);
        }

        logger.info('Real-time signup completed successfully', { userId: data.user.id });
        return { data, error: null };

      } catch (error: any) {
        logger.error('Signup process failed', { error: error.message });
        return { data: null, error };
      }
    },
    
    signIn: async (email: string, password: string) => {
      try {
        logger.info('Starting real-time signin process', { email });
        
        // Check connection first
        const connectionStatus = await checkSupabaseConnection();
        if (!connectionStatus.connected) {
          throw new Error(`Database connection failed: ${connectionStatus.error}`);
        }

        // Authenticate with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          logger.error('Authentication failed', { error: error.message });
          throw error;
        }

        if (!data?.user) {
          throw new Error('Authentication failed - no user data returned');
        }

        // Verify profile exists in database (real-time validation)
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          logger.error('Profile retrieval failed', { error: profileError.message });
          throw new Error('User profile not found');
        }

        logger.info('Real-time signin completed successfully', { 
          userId: data.user.id,
          username: profile.username 
        });

        return { data: { ...data, profile }, error: null };

      } catch (error: any) {
        logger.error('Signin process failed', { error: error.message });
        return { data: null, error };
      }
    },
    
    signOut: async () => {
      try {
        logger.info('Starting signout process');
        
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          logger.error('Signout failed', { error: error.message });
          throw error;
        }

        logger.info('Signout completed successfully');
        return { error: null };

      } catch (error: any) {
        logger.error('Signout process failed', { error: error.message });
        return { error };
      }
    },
    
    getUser: async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          logger.error('Get user failed', { error: error.message });
          return { user: null, error };
        }

        return { user, error: null };
      } catch (error: any) {
        logger.error('Get user process failed', { error: error.message });
        return { user: null, error };
      }
    },

    // Real-time session monitoring
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      return supabase.auth.onAuthStateChange(callback);
    },
  },
  
  // Enhanced database operations
  from: (table: string) => supabase.from(table),
  
  // Real-time subscriptions with error handling
  subscribe: (table: string, callback: (payload: any) => void) => {
    logger.info('Setting up real-time subscription', { table });
    
    return supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table }, 
        (payload) => {
          logger.debug('Real-time update received', { table, event: payload.eventType });
          callback(payload);
        }
      )
      .subscribe((status) => {
        logger.info('Subscription status changed', { table, status });
      });
  },

  // Profile operations
  profiles: {
    getById: async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) logger.error('Get profile by ID failed', { error: error.message });
      return { data, error };
    },

    updateById: async (userId: string, updates: any) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      
      if (error) logger.error('Update profile failed', { error: error.message });
      return { data, error };
    },
  },
};

export default supabase;