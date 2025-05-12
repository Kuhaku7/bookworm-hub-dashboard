
// Tipos para a aplicação
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  available: boolean;
  created_at: string;
  updated_at: string;
  borrow_count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Loan {
  id: string;
  book_id: string;
  user_id: string;
  loan_date: string;
  return_date: string | null;
  status: 'active' | 'returned';
  created_at: string;
  book?: Book;
  user?: User;
}

export interface DashboardStats {
  totalBooks: number;
  activeUsers: number;
  totalLoans: number;
  totalLoanedBooks: number;
}

export interface BooksByCategory {
  category: string;
  count: number;
}

export interface MostBorrowedBook {
  id: string;
  title: string;
  author: string;
  borrowCount: number;
}

export interface MonthlyLoanStat {
  month: string;
  loans: number;
}
