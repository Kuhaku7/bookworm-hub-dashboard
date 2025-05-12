
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Book as BookIcon, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Book } from '@/types';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookList = ({ books, onEdit, onDelete }: BookListProps) => {
  return (
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
            {books.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 italic text-muted-foreground">
                  Nenhum livro encontrado
                </TableCell>
              </TableRow>
            ) : (
              books.map(book => (
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
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onEdit(book)}
                      >
                        <Edit size={16} />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onDelete(book.id)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                      
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/books/${book.id}`}>
                          <BookIcon size={16} />
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
          {books.length} livros encontrados
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookList;
