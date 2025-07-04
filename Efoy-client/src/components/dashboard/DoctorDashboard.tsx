import Reminder from "./Reminder";
import MonthlyReport from "./MonthlyReport";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import { useFindCurrentUserBookingsQuery, useFindDoctorSummaryQuery } from "../../redux/api/bookingAPI";
import DoctorProfile from "../doctors/DoctorProfile";
import { Doctor } from "../../types/User";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { motion } from "framer-motion";
import { FaUserMd, FaCalendarAlt, FaChartLine, FaUserCircle, FaStar, FaGraduationCap, FaBriefcase } from "react-icons/fa";

const DoctorDashboard = () => {
  const { isLoading: isUserLoading, isError: isUserError, error: userError, data: user } = useGetCurrentUserQuery();
  const { data: bookingsData } = useFindCurrentUserBookingsQuery({ page: 1, limit: 100 });
  const { data: monthlyData } = useFindDoctorSummaryQuery(user?._id as string, { skip: !user?._id });

  const doctorData = user && user.role === 'doctor' ? (user as any).doctorData || {} : {};

  // Calculate today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todaysAppointments = bookingsData?.bookings?.filter(
    (b: any) => b.appointmentDate.split('T')[0] === today
  )?.length || 0;

  // Calculate monthly patients (sum for current month)
  const currentMonth = new Date().getMonth();
  const monthlyPatients = Array.isArray(monthlyData)
    ? monthlyData[currentMonth] || 0
    : 0;

  // Average rating
  const avgRating = doctorData.rating || 0;

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Today's Appointments</p>
                  <p className="text-2xl font-semibold">{todaysAppointments}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaChartLine className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Monthly Patients</p>
                  <p className="text-2xl font-semibold">{monthlyPatients}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FaStar className="text-xl" />
                <div>
                  <p className="text-sm text-white/80">Average Rating</p>
                  <p className="text-2xl font-semibold">{avgRating}</p>
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
                  {doctorData.speciality}
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-1">Dr. {user?.fullName}</h2>
              <p className="text-purple-600 font-medium mb-3">{doctorData.speciality}</p>

              <div className="w-full space-y-3 mt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaBriefcase className="text-purple-500" />
                  <span className="text-sm">{doctorData.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaGraduationCap className="text-purple-500" />
                  <span className="text-sm">{doctorData.educationLevel}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm">Rating: {doctorData.rating || 0}</span>
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaChartLine className="text-purple-600" />
              Monthly Patients Report
            </h2>
            <MonthlyReport />
          </motion.div>

          {/* Today's Schedule - Sticky */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 sticky top-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-purple-600" />
              Today's Schedule
            </h2>
            <Reminder />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
