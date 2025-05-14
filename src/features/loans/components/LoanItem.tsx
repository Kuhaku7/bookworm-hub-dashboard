
import { format } from 'date-fns';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import { Loan } from '@/features/loans/hooks/useLoans';
import LoanStatusBadge from './LoanStatusBadge';

interface LoanItemProps {
  loan: Loan;
  onReturnLoan: (id: string) => Promise<void>;
}

const LoanItem = ({ loan, onReturnLoan }: LoanItemProps) => {
  return (
    <TableRow>
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
        <LoanStatusBadge status={loan.status} />
      </TableCell>
      <TableCell>
        {loan.status === 'active' && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onReturnLoan(loan.id)}
          >
            Devolver
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default LoanItem;
