import { useFindCurrentUserFavoritesQuery } from "../../redux/api/ratingAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import DoctorCard from "../doctors/DoctorCard";
import Pagination from "../utils/Pagination";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const FavoritesList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 2; // 2x2 grid for wider cards
    
    const {isLoading, isError, isSuccess, error, data} = useFindCurrentUserFavoritesQuery()

    if (isLoading ) return <Spinner />;
    if (isError ) return <Error error={error} />

    if (isSuccess){
        console.log("data favs", data)
        
        // Calculate pagination
        const totalItems = data?.length || 0;
        const totalPages = Math.ceil(totalItems / limit);
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = data?.slice(startIndex, endIndex) || [];

        return (
            <div className=" bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                   

                    {/* Favorites Grid */}
                    <div className="space-y-6">
                        {totalItems === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                                    <FaHeart className="text-gray-400 text-3xl" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">No favorites yet</h3>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    Start adding doctors to your favorites by rating them after your appointments!
                                </p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {paginatedData.map((fav: any, index: number) => (
                                    <motion.div
                                        key={fav?.id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <DoctorCard doctor={fav} />
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
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        )
    }
}

export default FavoritesList