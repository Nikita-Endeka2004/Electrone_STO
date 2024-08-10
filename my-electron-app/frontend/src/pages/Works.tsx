import { FC, useState } from 'react'
import { Form, useLoaderData, useNavigate } from 'react-router-dom'
import { IWork } from '../types/types'
import { instance } from '../api/axios.api'
import WorkModal from '../components/WorkModal'
import { toast } from 'react-toastify'


export const worksAction = async ({request}: any) => {
  switch(request.method){
    case "POST": {
      const formData = await request.formData()
      const work = {
        work: formData.get('work'),
        amount: formData.get('amount'),
        count: formData.get('count')
      }
      await instance.post('/works', work)
      toast.success('Було додано до списку');
      return null
    }
    case "PATCH": {
      const formData = await request.formData()
      const works = {
        id: formData.get('id'),
        work: formData.get('work'),
        amount: formData.get('amount'),
        count: formData.get('count')
      }
      await instance.patch(`works/${works.id}`, works)
      return null
    }
  }
}

export const worksLoader = async () => {
  const {data} = await instance.get<IWork[]>('/works')
  return data
}

const Works: FC = () => {
  const works = useLoaderData() as IWork[]
  const [work, setWork] = useState('');
  const [amount, setAmount] = useState('');
  const [count, setCount] = useState('');

  const [workId, setWorkId] = useState<number>(0)
  const [selectedWork, setSelectedWork] = useState<IWork | null>(null)
  const [visibleModal, setVisibleModal] = useState<boolean>(false)

  const handleSubmit = () => {
    setWork('');
    setAmount('');
    setCount('');
  };

  const navigate = useNavigate();

  const handleCreatePdf = async () => {
    try {
      await instance.post('/pdfreport'); 
      toast.success('PDF успешно создан');
      navigate('/');
    } catch (error) {
      toast.error('Ошибка при создании PDF');
    }
  };

  return (
    <>
      <div className="flex h-screen p-8">
        {/* Левая часть: форма для заполнения */}
        <div className="w-1/3 p-4 bg-white rounded shadow-md mr-4">
          <h2 className="text-2xl font-bold mb-6">Добавить проделанную работу</h2>
          <Form method="post" action="/works" onSubmit={handleSubmit}>
            <input type="hidden" name="editingId" value="" />
            <div className="mb-4">
              <label htmlFor="work" className="block text-sm font-medium text-gray-700">
                Проделанная работа
              </label>
              <input
                type="text"
                id="work"
                name="work"
                value={work}
                onChange={(e) => setWork(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Стоимость
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="count" className="block text-sm font-medium text-gray-700">
                Количество
              </label>
              <input
                type="number"
                id="count"
                name="count"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
            >
              Добавить
            </button>
          </Form>
          <button className="bg-gray-700 text-white p-1 rounded mt-60 w-full" onClick={handleCreatePdf}>Создать пдф</button>
        </div>

        {/* Правая часть: таблица */}
        <div className="w-2/3 p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6">Список работ</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="w-1/10 py-2">№</th>
                <th className="w-2/3 px-4 py-2">Проделанная работа</th>
                <th className="w-1/4 px-4 py-2">Стоимость</th>
                <th className="w-1/8 px-4 py-2">Количество</th>
                <th className="w-1/12 px-4 py-2">Действия</th>
              </tr>
            </thead>
            <tbody>
              {works.map((item, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-2">{idx}</td>
                  <td className="border px-4 py-2">{item.work}</td>
                  <td className="border px-4 py-2">{item.amount}</td>
                  <td className="border px-4 py-2">{item.count}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white p-1 rounded"
                      onClick={() => {setWorkId(item.id), setVisibleModal(true), setSelectedWork(item)}}
                    >
                      Изменить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
       {/* Edit Work Modal */}
       {visibleModal && (
        <WorkModal setVisiableModal={setVisibleModal} id={workId} selectedWork={selectedWork}/>
      )}
    </>
  )
}

export default Works
