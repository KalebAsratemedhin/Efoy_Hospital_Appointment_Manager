import { Link } from "react-router-dom"
import Reminder from "./Reminder"
import MonthlyReport from "./MonthlyReport"
import FavoritesList from "./FavoritesList"

import { motion } from "framer-motion";
import { FaUserInjured, FaCalendarAlt, FaHeart, FaClock, FaCheckCircle, FaPills } from "react-icons/fa";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import { useGetPatientDashboardQuery } from "../../redux/api/dashboardAPI";
import { useFindCurrentUserFavoritesQuery } from "../../redux/api/ratingAPI";
import { useGetPatientPrescriptionsQuery } from "../../redux/api/prescriptionAPI";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";

const PatientDashboard = () => {
  const { isLoading: isUserLoading, isError: isUserError, error: userError, data: user } = useGetCurrentUserQuery();
  const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError } = useGetPatientDashboardQuery();
  const { data: favoritesData } = useFindCurrentUserFavoritesQuery();
  const { data: prescriptionsData } = useGetPatientPrescriptionsQuery({ page: 1, limit: 5 });

  if (isUserLoading || isDashboardLoading) return <Spinner />;
  if (isUserError) return <Error error={userError} />;
  if (dashboardError) return <Error error={dashboardError} />;

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Total Bookings</p>
                  <p className="text-2xl font-semibold">{dashboardData?.stats?.total_bookings || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaClock className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Upcoming</p>
                  <p className="text-2xl font-semibold">{dashboardData?.stats?.upcoming_bookings || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Completed</p>
                  <p className="text-2xl font-semibold">{dashboardData?.stats?.completed_bookings || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaHeart className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Favorite Doctors</p>
                  <p className="text-2xl font-semibold">{favoritesData?.length || 0}</p>
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
            <MonthlyReport 
              dashboardData={dashboardData}
              isLoading={isDashboardLoading}
              error={dashboardError}
            />
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

          {/* Prescriptions Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <FaPills className="text-purple-600" />
                Recent Prescriptions
              </h2>
              <Link 
                to="/prescriptions" 
                className="text-purple-600 hover:text-purple-700 transition-colors duration-200 flex items-center gap-2"
              >
                View All
                <FaPills />
              </Link>
            </div>
            {prescriptionsData?.items && prescriptionsData.items.length > 0 ? (
              <div className="space-y-3">
                {prescriptionsData.items.slice(0, 3).map((prescription) => (
                  <div key={prescription.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <FaPills className="text-purple-600 text-sm" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Dr. {prescription.doctorId?.fullName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(prescription.issueDate || '').toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      prescription.status === 'active' ? 'bg-green-100 text-green-800' :
                      prescription.status === 'expired' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {prescription.status || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No prescriptions yet
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Reminders */}
        <Reminder 
          dashboardData={dashboardData}
          isLoading={isDashboardLoading}
          error={dashboardError}
          userRole="patient"
        />
      </div>
    </div>
  )
}

export default PatientDashboard;