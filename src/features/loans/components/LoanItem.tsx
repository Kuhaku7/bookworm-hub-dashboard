
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Loan } from "@/features/loans/hooks/useLoans";
import LoanStatusBadge from "./LoanStatusBadge";

interface LoanItemProps {
  loan: Loan;
  onReturnLoan: (id: string) => Promise<void>;
}

const LoanItem = ({ loan, onReturnLoan }: LoanItemProps) => {
  const handleReturnLoan = async () => {
    await onReturnLoan(loan.id);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        {loan.book?.title}
        <div className="text-sm text-muted-foreground">
          {loan.book?.author}
        </div>
      </TableCell>
      <TableCell>
        {loan.user?.name}
        <div className="text-sm text-muted-foreground">
          {loan.user?.email}
        </div>
      </TableCell>
      <TableCell>{formatDate(loan.loan_date)}</TableCell>
      <TableCell>
        <LoanStatusBadge status={loan.status} />
      </TableCell>
      <TableCell>
        {loan.status === "active" ? (
          <Button 
            onClick={handleReturnLoan} 
            variant="outline" 
            size="sm"
          >
            Devolver
          </Button>
        ) : (
          <span className="text-sm text-muted-foreground">
            Devolvido em {loan.return_date ? formatDate(loan.return_date) : "N/A"}
          </span>
        )}
      </TableCell>
    </TableRow>
  );
};

export default LoanItem;
