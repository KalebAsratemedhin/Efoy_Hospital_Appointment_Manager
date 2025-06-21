import { useFindAllDoctorsQuery } from "../../redux/api/userAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";

import DoctorCard from "./DoctorCard";
import Pagination from "../utils/Pagination";
import { useState } from "react";

const DoctorsList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const {isLoading, isSuccess, isError, error, data} = useFindAllDoctorsQuery({page: currentPage, limit})


    if(isLoading)
        return <Spinner />
    

    if(isError){
        console.log('error', error)
        return <Error error={error} />
    }
    if(isSuccess){
        const doctors = data.doctors
        const totalPages = data.totalPages

        return (
            <div className="p-8">
                <h1 className="text-primary text-xl mb-4 ">Our Doctors</h1>

                <div className="flex flex-wrap gap-5 ">
                    {doctors.map(doctor => {
                        return <DoctorCard key={doctor._id} doctor={doctor} />
                    })}
                </div>
                {doctors.length > 0 ?  
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    /> :
                    <h1 className="text-xl text-gray-500">No doctors yet.</h1>
                    }
            </div>
        )
    }
}

export default DoctorsList