
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useBooks } from '@/features/books/hooks/useBooks';
import BookList from '@/features/books/components/BookList';
import SearchBar from '@/features/books/components/SearchBar';
import BookDialog from '@/features/books/components/BookDialog';
import { Book } from '@/types';

const Books = () => {
  const { 
    books, 
    loading, 
    searchTerm, 
    handleSearch, 
    handleDelete, 
    addBookToList, 
    updateBookInList 
  } = useBooks();
  
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsDialogOpen(true);
  };

  const handleBookUpdated = (book: Book) => {
    updateBookInList(book);
    setEditingBook(null);
    setIsDialogOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEditingBook(null);
    }
    setIsDialogOpen(open);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bookworm-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Livros</h1>
          <p className="text-muted-foreground">
            Gerenciamento do acervo da biblioteca
          </p>
        </div>
        
        <BookDialog 
          onBookSaved={addBookToList} 
          onOpenChange={handleOpenChange}
          open={isDialogOpen && !editingBook}
        />
      </div>
      
      {/* Search */}
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      
      {/* Book List */}
      <BookList 
        books={books} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Edit Dialog */}
      {editingBook && (
        <BookDialog
          onBookSaved={handleBookUpdated}
          initialBook={editingBook}
          isEditing={true}
          open={isDialogOpen}
          onOpenChange={handleOpenChange}
        />
      )}
    </div>
  );
};

export default Books;
