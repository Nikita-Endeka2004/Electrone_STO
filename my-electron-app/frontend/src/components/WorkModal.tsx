import { FC, useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import { IWork } from '../types/types'

interface IWorkModal {
  id: number,
  setVisiableModal: (visiable: boolean) => void
  selectedWork: IWork | null
}

const WorkModal: FC<IWorkModal> = ({id, setVisiableModal, selectedWork}) => {
  // Указываем, что значения могут быть строкой или undefined
  const [workValue, setWorkValue] = useState<string>(selectedWork?.work ?? '')
  const [amountValue, setAmountValue] = useState<number>(selectedWork?.amount ?? 0)
  const [countValue, setCountValue] = useState<number>(selectedWork?.count ?? 0)

  // Обновляем состояния при изменении selectedWork
  useEffect(() => {
    setWorkValue(selectedWork?.work ?? '')
    setAmountValue(selectedWork?.amount ?? 0)
    setCountValue(selectedWork?.count ?? 0)
  }, [selectedWork])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmountValue(value ? parseFloat(value) : 0);
  }

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCountValue(value ? parseFloat(value) : 0);
  }
  return (
    <div className="fixed inset-0 bg-gray-800/60 flex justify-center items-center">
      <Form
        action="/works"
        method="patch"
        onSubmit={() => setVisiableModal(false)}
        className="w-1/4 p-6 bg-white rounded-md shadow-lg"
      >
       <label htmlFor="work" className="block mb-4">
       <small className="block text-sm text-gray-600">Проделанная работа</small>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="work"
            value={workValue}
            onChange={(e) => setWorkValue(e.target.value)}
            placeholder="Работа..."
            required
          />
        </label>
        <label htmlFor="amount" className="block mb-4">
          <small className="block text-sm text-gray-600">Стоимость</small>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="amount"
            value={amountValue}
            onChange={handleAmountChange}
            placeholder="Стоимость..."
            required
          />
        </label>
        <label htmlFor="count" className="block mb-4">
          <small className="block text-sm text-gray-600">Количество</small>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="count"
            value={countValue}
            onChange={handleCountChange}
            placeholder="Количество..."
            required
          />
          <input type="hidden" name="id" value={id} />
        </label>
        <div className="flex justify-between gap-2">
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Сохранить
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            type="button"
            onClick={() => setVisiableModal(false)}
          >
            Закрыть
          </button>
        </div>
      </Form>
    </div>
  )
}

export default WorkModal
