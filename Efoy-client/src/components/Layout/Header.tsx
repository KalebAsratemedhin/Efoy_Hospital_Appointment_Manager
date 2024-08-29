import { Link, useLocation } from "react-router-dom"
import { TfiSearch } from "react-icons/tfi";

const Header = () => {
  const {pathname} = useLocation()
  let title = pathname.split('/')[1]
  title = title.slice(0,1).toUpperCase().concat(title.slice(1))
  const handleSearch = () => {

  }

  return (
    <div className="bg-white shadow-sm flex justify-between items-center min-h-16 px-4 py-2">
        {pathname === '/' && <h1 className="font-medium text-3xl ">Efoy <span className="text-gray-400 block text-base my-auto">Your Hospital Appointment Manager</span></h1>
        }

        {title}

        <div className=" rounded-full flex items-center px-3 py-2 bg-gray-100">
          <input type="search" className="bg-gray-100 focus:outline-none  mr-2 rounded-md px-2 appearance-none "  />
          <TfiSearch className="text-xl mr-2 hover:cursor-pointer" onClick={handleSearch} />
        </div>
        <div className="flex gap-2">
            <Link className="text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white px-3 py-1 rounded-md" to='/signin'>signin</Link>
            <Link className="text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white px-3 py-1 rounded-md" to='/signup'>signup</Link>
           
        </div>

    </div>
  )
}

export default Header