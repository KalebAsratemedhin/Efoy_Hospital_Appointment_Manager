import { useParams } from "react-router-dom"
import ApplicationDetails from "../components/applications/ApplicationDetails"
import ApplicationList from "../components/applications/ApplicationList"

const Applications = () => {
  const {id} = useParams()

  return (
    <div className="p-4">
        {
            id ? 
            <ApplicationDetails /> :
            <ApplicationList />
            
        }

    </div>
  )
}

export default Applications