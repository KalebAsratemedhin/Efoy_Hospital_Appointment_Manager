import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

const AuthHeaderInfo = () => {


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
      <div className="relative group">
        <button className="flex items-center space-x-2 text-cyan-600 hover:text-cyan-700 transition-colors">
          <FaUserCircle className="w-6 h-6" />
          <span className="text-sm font-medium">User</span>
        </button>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors">
            Profile
          </Link>
          <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors">
            Settings
          </Link>
          <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors">
            Logout
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default AuthHeaderInfo