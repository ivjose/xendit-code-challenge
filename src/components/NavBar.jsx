/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom'
import { useLoginAuth } from 'contexts/LoginAuthContexts'

const NavBar = () => {
  const { isAuthenticated, logout } = useLoginAuth()
  const routes = [
    {
      label: 'Home',
      url: '/',
      display: isAuthenticated,
    },
    {
      label: 'Login',
      url: '/',
      display: true,
    },
    {
      label: 'Register',
      url: '/register',
      display: true,
    },
    {
      label: 'News Letter',
      url: '/news-letter',
      display: isAuthenticated,
    },
  ]
  return (
    <header className="relative z-10 px-4 py-6 bg-white">
      <div className="flex items-center justify-between max-w-2xl mx-auto space-x-10">
        <nav>
          <ul className="flex space-x-10">
            {routes.map(
              (link) =>
                link.display && (
                  <li key={link.label}>
                    <Link
                      to={link.url}
                      className="text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </nav>
        {isAuthenticated && (
          <div className="flex items-center justify-end w-0 md:flex-1">
            <button
              onClick={logout}
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default NavBar
