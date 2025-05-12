
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDashboardStats, mockMostBorrowedBooks, mockBooksByCategory, mockMonthlyLoanStats } from '@/data/mockData';
import { Book, BarChart as BarChartIcon, Users, Calendar } from "lucide-react";

const Dashboard = () => {
  // Cores para os gráficos
  const COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6', '#6366f1'];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da biblioteca e suas estatísticas
        </p>
      </div>
      
      {/* Cards com estatísticas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Livros</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardStats.totalBooks}</div>
            <p className="text-xs text-muted-foreground">
              No acervo da biblioteca
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              Cadastrados no sistema
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Empréstimos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardStats.totalLoans}</div>
            <p className="text-xs text-muted-foreground">
              Realizados no sistema
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Livros Emprestados</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardStats.totalLoanedBooks}</div>
            <p className="text-xs text-muted-foreground">
              Atualmente emprestados
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Gráfico de barras - Livros mais emprestados */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Livros Mais Emprestados</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockMostBorrowedBooks.slice(0, 5)} layout="vertical">
                <XAxis type="number" />
                <YAxis 
                  dataKey="title" 
                  type="category" 
                  tick={{ fontSize: 12 }} 
                  width={150}
                  tickFormatter={(value) => value.length > 20 ? `${value.slice(0, 17)}...` : value}
                />
                <Tooltip 
                  formatter={(value, name, props) => [value, 'Empréstimos']}
                  labelFormatter={(label) => `${label} - ${props.payload[0].payload.author}`}
                />
                <Bar dataKey="borrowCount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Gráfico de pizza - Livros por categoria */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Livros por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockBooksByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="category"
                >
                  {mockBooksByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [value, 'Quantidade']}
                  labelFormatter={(label) => `${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Gráfico de linha - Empréstimos por mês */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Evolução de Empréstimos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={mockMonthlyLoanStats}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="loans"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  name="Empréstimos"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
