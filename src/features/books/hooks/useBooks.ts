
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { Book } from '@/types';
import { getBooks, deleteBook } from '@/services/apiBooks';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Erro ao carregar livros');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await deleteBook(id);
        setBooks(prev => prev.filter(book => book.id !== id));
        toast.success("Livro removido com sucesso!");
      } catch (error) {
        console.error('Error deleting book:', error);
        toast.error("Erro ao excluir livro");
      }
    }
  };

  const addBookToList = (newBook: Book) => {
    setBooks(prev => [newBook, ...prev]);
  };

  const updateBookInList = (updatedBook: Book) => {
    setBooks(prev => prev.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    ));
  };

  return {
    books: filteredBooks,
    loading,
    searchTerm,
    handleSearch,
    handleDelete,
    addBookToList,
    updateBookInList
  };
};
