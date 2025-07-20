import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApplicationDetails from "../components/applications/ApplicationDetails";
import { useFindAllApplicationsQuery } from "../redux/api/applicationAPI";
import Spinner from "../components/utils/Spinner";
import Error from "../components/utils/Error";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaUserMd, FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { DoctorApplicationPopulated } from "../types/DoctorApplication";

const Applications = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { isLoading, isSuccess, isError, error, data } = useFindAllApplicationsQuery();

  if (id) {
    return <ApplicationDetails />;
  }

  if (isLoading) return <Spinner />;
  if (isError) return <Error error={error} />;

  console.log(data)

  const filteredApplications = data?.filter((application: DoctorApplicationPopulated) => {
    const matchesSearch = application.userId.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.speciality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || application.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm"
      >
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Doctor Applications</h1>
              <p className="text-gray-500 mt-1">Manage and review doctor applications</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="p-6">
          <div className="grid gap-6">
            {filteredApplications?.map((application: DoctorApplicationPopulated) => (
              <motion.div
                key={application._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left Section - User Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      {application.userId.profilePic ? (
                        <img
                          src={application.userId.profilePic}
                          alt={application.userId.fullName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-semibold text-purple-600">
                          {application.userId.fullName.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{application.userId.fullName}</h3>
                      <p className="text-gray-500">{application.userId.email}</p>
                      <div className="mt-3 flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaUserMd className="text-purple-500" />
                          <span>{application.speciality}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCalendarAlt className="text-purple-500" />
                          <span>{application.experience} years</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaGraduationCap className="text-purple-500" />
                          <span>{application.educationLevel}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Status and Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(application.status || 'pending')}`}>
                      {(application.status || 'pending').charAt(0).toUpperCase() + (application.status || 'pending').slice(1)}
                    </span>
                    <Link
                      to={`/applications/${application._id}`}
                      className="px-6 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                    >
                      Review Application
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredApplications?.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FaSearch className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">No applications found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Applications;