
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { Loan } from '@/types';
import { getLoans, createLoan, returnLoan } from '@/services/apiLoans';

export const useLoans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      try {
        const data = await getLoans();
        setLoans(data);
      } catch (error) {
        console.error('Error fetching loans:', error);
        toast.error('Erro ao carregar empréstimos');
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const filteredLoans = loans.filter(loan => 
    loan.book?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.book?.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleCreateLoan = async (bookId: string, userId: string) => {
    try {
      const newLoan = await createLoan({
        book_id: bookId,
        user_id: userId
      });
      setLoans(prev => [newLoan, ...prev]);
      toast.success("Empréstimo registrado com sucesso!");
      return newLoan;
    } catch (error) {
      console.error('Error creating loan:', error);
      toast.error("Erro ao registrar empréstimo");
      throw error;
    }
  };

  const handleReturnLoan = async (id: string) => {
    try {
      const updatedLoan = await returnLoan(id);
      setLoans(prev => prev.map(loan => 
        loan.id === updatedLoan.id ? updatedLoan : loan
      ));
      toast.success("Livro devolvido com sucesso!");
      return updatedLoan;
    } catch (error) {
      console.error('Error returning loan:', error);
      toast.error("Erro ao devolver livro");
      throw error;
    }
  };

  return {
    loans: filteredLoans,
    loading,
    searchTerm,
    handleSearch,
    handleCreateLoan,
    handleReturnLoan
  };
};
