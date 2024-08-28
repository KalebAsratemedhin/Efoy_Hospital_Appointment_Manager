import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="min-w-12">
        <Link to='/'>Home</Link>
        <Link to='/dashboard'>Home</Link>
        <Link to='/appointments'>Home</Link>
        <Link to='/book'>Home</Link>
        <Link to='/favorites'>Home</Link>
        <button type="button">signout</button>
    </div>
  )
}

export default Sidebar