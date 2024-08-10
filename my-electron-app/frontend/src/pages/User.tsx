import { FC } from 'react'
import { instance } from '../api/axios.api'
import { Form, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

const toUpperCase = (value: string | null): string => {
  return value ? value.toUpperCase() : '';
};

export const userAction = async ({request}: any) => {
  switch(request.method){
    case "POST": {
      const formData = await request.formData()
      const data = {
        vin: toUpperCase(formData.get('vin')),
        car_number: toUpperCase(formData.get('car_number')),
        fio: formData.get("fio")        
      }
      await instance.post('/user_data', data)
      toast.success('Клієнт був доданий');
      return redirect('/works')
    }
  }
}

const User: FC = () => {
  return (
    <div className="flex justify-center items-start h-screen mt-40">
      <Form action='/user' method="post" className="bg-white p-8 rounded shadow-md w-96" >
        <h2 className="text-2xl font-bold mb-6">Введите данные</h2>
        <div className="mb-4">
          <label htmlFor="vin" className="block text-sm font-medium text-gray-700">
            VIN
          </label>
          <input
            type="text"
            id="vin"
            name="vin"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="car_number" className="block text-sm font-medium text-gray-700">
            Номер машины
          </label>
          <input
            type="text"
            id="car_number"
            name="car_number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fio" className="block text-sm font-medium text-gray-700">
            ФИО
          </label>
          <input
            type="text"
            id="fio"
            name="fio"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Отправить
        </button>
      </Form>
    </div>
  )
}

export default User
