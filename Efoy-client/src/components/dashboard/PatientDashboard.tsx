import { Link } from "react-router-dom"
import Favorites from "./Favorites"
import Recents from "./Recents"
import Reminder from "./Reminder"

const Dashboard = () => {
  return (
    <div className="w-full ">
        <div className="flex w-full">
            <div className="p-4 w-1/2 flex-grow">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl">Recent appointments</h1>
                <Link className="text-primary" to='/appointments'>More</Link>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Recents />
                <Recents />
                <Recents />

              </div>


            </div>
            <div className="mt-10 mr-3">
              <Reminder />
            </div>
        </div>
        <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl">Favorites</h1>
                <Link className="text-primary" to='/appointments'>More</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                <Favorites />
                <Favorites />
                <Favorites />

              </div>
            
        </div>
    </div>
  )
}

export default Dashboard