import { useSelector } from "react-redux"
import DoctorDashboard from "../components/dashboard/DoctorDashboard"
import { RootState } from '../redux/store'
import NotFound from "../components/utils/NotFound"
import PatientDashboard from "../components/dashboard/PatientDashboard"
import Error from "../components/utils/Error"
import AdminDashboard from "../components/dashboard/AdminDashboard"

const DashboardPage = () => {
  const authState = useSelector((state: RootState) => state.auth)

  
  if(!authState.id)
    return <NotFound />

  return (
    <div className="w-full h-full">
       
        {authState.role === "patient" &&  <PatientDashboard /> }
        {authState.role === "doctor" && <DoctorDashboard /> }
        {authState.role === "admin" && <AdminDashboard /> }

        {authState.role !== "doctor" && authState.role !== "patient" && <Error error={"Not accessible."} /> }


       
    </div>
  )
}

export default DashboardPage