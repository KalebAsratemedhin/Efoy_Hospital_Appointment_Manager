import { useNavigate } from "react-router-dom"
import { useGetCurrentUserQuery } from "../../redux/api/authAPI";
import { IoNotifications } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";


const AuthHeaderInfo = () => {
    const navigate = useNavigate()
    const {isLoading, isSuccess, isError, error, data} = useGetCurrentUserQuery()  
    const initials = data?.fullName.split(' ').map((name) => name[0].toUpperCase()).join('')

    if(isLoading)
        return <Spinner />
    
    if(isError)
        return <Error error={error} />

    if(isSuccess)

  return (
    <div>
        <div className="flex gap-3  justify-end items-center">
            <IoSettingsOutline onClick={() => navigate('/settings') } className="w-7 h-7 text-secondary hover:text-primary sm:block hidden" />
            <IoNotifications onClick={() => navigate('/notifications') } className="w-7 h-7 text-secondary hover:text-primary sm:block hidden"  />
        
            <div className="w-12 h-12 rounded-full flex justify-center items-center bg-gray-300 text-lg ">
            {initials}
            </div>
        </div>
    </div>
  )
}

export default AuthHeaderInfo