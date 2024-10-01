
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useFindCurrentUserBookingsQuery, useFindRecentBookingQuery } from '../../redux/api/bookingAPI';
import CountDown from './CountDown';
import { Booking, BookingPopulated } from '../../types/Booking';
import Error from '../utils/Error';
import Spinner from '../utils/Spinner';

const Reminder = () => {
  const {isLoading, isError, isSuccess, error, data} = useFindRecentBookingQuery()
  const eventDate = data ? findNext(data) : undefined
  console.log('apps', data)


  // if(isError)
  //   return <Error error={error} />
  // if(isLoading)
  //   return <Spinner />

  
  if(isSuccess)


  return (
    <div className="bg-white  shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 md:w-5/12">
      <div className="flex items-center gap-3 text-indigo-600">
        <FaCalendarAlt className="h-6 w-6" />
        <h2 className="text-xl font-bold">Your next appointment</h2>
      </div>
      {eventDate && <CountDown eventDate={eventDate} />}
      <div className='flex items-center justify-center h-full'>
      {!eventDate && <h1 className='text-gray-500'>No upcoming appointment!</h1> }

      </div>
    </div>
  );
};

export default Reminder;


const findNext = (data: Booking) => {
  const now = new Date()

  const date = new Date(data.appointmentDate.split('T')[0] + ' ' + data.time)

  if(date > now){
    return date
  }

  return undefined

}