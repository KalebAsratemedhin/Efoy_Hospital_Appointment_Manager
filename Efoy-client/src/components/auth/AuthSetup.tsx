import { Outlet} from "react-router-dom"

import { useGetCurrentUserQuery } from "../../redux/api/userAPI"
import Spinner from "../utils/Spinner"
import Error from "../utils/Error"
import { useDispatch } from "react-redux"
import {  clearAuth } from "../../redux/slices/authSlice"
import { CustomSerializedError } from "../../types/CustomSerializedError"

const AuthSetup = () => {
  const {isLoading: isUserLoading, isSuccess: isUserSuccess, isError: isUserError, error: userError, data: user, refetch} = useGetCurrentUserQuery()
  const dispatch = useDispatch()


  if(isUserLoading)
    return <Spinner />
    
  if(isUserError){
    const error = userError as CustomSerializedError
    // if(error.data.message === "No token provided"){
    //   // dispatch(clearAuth())

    // }
    return <Error error={error} />

  }
  return (
    <>
        <Outlet />
    </>
  )
}

export default AuthSetup