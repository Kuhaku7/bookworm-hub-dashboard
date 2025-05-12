import { useEffect, useState } from "react";
import {
  DashboardStats,
  BooksByCategory,
  MostBorrowedBook,
  MonthlyLoanStat,
} from "@/types";
import {
  getDashboardStats,
  getBooksByCategory,
  getMostBorrowedBooks,
  getMonthlyLoanStats,
} from "@/services/apiDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { BookOpen, Users, CircleDollarSign, Book } from "lucide-react";
import { DoughnutChart } from "@/components/DoughnutChart";
import { BarChart } from "@/components/BarChart";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/data-table/columns";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null
  );
  const [booksByCategory, setBooksByCategory] = useState<
    BooksByCategory[] | null
  >(null);
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState<
    MostBorrowedBook[] | null
  >(null);
  const [monthlyLoanStats, setMonthlyLoanStats] = useState<
    MonthlyLoanStat[] | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getDashboardStats();
        const categories = await getBooksByCategory();
        const borrowedBooks = await getMostBorrowedBooks();
        const loanStats = await getMonthlyLoanStats();

        setDashboardStats(stats);
        setBooksByCategory(categories);
        setMostBorrowedBooks(borrowedBooks);
        setMonthlyLoanStats(loanStats);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[400px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total de Livros"
          metric={dashboardStats?.totalBooks.toString() || "0"}
          icon={BookOpen}
        />
        <MetricCard
          title="Usuários Ativos"
          metric={dashboardStats?.activeUsers.toString() || "0"}
          icon={Users}
        />
        <MetricCard
          title="Total de Empréstimos"
          metric={dashboardStats?.totalLoans.toString() || "0"}
          icon={CircleDollarSign}
        />
        <MetricCard
          title="Livros Emprestados"
          metric={dashboardStats?.totalLoanedBooks.toString() || "0"}
          icon={Book}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Livros por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            {booksByCategory ? (
              <DoughnutChart data={booksByCategory} />
            ) : (
              <p>Sem dados de categoria disponíveis.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Empréstimos Mensais</CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyLoanStats ? (
              <BarChart data={monthlyLoanStats} />
            ) : (
              <p>Sem dados de empréstimos mensais disponíveis.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Livros Mais Emprestados</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          {mostBorrowedBooks ? (
            <DataTable columns={columns} data={mostBorrowedBooks} />
          ) : (
            <p>Sem dados de livros emprestados disponíveis.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
