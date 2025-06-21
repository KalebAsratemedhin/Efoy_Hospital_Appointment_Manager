import { useParams, Link } from "react-router-dom"
import { useEvaluateApplicationMutation, useFindOneApplicationQuery } from "../../redux/api/applicationAPI"
import DisabledTextField from "../utils/DisabledTextField"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import FormError from "../utils/FormError";
import FormSuccess from "../utils/FormSuccess";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaUserMd, FaGraduationCap, FaIdCard, FaArrowLeft } from "react-icons/fa";

const ApplicationDetails = () => {
  const {id} = useParams()
  const {isLoading, isSuccess, isError, error, data} = useFindOneApplicationQuery(id!)
  const [evaluate, {isLoading: isEvalLoading, isSuccess: isEvalSuccess, isError: isEvalError}] = useEvaluateApplicationMutation()

  const handleApprove = async () => {
    await evaluate({id: id!, update: {status: 'approved'}})
  }

  const handleReject = async () => {
    await evaluate({id: id!, update: {status: 'rejected'}})
  }

  const handleCancel = async () => {
    await evaluate({id: id!, update: {status: 'pending'}})
  }

  if (isLoading ) return <Spinner />;
  if (isError ) return <Error error={error} />;

  if (isSuccess){
    const user = data.userId
    const initials = user.fullName.split(' ').map((n: string) => n[0]).join('');

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <Link
                to="/applications"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <FaArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-semibold text-gray-800">Application Details</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-semibold text-purple-600">{initials}</span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{user.fullName}</h2>
                <div className="mt-2 space-y-1">
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="text-purple-500" />
                    {user.email}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaPhone className="text-purple-500" />
                    {user.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUserMd className="text-purple-500 w-5 h-5" />
                    <span className="font-medium">Specialty:</span>
                    <span>{data.speciality}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaGraduationCap className="text-purple-500 w-5 h-5" />
                    <span className="font-medium">Education Level:</span>
                    <span>{data.educationLevel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaIdCard className="text-purple-500 w-5 h-5" />
                    <span className="font-medium">Organization ID:</span>
                    <span>{data.orgID}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Status</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Current Status</p>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border
                    ${data.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                    ${data.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                    ${data.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                  `}>
                    {(data.status || 'pending').charAt(0).toUpperCase() + (data.status || 'pending').slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                {data.status !== 'approved' && (
                  <button
                    onClick={handleApprove}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Approve Application
                  </button>
                )}
                {data.status !== 'rejected' && (
                  <button
                    onClick={handleReject}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Reject Application
                  </button>
                )}
                {data.status !== 'pending' && (
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    Reset to Pending
                  </button>
                )}
              </div>

              {isEvalError && <FormError error={error} />}
              {isEvalLoading && <Spinner />}
              {isEvalSuccess && <FormSuccess message="Application has been evaluated." />}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default ApplicationDetails