import { Link } from "react-router-dom"
import { useDeleteBookingMutation } from "../../redux/api/bookingAPI";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { BookingPopulated } from "../../types/Booking";

const BookingCardPatient = ({booking, refetch}: {booking: BookingPopulated, refetch: () => void}) => {
  const doctor = booking.doctorId

  const initials = doctor.fullName.split(' ').map((name) => name[0].toUpperCase()).join('');  
  const [deleteBooking, {isLoading, isError, isSuccess, error}] = useDeleteBookingMutation()

  const handleDelete = async () => {
    await deleteBooking(booking._id as string)

  }
  if (isLoading ) return <Spinner />;
  if (isError ) return <Error error={error} />;
  if(isSuccess)
    refetch()
 

  return (
    <div className="bg-white rounded-md p-4 flex gap-4 w-[600px] shadow-sm hover:shadow-md">
        <div className="w-20   flex justify-center items-center">
          {
           doctor.profilePic ? 
           <img className="rounded-full w-20 h-20"    src={doctor.profilePic} alt="profile" /> :
           <div className="w-24 h-24 rounded-full flex justify-center items-center bg-gray-300 text-lg ">
              {initials}
            </div>
          }
           
        </div>
        <div className="flex flex-col pt-2 flex-grow ">
          <p className="text-xl">{doctor.fullName}</p>
          
          <div className="flex items-center gap-2 text-gray-500">
            <p>{booking.doctorData.speciality}</p>
            <p className="bg-gray-700 w-1 h-1 rounded-full"></p>
            <p>{booking.doctorData.experience}</p>
          </div>
          <div className="flex flex-col  text-gray-500">
            <p>Date: {new Date(booking.appointmentDate.split('T')[0] + ' ' + booking.time).toLocaleString()}</p>
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