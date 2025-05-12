
// Tipos para a aplicação
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  borrowCount?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Loan {
  id: string;
  bookId: string;
  userId: string;
  loanDate: string;
  returnDate: string | null;
  status: 'active' | 'returned';
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
