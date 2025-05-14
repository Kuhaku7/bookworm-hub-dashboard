
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loan } from '@/features/loans/hooks/useLoans';
import LoanItem from "./LoanItem";

interface LoansListProps {
  loans: Loan[];
  searchTerm: string;
  onReturnLoan: (id: string) => Promise<void>;
}

const LoansList = ({ loans, searchTerm, onReturnLoan }: LoansListProps) => {
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

  return (
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
              <LoanItem 
                key={loan.id} 
                loan={loan} 
                onReturnLoan={onReturnLoan}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoansList;
