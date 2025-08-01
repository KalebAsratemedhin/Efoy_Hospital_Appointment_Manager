import { Link, useLocation, useNavigate } from "react-router-dom"
import { TfiSearch } from "react-icons/tfi";
import { FaKeyboard } from "react-icons/fa";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
import { CgMenuLeftAlt } from "react-icons/cg";
import AuthHeaderInfo from "./AuthHeaderInfo";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Header = ({onSidebarToggle}: {onSidebarToggle: () => void}) => {
  const {pathname} = useLocation()
  const authState = useSelector(authSelector)  
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchTerm.trim())}`)
    }
  }



  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    } else if (e.key === 'Escape') {
      setSearchTerm('')
      searchInputRef.current?.blur()
    }
  }

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-md shadow-sm w-full sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <CgMenuLeftAlt onClick={onSidebarToggle} className="w-6 h-6 sm:hidden mr-4 text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer" />
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
            {/* Enhanced Search Bar */}
            <div className="hidden md:flex relative max-w-md w-full">
              <motion.div 
                className={`relative flex items-center w-full rounded-xl border-2 transition-all duration-300 ${
                  isSearchFocused 
                    ? 'border-cyan-500 bg-white shadow-lg shadow-cyan-100' 
                    : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Search Icon */}
                <div className="absolute left-4 text-gray-400">
                  <TfiSearch className="text-lg" />
                </div>

                {/* Search Input */}
                <input 
                  ref={searchInputRef}
                  type="text" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-20 py-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm font-medium" 
                  placeholder="Search doctors by name or specialty..."
                />



                {/* Search Button */}
                <motion.button
                  onClick={handleSearch}
                  disabled={!searchTerm.trim()}
                  className={`absolute right-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    searchTerm.trim()
                      ? 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-md'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={searchTerm.trim() ? { scale: 1.05 } : {}}
                  whileTap={searchTerm.trim() ? { scale: 0.95 } : {}}
                  title="Search (Enter)"
                >
                  Search
                </motion.button>
              </motion.div>

              {/* Keyboard Shortcut Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isSearchFocused ? 1 : 0 }}
                className="absolute -bottom-8 left-0 text-xs text-gray-500 flex items-center gap-1"
              >
                <FaKeyboard className="text-xs" />
                <span>Ctrl+K to focus</span>
              </motion.div>
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