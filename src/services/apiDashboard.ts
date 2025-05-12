
// src/services/apiDashboard.ts

import { 
  DashboardStats,
  BooksByCategory,
  MostBorrowedBook,
  MonthlyLoanStat
} from "@/types";
import { mockBooks, mockUsers, mostBorrowedBooks } from "@/data/mockData";

// Get dashboard statistics
export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Calculate stats from mock data
  const totalBooks = mockBooks.length;
  const activeUsers = mockUsers.filter(user => user.isActive).length;
  const totalLoans = mockBooks.reduce((total, book) => total + (book.borrowCount || 0), 0);
  const totalLoanedBooks = mockBooks.filter(book => !book.available).length;
  
  return {
    totalBooks,
    activeUsers,
    totalLoans,
    totalLoanedBooks
  };
};

// Get books by category
export const getBooksByCategory = async (): Promise<BooksByCategory[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Group books by category
  const categories: Record<string, number> = {};
  mockBooks.forEach(book => {
    categories[book.category] = (categories[book.category] || 0) + 1;
  });
  
  // Convert to array format
  return Object.keys(categories).map(category => ({
    category,
    count: categories[category]
  }));
};

// Get most borrowed books
export const getMostBorrowedBooks = async (): Promise<MostBorrowedBook[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return pre-defined most borrowed books
  return mostBorrowedBooks;
};

// Get monthly loan statistics
export const getMonthlyLoanStats = async (): Promise<MonthlyLoanStat[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Create mock data for monthly loans
  const currentYear = new Date().getFullYear();
  const months = [
    "Jan", "Fev", "Mar", "Abr",
    "Mai", "Jun", "Jul", "Ago",
    "Set", "Out", "Nov", "Dez"
  ];
  
  // Generate random loan numbers for each month
  return months.map((month, index) => ({
    month,
    loans: Math.floor(Math.random() * 20) + 5 // Random number between 5 and 25
  }));
};
