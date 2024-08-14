import { FC, useState } from 'react'
import { instance } from '../api/axios.api';
import { toast } from 'react-toastify';

const Search: FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!query.trim()) {
      toast.error("Поле ввода не может быть пустым");
      return;
    }

    try {
      const response = await instance.get('/pdfreport', {
        params: { search: query },
      });

      if (response.data.length === 0) {
        toast.error("Ничего не было найдено");
      } else {
        setResults(response.data);
        toast.success("Были найдены некоторые результаты");
      }
    } catch (err) {
      toast.error('Ошибка при выполнении запроса');
    }
  };

  const handleOpenFile = async (filePath: string) => {
    try {
      const req = await instance.post('/pdfreport/open', { fileName: filePath });
      if (req) {
        toast.success('Файл открыт');
      }
    } catch (err) {
      toast.error('Файл не был открыт');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center py-8">
        <form onSubmit={handleSearch} className="flex items-center space-x-4 w-full max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Введите запрос..."
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Поиск
          </button>
        </form>

        {error && <div className="mt-4 text-red-500">{error}</div>}

        {results.length > 0 ? (
          <table className="mt-8 w-full min-w-md table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Название файла</th>
                <th className="border border-gray-300 px-4 py-2">Действие</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{result}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleOpenFile(result)}
                      className="text-blue-500 hover:underline"
                    >
                      Открыть
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mt-8 text-gray-500">Тут пока ничего нет</div>
        )}
      </div>
    </>
  );
};

export default Search;