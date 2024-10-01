import { Link } from "react-router-dom"
import Reminder from "./Reminder"
import MonthlyReport from "./MonthlyReport"
import FavoritesList from "./FavoritesList"
import Welcome from "./Welcome"


const AdminDashboard = () => {
  return (
    <div className="w-full ">
        <div className="flex w-full">
          <div className="flex flex-col p-4 w-full">
              <Welcome />
            <div className="flex justify-between items-center my-4 ">
              <h1 className="text-xl">Monthly Report</h1>
            </div>
            <div className="flex justify-between gap-2 flex-wrap">
              {/* <MonthlyReport /> */}
              

            </div>
          </div>
        </div>
        <div className="p-4">
              {/* <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl">Favorites</h1>
                <Link className="text-primary" to='/appointments'>More</Link>
              </div> */}
              {/* <div className="">
                <FavoritesList />

              </div> */}
            
        </div>
    </div>
  )
}

export default AdminDashboard