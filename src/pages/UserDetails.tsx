
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import { mockUsers, mockBooks } from "@/data/mockData";
import { ArrowLeft, Calendar, Edit, Trash2, User as UserIcon } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando busca do usuário na API
    const fetchUser = () => {
      setLoading(true);
      setTimeout(() => {
        const foundUser = mockUsers.find((u) => u.id === id);
        setUser(foundUser || null);
        setLoading(false);
      }, 500);
    };

    fetchUser();
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      // Simulando deleção
      toast.success("Usuário excluído com sucesso");
      navigate("/users");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bookworm-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-2xl font-bold">Usuário não encontrado</h2>
        <p className="text-muted-foreground">
          O usuário que você está procurando não existe ou foi removido.
        </p>
        <Button onClick={() => navigate("/users")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a lista
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => navigate("/users")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="text-lg">{user.email}</CardDescription>
              </div>
              <Badge variant={user.isActive ? "default" : "outline"} className={user.isActive ? "bg-green-500" : ""}>
                {user.isActive ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-bookworm-primary/10 rounded text-bookworm-primary">
                  <UserIcon size={16} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Usuário desde</p>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-bookworm-primary/10 rounded text-bookworm-primary">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Última atualização</p>
                  <p className="font-medium">
                    {new Date(user.updatedAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-semibold mb-2">Estatísticas do usuário</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total de empréstimos</p>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Estatísticas disponíveis após integração com Supabase
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Status da conta</p>
                  <p className="text-lg font-semibold mt-1">
                    <Badge variant={user.isActive ? "default" : "outline"} className={user.isActive ? "bg-green-500" : ""}>
                      {user.isActive ? "Ativo" : "Inativo"}
                    </Badge>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between border-t pt-6">
            <Button variant="outline" onClick={() => navigate(`/users`)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a lista
            </Button>

            <div className="flex gap-2">
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </Button>
              <Button onClick={() => navigate(`/users`)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Livros Emprestados</CardTitle>
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

export default UserDetails;
