
// src/components/BarChart.tsx
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { MonthlyLoanStat } from '@/types';

interface BarChartProps {
  data: MonthlyLoanStat[];
}

export const BarChart = ({ data }: BarChartProps) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <RechartsBarChart
          data={data}
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
          <Tooltip formatter={(value) => [`${value} empréstimos`, 'Total']} />
          <Bar dataKey="loans" fill="#8884d8" name="Empréstimos" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
