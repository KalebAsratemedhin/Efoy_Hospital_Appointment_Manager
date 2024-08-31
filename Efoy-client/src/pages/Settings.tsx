import Preferences from "../components/settings/Preferences"
import Profile from "../components/settings/Profile"
import TabSelector from "../components/utils/TabSelector"

const Settings = () => {
  return (
    <div className="p-4">
        <TabSelector tabs={["Profile","Preferences"]} contents={[< Profile/>, <Preferences /> ]} />
    </div>
  )
}
 
export default Settings