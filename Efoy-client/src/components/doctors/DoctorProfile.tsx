import { Doctor } from "../../types/Doctor"
import RatingDisplay from "../rating/RatingDisplay";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
import CommentList from "../comment/CommentList";
import CommentBox from "../comment/CommentBox";
import RatingStars from "../rating/RatingStars";

const DoctorProfile = ({doctor} : {doctor: Doctor}) => {

  const initials = doctor.fullName.split(' ').map((name) => name[0].toUpperCase()).join('');  
  const authState = useSelector(authSelector)

  return (
    <div className=" min-h-screen">
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center ">
        <div className="w-32 h-32 mb-4">
          {doctor?.profilePic ? (
            <img src={doctor.profilePic} alt={doctor.fullName} className="rounded-full w-full h-full object-cover" />
          ) : (
            <div className="w-32 h-32 rounded-full flex justify-center items-center bg-gray-300 text-2xl font-semibold text-gray-700">
              {initials}
            </div>
          )}
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">{doctor?.fullName}</h2>
        <p className="text-lg text-gray-600 mt-2">{doctor?.speciality}</p>
        <p className="text-gray-500 mt-1">{doctor?.experience}</p>
        <div className="mt-4">
        { authState.username !== doctor.username ?
          <RatingStars doctorId={doctor?._id as string} /> :
          <RatingDisplay value={doctor.rating as number} />
        }
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 lg:col-span-2 h-full">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Doctor Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-lg">
              <span className="font-medium text-gray-800">Email:</span>
              <span className="ml-2 text-gray-600">{doctor?.email}</span>
            </p>
            <p className="text-lg">
              <span className="font-medium text-gray-800">Experience:</span>
              <span className="ml-2 text-gray-600">{doctor?.experience}</span>
            </p>
            <p className="text-lg">
              <span className="font-medium text-gray-800">Education Level:</span>
              <span className="ml-2 text-gray-600">{doctor?.educationLevel}</span>
            </p>
            <p className="text-lg">
              <span className="font-medium text-gray-800">Phone Number:</span>
              <span className="ml-2 text-gray-600">{doctor?.phoneNumber}</span>
            </p>
            <p className="text-lg">
              <span className="font-medium text-gray-800">Rating:</span>
              <span className="ml-2 text-gray-600">{doctor?.rating}</span>
            </p>
          </div>
        </div>

      <div className="lg:col-span-3 ">
        <div className="bg-white rounded-lg w-full shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Comments</h3>
          <div className="flex gap-10 justify-between">
            <div className="bg-gray-50 w-1/2 flex-grow rounded-lg p-4 h-[400px] overflow-y-auto">
              <CommentList doctorId={doctor._id as string} />
            </div>
            { 
              authState.username !== doctor.username &&
              <div className="bg-gray-50 w-1/2 rounded-lg p-4">
              <CommentBox doctorId={doctor._id as string} />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  </div>
   
  )
}

export default DoctorProfile

