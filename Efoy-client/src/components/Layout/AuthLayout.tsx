import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { useGetCurrentUserQuery } from "../../redux/api/authAPI"
import Spinner from "../utils/Spinner"
import Error from "../utils/Error"
import { useDispatch } from "react-redux"
import {  clearAuth } from "../../redux/slices/authSlice"
import { CustomSerializedError } from "../../types/CustomSerializedError"
import { useState } from "react"

const Layout = () => {
  const {pathname} = useLocation()
  const {isLoading: isUserLoading, isSuccess: isUserSuccess, isError: isUserError, error: userError, data: user, refetch} = useGetCurrentUserQuery()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)


  if(isUserLoading)
    return <Spinner />
    
  if(isUserError){
    const error = userError as CustomSerializedError
    if(error.data.message === "No token provided"){
      dispatch(clearAuth())

    }
    return <Error error={error} />

  }

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen)

  }
    
  

  return (
    <div className="h-full flex  "  >


        {pathname !== "/" && 
          <div className="relative">
            <Sidebar isOpen={isOpen} onSidebarToggle={handleSidebarToggle}  />

          </div>       
        }
    
        <div className="flex flex-col w-full overflow-y-auto bg-gray-100">
          <Header onSidebarToggle={handleSidebarToggle} />
          <div className="flex-grow  ">
            <Outlet />
          </div>
          <Footer /> 

        </div>
    </div>
  )
}

export default Layout