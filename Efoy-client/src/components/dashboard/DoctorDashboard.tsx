import Reminder from "./Reminder";
import MonthlyReport from "./MonthlyReport";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import { useGetDoctorByIdQuery } from "../../redux/api/doctorAPI";
import { useGetDoctorDashboardQuery } from "../../redux/api/dashboardAPI";

import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { motion } from "framer-motion";
import { FaUserMd, FaCalendarAlt, FaChartLine, FaStar, FaGraduationCap, FaBriefcase, FaClock } from "react-icons/fa";

const DoctorDashboard = () => {
  const { isLoading: isUserLoading, isError: isUserError, error: userError, data: user } = useGetCurrentUserQuery();
  const { data: doctorData, isLoading: isDoctorLoading, error: doctorError } = useGetDoctorByIdQuery(user?.id || '', {
    skip: !user?.id
  });
  const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError } = useGetDoctorDashboardQuery();

  if (isUserLoading || isDoctorLoading || isDashboardLoading) return <Spinner />;
  if (isUserError) return <Error error={userError} />;
  if (doctorError) return <Error error={doctorError} />;
  if (dashboardError) return <Error error={dashboardError} />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <FaUserMd className="text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Doctor Dashboard</h1>
              <p className="text-white/80 text-lg">Welcome back, Dr. {user?.fullName}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Total Appointments</p>
                  <p className="text-2xl font-semibold">{dashboardData?.stats?.total_appointments || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaClock className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Pending</p>
                  <p className="text-2xl font-semibold">{dashboardData?.stats?.pending_appointments || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Today</p>
                  <p className="text-2xl font-semibold">{dashboardData?.stats?.today_appointments || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaChartLine className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Completion Rate</p>
                  <p className="text-2xl font-semibold">{dashboardData?.stats?.completion_rate || 0}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Profile */}
        <div className="lg:col-span-4">
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                {user?.profilePic ? (
                  <img 
                    src={user.profilePic} 
                    alt={user.fullName} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-100"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full flex justify-center items-center bg-purple-100 text-3xl font-semibold text-purple-600 border-4 border-purple-200">
                    {user?.fullName.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                )}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {doctorData?.speciality || 'Doctor'}
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-1">Dr. {user?.fullName}</h2>
              <p className="text-purple-600 font-medium mb-3">{doctorData?.speciality || 'General Medicine'}</p>

              <div className="w-full space-y-3 mt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaBriefcase className="text-purple-500" />
                  <span className="text-sm">{doctorData?.experience || '0'} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaGraduationCap className="text-purple-500" />
                  <span className="text-sm">{doctorData?.educationLevel || 'MD'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm">Rating: {doctorData?.rating?.toFixed(1) || '0.0'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Reports and Schedule */}
        <div className="lg:col-span-8">

          {/* Monthly Report */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 mb-6"
          >
           
            <MonthlyReport 
              dashboardData={dashboardData}
              isLoading={isDashboardLoading}
              error={dashboardError}
            />
          </motion.div>

          {/* Today's Schedule - Sticky */}
          <Reminder 
            dashboardData={dashboardData}
            isLoading={isDashboardLoading}
            error={dashboardError}
            userRole="doctor"
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
