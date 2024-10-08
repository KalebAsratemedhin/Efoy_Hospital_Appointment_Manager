import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";

const Welcome = () => {
    const {isLoading, isSuccess, isError, error, data} = useGetCurrentUserQuery()  
    if(isLoading)
        return <Spinner />

    if(isError ){
        return <Error error={error} />
    }


    if(isSuccess)
        return (
            <div className="w-full text-2xl flex bg-white p-4 rounded-md">Welcome,&nbsp; <p className="text-purple-600 italic font">{data?.fullName}</p></div>
        )
}

export default Welcome