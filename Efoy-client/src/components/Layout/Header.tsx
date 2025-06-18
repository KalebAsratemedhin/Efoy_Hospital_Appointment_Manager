import { Link, useLocation, useNavigate } from "react-router-dom"
import { TfiSearch } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
import { CgMenuLeftAlt } from "react-icons/cg";
import AuthHeaderInfo from "./AuthHeaderInfo";
import { useState } from "react";
import { motion } from "framer-motion";

const Header = ({onSidebarToggle}: {onSidebarToggle: () => void}) => {
  const {pathname} = useLocation()
  const authState = useSelector(authSelector)  
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSearch = () => {
    navigate(`/doctors?search=${searchTerm}`)
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-md  shadow-sm w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <CgMenuLeftAlt onClick={onSidebarToggle} className="w-6 h-6 sm:hidden mr-4 text-cyan-600 hover:text-cyan-700 transition-colors" />
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-cyan-600">Efoy</h1>
            </Link>
          </div>

          {pathname === '/' && <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link to="/doctors" className="text-gray-700 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Doctors</Link>
            </div>
          </div>}

          <div className="flex items-center space-x-4 justify-around w-full">
            <div className="hidden md:flex rounded-full justify-between items-center px-2 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">
              <input 
                type="search" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="bg-transparent focus:outline-none mr-2 rounded-md px-2 appearance-none" 
                placeholder="Search doctors..."
              />
              <TfiSearch className="text-xl mr-2 text-cyan-600 hover:text-cyan-700 cursor-pointer transition-colors" onClick={handleSearch} />
            </div>

            {authState.id ? (
              <AuthHeaderInfo />
            ) : (
              <div className="flex items-center space-x-4 justify-end">
                <Link to="/signin" className="text-cyan-600 hover:text-cyan-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">Sign In</Link>
                <Link to="/signup" className="bg-cyan-600 text-white hover:bg-cyan-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Header