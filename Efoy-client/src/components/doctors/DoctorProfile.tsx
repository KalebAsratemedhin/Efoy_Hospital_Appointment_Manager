// import { Link } from "react-router-dom";
// import { Doctor } from "../../types/Doctor"
// import RatingDisplay from "../rating/RatingDisplay";
// import { useSelector } from "react-redux";
// import { authSelector } from "../../redux/slices/authSlice";

// const DoctorProfile = ({doctor} : {doctor: Doctor}) => {
//   const initials = doctor.fullName.split(' ').map((name) => name[0].toUpperCase()).join('');  
//   const authState = useSelector(authSelector)


//   return (
//     <div className="bg-white rounded-md p-4 flex  w-[600px] shadow-sm hover:shadow-md">
//         <div className="w-32 flex justify-center items-center">
//           {
//            doctor.profilePic ? 
//            <img src="" alt="" /> :
//            <div className="w-24 h-24 rounded-full flex justify-center items-center bg-gray-300 text-lg ">
//               {initials}
//             </div>
//           }
           
//         </div>
//         <div className="flex flex-col pt-2 flex-grow ">
//           <p className="text-xl">{doctor.fullName}</p>
          
//           <div className="flex items-center gap-2 text-gray-500">
//             <p>{doctor.speciality}</p>
//             <p className="bg-gray-700 w-1 h-1 rounded-full"></p>
//             <p>{doctor.experience}</p>
//           </div>
//           <div className="flex gap-2 text-yellow-600">
//            <RatingDisplay value={doctor.rating as number} />
//           </div>
          
          


//         </div>
//         {
//           authState.username && 
//           <div className="flex mt-4 gap-2 p-2">
//             <Link className="text-secondary hover:text-primary" to={`/book/${doctor._id}`}>Book</Link>
//             <Link className="text-secondary hover:text-primary" to={`/doctors/${doctor._id}`}>More</Link>

//           </div>
//         }

//     </div>
//   )
// }

// export default DoctorProfile

import { Link } from "react-router-dom";
import { Doctor } from "../../types/Doctor";
import RatingDisplay from "../rating/RatingDisplay";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";

const DoctorProfile = ({ doctor }: { doctor: Doctor }) => {
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
      <div className="flex flex-col px-4 min-w-64 ">
        <p className="text-xl mb-2">{doctor.fullName}</p>
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <p>{doctor.speciality}</p>
          <p className="bg-gray-700 w-1 h-1 rounded-full"></p>
          <p>{doctor.experience}</p>
        </div>
        <div className="flex gap-2 text-yellow-600 mb-2">
          <RatingDisplay value={doctor.rating as number} />
        </div>
        {authState.username && (
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

export default DoctorProfile;
