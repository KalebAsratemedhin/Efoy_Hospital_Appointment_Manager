import { Outlet, useLocation } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./Sidebar"

const Layout = () => {
  const {pathname} = useLocation()

  return (
    <div className="h-screen flex  ">


        {pathname !== "/" && 
          <Sidebar />
        }
    
        <div className="flex flex-col w-full overflow-y-auto bg-custom-background">
          <Header />
          <div className="flex-grow  ">
            <Outlet />
          </div>
          <Footer /> 

        </div>
    </div>
  )
}

export default Layout