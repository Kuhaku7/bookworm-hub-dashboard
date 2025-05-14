
import { useEffect } from 'react';
import { useLoans } from '@/features/loans/hooks/useLoans';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBooks } from '@/features/books/hooks/useBooks';
import { useUsers } from '@/features/users/hooks/useUsers';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Loans = () => {
  const {
    loans,
    loading,
    searchTerm,
    handleSearch,
    handleCreateLoan,
    handleReturnLoan,
    fetchLoans
  } = useLoans();

  const { books } = useBooks();
  const { users } = useUsers();

  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const availableBooks = books.filter(book => book.available);

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleLoanSubmit = async () => {
    if (!selectedBookId || !selectedUserId) {
      return;
    }
    
    await handleCreateLoan(selectedBookId, selectedUserId);
    setSelectedBookId('');
    setSelectedUserId('');
    setIsDialogOpen(false);
  };

  // Filter loans based on search term
  const filteredLoans = loans.filter(loan => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      loan.book?.title.toLowerCase().includes(searchLower) ||
      loan.book?.author.toLowerCase().includes(searchLower) ||
      loan.user?.name.toLowerCase().includes(searchLower) ||
      loan.user?.email.toLowerCase().includes(searchLower)
    );
  });

  if (loading && loans.length === 0) {
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
          <h1 className="text-3xl font-bold tracking-tight">Empréstimos</h1>
          <p className="text-muted-foreground">
            Gerenciamento de empréstimos da biblioteca
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
      </div>
      
      {/* Search */}
      <div className="flex items-center">
        <Input
          type="search"
          placeholder="Buscar por livro, autor ou usuário..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      {/* Loans Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Livro</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Data de Empréstimo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLoans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Nenhum empréstimo encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredLoans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>
                    <div className="font-medium">{loan.book?.title}</div>
                    <div className="text-sm text-muted-foreground">{loan.book?.author}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>{loan.user?.name}</div>
                        <div className="text-sm text-muted-foreground">{loan.user?.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>{format(new Date(loan.loan_date), 'dd/MM/yyyy')}</div>
                    </div>
                    {loan.status === 'returned' && loan.return_date && (
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">
                          Devolvido em {format(new Date(loan.return_date), 'dd/MM/yyyy')}
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={loan.status === 'active' ? 'bg-yellow-500' : 'bg-green-500'}>
                      {loan.status === 'active' ? 'Em andamento' : 'Devolvido'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {loan.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleReturnLoan(loan.id)}
                      >
                        Devolver
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Loans;
