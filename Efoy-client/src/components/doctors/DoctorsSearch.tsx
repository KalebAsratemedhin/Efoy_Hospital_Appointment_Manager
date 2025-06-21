import { useSearchDoctorsQuery } from "../../redux/api/userAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";

import DoctorCard from "./DoctorCard";

const DoctorsSearch = ({searchTerm}: {searchTerm: string}) => {
    const {isLoading, isSuccess, isError, error, data} = useSearchDoctorsQuery(searchTerm)

  

    if(isLoading)
        return <Spinner />
    
    if(isError)
        return <Error error={error} />

    if(isSuccess)
    return (
        <div className="p-4" >
            <h1>Search results for {searchTerm}</h1>
            <div className="flex flex-wrap gap-5 p-8">
                {data.map(doctor => {
                    console.log('doc', doctor)
                    return <DoctorCard key={doctor._id} doctor={doctor} />
                })}
            </div>
        </div>
    )
}

export default DoctorsSearch