import { FC } from 'react'
import { instance } from '../api/axios.api'
import { UserData } from '../types/types'
import { useLoaderData } from 'react-router-dom'
import BarChartThreeMonth from '../components/BarChartThreeMonth'
import BarChartOneMonth from '../components/BarChartOneMonth'

export const statisticLoader = async () => {
  const {data} = await instance.get<UserData[]>('/user_data')
  return data
}

const Statistic: FC = () => {
  const data = useLoaderData() as UserData[]
  return (
    <>
      <div className="p-6 space-y-8">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Зароботок за последние три месяца понедельно:</h2>
          <BarChartThreeMonth data={data} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Заработок за текущий месяц за каждые два дня:</h2>
          <BarChartOneMonth data={data} />
        </div>
    </div>
    </>
  )
}

export default Statistic
