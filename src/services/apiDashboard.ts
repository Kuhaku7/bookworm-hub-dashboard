
import { 
  DashboardStats,
  BooksByCategory,
  MostBorrowedBook,
  MonthlyLoanStat
} from "@/types";
import { supabase } from "@/lib/supabase";

// Get dashboard statistics
export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Get total books
  const { count: totalBooks, error: booksError } = await supabase
    .from('books')
    .select('*', { count: 'exact', head: true });

  // Get active users
  const { count: activeUsers, error: usersError } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  // Get total loaned books (not available)
  const { count: totalLoanedBooks, error: loanedBooksError } = await supabase
    .from('books')
    .select('*', { count: 'exact', head: true })
    .eq('available', false);

  // Get total loans
  const { count: totalLoans, error: loansError } = await supabase
    .from('loans')
    .select('*', { count: 'exact', head: true });

  if (booksError || usersError || loanedBooksError || loansError) {
    console.error('Error fetching stats:', { booksError, usersError, loanedBooksError, loansError });
    throw new Error('Error fetching dashboard statistics');
  }

  return {
    totalBooks: totalBooks || 0,
    activeUsers: activeUsers || 0,
    totalLoans: totalLoans || 0,
    totalLoanedBooks: totalLoanedBooks || 0
  };
};

// Get books by category
export const getBooksByCategory = async (): Promise<BooksByCategory[]> => {
  const { data, error } = await supabase
    .from('books')
    .select('category');

  if (error) {
    console.error('Error fetching books by category:', error);
    throw new Error('Error fetching books by category');
  }

  // Group books by category
  const categories: Record<string, number> = {};
  
  data.forEach(book => {
    if (book.category) {
      categories[book.category] = (categories[book.category] || 0) + 1;
    }
  });

  // Convert to array format
  return Object.keys(categories).map(category => ({
    category,
    count: categories[category]
  }));
};

// Get most borrowed books
export const getMostBorrowedBooks = async (): Promise<MostBorrowedBook[]> => {
  const { data, error } = await supabase
    .from('books')
    .select('id, title, author, borrow_count')
    .order('borrow_count', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching most borrowed books:', error);
    throw new Error('Error fetching most borrowed books');
  }

  return data.map(book => ({
    id: book.id,
    title: book.title,
    author: book.author,
    borrowCount: book.borrow_count
  }));
};

// Get monthly loan statistics
export const getMonthlyLoanStats = async (): Promise<MonthlyLoanStat[]> => {
  const { data, error } = await supabase
    .from('loans')
    .select('loan_date')
    .order('loan_date', { ascending: true });

  if (error) {
    console.error('Error fetching monthly loan stats:', error);
    throw new Error('Error fetching monthly loan stats');
  }

  const months = [
    "Jan", "Fev", "Mar", "Abr",
    "Mai", "Jun", "Jul", "Ago",
    "Set", "Out", "Nov", "Dez"
  ];

  // Initialize monthly stats with zeros
  const monthlyStats: Record<string, number> = {};
  months.forEach(month => {
    monthlyStats[month] = 0;
  });

  // Count loans by month
  data.forEach(loan => {
    const date = new Date(loan.loan_date);
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];
    
    monthlyStats[monthName] = (monthlyStats[monthName] || 0) + 1;
  });

  // Convert to array format
  return months.map(month => ({
    month,
    loans: monthlyStats[month]
  }));
};
