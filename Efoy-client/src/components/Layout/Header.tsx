import { Link } from "react-router-dom"
import { IoSearchOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="bg-white shadow-sm mb-2 flex justify-between items-center min-h-16 px-4 py-2">
        <h1 className="font-medium text-3xl ">Efoy <span className="text-gray-400 block text-base my-auto">Your Hospital Appointment Manager</span></h1>
        

        <div className=" rounded-xl flex items-center px-3 py-2 bg-gray-100">
          <input type="search" className="bg-gray-100 focus:ring-blue-500 focus:ring-2 focus:border-none"  />
          <IoSearchOutline />
        </div>
        <div className="flex gap-2">
            <Link className="text-purple-500 border border-purple-500 px-3 py-1 rounded-md" to='/signin'>signin</Link>
            <Link className="text-purple-500 border border-purple-500 px-3 py-1 rounded-md" to='/signup'>signup</Link>
           
        </div>

    </div>
  )
}

export default Header