import { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { instance } from '../api/axios.api.ts'

const Home: FC = () => {
  const navigate = useNavigate();

  const goToUserPage = () => {
    navigate('/user');
  };

  const goToSearchPage = () => {
    navigate('/search');
  };

  const handleBackup = async () => {
    toast.info('Создаю бэкап...');

    try {
      await instance.post('/backup');
      toast.success('Бэкап успешно загружен в Google Drive!');
    } catch (error) {
      toast.error('Ошибка при создании бэкапа');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">Главная страница</h2>
      <p className="text-center mb-8">Выберите действие:</p>
      <div className="flex space-x-4">
        <button
          onClick={goToSearchPage}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Страница поиска
        </button>
        <button
          onClick={goToUserPage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Страница пользователя
        </button>
      </div>
      <button
        onClick={handleBackup}
        className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition"
      >
        Сделать бэкап
      </button>
    </div>
  )
}

export default Home
