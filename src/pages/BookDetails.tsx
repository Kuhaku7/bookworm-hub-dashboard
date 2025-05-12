
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book as BookType } from "@/types";
import { mockBooks } from "@/data/mockData";
import { ArrowLeft, Book, Calendar, Edit, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando busca do livro na API
    const fetchBook = () => {
      setLoading(true);
      setTimeout(() => {
        const foundBook = mockBooks.find((b) => b.id === id);
        setBook(foundBook || null);
        setLoading(false);
      }, 500);
    };

    fetchBook();
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este livro?")) {
      // Simulando deleção
      toast.success("Livro excluído com sucesso");
      navigate("/books");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bookworm-primary"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-2xl font-bold">Livro não encontrado</h2>
        <p className="text-muted-foreground">
          O livro que você está procurando não existe ou foi removido.
        </p>
        <Button onClick={() => navigate("/books")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a lista
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => navigate("/books")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{book.title}</CardTitle>
                <CardDescription className="text-lg">{book.author}</CardDescription>
              </div>
              <Badge variant={book.available ? "default" : "outline"} className={book.available ? "bg-green-500" : ""}>
                {book.available ? "Disponível" : "Emprestado"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-bookworm-primary/10 rounded text-bookworm-primary">
                  <Book size={16} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categoria</p>
                  <p className="font-medium">{book.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-bookworm-primary/10 rounded text-bookworm-primary">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ano de publicação</p>
                  <p className="font-medium">{book.year}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-semibold mb-2">Estatísticas do livro</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total de empréstimos</p>
                  <p className="text-2xl font-bold">{book.borrowCount || 0}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Adicionado em</p>
                  <p className="text-lg font-semibold">
                    {new Date(book.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between border-t pt-6">
            <Button variant="outline" onClick={() => navigate(`/books`)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a lista
            </Button>

            <div className="flex gap-2">
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </Button>
              <Button onClick={() => navigate(`/books`)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Empréstimos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <p>Esta funcionalidade estará disponível após a integração com o Supabase.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookDetails;
