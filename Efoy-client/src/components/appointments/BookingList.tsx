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
import { FaCalendarAlt, FaFilter, FaSearch, FaClock, FaUserMd, FaUsers } from "react-icons/fa";
import { BookingPopulated } from "../../types/Booking";

const BookingList = () => {
  const authState = useSelector(authSelector)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const limit = 3;
  const {isSuccess, isError, isLoading, error, data, refetch} = useFindCurrentUserBookingsQuery({ page: currentPage, limit })


  if (isLoading ) return <Spinner />;
  if (isError ) return <Error error={error} />;

  if (isSuccess){
    const { items: rawBookings, total_pages: totalPages } = data
    
    console.log('bookings data', data)
    const bookings = Array.isArray(rawBookings) ? rawBookings : [];
    const filteredBookings = bookings.filter((booking: BookingPopulated) => {
      const matchesSearch = authState.role === "patient" 
        ? booking.doctorId.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        : booking.patientId?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });



    const getStatusCount = (status: string) => {
      return bookings.filter(booking => booking.status === status).length;
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <FaCalendarAlt className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
              My Appointments
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              View and manage your upcoming appointments with ease
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaCalendarAlt className="text-blue-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <FaClock className="text-yellow-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{getStatusCount("pending")}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaUserMd className="text-green-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">{getStatusCount("approved")}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaUsers className="text-purple-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.filter(b => new Date(b.appointmentDate).getMonth() === new Date().getMonth()).length}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search {authState.role === "patient" ? "Doctors" : "Patients"}
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search by ${authState.role === "patient" ? "doctor" : "patient"} name...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div className="lg:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <div className="relative">
                  <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Appointments List */}
          <div className="space-y-6">
            {filteredBookings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                  <FaCalendarAlt className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No appointments found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filters to find what you're looking for"
                    : "You don't have any appointments yet. Book your first appointment to get started!"}
                </p>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                {filteredBookings.map((booking: BookingPopulated, index: number) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    {authState.role === "patient" ? (
                      <BookingCardPatient booking={booking} refetch={refetch} />
                    ) : (
                      <BookingCardDoctor booking={booking} refetch={refetch} />
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Pagination */}
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

export default BookingList