import { Link } from "react-router-dom"
import Reminder from "./Reminder"
import MonthlyReport from "./MonthlyReport"
import FavoritesList from "./FavoritesList"
import Welcome from "./Welcome"
import { motion } from "framer-motion";
import { FaUserInjured, FaCalendarAlt, FaChartLine, FaHeart } from "react-icons/fa";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import { useFindCurrentUserBookingsQuery } from "../../redux/api/bookingAPI";
import { useFindCurrentUserFavoritesQuery } from "../../redux/api/ratingAPI";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";

const PatientDashboard = () => {
  const { isLoading: isUserLoading, isError: isUserError, error: userError, data: user } = useGetCurrentUserQuery();
  const { data: bookingsData } = useFindCurrentUserBookingsQuery({ page: 1, limit: 100 });
  const { data: favoritesData } = useFindCurrentUserFavoritesQuery();

  // Calculate upcoming appointments (future dates)
  const now = new Date();
  const upcomingAppointments = bookingsData?.bookings?.filter(
    (b: any) => new Date(b.appointmentDate.split('T')[0] + ' ' + b.time) > now
  )?.length || 0;

  // Total visits (all bookings)
  const totalVisits = bookingsData?.bookings?.length || 0;

  // Favorite doctors
  const favoriteDoctors = favoritesData?.length || 0;

  if (isUserLoading) return <Spinner />;
  if (isUserError) return <Error error={userError} />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <FaUserInjured className="text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Patient Dashboard</h1>
              <p className="text-white/80 text-lg">Welcome back, {user?.fullName}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Upcoming Appointments</p>
                  <p className="text-2xl font-semibold">{upcomingAppointments}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaChartLine className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Total Visits</p>
                  <p className="text-2xl font-semibold">{totalVisits}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaHeart className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Favorite Doctors</p>
                  <p className="text-2xl font-semibold">{favoriteDoctors}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Monthly Report and Favorites */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monthly Report */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg py-10 hover:shadow-xl transition-shadow duration-300"
          >
            {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaChartLine className="text-cyan-600" />
              Visit History
            </h2> */}
            <MonthlyReport />
          </motion.div>

          {/* Favorites Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <FaHeart className="text-cyan-600" />
                Favorite Doctors
              </h2>
              <Link 
                to="/appointments" 
                className="text-cyan-600 hover:text-cyan-700 transition-colors duration-200 flex items-center gap-2"
              >
                View All
                <FaCalendarAlt />
              </Link>
            </div>
            <FavoritesList />
          </motion.div>
        </div>

        {/* Right Column - Reminders */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-cyan-600" />
              Today's Schedule
            </h2>
            <Reminder />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PatientDashboard;