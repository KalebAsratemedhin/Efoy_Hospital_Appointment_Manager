import { Link } from "react-router-dom"
import Favorites from "./Favorites"
import Reminder from "./Reminder"
import Interactions from "./Interactions"
import MonthlyReport from "./MonthlyReport"

const DoctorDashboard = () => {
  return (
    <div className="w-full ">
        <div className="flex flex-col p-4 w-full">
            {/* <div className="p-4 w-full flex-grow"> */}
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl">Monthly Patients Report</h1>
                {/* <Link className="text-primary" to='/appointments'>More</Link> */}
              </div>
              <div className="flex flex-wrap justify-between w-full">
                <MonthlyReport />
                <Reminder />

              </div>


            {/* </div> */}
        </div>
        <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl">My Network</h1>
                <Link className="text-primary" to='/appointments'>More</Link>
              </div>
              <div className="">
                <Interactions />

              </div>
            
        </div>
    </div>
  )
}

export default DoctorDashboard