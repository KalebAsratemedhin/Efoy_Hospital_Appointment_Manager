import { Outlet, useLocation } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { useState } from "react"

const Layout = () => {
  const {pathname} = useLocation()
  const [isOpen, setIsOpen] = useState(false)


  const handleSidebarToggle = () => {
    setIsOpen(!isOpen)

  }
    


  return (
    <div className="h-full flex  "  >


        {pathname !== "/" && 
          <div className="relative">
            <Sidebar isOpen={isOpen} onSidebarToggle={handleSidebarToggle}  />

          </div>       
        }
    
        <div className="flex flex-col w-full overflow-y-auto bg-gray-100">
          <Header onSidebarToggle={handleSidebarToggle} />
          <div className="flex-grow  ">
            <Outlet />
          </div>
          <Footer /> 

        </div>
    </div>
  )
}

export default Layout