import { createClient } from '@supabase/supabase-js';
import { logger } from './logger';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  logger.warn('Supabase environment variables not found - using placeholder values');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Helper functions for common operations
export const supabaseClient = {
  // Auth helpers
  auth: {
    signUp: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) logger.error('Supabase signUp error:', error);
      return { data, error };
    },
    
    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) logger.error('Supabase signIn error:', error);
      return { data, error };
    },
    
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) logger.error('Supabase signOut error:', error);
      return { error };
    },
    
    getUser: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) logger.error('Supabase getUser error:', error);
      return { user, error };
    },
  },
  
  // Generic CRUD helpers
  from: (table: string) => supabase.from(table),
  
  // Real-time subscriptions
  subscribe: (table: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table }, 
        callback
      )
      .subscribe();
  },
};

export default supabase;