
import { Button } from '@/components/ui/button';
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
import { Plus } from 'lucide-react';
import UserForm from './UserForm';
import { User } from '@/types';

interface UserDialogProps {
  isOpen?: boolean;
  isEditing: boolean;
  newUser: Partial<User>;
  onOpenChange: (open: boolean) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddUser: () => Promise<void>;
  onEditUser: () => Promise<void>;
  onResetForm: () => void;
}

const UserDialog = ({
  isEditing,
  newUser,
  onOpenChange,
  onInputChange,
  onAddUser,
  onEditUser,
  onResetForm,
}: UserDialogProps) => {
  return (
    <Dialog onOpenChange={(open) => {
      if (!open) {
        onResetForm();
      }
      onOpenChange(open);
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
        
        <UserForm 
          newUser={newUser} 
          onInputChange={onInputChange} 
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button 
              className="bg-bookworm-primary hover:bg-bookworm-secondary"
              onClick={isEditing ? onEditUser : onAddUser}
            >
              {isEditing ? "Salvar Alterações" : "Adicionar Usuário"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
