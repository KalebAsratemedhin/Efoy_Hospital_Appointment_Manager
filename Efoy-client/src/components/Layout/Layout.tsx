import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"

const Layout = () => {
  return (
    <div className="flex flex-col h-full">
    
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer /> 

    </div>
  )
}

export default Layout