import { Link } from "react-router-dom"
import { useDeleteBookingMutation } from "../../redux/api/bookingAPI";
import { useFindCurrentUserRatingQuery } from "../../redux/api/ratingAPI";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { BookingPopulated } from "../../types/Booking";
import { motion } from "framer-motion";
import { FaUserMd, FaCalendarAlt, FaClock, FaStethoscope, FaTrash, FaEye, FaStar, FaVideo, FaVideoSlash, FaCreditCard } from "react-icons/fa";
import RatingStars from "../rating/RatingStars";
import { useEffect } from "react";
import { formatTime } from "../../utils/timeUtils";

const BookingCardPatient = ({booking, refetch}: {booking: BookingPopulated, refetch: () => void}) => {
  const doctor = booking.doctorId

  const initials = doctor.fullName.split(' ').map((name) => name[0].toUpperCase()).join('');  
  const [deleteBooking, {isLoading, isError, isSuccess, error}] = useDeleteBookingMutation()
  
  // Check if user has already rated this doctor
  const { data: existingRating } = useFindCurrentUserRatingQuery(doctor.id, {
    skip: booking.status !== "finished"
  });

  const handleDelete = async () => {
    await deleteBooking(booking.id as string)
  }
  useEffect(() => {
    console.log('booking in card', booking)
  }, [booking])

  if (isLoading) return <Spinner />;
  if (isError) return <Error error={error} />;
  if(isSuccess) refetch()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'serviced': return 'bg-blue-100 text-blue-800';
      case 'finished': return 'bg-green-100 text-green-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex gap-6">
        {/* Doctor Avatar */}
        <div className="flex-shrink-0">
          <div className="relative">
            {doctor.profilePic ? (
              <img
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" 
                src={doctor.profilePic} 
                alt={doctor.fullName} 
              />
            ) : (
              <div className="w-16 h-16 rounded-full flex justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-lg border-2 border-gray-100">
                {initials}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <FaStar className="text-white text-xs" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Dr. {doctor.fullName}
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FaStethoscope className="text-blue-500" />
                  <span>{booking.doctorData.speciality}</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>{booking.doctorData.experience} years exp.</span>
              </div>
            </div>
            
            {/* Status Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status || '')}`}>
              {(booking.status || '').charAt(0).toUpperCase() + (booking.status || '').slice(1)}
            </span>
          </div>

          {/* Appointment Details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaCalendarAlt className="text-blue-500 text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Appointment Date</p>
                <p className="text-sm font-medium text-gray-700">
                  {new Date(booking.appointmentDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-green-50 rounded-lg">
                <FaClock className="text-green-500 text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Time</p>
                <p className="text-sm font-medium text-gray-700">{formatTime(booking.time)}</p>
              </div>
            </div>

            {booking.reason && (
              <div className="flex items-start gap-3 text-gray-600">
                <div className="p-2 bg-purple-50 rounded-lg mt-1">
                  <FaUserMd className="text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Reason</p>
                  <p className="text-sm font-medium text-gray-700 line-clamp-2">{booking.reason}</p>
                </div>
              </div>
            )}

            {/* Appointment Type */}
            <div className="flex items-center gap-3 text-gray-600">
              <div className={`p-2 rounded-lg ${booking.appointmentType === 'virtual' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                {booking.appointmentType === 'virtual' ? (
                  <FaVideo className="text-blue-500 text-sm" />
                ) : (
                  <FaVideoSlash className="text-gray-500 text-sm" />
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Type</p>
                <p className="text-sm font-medium text-gray-700">
                  {booking.appointmentType === 'virtual' ? 'Video Consultation' : 'In-Person Visit'}
                </p>
              </div>
            </div>

            {/* Payment Status Display */}
            <div className="flex items-center gap-3 text-gray-600">
              <div className={`p-2 rounded-lg ${
                booking.paymentStatus === 'paid' ? 'bg-green-50' : 
                booking.paymentStatus === 'refunded' ? 'bg-gray-50' : 
                'bg-red-50'
              }`}>
                <FaCreditCard className={`text-sm ${
                  booking.paymentStatus === 'paid' ? 'text-green-500' : 
                  booking.paymentStatus === 'refunded' ? 'text-gray-500' : 
                  'text-red-500'
                }`} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Payment</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                    booking.paymentStatus === 'refunded' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.paymentStatus ? booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1) : 'Unpaid'}
                  </span>
                  {booking.paymentAmount && (
                    <span className="text-xs text-gray-600">
                      {booking.paymentAmount} {booking.paymentCurrency || 'ETB'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          {booking.paymentStatus === "unpaid" && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <FaCreditCard className="text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Payment Required - ${booking.paymentAmount || 150.00}
                </span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                Complete payment to confirm your appointment
              </p>
            </div>
          )}
          
          {booking.paymentStatus === "paid" && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <FaCreditCard className="text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Payment Completed
                </span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                Your appointment is confirmed and ready
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <Link 
              to={`/appointments/${booking.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <FaEye className="text-xs" />
              View Details
            </Link>
            
                        {/* Payment Button for Unpaid Appointments */}
            {booking.paymentStatus === "unpaid" && (
              <Link
                to={`/payment/${booking.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                <FaCreditCard className="text-xs" />
                Pay Now
              </Link>
            )}
            
            {/* Video Call Button for Virtual Appointments */}
            {booking.appointmentType === 'virtual' && (
              <Link 
                to={`/video-call/${booking.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <FaVideo className="text-xs" />
                Join Call
              </Link>
            )}
            
            {booking.status !== "finished" && (
              <button 
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
              >
                <FaTrash className="text-xs" />
                Cancel
              </button>
            )}
          </div>

          {/* Rating Section for Finished Bookings - Only show if not already rated */}
          {booking.status === "finished" && !existingRating && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Rate your experience:</span>
                </div>
                <RatingStars doctorId={booking.doctorId.id} />
              </div>
            </div>
          )}

          {/* Show rating confirmation if already rated */}
          {booking.status === "finished" && existingRating && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <FaStar className="text-green-500" />
                  <span className="text-sm font-medium text-green-700">You rated this doctor: {existingRating.value}/5</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default BookingCardPatient