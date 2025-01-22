import { FC, useMemo } from 'react'
import { IStatistic } from '../types/types';
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
    let periodStart = new Date(monthStart);
    periodStart.setHours(0, 0, 0, 0);

    while (periodStart < new Date()) {
      const periodEnd = new Date(periodStart);
      periodEnd.setDate(periodStart.getDate() + 1);
      periodEnd.setHours(23, 59, 59, 999); // Устанавливаем время на конец дня
      const periodRange = getTwoDayRange(periodStart);
      const Заработок = filteredData
        .filter(item => {
          const itemDate = new Date(item.date);
          itemDate.setHours(0, 0, 0, 0); // Сбрасываем время у itemDate
          return itemDate >= periodStart && itemDate <= periodEnd;
        })
        .reduce((sum, item) => {
          const subSum = item.works.reduce((subSum, work) => {
            const amount = parseFloat(work.amount);
            if (isNaN(amount)) {
              console.warn(`Некорректное значение amount: ${work.amount}`);
              return subSum; // Пропускаем некорректное значение
            }
            return subSum + amount;
          }, 0);
          return sum + subSum;
        }, 0);

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
