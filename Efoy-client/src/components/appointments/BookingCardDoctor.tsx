import { Link } from "react-router-dom"
import { BookingPopulated } from "../../types/Booking";
import { useUpdateBookingMutation } from "../../redux/api/bookingAPI";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
const BookingCardDoctor = ({booking, refetch}: {booking: BookingPopulated, refetch: () => void}) => {
  const patient = booking.patientId

  const initials = patient?.fullName.split(' ').map((name: string) => name[0].toUpperCase()).join('');  
  const [updateBooking, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError} ]= useUpdateBookingMutation()

  const handleStatus = async () => {
    await updateBooking({id: booking._id as string, update: {status: "serviced"}})

  }
  if (isUpdateLoading ) return <Spinner />;
  if (isUpdateError ) return <Error error={updateError} />;
  if(isUpdateSuccess)
    refetch()
 

  return (
    <div className="bg-white rounded-md p-4 flex gap-4 w-[600px] shadow-sm hover:shadow-md">
        <div className="w-20 flex justify-center items-center">
          {
           patient?.profilePic ? 
           <img className="w-12 h-12" src={patient.profilePic} alt="profile" /> :
           <div className="w-24 h-24 rounded-full flex justify-center items-center bg-gray-300 text-lg ">
              {initials}
            </div>
          }
           
        </div>
        <div className="flex flex-col pt-2 flex-grow ">
          <p className="text-xl">{patient?.fullName}</p>
          
          <div className="flex items-center gap-2 text-gray-500">
            <p>{patient?.email}</p>
            <p className="bg-gray-700 w-1 h-1 rounded-full"></p>
          </div>
          <div className="flex flex-col  text-gray-500">
            <p>Date: {new Date(booking.appointmentDate.split('T')[0] + ' ' + booking.time).toLocaleString()}</p>
            <p>Reason: {booking.reason}</p>
          </div>


        </div>
        <div className="flex items-center mt-4 gap-2 p-2">
            {booking.status === "pending" && 
                <button onClick={handleStatus} className="text-secondary hover:text-primary" >Serviced</button>
            }
          <Link className="text-secondary hover:text-primary" to={`/appointments/${booking._id}`}>More</Link>

        </div>

    </div>
  )
}

export default BookingCardDoctor