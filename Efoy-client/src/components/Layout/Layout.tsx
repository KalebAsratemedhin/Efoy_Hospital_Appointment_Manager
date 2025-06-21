import { Outlet, useLocation } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { useState } from "react"

const Layout = () => {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(true)

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="h-screen flex">
      {pathname !== '/' && isOpen && <div className="h-screen ">
        <Sidebar isOpen={isOpen} onSidebarToggle={handleSidebarToggle} />
      </div>}

      <div className="flex flex-col flex-grow overflow-auto">
        <Header onSidebarToggle={handleSidebarToggle} />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
