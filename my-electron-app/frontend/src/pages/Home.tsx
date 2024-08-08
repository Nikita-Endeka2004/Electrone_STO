import { FC } from 'react'
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const navigate = useNavigate();

  const goToUserPage = () => {
    navigate('/user');
  };

  const goToSearchPage = () => {
    navigate('/search');
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
  </div>
  )
}

export default Home
