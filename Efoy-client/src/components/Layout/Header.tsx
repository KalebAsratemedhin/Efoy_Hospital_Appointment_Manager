import { Link, useLocation, useNavigate } from "react-router-dom"
import { TfiSearch } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
import { CgMenuLeftAlt } from "react-icons/cg";
import AuthHeaderInfo from "./AuthHeaderInfo";
import { useState } from "react";


const Header = ({onSidebarToggle}: {onSidebarToggle: () => void}) => {
  const {pathname} = useLocation()
  let title = pathname.split('/')[1]
  title = title.slice(0,1).toUpperCase().concat(title.slice(1))

  const authState = useSelector(authSelector)  
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearch = () => {

    navigate(`/doctors?search=${searchTerm}`)

  }

    
  return (
    <div className="bg-white shadow-sm w-full flex justify-between items-center h-[72px] px-4 py-2">
        <CgMenuLeftAlt onClick={onSidebarToggle} className=" w-6 h-6 sm:hidden" />
        <div className="flex gap-2">
          {pathname === '/' && 
            <h1 className="text-5xl font-cursive text-gray-800 mb-6 my-4">
              Efoy
            </h1>
          }
          
          

          {title}
        </div>

        <div className=" rounded-full md:flex justify-between items-center px-2 py-2 bg-gray-100 hidden">
          <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-gray-100 focus:outline-none  mr-2 rounded-md px-2 appearance-none "  />
          <TfiSearch className="text-xl mr-2 hover:cursor-pointer" onClick={handleSearch} />
        </div>
        
        <div>
          {authState.id}
          {
            authState.id ?
             <AuthHeaderInfo /> :
            <div className="flex gap-2">
              <Link className="bg-white text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white px-8 py-2 rounded-full  " to='/signin'>signin</Link>
              <Link className="bg-purple-500 border border-purple-500 hover:text-purple-500 hover:bg-white hover:border hover:border-bg-purple-500 text-white px-8 py-2 rounded-full" to='/signup'>signup</Link>
            
            </div>
          }

        </div>

    </div>
  )
}

export default Header