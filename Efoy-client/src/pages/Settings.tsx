import Profile from "../components/settings/Profile"
import TabSelector from "../components/utils/TabSelector"

const Settings = () => {

  const contents = [<Profile />]
  const tabs = ["Profile"]
  
  return (
    <div className="p-4">
        <TabSelector tabs={tabs} contents={contents} />
    </div>
  )
}
 
export default Settings;