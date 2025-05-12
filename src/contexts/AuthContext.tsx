
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

// Este é um contexto simulado que será posteriormente conectado ao Supabase
// após a integração do Supabase ser feita.

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
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simular verificação de usuário ao carregar
  useEffect(() => {
    const storedUser = localStorage.getItem('bookworm-user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulando autenticação - será substituído pelo Supabase
      if (email && password) {
        const mockUser = {
          id: '123',
          email,
          name: email.split('@')[0],
        };
        
        setUser(mockUser);
        localStorage.setItem('bookworm-user', JSON.stringify(mockUser));
        navigate('/dashboard');
        toast("Login realizado com sucesso!");
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      toast.error("Erro ao fazer login");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      // Simulando registro - será substituído pelo Supabase
      if (email && password && name) {
        const mockUser = {
          id: '123',
          email,
          name,
        };
        
        setUser(mockUser);
        localStorage.setItem('bookworm-user', JSON.stringify(mockUser));
        navigate('/dashboard');
        toast("Conta criada com sucesso!");
      } else {
        throw new Error('Dados inválidos');
      }
    } catch (error) {
      toast.error("Erro ao criar conta");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('bookworm-user');
    navigate('/login');
    toast("Sessão encerrada");
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
