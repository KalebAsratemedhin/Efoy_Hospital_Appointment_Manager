import { Link } from "react-router-dom"
import { BookingResponse } from "../../types/BookingResponse";
import { useDeleteBookingMutation } from "../../redux/api/bookingAPI";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { CustomSerializedError } from "../../types/CustomSerializedError";

const BookingCardPatient = ({booking, refetch}: {booking: BookingResponse, refetch: () => void}) => {
  const doctor = booking.doctorId

  const initials = doctor.fullName.split(' ').map((name) => name[0].toUpperCase()).join('');  
  const [deleteBooking, {isLoading, isError, isSuccess, error}] = useDeleteBookingMutation()

  const customError = error as CustomSerializedError

  const handleDelete = async () => {
    await deleteBooking(booking._id as string)

  }
  if (isLoading ) return <Spinner />;
  if (isError ) return <Error message={customError.data.message} />;
  if(isSuccess)
    refetch()
 

  return (
    <div className="bg-white rounded-md p-4 flex gap-4 w-[600px] shadow-sm hover:shadow-md">
        <div className="w-32 flex justify-center items-center">
          {
           doctor.profilePic ? 
           <img src={doctor.profilePic} alt="profile" /> :
           <div className="w-24 h-24 rounded-full flex justify-center items-center bg-gray-300 text-lg ">
              {initials}
            </div>
          }
           
        </div>
        <div className="flex flex-col pt-2 flex-grow ">
          <p className="text-xl">{doctor.fullName}</p>
          
          <div className="flex items-center gap-2 text-gray-500">
            <p>{doctor.speciality}</p>
            <p className="bg-gray-700 w-1 h-1 rounded-full"></p>
            <p>{doctor.experience}</p>
          </div>
          <div className="flex flex-col  text-gray-500">
            <p>Date: {new Date(booking.appointmentDate).toDateString()}  {booking.time}</p>
            <p>Reason: {booking.reason}</p>
          </div>


        </div>
        <div className="flex items-center mt-4 gap-2 p-2">
          <button onClick={handleDelete} className="text-secondary hover:text-primary" >Delete</button>
          <Link className="text-secondary hover:text-primary" to={`/appointments/${booking._id}`}>More</Link>

        </div>

    </div>
  )
}

export default BookingCardPatient