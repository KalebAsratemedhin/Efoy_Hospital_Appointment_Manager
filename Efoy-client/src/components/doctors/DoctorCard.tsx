import { Link } from "react-router-dom";
import { Doctor } from "../../types/User";
import { motion } from "framer-motion";
import { FaStar, FaUserMd, FaGraduationCap } from "react-icons/fa";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  // Add null checks for doctor.userId
  if (!doctor || !doctor.userId) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200"
    >
      {/* Header with Image */}
      <div className="relative">
        <div className="h-56 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
          <img 
            src={doctor.userId.profilePic || `https://ui-avatars.com/api/?name=${doctor.userId.fullName}&background=0D8ABC&color=fff&size=200`} 
            alt={doctor.userId.fullName} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <FaStar className="text-yellow-400 text-sm" />
          <span className="text-sm font-semibold text-gray-700">{doctor.rating?.toFixed(1) || "N/A"}</span>
        </div>

        {/* Experience Badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
          <span className="text-sm font-semibold text-gray-700">{doctor.experience} years exp.</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Doctor Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            Dr. {doctor.userId.fullName}
          </h3>
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
            {doctor.speciality}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FaGraduationCap className="text-blue-500 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Education</p>
              <p className="text-sm font-medium text-gray-700">{doctor.educationLevel}</p>
            </div>
          </div>
          
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100">
          <Link 
            to={`/book/${doctor.userId.id}`}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg"
          >
            <FaUserMd className="text-sm" />
            Book Appointment
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;