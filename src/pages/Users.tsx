
import { useUsers } from '@/features/users/hooks/useUsers';
import SearchBar from '@/features/users/components/SearchBar';
import UserDialog from '@/features/users/components/UserDialog';
import UserList from '@/features/users/components/UserList';

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

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
      setIsEditing(false);
      setCurrentUserId(null);
    }
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
        
        <UserDialog
          isEditing={isEditing}
          newUser={newUser}
          onOpenChange={handleDialogOpenChange}
          onInputChange={handleInputChange}
          onAddUser={handleAddUser}
          onEditUser={handleEditUser}
          onResetForm={resetForm}
        />
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
        onStartEditing={startEditing} 
      />
    </div>
  );
};

export default Users;
