import { FaCalendarAlt, FaUserMd, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { useFindRecentBookingQuery } from '../../redux/api/bookingAPI';
import CountDown from './CountDown';
import { Booking } from '../../types/Booking';
import { useTheme } from '../../hooks/useTheme';

const Reminder = () => {
  const { isSuccess, data } = useFindRecentBookingQuery();
  const { isDarkMode } = useTheme();
  const eventDate = data ? findNext(data) : undefined;
  
  const textColor = isDarkMode ? '#E5E7EB' : '#374151';
  const secondaryTextColor = isDarkMode ? '#9CA3AF' : '#6B7280';
  const bgColor = isDarkMode ? '#1F2937' : '#FFFFFF';
  const borderColor = isDarkMode ? '#374151' : '#E5E7EB';

  if (!isSuccess) return null;

  return (
    <div className={`${bgColor} shadow-lg rounded-xl overflow-hidden sticky top-6`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
        <div className="flex items-center gap-3 text-white">
          <FaCalendarAlt className="h-6 w-6" />
          <h2 className="text-xl font-bold">Upcoming Appointment</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {eventDate ? (
          <>
            {/* Countdown Timer */}
            <div className="mb-6">
              <CountDown eventDate={eventDate} />
            </div>

            {/* Appointment Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaUserMd className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium" style={{ color: textColor }}>{data.doctorName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaClock className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium" style={{ color: textColor }}>
                    {new Date(eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium" style={{ color: textColor }}>{data.location || 'Main Hospital'}</p>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                Confirmed
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaCalendarAlt className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: textColor }}>No Upcoming Appointments</h3>
            <p className="text-sm text-center" style={{ color: secondaryTextColor }}>
              You don't have any scheduled appointments at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminder;

const findNext = (data: Booking) => {
  const now = new Date();
  const date = new Date(data?.appointmentDate?.split('T')[0] + ' ' + data.time);
  return date > now ? date : undefined;
};