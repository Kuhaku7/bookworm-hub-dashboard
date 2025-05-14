
import { useEffect, useState } from 'react';
import { useLoans } from '@/features/loans/hooks/useLoans';
import { useBooks } from '@/features/books/hooks/useBooks';
import { useUsers } from '@/features/users/hooks/useUsers';
import SearchBar from '@/features/loans/components/SearchBar';
import LoansList from '@/features/loans/components/LoansList';
import NewLoanDialog from '@/features/loans/components/NewLoanDialog';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const availableBooks = books.filter(book => book.available);

  useEffect(() => {
    fetchLoans();
  }, []);

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
        
        <NewLoanDialog
          availableBooks={availableBooks}
          users={users}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onCreateLoan={handleCreateLoan}
        />
      </div>
      
      {/* Search */}
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      
      {/* Loans Table */}
      <LoansList 
        loans={loans} 
        searchTerm={searchTerm}
        onReturnLoan={handleReturnLoan}
      />
    </div>
  );
};

export default Loans;
