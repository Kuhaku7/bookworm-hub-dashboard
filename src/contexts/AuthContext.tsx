
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Converter usuário do Supabase para o formato que usamos
  const formatUser = (session: Session | null): User | null => {
    if (!session?.user) return null;
    
    const supaUser = session.user;
    
    return {
      id: supaUser.id,
      email: supaUser.email || '',
      name: supaUser.user_metadata.name || supaUser.email?.split('@')[0] || '',
    };
  };

  // Check for email confirmation parameter in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const confirmedEmail = params.get('confirmed_email');
    if (confirmedEmail === 'true') {
      toast.success("Email confirmado com sucesso!");
      navigate('/dashboard');
    }
  }, [navigate]);

  // Verificar sessão ao carregar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const formattedUser = formatUser(session);
        setUser(formattedUser);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const formattedUser = formatUser(session);
        setUser(formattedUser);
        setLoading(false);
        
        if (event === 'SIGNED_IN' && formattedUser) {
          navigate('/dashboard');
        }
      }
    );
    
    checkSession();

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      const formattedUser = formatUser(data.session);
      setUser(formattedUser);
      navigate('/dashboard');
      toast.success("Login realizado com sucesso!");
    } catch (error: any) {
      toast.error(`Erro ao fazer login: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      
      if (error) throw error;
      
      const formattedUser = formatUser(data.session);
      setUser(formattedUser);
      
      // Após o signup, vamos inserir o usuário na tabela users
      if (data.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            name,
            email,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        
        if (insertError) {
          console.error('Error inserting user data:', insertError);
        }
      }
      
      navigate('/dashboard');
      toast.success("Conta criada com sucesso! Verifique seu email para confirmar.");
    } catch (error: any) {
      toast.error(`Erro ao criar conta: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
      toast.success("Sessão encerrada");
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast.error("Erro ao encerrar sessão");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};
