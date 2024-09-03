import { useFindOneDoctorQuery } from '../../redux/api/userAPI'
import { useParams } from 'react-router-dom'
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import CommentList from '../comment/CommentList';
import CommentBox from '../comment/CommentBox';
import RatingStars from '../rating/RatingStars';
import { useFindCurrentUserRatingQuery } from '../../redux/api/ratingAPI';
import RatingDisplay from '../rating/RatingDisplay';

const DoctorDetails = () => {
  const {id} = useParams()
  const {isLoading, isError, isSuccess, error, data} = useFindOneDoctorQuery(id as string)
  // const {isLoading: isRatingLoading, isError: isRatingError, isSuccess: isRatingSuccess, error: ratingError, data: ratingData} = useFindCurrentUserRatingQuery(id as string)

  const doctor = data
  const initials = doctor?.fullName.split(' ').map((name) => name[0].toUpperCase()).join(''); 


  if (isLoading ) return <Spinner />;
  if (isError ) return <Error error={error} />;

  

  if (isSuccess )
  return (
    <div className=''>
        <h1 className='m-6 text-xl text-secondary'>Profile</h1>

      <div className='flex bg-white rounded-md  gap-4 m-6 my'>
      <div className='flex w-1/2 gap-2 p-3'>
        <div className="w-32 flex justify-center pt-3">
          {
           doctor?.profilePic ? 
           <img src="" alt="" /> :
           <div className="w-24 h-24 rounded-full flex justify-center items-center bg-gray-300 text-lg ">
              {initials}
            </div>
          }
           
        </div>
        <div className="flex flex-col pt-2 flex-grow ">
          <p className="text-xl">{doctor?.fullName}</p>
          
          <div className="flex items-center gap-2 text-gray-500">
            <p>{doctor?.speciality}</p>
            <p className="bg-gray-700 w-1 h-1 rounded-full"></p>
            <p>{doctor?.experience}</p>
          </div>
          <div className="">
            {
              <RatingStars doctorId={doctor?._id as string}/> 
            }
            
          </div>
          


        </div>

      </div>
      <div className=' bg-white rounded-md  p-5 flex flex-grow flex-col gap-2'>
        <p>Email: <span className='text-gray-500 ml-2'>{doctor?.email} </span></p>
        <p>Experience: <span className='text-gray-500 ml-2'>{doctor?.experience}</span></p>
        <p>EducationLevel: <span className='text-gray-500 ml-2'>{doctor?.educationLevel}</span></p>
        <p>PhoneNumber: <span className='text-gray-500 ml-2'>{doctor?.phoneNumber}</span></p>
        <p>Rating: <span className='text-gray-500 ml-2'>{doctor?.rating}</span></p>

      </div>
      </div>
      <h1 className='m-6 text-xl text-secondary'>Comments</h1>

      <div className='m-6'>
        <div className='flex gap-4 rounded-md'>
          <div className='w-1/2 bg-white p-4  h-72 overflow-y-auto'>
            <CommentList doctorId={id as string} /> 
          </div>
          <div className='w-1/2 bg-white p-4  h-full'>
            <CommentBox doctorId={id as string} />

          </div>
        </div>

      </div>
    </div>
  )
}

export default DoctorDetails