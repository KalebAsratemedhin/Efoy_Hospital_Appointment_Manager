import { useGetDoctorsQuery } from "../../redux/api/doctorAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import DoctorCard from "./DoctorCard";
import Pagination from "../utils/Pagination";
import { useState } from "react";
import { motion } from "framer-motion";
import { Doctor } from "../../types/User";

const DoctorsList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 3; // 3x3 grid
    
    const {isLoading, isSuccess, isError, error, data} = useGetDoctorsQuery({
        page: currentPage, 
        limit
    });

    if(isLoading) return <Spinner />;
    
    if(isError) {
        console.log('error', error);
        return <Error error={error} />;
    }

    if(isSuccess) {
        // Handle paginated response from API
        const responseData = data as any; // API returns { doctors: Doctor[], totalPages: number, currentPage: number }
        const doctors = responseData?.doctors || [];
        const totalPages = responseData?.totalPages || 1;
        const apiCurrentPage = responseData?.currentPage || 1;

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Simple Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                            Our Doctors
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Find and book appointments with our experienced medical professionals
                        </p>
                    </motion.div>

                    {/* Doctors Grid */}
                    <div className="space-y-6">
                        {doctors.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">No doctors found</h3>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    No doctors are available at the moment. Please check back later!
                                </p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {doctors.map((doctor: Doctor, index: number) => (
                                    <motion.div
                                        key={doctor.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <DoctorCard doctor={doctor} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12"
                        >
                            <Pagination
                                currentPage={apiCurrentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        );
    }
}

export default DoctorsList;