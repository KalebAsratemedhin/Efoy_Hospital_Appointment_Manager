import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";

const AuthHeaderInfo = () => {
  const { data: currentUser } = useGetCurrentUserQuery(undefined, {
    skip: !localStorage.getItem('accessToken')
  });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-4"
    >
      <Link to="/appointments" className="text-cyan-600 hover:text-cyan-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
        Appointments
      </Link>
      <Link 
        to="/dashboard" 
        className="flex items-center space-x-2 text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer"
      >
        {currentUser?.profilePic ? (
          <img 
            src={currentUser.profilePic} 
            alt={currentUser.fullName || "User"} 
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="w-6 h-6" />
        )}
        <span className="text-sm font-medium">
          {currentUser?.fullName || "User"}
        </span>
      </Link>
    </motion.div>
  )
}

export default AuthHeaderInfo