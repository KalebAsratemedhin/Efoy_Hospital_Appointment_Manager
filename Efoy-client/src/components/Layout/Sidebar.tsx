import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, clearAuth } from "../../redux/slices/authSlice";
import { useSignoutMutation } from "../../redux/api/authAPI";
import {
  FaHome,
  FaUserMd,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaHospital,
  FaClipboardList,
  FaArrowLeft,
} from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onSidebarToggle: () => void;
}

const Sidebar = ({ isOpen, onSidebarToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector(authSelector);
  const [signout, { isLoading }] = useSignoutMutation();

  const handleSignout = async () => {
    try {
      await signout().unwrap();
      dispatch(clearAuth());
      navigate('/');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const navigation = authState.role === "admin" 
    ? [
        { name: "Home", href: "/", icon: FaHome },
        { name: "Dashboard", href: "/dashboard", icon: FaUser },
        { name: "Applications", href: "/applications", icon: FaClipboardList },
        { name: "Doctors", href: "/doctors", icon: FaUserMd },
        { name: "Settings", href: "/settings", icon: FaCog },
      ]
    : [
        { name: "Home", href: "/", icon: FaHome },
        { name: "Dashboard", href: "/dashboard", icon: FaUser },
        { name: "Appointments", href: "/appointments", icon: FaCalendarAlt },
        { name: "Calendar", href: "/calendar", icon: FaCalendarAlt },
        { name: "Doctors", href: "/doctors", icon: FaUserMd },
        { name: "Settings", href: "/settings", icon: FaCog },
      ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={onSidebarToggle}
        />
      )}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 20 }}
        className={`fixed sm:relative h-screen w-[250px] bg-white shadow-lg z-50 sm:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Brand */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <FaHospital className="text-3xl text-cyan-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Efoy</h1>
                <p className="text-sm text-gray-500">Hospital</p>
              </div>
            </Link>
            <button
              onClick={onSidebarToggle}
              className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-cyan-50 text-cyan-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-cyan-600"
                  }`}
                >
                  <Icon className={`text-lg ${isActive(item.href) ? "text-cyan-600" : "text-gray-400"}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                <FaUser className="text-cyan-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {authState.role === "admin" ? "Administrator" : "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">{authState.role}</p>
              </div>
            </div>
            <button
              onClick={handleSignout}
              disabled={isLoading}
              className="w-full mt-2 flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="font-medium">{isLoading ? "Signing out..." : "Sign out"}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;