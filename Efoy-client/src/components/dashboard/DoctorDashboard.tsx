import { Link } from "react-router-dom"
import Favorites from "./Favorites"
import Recents from "./Recents"
import Reminder from "./Reminder"
import YearlyReport from "./MonthlyReport"
import Interactions from "./Interactions"
import MonthSummary from "./MonthSummary"

const DoctorDashboard = () => {
  return (
    <div className="w-full ">
        <div className="flex w-full">
            <div className="p-4 w-1/2  flex-grow">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl">Monthly Patients Report</h1>
                <Link className="text-primary" to='/appointments'>More</Link>
              </div>
              <div className="flex gap-3 flex-wrap">
                <YearlyReport />
                <MonthSummary />
                <Reminder />

              </div>


            </div>
        </div>
        <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl">Social Network</h1>
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