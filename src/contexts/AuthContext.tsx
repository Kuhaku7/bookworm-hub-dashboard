
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/lib/supabase';
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

  // Verificar sessão ao carregar
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const formattedUser = formatUser(session);
        setUser(formattedUser);
        setLoading(false);
      }
    );

    // Verificar se já existe uma sessão ativa
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const formattedUser = formatUser(session);
      setUser(formattedUser);
      setLoading(false);
    };
    
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
      toast("Login realizado com sucesso!");
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
      toast("Conta criada com sucesso! Verifique seu email para confirmar.");
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
      toast("Sessão encerrada");
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
