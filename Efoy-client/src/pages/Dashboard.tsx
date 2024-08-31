import { useSelector } from "react-redux"
import Dashboard from "../components/dashboard/Dashboard"
import DoctorDashboard from "../components/dashboard/Doctor"
import { RootState } from '../redux/store'
import NotFound from "../components/utils/NotFound"

const DashboardPage = () => {
  const authState = useSelector((state: RootState) => state.auth)

  if(!authState.username)
    return <NotFound />

  return (
    <div className="w-full h-full">
       {
        authState.role === "patient" ? 
        <Dashboard /> :
        <DoctorDashboard />

       }
    </div>
  )
}

export default DashboardPage