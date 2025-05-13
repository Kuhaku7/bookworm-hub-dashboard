
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Usar as URLs e chaves reais do Supabase
const supabaseUrl = 'https://mdybfpcithikkfozmeft.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keWJmcGNpdGhpa2tmb3ptZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzcxNzEsImV4cCI6MjA2MjY1MzE3MX0.oo7hFKf1vRWWkDweiZKODsdoltDot9199iXrFiZPrqA';

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return true; // Estamos usando valores fixos, então Supabase está sempre configurado
};
