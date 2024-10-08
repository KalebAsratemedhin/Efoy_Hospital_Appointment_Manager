import Reminder from "./Reminder";
import MonthlyReport from "./MonthlyReport";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import DoctorProfile from "../doctors/DoctorProfile";
import { Doctor } from "../../types/User";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";

const DoctorDashboard = () => {
  const { isLoading: isUserLoading, isSuccess: isUserSuccess, isError: isUserError, error: userError, data: user, refetch } = useGetCurrentUserQuery();

  if (isUserLoading) return <Spinner />;
  if (isUserError) return <Error error={userError} />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Doctor Dashboard</h1>
        <p className="text-gray-600">Welcome back, Dr. {user?.fullName}</p>
      </div>

        <div className="flex flex-wrap gap-4 justify-between max-w-6xl mx-auto rounded-lg mb-8">
            <MonthlyReport />
            <Reminder />

        </div>

      <div className="max-w-6xl mx-auto  mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Public Profile</h2>
        </div>
        <DoctorProfile doctor={user as Doctor} />
        
      </div>


    </div>
  );
};

export default DoctorDashboard;
