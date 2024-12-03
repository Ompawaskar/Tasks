import React from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TaskOverviewChart = () => {

  const tasks = useSelector((state) => state.tasks.tasks);

  const currentDate = new Date();
  const chartData = [
    {
      name: 'Total',
      value: tasks.length,
      color: '#8884d8'
    },
    {
      name: 'Completed',
      value: tasks.filter(task => task.completed).length,
      color: '#82ca9d'
    },
    {
      name: 'Pending',
      value: tasks.filter(task => !task.completed).length,
      color: '#ffc658'
    },
    {
      name: 'Overdue',
      value: tasks.filter(
        (task) => new Date(task.dueDate) < currentDate && !task.completed
      ).length,
      color: '#ff7300'
    }
  ];

  return (
    <Card className="w-full h-[350px] ">
      <CardHeader>
        <CardTitle>Task Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: '#f5f5f5',
                border: '1px solid #d5d5d5',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="value" barSize={40}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TaskOverviewChart;