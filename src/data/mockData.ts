
// src/data/mockData.ts

// This file can contain mock data for testing and development purposes.
// For example, you can define mock books, users, and loans here.

// Mock data for MostBorrowedBook
export const mostBorrowedBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    borrowCount: 15,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    borrowCount: 12,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    borrowCount: 10,
  },
];

// Mock data for books
export const mockBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic Fiction",
    year: 1925,
    available: true,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z",
    borrowCount: 15
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classic Fiction",
    year: 1960,
    available: false,
    createdAt: "2023-02-10T14:20:00Z",
    updatedAt: "2023-02-10T14:20:00Z",
    borrowCount: 12
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    year: 1949,
    available: true,
    createdAt: "2023-03-05T09:15:00Z",
    updatedAt: "2023-03-05T09:15:00Z",
    borrowCount: 10
  },
  {
    id: "4",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    year: 1937,
    available: true,
    createdAt: "2023-04-20T11:45:00Z",
    updatedAt: "2023-04-20T11:45:00Z",
    borrowCount: 8
  },
  {
    id: "5",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    year: 1813,
    available: true,
    createdAt: "2023-05-12T16:30:00Z",
    updatedAt: "2023-05-12T16:30:00Z",
    borrowCount: 7
  }
];

// Mock data for users
export const mockUsers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    isActive: true,
    createdAt: "2023-01-10T08:30:00Z",
    updatedAt: "2023-01-10T08:30:00Z"
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    isActive: true,
    createdAt: "2023-02-15T14:45:00Z",
    updatedAt: "2023-02-15T14:45:00Z"
  },
  {
    id: "3",
    name: "Pedro Santos",
    email: "pedro.santos@email.com",
    isActive: false,
    createdAt: "2023-03-20T11:20:00Z",
    updatedAt: "2023-03-20T11:20:00Z"
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@email.com",
    isActive: true,
    createdAt: "2023-04-25T09:15:00Z",
    updatedAt: "2023-04-25T09:15:00Z"
  },
  {
    id: "5",
    name: "Carlos Pereira",
    email: "carlos.pereira@email.com",
    isActive: true,
    createdAt: "2023-05-30T16:40:00Z",
    updatedAt: "2023-05-30T16:40:00Z"
  }
];
