import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4">
        <nav className="container mx-auto">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-white">Главная</Link></li>
            <li><Link to="/statistic" className="text-white">Статистика</Link></li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto">
        <Outlet />
      </main>

    </div>
  )
}

export default Layout
