
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Book } from '@/types';
import { User } from '@/types';

interface NewLoanDialogProps {
  availableBooks: Book[];
  users: User[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateLoan: (bookId: string, userId: string) => Promise<void>;
}

const NewLoanDialog = ({ 
  availableBooks, 
  users, 
  isOpen, 
  onOpenChange, 
  onCreateLoan 
}: NewLoanDialogProps) => {
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  
  const handleLoanSubmit = async () => {
    if (!selectedBookId || !selectedUserId) {
      return;
    }
    
    await onCreateLoan(selectedBookId, selectedUserId);
    setSelectedBookId('');
    setSelectedUserId('');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-bookworm-primary hover:bg-bookworm-secondary">
          Novo Empréstimo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Novo Empréstimo</DialogTitle>
          <DialogDescription>
            Selecione um livro disponível e um usuário para registrar um novo empréstimo.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="book" className="text-right">
              Livro
            </Label>
            <Select value={selectedBookId} onValueChange={setSelectedBookId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um livro" />
              </SelectTrigger>
              <SelectContent>
                {availableBooks.length === 0 ? (
                  <SelectItem value="none" disabled>Nenhum livro disponível</SelectItem>
                ) : (
                  availableBooks.map(book => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.title} - {book.author}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="user" className="text-right">
              Usuário
            </Label>
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um usuário" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleLoanSubmit}
            disabled={!selectedBookId || !selectedUserId}
            className="bg-bookworm-primary hover:bg-bookworm-secondary"
          >
            Registrar Empréstimo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewLoanDialog;
