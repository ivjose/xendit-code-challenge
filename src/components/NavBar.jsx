import { Link } from 'react-router-dom'

const NavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/news-letter">News Letter</Link>
      </li>
      <li>
        <Link to="/universities-list">Universities List</Link>
      </li>
    </ul>
  </nav>
)

export default NavBar
