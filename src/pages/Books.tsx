
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Book, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Book as BookType } from '@/types';
import { mockBooks } from '@/data/mockData';

const Books = () => {
  const [books, setBooks] = useState<BookType[]>(mockBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBook, setNewBook] = useState<Partial<BookType>>({
    title: '',
    author: '',
    category: '',
    year: new Date().getFullYear(),
    available: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentBookId, setCurrentBookId] = useState<string | null>(null);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.category || !newBook.year) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const currentDate = new Date().toISOString();
    const bookToAdd: BookType = {
      id: Date.now().toString(),
      title: newBook.title,
      author: newBook.author,
      category: newBook.category,
      year: Number(newBook.year),
      available: newBook.available || false,
      createdAt: currentDate,
      updatedAt: currentDate,
      borrowCount: 0
    };

    setBooks(prev => [bookToAdd, ...prev]);
    resetForm();
    toast.success("Livro adicionado com sucesso!");
  };

  const handleEditBook = () => {
    if (!newBook.title || !newBook.author || !newBook.category || !newBook.year || !currentBookId) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setBooks(prev => prev.map(book => 
      book.id === currentBookId ? 
      { 
        ...book, 
        title: newBook.title || book.title, 
        author: newBook.author || book.author, 
        category: newBook.category || book.category, 
        year: Number(newBook.year) || book.year,
        available: newBook.available !== undefined ? newBook.available : book.available,
        updatedAt: new Date().toISOString() 
      } : book
    ));
    
    resetForm();
    setIsEditing(false);
    setCurrentBookId(null);
    toast.success("Livro atualizado com sucesso!");
  };

  const handleDeleteBook = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      setBooks(prev => prev.filter(book => book.id !== id));
      toast.success("Livro removido com sucesso!");
    }
  };

  const startEditing = (book: BookType) => {
    setNewBook({
      title: book.title,
      author: book.author,
      category: book.category,
      year: book.year,
      available: book.available
    });
    setCurrentBookId(book.id);
    setIsEditing(true);
  };

  const resetForm = () => {
    setNewBook({
      title: '',
      author: '',
      category: '',
      year: new Date().getFullYear(),
      available: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Livros</h1>
          <p className="text-muted-foreground">
            Gerenciamento do acervo da biblioteca
          </p>
        </div>
        
        <Dialog onOpenChange={(open) => {
          if (!open) {
            resetForm();
            setIsEditing(false);
            setCurrentBookId(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-bookworm-primary hover:bg-bookworm-secondary">
              <Plus className="mr-2 h-4 w-4" />
              Novo Livro
            </Button>
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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={newBook.title}
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
                  value={newBook.author}
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
                  value={newBook.category}
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
                  value={newBook.year}
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
                    checked={newBook.available}
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
                  onClick={isEditing ? handleEditBook : handleAddBook}
                >
                  {isEditing ? "Salvar Alterações" : "Adicionar Livro"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filtro e busca */}
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Buscar por título, autor ou categoria..." 
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      {/* Tabela de livros */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Título</TableHead>
                <TableHead className="font-medium">Autor</TableHead>
                <TableHead className="font-medium">Categoria</TableHead>
                <TableHead className="font-medium">Ano</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 italic text-muted-foreground">
                    Nenhum livro encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredBooks.map(book => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>{book.year}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={book.available ? "default" : "outline"}
                        className={book.available ? "bg-green-500 hover:bg-green-600" : ""}
                      >
                        {book.available ? "Disponível" : "Emprestado"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => startEditing(book)}
                            >
                              <Edit size={16} />
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                        
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/books/${book.id}`}>
                            <Book size={16} />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t py-3 px-6">
          <div className="text-xs text-muted-foreground">
            {filteredBooks.length} livros encontrados
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Books;
