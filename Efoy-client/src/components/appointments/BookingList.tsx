import { useFindCurrentUserBookingsQuery } from "../../redux/api/bookingAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import BookingCardPatient from "./BookingCardPatient";
import { authSelector } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import BookingCardDoctor from "./BookingCardDoctor";
import Pagination from "../utils/Pagination";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaFilter, FaSearch } from "react-icons/fa";
import { BookingPopulated } from "../../types/Booking";

const BookingList = () => {
  const authState = useSelector(authSelector)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const limit = 10;
  const {isSuccess, isError, isLoading, error, data, refetch} = useFindCurrentUserBookingsQuery({ page: currentPage, limit })


  if (isLoading ) return <Spinner />;
  if (isError ) return <Error error={error} />;

  if (isSuccess){
    const { bookings, totalPages } = data
  
    const filteredBookings = bookings.filter((booking: BookingPopulated) => {
      const matchesSearch = authState.role === "patient" 
        ? booking.doctorId.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        : booking.patientId?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
            <p className="text-gray-600">View and manage your upcoming appointments</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-4 mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search by ${authState.role === "patient" ? "doctor" : "patient"} name...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <FaCalendarAlt className="mx-auto text-gray-400 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filters"
                    : "You don't have any appointments yet"}
                </p>
              </motion.div>
            ) : (
              filteredBookings.map((booking: BookingPopulated, index: number) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {authState.role === "patient" ? (
                    <BookingCardPatient booking={booking} refetch={refetch} />
                  ) : (
                    <BookingCardDoctor booking={booking} refetch={refetch} />
                  )}
                </motion.div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default BookingList