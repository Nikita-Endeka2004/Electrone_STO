import { FC, useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import { IWork } from '../types/types'

interface IWorkModal {
  id: number,
  setVisiableModal: (visiable: boolean) => void
  selectedWork: IWork | null
}

const WorkModal: FC<IWorkModal> = ({id, setVisiableModal, selectedWork}) => {

  const [workValue, setWorkValue] = useState<string>(selectedWork?.work ?? '')
  const [amountValue, setAmountValue] = useState<number>(selectedWork?.amount ?? 0)
  const [countValue, setCountValue] = useState<number>(selectedWork?.count ?? 0)

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
       <small className="block text-sm text-gray-600">Виконана робота</small>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="work"
            value={workValue}
            onChange={(e) => setWorkValue(e.target.value)}
            placeholder="Робота..."
            required
          />
        </label>
        <label htmlFor="amount" className="block mb-4">
          <small className="block text-sm text-gray-600">Вартість</small>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="amount"
            value={amountValue}
            onChange={handleAmountChange}
            placeholder="Вартість..."
            required
          />
        </label>
        <label htmlFor="count" className="block mb-4">
          <small className="block text-sm text-gray-600">Кількість</small>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="count"
            value={countValue}
            onChange={handleCountChange}
            placeholder="Кількість..."
            required
          />
          <input type="hidden" name="id" value={id} />
        </label>
        <div className="flex justify-between gap-2">
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Зберегти
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
