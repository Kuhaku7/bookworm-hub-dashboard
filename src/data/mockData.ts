
import { Book, User, Loan, DashboardStats, BooksByCategory, MostBorrowedBook, MonthlyLoanStat } from '@/types';

// Livros mockados
export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    category: 'Romance',
    year: 1899,
    available: true,
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z',
    borrowCount: 12
  },
  {
    id: '2',
    title: 'O Cortiço',
    author: 'Aluísio Azevedo',
    category: 'Romance',
    year: 1890,
    available: false,
    createdAt: '2023-02-10T14:22:00Z',
    updatedAt: '2023-06-05T09:15:00Z',
    borrowCount: 8
  },
  {
    id: '3',
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasia',
    year: 1937,
    available: true,
    createdAt: '2023-03-22T11:45:00Z',
    updatedAt: '2023-03-22T11:45:00Z',
    borrowCount: 15
  },
  {
    id: '4',
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    category: 'Fantasia',
    year: 1997,
    available: true,
    createdAt: '2023-02-28T16:20:00Z',
    updatedAt: '2023-04-15T13:10:00Z',
    borrowCount: 20
  },
  {
    id: '5',
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    category: 'Ficção Política',
    year: 1945,
    available: true,
    createdAt: '2023-01-05T09:15:00Z',
    updatedAt: '2023-01-05T09:15:00Z',
    borrowCount: 10
  },
  {
    id: '6',
    title: 'Memórias Póstumas de Brás Cubas',
    author: 'Machado de Assis',
    category: 'Romance',
    year: 1881,
    available: false,
    createdAt: '2023-02-18T15:30:00Z',
    updatedAt: '2023-05-12T10:45:00Z',
    borrowCount: 5
  },
  {
    id: '7',
    title: 'Iracema',
    author: 'José de Alencar',
    category: 'Romance',
    year: 1865,
    available: true,
    createdAt: '2023-03-10T13:25:00Z',
    updatedAt: '2023-03-10T13:25:00Z',
    borrowCount: 7
  },
  {
    id: '8',
    title: '1984',
    author: 'George Orwell',
    category: 'Ficção Distópica',
    year: 1949,
    available: false,
    createdAt: '2023-01-20T14:50:00Z',
    updatedAt: '2023-06-02T11:30:00Z',
    borrowCount: 18
  }
];

// Usuários mockados
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria@example.com',
    isActive: true,
    createdAt: '2023-01-10T09:20:00Z',
    updatedAt: '2023-01-10T09:20:00Z'
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao@example.com',
    isActive: true,
    createdAt: '2023-02-15T14:30:00Z',
    updatedAt: '2023-02-15T14:30:00Z'
  },
  {
    id: '3',
    name: 'Ana Oliveira',
    email: 'ana@example.com',
    isActive: false,
    createdAt: '2023-03-20T10:45:00Z',
    updatedAt: '2023-05-05T11:20:00Z'
  },
  {
    id: '4',
    name: 'Pedro Costa',
    email: 'pedro@example.com',
    isActive: true,
    createdAt: '2023-01-25T16:50:00Z',
    updatedAt: '2023-01-25T16:50:00Z'
  },
  {
    id: '5',
    name: 'Carla Mendes',
    email: 'carla@example.com',
    isActive: true,
    createdAt: '2023-02-28T13:15:00Z',
    updatedAt: '2023-02-28T13:15:00Z'
  }
];

// Empréstimos mockados
export const mockLoans: Loan[] = [
  {
    id: '1',
    bookId: '2',
    userId: '1',
    loanDate: '2023-03-15T10:00:00Z',
    returnDate: null,
    status: 'active'
  },
  {
    id: '2',
    bookId: '4',
    userId: '2',
    loanDate: '2023-04-10T14:30:00Z',
    returnDate: '2023-04-25T11:15:00Z',
    status: 'returned'
  },
  {
    id: '3',
    bookId: '6',
    userId: '1',
    loanDate: '2023-05-05T09:45:00Z',
    returnDate: null,
    status: 'active'
  },
  {
    id: '4',
    bookId: '8',
    userId: '4',
    loanDate: '2023-04-20T15:20:00Z',
    returnDate: null,
    status: 'active'
  },
  {
    id: '5',
    bookId: '1',
    userId: '5',
    loanDate: '2023-03-25T13:10:00Z',
    returnDate: '2023-04-15T10:30:00Z',
    status: 'returned'
  }
];

// Estatísticas do dashboard
export const mockDashboardStats: DashboardStats = {
  totalBooks: mockBooks.length,
  activeUsers: mockUsers.filter(user => user.isActive).length,
  totalLoans: mockLoans.length,
  totalLoanedBooks: mockLoans.filter(loan => loan.status === 'active').length
};

// Livros por categoria
export const mockBooksByCategory: BooksByCategory[] = [
  { category: 'Romance', count: 4 },
  { category: 'Fantasia', count: 2 },
  { category: 'Ficção Política', count: 1 },
  { category: 'Ficção Distópica', count: 1 }
];

// Livros mais emprestados
export const mockMostBorrowedBooks: MostBorrowedBook[] = mockBooks
  .sort((a, b) => (b.borrowCount || 0) - (a.borrowCount || 0))
  .slice(0, 5);

// Empréstimos por mês
export const mockMonthlyLoanStats: MonthlyLoanStat[] = [
  { month: 'Jan', loans: 2 },
  { month: 'Fev', loans: 1 },
  { month: 'Mar', loans: 3 },
  { month: 'Abr', loans: 4 },
  { month: 'Mai', loans: 3 },
  { month: 'Jun', loans: 1 }
];
