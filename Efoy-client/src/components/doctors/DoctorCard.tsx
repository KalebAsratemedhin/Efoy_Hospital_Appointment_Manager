
import { Link } from "react-router-dom";
import { Doctor } from "../../types/Doctor";
import RatingDisplay from "../rating/RatingDisplay";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const initials = doctor.fullName.split(' ').map((name) => name[0].toUpperCase()).join('');
  const authState = useSelector(authSelector);

  return (
    <div className="bg-white rounded-md   shadow-sm hover:shadow-md ">
      <div className="w-full h-52 mb-4 flex justify-center items-center">
        {doctor.profilePic ? (
          <img src={doctor.profilePic} alt={`${doctor.fullName} profile`} className="w-full h-full rounded-full object-cover" />
        ) : (
          <div className="w-full h-full  flex justify-center items-center bg-gray-300 text-lg">
            {initials}
          </div>
        )}
      </div>
      <div className="flex flex-col px-4 w-64 pb-4 ">
        <p className="text-xl mb-2">{doctor.fullName}</p>
        <div className="flex items-center gap-2 text-gray-500 mb-2 flex-wrap">
          <p>{doctor.doctorData?.speciality}</p>
          <p className="bg-gray-700 w-1 h-1 rounded-full"></p>
          <p>{doctor.doctorData?.experience}</p>
        </div>
        <div className="flex gap-2 text-yellow-600 mb-2">
          <RatingDisplay value={doctor.rating as number} />
        </div>
        {authState.id && (
          <div className="flex gap-4">
            <Link className="text-secondary hover:text-primary" to={`/book/${doctor._id}`}>
              Book
            </Link>
            <Link className="text-secondary hover:text-primary" to={`/doctors/${doctor._id}`}>
              More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;