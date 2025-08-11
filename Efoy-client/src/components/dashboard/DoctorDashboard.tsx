import Reminder from "./Reminder";
import MonthlyReport from "./MonthlyReport";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import { useGetDoctorByIdQuery } from "../../redux/api/doctorAPI";
import { useGetDoctorDashboardQuery } from "../../redux/api/dashboardAPI";
import { useGetDoctorPrescriptionsQuery } from "../../redux/api/prescriptionAPI";
import { Link } from "react-router-dom";

import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { motion } from "framer-motion";
import { FaUserMd, FaCalendarAlt, FaChartLine, FaStar, FaGraduationCap, FaBriefcase, FaClock, FaPills } from "react-icons/fa";

const DoctorDashboard = () => {
  const { isLoading: isUserLoading, isError: isUserError, error: userError, data: user } = useGetCurrentUserQuery();
  const { data: doctorData, isLoading: isDoctorLoading, error: doctorError } = useGetDoctorByIdQuery(user?.id || '', {
    skip: !user?.id
  });
  const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError } = useGetDoctorDashboardQuery();
  const { data: prescriptionsData } = useGetDoctorPrescriptionsQuery({ page: 1, limit: 5 });

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

          {/* Recent Prescriptions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 mb-6"
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
                          {prescription.patientId?.fullName}
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
                No prescriptions created yet
              </div>
            )}
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
