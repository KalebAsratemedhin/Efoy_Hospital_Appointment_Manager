import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"

const NormalLayout = () => {
  return (
    <div className="h-full flex flex-col w-full overflow-y-auto bg-custom-background">
        <Header />
        <div className=" flex flex-grow">
            <Outlet />
        </div>
        <Footer />

    </div>
  )
}

export default NormalLayout