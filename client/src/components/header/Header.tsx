import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-gray-400 text-black p-5 shadow-md">
      <nav className="container mx-auto flex">
        <ul className="flex space-x-4">
          <li className="gap-2 flex">
            <Link to="/home" className="hover:underline text-2xl">Home</Link>
            <Link to="/members" className="hover:underline text-2xl">Members</Link>
          </li>
        </ul>
        <ul className="ml-auto flex space-x-4">
          <li>
            <Link to="/" className="hover:underline text-2xl">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
