import { Link, useLocation, useNavigate } from "react-router-dom"
import { TfiSearch } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, clearAuth } from "../../redux/slices/authSlice";
import { useGetCurrentUserQuery } from "../../redux/api/authAPI";
import { IoNotifications } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { CustomSerializedError } from "../../types/CustomSerializedError";

const Header = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  let title = pathname.split('/')[1]
  title = title.slice(0,1).toUpperCase().concat(title.slice(1))
  const authState = useSelector(authSelector)
  const {data: user, isError: isUserError, error: userError} = useGetCurrentUserQuery()

  const initials = user?.fullName.split(' ').map((name) => name[0].toUpperCase()).join('');  
  const dispatch = useDispatch()
  
  if(isUserError){
    const error = userError as CustomSerializedError
    if(error?.data?.message === "No token provided"){
      dispatch(clearAuth())

    }

  }
  
  const handleSearch = () => {

  }

    
  return (
    <div className="bg-white shadow-sm w-full flex justify-between items-center min-h-16 px-4 py-2">
        <div>
          {pathname === '/' && <h1 className="font-medium text-3xl ">Efoy </h1>
          }

          {title}
        </div>

        <div className=" rounded-full sm:flex justify-between items-center px-3 py-2 bg-gray-100 hidden">
          <input type="search" className="bg-gray-100 focus:outline-none  mr-2 rounded-md px-2 appearance-none "  />
          <TfiSearch className="text-xl mr-2 hover:cursor-pointer" onClick={handleSearch} />
        </div>
        
        <div>
          {
            authState.username ?
            <div className="flex gap-4  justify-end items-center">
              <IoSettingsOutline onClick={() => navigate('/settings') } className="w-8 h-8 text-secondary hover:text-primary" />
              <IoNotifications onClick={() => navigate('/notifications') } className="w-8 h-8 text-secondary hover:text-primary"  />
            
              <div className="w-14 h-14 rounded-full flex justify-center items-center bg-gray-300 text-lg ">
                {initials}
              </div>
            </div>

            :
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