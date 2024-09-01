import { useFindAllDoctorsQuery } from "../../redux/api/userAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { CustomSerializedError } from "../../types/CustomSerializedError";
import DoctorProfile from "./DoctorProfile";

const DoctorsList = () => {
    const {isLoading, isSuccess, isError, error, data} = useFindAllDoctorsQuery()
    const customError = error as CustomSerializedError

    if(isLoading)
        return <Spinner />
    
    if(isError)
        return <Error message={customError.data.message} />

    if(isSuccess)
    return (
        <div>
            {data.map(doctor => {
                return <DoctorProfile key={doctor.username} doctor={doctor} />
            })}
        </div>
    )
}

export default DoctorsList