import { useSelector } from "react-redux"
import Dashboard from "../components/dashboard/PatientDashboard"
import DoctorDashboard from "../components/dashboard/DoctorDashboard"
import { RootState } from '../redux/store'
import NotFound from "../components/utils/NotFound"
import PatientDashboard from "../components/dashboard/PatientDashboard"

const DashboardPage = () => {
  const authState = useSelector((state: RootState) => state.auth)

  if(!authState.id)
    return <NotFound />

  return (
    <div className="w-full h-full">
       {
        authState.role === "patient" ? 
        <PatientDashboard /> :
        <DoctorDashboard />

       }
    </div>
  )
}

export default DashboardPage