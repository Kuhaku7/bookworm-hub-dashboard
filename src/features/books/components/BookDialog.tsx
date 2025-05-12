
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { useState } from "react";
import { Book } from "@/types";
import BookForm from "./BookForm";

interface BookDialogProps {
  onBookSaved: (book: Book) => void;
  initialBook?: Book;
  isEditing?: boolean;
  trigger?: React.ReactNode;
}

const BookDialog = ({ 
  onBookSaved, 
  initialBook, 
  isEditing = false,
  trigger 
}: BookDialogProps) => {
  const [open, setOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Partial<Book> | undefined>(initialBook);

  const handleBookSaved = (book: Book) => {
    onBookSaved(book);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset form when closing dialog
      setCurrentBook(initialBook);
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-bookworm-primary hover:bg-bookworm-secondary">
            <Plus className="mr-2 h-4 w-4" />
            Novo Livro
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Livro" : "Adicionar Novo Livro"}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Atualize as informações do livro abaixo." 
              : "Preencha as informações para adicionar um novo livro ao acervo."}
          </DialogDescription>
        </DialogHeader>
        <BookForm 
          book={currentBook} 
          isEditing={isEditing} 
          onSuccess={handleBookSaved} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookDialog;
