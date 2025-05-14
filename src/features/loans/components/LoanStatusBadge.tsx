
import { Badge } from '@/components/ui/badge';

interface LoanStatusBadgeProps {
  status: 'active' | 'returned';
}

const LoanStatusBadge = ({ status }: LoanStatusBadgeProps) => {
  return (
    <Badge className={status === 'active' ? 'bg-yellow-500' : 'bg-green-500'}>
      {status === 'active' ? 'Em andamento' : 'Devolvido'}
    </Badge>
  );
};

export default LoanStatusBadge;
