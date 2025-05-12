
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { User } from '@/types';
import { getUsers, createUser, updateUser, deleteUser } from '@/services/apiUsers';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    is_active: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const userToAdd: Omit<User, 'id' | 'created_at' | 'updated_at'> = {
        name: newUser.name,
        email: newUser.email,
        is_active: newUser.is_active || false,
      };

      const addedUser = await createUser(userToAdd);
      setUsers(prev => [addedUser, ...prev]);
      resetForm();
      toast.success("Usuário adicionado com sucesso!");
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error("Erro ao adicionar usuário");
    }
  };

  const handleEditUser = async () => {
    if (!newUser.name || !newUser.email || !currentUserId) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const updatedUser = await updateUser(currentUserId, {
        name: newUser.name,
        email: newUser.email,
        is_active: newUser.is_active !== undefined ? newUser.is_active : undefined,
      });

      setUsers(prev => prev.map(user => 
        user.id === currentUserId ? updatedUser : user
      ));
      
      resetForm();
      setIsEditing(false);
      setCurrentUserId(null);
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error("Erro ao atualizar usuário");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUser(id);
        setUsers(prev => prev.filter(user => user.id !== id));
        toast.success("Usuário removido com sucesso!");
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error("Erro ao excluir usuário");
      }
    }
  };

  const startEditing = (user: User) => {
    setNewUser({
      name: user.name,
      email: user.email,
      is_active: user.is_active
    });
    setCurrentUserId(user.id);
    setIsEditing(true);
  };

  const resetForm = () => {
    setNewUser({
      name: '',
      email: '',
      is_active: true,
    });
  };

  return {
    users: filteredUsers,
    loading,
    searchTerm,
    newUser,
    isEditing,
    currentUserId,
    handleSearch,
    handleInputChange,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    startEditing,
    resetForm,
    setIsEditing,
    setCurrentUserId
  };
};
