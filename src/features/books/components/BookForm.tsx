
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import { Book } from '@/types';
import { createBook, updateBook } from '@/services/apiBooks';

interface BookFormProps {
  book?: Partial<Book>;
  isEditing: boolean;
  onSuccess: (book: Book) => void;
}

const BookForm = ({ book, isEditing, onSuccess }: BookFormProps) => {
  const [newBook, setNewBook] = useState<Partial<Book>>({
    title: '',
    author: '',
    category: '',
    year: new Date().getFullYear(),
    available: true,
  });

  useEffect(() => {
    if (book) {
      setNewBook(book);
    }
  }, [book]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              name === 'year' ? Number(value) : value
    }));
  };

  const handleSubmit = async () => {
    if (!newBook.title || !newBook.author || !newBook.category || !newBook.year) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      if (isEditing && book?.id) {
        const updatedBook = await updateBook(book.id, {
          title: newBook.title,
          author: newBook.author,
          category: newBook.category,
          year: Number(newBook.year),
          available: newBook.available !== undefined ? newBook.available : undefined,
        });
        
        onSuccess(updatedBook);
        toast.success("Livro atualizado com sucesso!");
      } else {
        const bookToAdd: Omit<Book, 'id' | 'created_at' | 'updated_at' | 'borrow_count'> = {
          title: newBook.title || '',
          author: newBook.author || '',
          category: newBook.category || '',
          year: Number(newBook.year),
          available: newBook.available || false,
        };

        const addedBook = await createBook(bookToAdd);
        onSuccess(addedBook);
        toast.success("Livro adicionado com sucesso!");
      }
    } catch (error) {
      console.error('Error handling book:', error);
      toast.error(isEditing ? "Erro ao atualizar livro" : "Erro ao adicionar livro");
    }
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Título
          </Label>
          <Input
            id="title"
            name="title"
            value={newBook.title || ''}
            onChange={handleInputChange}
            className="col-span-3"
            placeholder="Nome do livro"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="author" className="text-right">
            Autor
          </Label>
          <Input
            id="author"
            name="author"
            value={newBook.author || ''}
            onChange={handleInputChange}
            className="col-span-3"
            placeholder="Nome do autor"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Categoria
          </Label>
          <Input
            id="category"
            name="category"
            value={newBook.category || ''}
            onChange={handleInputChange}
            className="col-span-3"
            placeholder="Ex: Romance, Ficção, etc."
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="year" className="text-right">
            Ano
          </Label>
          <Input
            id="year"
            name="year"
            type="number"
            value={newBook.year || new Date().getFullYear()}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="available" className="text-right">
            Disponível
          </Label>
          <div className="col-span-3 flex items-center">
            <Input
              id="available"
              name="available"
              type="checkbox"
              checked={newBook.available || false}
              onChange={handleInputChange}
              className="h-4 w-4"
            />
            <span className="ml-2 text-sm">Livro disponível para empréstimo</span>
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button 
            className="bg-bookworm-primary hover:bg-bookworm-secondary"
            onClick={handleSubmit}
          >
            {isEditing ? "Salvar Alterações" : "Adicionar Livro"}
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

export default BookForm;
