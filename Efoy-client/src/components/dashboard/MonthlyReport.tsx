import { useFindDoctorSummaryQuery, useFindPatientSummaryQuery } from "../../redux/api/bookingAPI"
import BarChart from "./BarChart"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { useGetCurrentUserQuery } from "../../redux/api/authAPI";
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
      <div className="bg-white w-96 rounded-md shadow-md">
          <BarChart label={'Appointments'} chartData={data} chartTitle="Visit History" />
      </div>
    )

  } else {
    const {isLoading, isSuccess, isError, error, data} = useFindDoctorSummaryQuery(user?._id as string)

    if (isLoading || isUserLoading ) return <Spinner />;
    if (isError || isUserError ) return <Error error={error || userError} />;

    if (isSuccess && data)

    return (
      <div className="bg-white w-96 p-6 rounded-md shadow-md">
          <BarChart label={'Patients'} chartData={data} chartTitle="Visit History" />
      </div>
    )
  }
}

export default MonthlyReport