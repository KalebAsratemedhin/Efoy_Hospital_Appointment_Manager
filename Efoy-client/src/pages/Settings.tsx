import Profile from "../components/settings/Profile"
import { motion } from "framer-motion";
import {  FaUser, FaLock, FaBell, FaPalette } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Settings Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaUser className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Profile</h3>
                <p className="text-sm text-gray-500">Update your personal information</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer opacity-50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaLock className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Security</h3>
                <p className="text-sm text-gray-500">Password and privacy settings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer opacity-50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaBell className="text-yellow-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-500">Manage your notifications</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer opacity-50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaPalette className="text-purple-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Appearance</h3>
                <p className="text-sm text-gray-500">Theme and display settings</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="border-b border-gray-100 px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FaUser className="text-blue-600" />
              Profile Settings
            </h2>
            <p className="text-gray-600 mt-2">Update your personal information and profile picture</p>
          </div>
          
          <div className="p-8">
            <Profile />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
 
export default Settings;