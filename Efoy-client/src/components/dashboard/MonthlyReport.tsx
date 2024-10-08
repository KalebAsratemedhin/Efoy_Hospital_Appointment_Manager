import { useFindDoctorSummaryQuery, useFindPatientSummaryQuery } from "../../redux/api/bookingAPI"
import BarChart from "./BarChart"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";

const MonthlyReport = () => {
  const authState = useSelector(authSelector)
  const {isLoading: isUserLoading, isSuccess: isUserSuccess, isError: isUserError, error: userError, data: user, refetch} = useGetCurrentUserQuery()

  if(authState.role === "patient"){
    const {isLoading, isSuccess, isError, error, data} = useFindPatientSummaryQuery(user?._id as string)
    
    if (isLoading || isUserLoading ) return <Spinner />;
    if (isError || isUserError ) return <Error error={error || userError} />;

    if (isSuccess && data)

    return (
      <div className="bg-white w-full h-72 sm:h-auto md:w-6/12 p-6 rounded-md shadow-md">
          <BarChart label={'Appointments'} chartData={data} chartTitle="Visit History" />
      </div>
    )

  } else {
    const {isLoading, isSuccess, isError, error, data} = useFindDoctorSummaryQuery(user?._id as string)

    if (isLoading || isUserLoading ) return <Spinner />;
    if (isError || isUserError ) return <Error error={error || userError} />;

    if (isSuccess && data)

    return (
      <div className="bg-white w-full h-72 sm:h-auto md:w-6/12 p-6 rounded-md shadow-md ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Monthly Patients Report</h2>
          <div className=" ">
            <BarChart label={'Patients'} chartData={data} chartTitle="Visit History" />
          </div>
      </div>
     
    )
  }
}

export default MonthlyReport