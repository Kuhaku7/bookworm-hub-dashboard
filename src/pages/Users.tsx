
import { useState } from 'react';
import { useUsers } from '@/features/users/hooks/useUsers';
import { Button } from '@/components/ui/button'; // Add this import for Button
import SearchBar from '@/features/users/components/SearchBar';
import UserDialog from '@/features/users/components/UserDialog';
import UserList from '@/features/users/components/UserList';
import { User } from '@/types';

const Users = () => {
  const {
    users,
    loading,
    searchTerm,
    newUser,
    isEditing,
    handleSearch,
    handleInputChange,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    startEditing,
    resetForm,
    setIsEditing,
    setCurrentUserId,
  } = useUsers();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUserEdited = async () => {
    await handleEditUser();
    setIsDialogOpen(false);
  };

  const handleUserAdded = async () => {
    await handleAddUser();
    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    resetForm();
    setIsEditing(false);
    setCurrentUserId(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (user: User) => {
    startEditing(user);
    setIsDialogOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
      setIsEditing(false);
      setCurrentUserId(null);
    }
    setIsDialogOpen(open);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bookworm-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground">
            Gerenciamento de usuários da biblioteca
          </p>
        </div>
        
        <Button 
          className="bg-bookworm-primary hover:bg-bookworm-secondary"
          onClick={handleOpenDialog}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="mr-2 h-4 w-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Novo Usuário
        </Button>
      </div>
      
      {/* Filtro e busca */}
      <div className="flex items-center">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearch={handleSearch} 
        />
      </div>
      
      {/* Tabela de usuários */}
      <UserList 
        users={users} 
        onDeleteUser={handleDeleteUser} 
        onStartEditing={handleEditClick} 
      />

      {/* User Dialog */}
      <UserDialog
        isOpen={isDialogOpen}
        isEditing={isEditing}
        newUser={newUser}
        onOpenChange={handleDialogOpenChange}
        onInputChange={handleInputChange}
        onAddUser={handleUserAdded}
        onEditUser={handleUserEdited}
        onResetForm={resetForm}
      />
    </div>
  );
};

export default Users;
