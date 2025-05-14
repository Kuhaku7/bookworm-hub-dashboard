
// Add a custom type to fix the type error with the 'status' field
import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import {
  createLoan,
  deleteLoan,
  getLoansByUserId,
  getLoansByBookId,
  updateLoanStatus,
  getLoans,
} from "@/services/apiLoans";

// Update the Loan type to explicitly define status as either "active" or "returned"
export interface Loan {
  id: string;
  book_id: string;
  user_id: string;
  loan_date: string;
  return_date: string;
  status: "active" | "returned";
  created_at: string;
  book: {
    id: string;
    title: string;
    author: string;
    category: string;
    year: number;
    available: boolean;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const useLoans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLoans = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLoans();
      // Explicitly cast the status to the correct type
      setLoans(data.map(loan => ({
        ...loan,
        status: loan.status === "active" ? "active" : "returned"
      } as Loan)));
    } catch (err: any) {
      setError(err.message);
      toast.error(`Erro ao carregar empréstimos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchLoansByUser = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLoansByUserId(userId);
      // Explicitly cast the status to the correct type
      setLoans(data.map(loan => ({
        ...loan,
        status: loan.status === "active" ? "active" : "returned"
      } as Loan)));
    } catch (err: any) {
      setError(err.message);
      toast.error(`Erro ao carregar empréstimos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchLoansByBook = async (bookId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLoansByBookId(bookId);
      // Explicitly cast the status to the correct type
      setLoans(data.map(loan => ({
        ...loan,
        status: loan.status === "active" ? "active" : "returned"
      } as Loan)));
    } catch (err: any) {
      setError(err.message);
      toast.error(`Erro ao carregar empréstimos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addLoan = async (loan: Omit<Loan, "id" | "created_at" | "book" | "user">) => {
    setLoading(true);
    setError(null);
    try {
      const newLoan = await createLoan(loan);
      // Ensure the status is typed correctly
      const typedLoan: Loan = {
        ...newLoan,
        status: newLoan.status === "active" ? "active" : "returned"
      } as Loan;
      
      setLoans((prev) => [...prev, typedLoan]);
      toast.success("Empréstimo registrado com sucesso!");
      return typedLoan;
    } catch (err: any) {
      setError(err.message);
      toast.error(`Erro ao registrar empréstimo: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const returnLoan = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedLoan = await updateLoanStatus(id, "returned");
      // Ensure the status is typed correctly
      const typedLoan: Loan = {
        ...updatedLoan,
        status: "returned"
      } as Loan;
      
      setLoans((prev) =>
        prev.map((loan) => (loan.id === id ? typedLoan : loan))
      );
      toast.success("Livro devolvido com sucesso!");
      return typedLoan;
    } catch (err: any) {
      setError(err.message);
      toast.error(`Erro ao registrar devolução: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeLoan = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteLoan(id);
      setLoans((prev) => prev.filter((loan) => loan.id !== id));
      toast.success("Empréstimo removido com sucesso!");
      return true;
    } catch (err: any) {
      setError(err.message);
      toast.error(`Erro ao remover empréstimo: ${err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Add missing functions needed in Loans.tsx
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCreateLoan = async (bookId: string, userId: string) => {
    return await addLoan({
      book_id: bookId,
      user_id: userId,
      loan_date: new Date().toISOString(),
      return_date: "",
      status: "active"
    });
  };

  const handleReturnLoan = async (loanId: string) => {
    return await returnLoan(loanId);
  };

  return {
    loans,
    loading,
    error,
    searchTerm,
    fetchLoans,
    fetchLoansByUser,
    fetchLoansByBook,
    addLoan,
    returnLoan,
    removeLoan,
    handleSearch,
    handleCreateLoan,
    handleReturnLoan
  };
};
