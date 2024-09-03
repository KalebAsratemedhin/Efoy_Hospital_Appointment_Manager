import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { useGetCurrentUserQuery } from "../../redux/api/authAPI"
import Spinner from "../utils/Spinner"
import Error from "../utils/Error"
import { useDispatch, useSelector } from "react-redux"
import { authSelector, clearAuth, getAuth } from "../../redux/slices/authSlice"
import { CustomSerializedError } from "../../types/CustomSerializedError"

const Layout = () => {
  const {pathname} = useLocation()
  const {isLoading: isUserLoading, isSuccess: isUserSuccess, isError: isUserError, error: userError, data: user, refetch} = useGetCurrentUserQuery()
  const dispatch = useDispatch()


  if(isUserLoading)
    return <Spinner />
    
  if(isUserError){
    const error = userError as CustomSerializedError
    if(error.data.message === "No token provided"){
      dispatch(clearAuth())

    }
    return <Error error={error} />

  }
    
  

  return (
    <div className="h-full flex  "  >


        {pathname !== "/" && 
          <Sidebar />
        }
    
        <div className="flex flex-col w-full overflow-y-auto bg-custom-background">
          <Header />
          <div className="flex-grow  ">
            <Outlet />
          </div>
          <Footer /> 

        </div>
    </div>
  )
}

export default Layout