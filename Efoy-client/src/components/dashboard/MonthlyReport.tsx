import { useFindDoctorSummaryQuery, useFindPatientSummaryQuery } from "../../redux/api/bookingAPI"
import LineChart from "./LineChart"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";

const MonthlyReport = () => {
  const authState = useSelector(authSelector)
  const {isLoading: isUserLoading, isError: isUserError, error: userError, data: user} = useGetCurrentUserQuery()

  if(authState.role === "patient"){
    const {isLoading, isSuccess, isError, error, data} = useFindPatientSummaryQuery(user?._id as string)
    
    if (isLoading || isUserLoading ) return <Spinner />;
    if (isError || isUserError ) return <Error error={error || userError} />;

    if (isSuccess && data)
    return (
      <div className="w-full">
        <LineChart label={'Appointments'} data={data} title="Visit History" />
      </div>
    )

  } else {
    const {isLoading, isSuccess, isError, error, data} = useFindDoctorSummaryQuery(user?._id as string)

    if (isLoading || isUserLoading ) return <Spinner />;
    if (isError || isUserError ) return <Error error={error || userError} />;

    if (isSuccess && data)
    return (
      <div className="w-full">
        <LineChart label={'Patients'} data={data} title="Monthly Patients Report" />
      </div>
    )
  }
}

export default MonthlyReport