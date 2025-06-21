import { useSelector } from "react-redux"
import DoctorApplication from "../components/settings/DoctorApplication"
import Profile from "../components/settings/Profile"
import TabSelector from "../components/utils/TabSelector"
import { authSelector } from "../redux/slices/authSlice"

const Settings = () => {
  const authState = useSelector(authSelector)
  const contents = authState.role !== "admin" ? [< Profile/>, <DoctorApplication />] : [< Profile/>]
  const tabs = authState.role !== "admin" ? ["Profile", "Doctor Application"] : ["Profile"]
  
  return (
    <div className="p-4">
        <TabSelector tabs={tabs} contents={contents} />
    </div>
  )
}
 
export default Settings