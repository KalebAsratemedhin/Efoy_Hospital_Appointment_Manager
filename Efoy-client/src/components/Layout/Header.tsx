import { Link, useLocation } from "react-router-dom"
import { TfiSearch } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
import { CgMenuLeftAlt } from "react-icons/cg";
import AuthHeaderInfo from "./AuthHeaderInfo";


const Header = ({onSidebarToggle}: {onSidebarToggle: () => void}) => {
  const {pathname} = useLocation()
  let title = pathname.split('/')[1]
  title = title.slice(0,1).toUpperCase().concat(title.slice(1))

  const authState = useSelector(authSelector)  
  
  const handleSearch = () => {

  }

    
  return (
    <div className="bg-white shadow-sm w-full flex justify-between items-center min-h-16 px-4 py-2">
        <CgMenuLeftAlt onClick={onSidebarToggle} className=" w-6 h-6 sm:hidden" />
        <div>
          {pathname === '/' && <h1 className="font-medium text-3xl ">Efoy </h1>
          }

          {title}
        </div>

        <div className=" rounded-full md:flex justify-between items-center px-2 py-2 bg-gray-100 hidden">
          <input type="search" className="bg-gray-100 focus:outline-none  mr-2 rounded-md px-2 appearance-none "  />
          <TfiSearch className="text-xl mr-2 hover:cursor-pointer" onClick={handleSearch} />
        </div>
        
        <div>
          {
            authState.id ?
             <AuthHeaderInfo /> :
            <div className="flex gap-2">
              <Link className="text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white px-3 py-1 rounded-md" to='/signin'>signin</Link>
              <Link className="text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white px-3 py-1 rounded-md" to='/signup'>signup</Link>
            
            </div>
          }

        </div>

    </div>
  )
}

export default Header