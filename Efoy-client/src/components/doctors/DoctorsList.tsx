import { useFindAllDoctorsQuery } from "../../redux/api/userAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";

import DoctorCard from "./DoctorCard";

const DoctorsList = () => {
    const {isLoading, isSuccess, isError, error, data} = useFindAllDoctorsQuery()

    if(isLoading)
        return <Spinner />
    
    if(isError)
        return <Error error={error} />

    if(isSuccess)
    return (
        <div className="flex flex-wrap gap-5 p-12">
            {data.map(doctor => {
                return <DoctorCard key={doctor.username} doctor={doctor} />
            })}
        </div>
    )
}

export default DoctorsList