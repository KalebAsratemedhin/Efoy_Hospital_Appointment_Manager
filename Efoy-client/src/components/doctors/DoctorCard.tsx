import { Link } from "react-router-dom";
import { Doctor } from "../../types/User";
import { motion } from "framer-motion";
import { FaStar, FaUserMd, FaGraduationCap } from "react-icons/fa";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative">
        <img 
          src={doctor.profilePic || `https://ui-avatars.com/api/?name=${doctor.fullName}&background=0D8ABC&color=fff`} 
          alt={doctor.fullName} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{doctor.doctorData?.rating || 0}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.fullName}</h3>
            <p className="text-cyan-600 font-medium">{doctor.doctorData?.speciality}</p>
          </div>
          <div className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">
            {doctor.doctorData?.experience} years
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <FaGraduationCap className="text-cyan-500" />
            <span className="text-sm">{doctor.doctorData?.educationLevel}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaUserMd className="text-cyan-500" />
            <span className="text-sm">{doctor.doctorData?.speciality}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
         
          <Link 
            to={`/book/${doctor._id}`}
            className="bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-cyan-700 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;