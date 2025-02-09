import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { stopProject } from '../helpers/AppClose.ts';

const Layout: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4">
        <nav className="container mx-auto flex items-center">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white">
                Головна
              </Link>
            </li>
            <li>
              <Link to="/statistic" className="text-white">
                Статистика
              </Link>
            </li>
          </ul>
          <div className="ml-auto">
            <button
              onClick={stopProject}
              className="bg-red-500 text-white px-4 py-2 rounded shadow-lg transition-transform transform hover:scale-105 hover:bg-red-600"
            >
              Вихід
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
