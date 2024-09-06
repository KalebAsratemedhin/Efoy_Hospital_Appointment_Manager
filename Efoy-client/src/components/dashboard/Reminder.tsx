
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useFindCurrentUserBookingsQuery } from '../../redux/api/bookingAPI';
import { BookingResponse } from '../../types/BookingResponse';
import CountDown from './CountDown';

const Reminder = () => {
  const {isLoading, isError, isSuccess, error, data} = useFindCurrentUserBookingsQuery()

  const eventDate = data ? findNext(data) : undefined

  return (
    <div className="bg-white  shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-2 text-indigo-600">
        <FaCalendarAlt className="h-6 w-6" />
        <h2 className="text-xl font-bold">Your next appointment</h2>
      </div>
      {eventDate && <CountDown eventDate={eventDate} />}
      {!eventDate && <h1 className='text-gray-500'>No upcoming appointment!</h1> }
    </div>
  );
};

export default Reminder;


const findNext = (data: BookingResponse[]) => {
  const now = new Date()

  for(const booking of data){
    const date = new Date(booking.appointmentDate.split('T')[0] + ' ' + booking.time)

    if(date > now){
      return date
    }

  }
  return undefined

}