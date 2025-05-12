
// src/components/DoughnutChart.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BooksByCategory } from '@/types';

interface DoughnutChartProps {
  data: BooksByCategory[];
}

export const DoughnutChart = ({ data }: DoughnutChartProps) => {
  // Define colors for chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="count"
            nameKey="category"
            label={({ category }) => category}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} livros`, 'Quantidade']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
