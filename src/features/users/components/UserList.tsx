
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Edit, Trash2, User as UserIcon } from 'lucide-react';
import { User } from '@/types';

interface UserListProps {
  users: User[];
  onDeleteUser: (id: string) => Promise<void>;
  onStartEditing: (user: User) => void;
}

const UserList = ({ users, onDeleteUser, onStartEditing }: UserListProps) => {
  return (
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
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 italic text-muted-foreground">
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            ) : (
              users.map(user => (
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
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onStartEditing(user)}
                      >
                        <Edit size={16} />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onDeleteUser(user.id)}
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
          {users.length} usuários encontrados
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserList;
