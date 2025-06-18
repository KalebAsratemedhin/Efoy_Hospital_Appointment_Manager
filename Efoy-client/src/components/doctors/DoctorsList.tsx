import { useGetDoctorsQuery } from "../../redux/api/doctorAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";

import DoctorCard from "./DoctorCard";
import { useState } from "react";

const DoctorsList = () => {
    const [currentPage] = useState(1);
    const limit = 10;
    const {isLoading, isSuccess, isError, error, data} = useGetDoctorsQuery({page: currentPage, limit})


    if(isLoading)
        return <Spinner />
    

    if(isError){
        console.log('error', error)
        return <Error error={error} />
    }
    if(isSuccess){
        const doctors = data;
        return (
            <div className="p-8">
                <h1 className="text-primary text-xl mb-4 ">Our Doctors</h1>
                <div className="flex flex-wrap gap-5 ">
                    {doctors.map((doctor: any) => {
                        return <DoctorCard key={doctor.id} doctor={doctor} />
                    })}
                </div>
                {doctors.length === 0 && <h1 className="text-xl text-gray-500">No doctors yet.</h1>}
            </div>
        )
    }
}

export default DoctorsList