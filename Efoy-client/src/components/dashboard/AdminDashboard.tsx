import { useAdminStatsQuery } from "../../redux/api/userAPI"
import Spinner from "../utils/Spinner"
import Error from "../utils/Error"
import { Link } from "react-router-dom";
import { FaUserMd, FaPlusCircle } from "react-icons/fa";

import AdminStats from "./AdminStats"
import Welcome from "./Welcome"


const AdminDashboard = () => {
  const {isLoading, isError, isSuccess, error, data} = useAdminStatsQuery()

  if (isLoading) return <Spinner />;
  if (isError) return <Error error={error} />;

  if (isSuccess)
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Welcome />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">System Overview</h2>
          <AdminStats 
            doctorsCount={data?.doctorsCount!} 
            patientsCount={data?.patientsCount!} 
            appointmentsCount={data?.appointmentsCount!} 
          />
        </div>
        <section className="my-8">
          {/* Add New Doctor Quick Action Card */}
          <Link to="/admin/doctors/create" className="block group">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition-all duration-200 flex items-center gap-4 group-hover:bg-cyan-50">
              <div className="bg-cyan-100 text-cyan-600 rounded-full p-4">
                <FaUserMd className="text-2xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <FaPlusCircle className="text-cyan-500" />
                  <span className="text-lg font-semibold">Add New Doctor</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  Register a new doctor account for your organization.
                </p>
              </div>
            </div>
          </Link>
        </section>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Manage Doctors</h3>
            <p className="text-gray-600 mb-4">Review and manage doctor applications and profiles</p>
            <button className="text-primary hover:text-primary-dark transition-colors duration-200">
              View Applications →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">System Reports</h3>
            <p className="text-gray-600 mb-4">View detailed system analytics and reports</p>
            <button className="text-primary hover:text-primary-dark transition-colors duration-200">
              View Reports →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">User Management</h3>
            <p className="text-gray-600 mb-4">Manage user accounts and permissions</p>
            <button className="text-primary hover:text-primary-dark transition-colors duration-200">
              Manage Users →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard