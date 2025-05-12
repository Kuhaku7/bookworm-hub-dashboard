
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Plus, Search, Edit, Trash2, User as UserIcon } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { User } from '@/types';
import { getUsers, createUser, updateUser, deleteUser } from '@/services/apiUsers';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    is_active: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
        
        <Dialog onOpenChange={(open) => {
          if (!open) {
            resetForm();
            setIsEditing(false);
            setCurrentUserId(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-bookworm-primary hover:bg-bookworm-secondary">
              <Plus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Editar Usuário" : "Adicionar Novo Usuário"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Atualize as informações do usuário abaixo." 
                  : "Preencha as informações para adicionar um novo usuário ao sistema."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Nome completo"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="is_active" className="text-right">
                  Status
                </Label>
                <div className="col-span-3 flex items-center">
                  <Input
                    id="is_active"
                    name="is_active"
                    type="checkbox"
                    checked={newUser.is_active}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                  />
                  <span className="ml-2 text-sm">Usuário ativo</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button 
                  className="bg-bookworm-primary hover:bg-bookworm-secondary"
                  onClick={isEditing ? handleEditUser : handleAddUser}
                >
                  {isEditing ? "Salvar Alterações" : "Adicionar Usuário"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filtro e busca */}
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Buscar por nome ou email..." 
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      {/* Tabela de usuários */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Nome</TableHead>
                <TableHead className="font-medium">Email</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Data de Cadastro</TableHead>
                <TableHead className="font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 italic text-muted-foreground">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.is_active ? "default" : "outline"}
                        className={user.is_active ? "bg-green-500 hover:bg-green-600" : ""}
                      >
                        {user.is_active ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => startEditing(user)}
                            >
                              <Edit size={16} />
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                        
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/users/${user.id}`}>
                            <UserIcon size={16} />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t py-3 px-6">
          <div className="text-xs text-muted-foreground">
            {filteredUsers.length} usuários encontrados
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Users;
