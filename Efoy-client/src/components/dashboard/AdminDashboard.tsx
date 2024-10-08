import { useAdminStatsQuery } from "../../redux/api/userAPI"
import Spinner from "../utils/Spinner"
import Error from "../utils/Error"

import AdminStats from "./AdminStats"
import Welcome from "./Welcome"

const AdminDashboard = () => {
  const {isLoading, isError, isSuccess, error, data} = useAdminStatsQuery()

  if (isLoading ) return <Spinner />;
  if (isError ) return <Error error={error} />

  if (isSuccess)

  return (
    <div className="w-full ">
        <div className=" w-full">
          <div className="flex flex-col p-4 w-full">
              <Welcome />
          </div>

          <div>
            <AdminStats doctorsCount={data?.doctorsCount!} patientsCount={data?.patientsCount!} appointmentsCount={data?.appointmentsCount!} />
          </div>
        </div>
       
    </div>
  )
}

export default AdminDashboard