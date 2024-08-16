import { FC, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { IStatistic, UserData, Work } from '../types/types';

const formatDate = (date: Date) => date.toLocaleDateString('en-GB');

const BarChartThreeMonth: FC<IStatistic> = ({ data }) => {

  const transformedData = useMemo(() => {
    const getWeekRange = (date: Date) => {
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay()); 
      const end = new Date(start);
      end.setDate(start.getDate() + 6); 

      return `${formatDate(start)} - ${formatDate(end)}`;
    };

    const groupDataByWeek = (data: UserData[]) => {
      const weeklyData: { weekRange: string; totalAmount: number }[] = [];
      let weekData: { weekRange: string; totalAmount: number } = { weekRange: '', totalAmount: 0 };

      data.forEach(item => {
        const date = new Date(item.date);
        const weekRange = getWeekRange(date);

        if (weekData.weekRange !== weekRange) {
          if (weekData.weekRange) {
            weeklyData.push(weekData);
          }
          weekData = { weekRange, totalAmount: 0 };
        }

        const weekAmount = item.works.reduce((sum, work: Work) => sum + parseFloat(work.amount), 0);
        weekData.totalAmount += weekAmount;
      });

      if (weekData.weekRange) {
        weeklyData.push(weekData);
      }

      return weeklyData;
    };

    const groupedData = groupDataByWeek(data);

    return groupedData.map(week => ({
      date: week.weekRange,
      Зароботок: week.totalAmount,
    }));
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
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Зароботок" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
  </div>
  )
}

export default BarChartThreeMonth
