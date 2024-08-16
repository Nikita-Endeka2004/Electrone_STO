import { FC, useMemo } from 'react'
import { IStatistic, Work } from '../types/types';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const formatDate = (date: Date) => date.toLocaleDateString('en-GB');

const getTwoDayRange = (startDate: Date) => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1); 

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

const BarChartOneMonth:FC<IStatistic> = ({data}) => {

  const transformedData = useMemo(() => {
    const groupedData: { period: string; Заработок: number }[] = [];
    const monthStart = new Date();
    monthStart.setDate(1); // Начало текущего месяца

    // Фильтруем данные за последний месяц
    const filteredData = data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= monthStart;
    });

    // Группируем данные по каждые два дня
    let periodStart = new Date(monthStart);
    periodStart.setHours(0, 0, 0, 0);
    while (periodStart < new Date()) {
      const periodEnd = new Date(periodStart);
      periodEnd.setDate(periodStart.getDate() + 1);

      const periodRange = getTwoDayRange(periodStart);
      const Заработок = filteredData
        .filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= periodStart && itemDate <= periodEnd;
        })
        .reduce((sum, item) => sum + item.works.reduce((subSum, work: Work) => subSum + parseFloat(work.amount), 0), 0);

      groupedData.push({ period: periodRange, Заработок });

      periodStart.setDate(periodStart.getDate() + 2);
    }

    return groupedData;
  }, [data]);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={transformedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Заработок" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartOneMonth
