import { useGetDoctorsQuery } from "../../redux/api/doctorAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import DoctorCard from "./DoctorCard";
import { Doctor } from "../../types/User";

interface DoctorsSearchProps {
    searchTerm: string;
}

const DoctorsSearch = ({ searchTerm }: DoctorsSearchProps) => {
    const { isLoading, isSuccess, isError, error, data } = useGetDoctorsQuery({ search: searchTerm || '' });
    
    console.log('DoctorsSearch - searchTerm:', searchTerm);
    console.log('DoctorsSearch - data:', data);
    console.log('DoctorsSearch - isLoading:', isLoading, 'isSuccess:', isSuccess, 'isError:', isError);
    console.log('DoctorsSearch - error:', error);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Spinner />
            </div>
        );
    }
    
    if (isError) {
        return <Error error={error} />;
    }

    if (isSuccess && data) {
        // Extract doctors array from the API response
        const responseData = data as any; // API returns { doctors: Doctor[], totalPages: number, currentPage: number }
        const doctors = responseData?.doctors || [];
        
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Search Results
                    </h1>
                    <p className="text-gray-600">
                        Found {doctors.length} doctor{doctors.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </p>
                </div>

                {doctors.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            No doctors found matching "{searchTerm}". Try a different search term.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map((doctor: Doctor) => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return null;
};

export default DoctorsSearch;