import { Link } from "react-router-dom"
import { BookingPopulated } from "../../types/Booking";
import { useMarkBookingFinishedMutation } from "../../redux/api/bookingAPI";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { motion } from "framer-motion";
import { FaUser, FaCalendarAlt, FaClock, FaEnvelope, FaCheckCircle, FaEye, FaPhone, FaPills, FaVideo, FaVideoSlash, FaCreditCard } from "react-icons/fa";
import { useState } from "react";
import PrescriptionForm from "./PrescriptionForm";
import { formatTime } from "../../utils/timeUtils";

const BookingCardDoctor = ({booking, refetch}: {booking: BookingPopulated, refetch: () => void}) => {
  const patient = booking.patientId
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  const initials = patient?.fullName.split(' ').map((name: string) => name[0].toUpperCase()).join('');
  const [markFinished, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError} ]= useMarkBookingFinishedMutation()

  const handleStatus = async () => {
    if (booking.id) {
      await markFinished(booking.id)
    }
  }

  if (isUpdateLoading) return <Spinner />;
  if (isUpdateError) return <Error error={updateError} />;
  if(isUpdateSuccess) refetch()

  if (showPrescriptionForm) {
    return (
      <PrescriptionForm
        bookingId={booking.id || ''}
        patientName={booking.patientId?.fullName || 'Patient'}
        onSuccess={() => setShowPrescriptionForm(false)}
        onCancel={() => setShowPrescriptionForm(false)}
      />
    );
  }

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
        {/* Patient Avatar */}
        <div className="flex-shrink-0">
          <div className="relative">
            {patient?.profilePic ? (
              <img 
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" 
                src={patient.profilePic} 
                alt={patient.fullName} 
              />
            ) : (
              <div className="w-16 h-16 rounded-full flex justify-center items-center bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold text-lg border-2 border-gray-100">
                {initials}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <FaUser className="text-white text-xs" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {patient?.fullName}
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FaEnvelope className="text-green-500" />
                  <span>{patient?.email}</span>
                </div>
                {patient?.phoneNumber && (
                  <>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <FaPhone className="text-green-500" />
                      <span>{patient?.phoneNumber}</span>
                    </div>
                  </>
                )}
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

            {booking.reason && (
              <div className="flex items-start gap-3 text-gray-600">
                <div className="p-2 bg-purple-50 rounded-lg mt-1">
                  <FaUser className="text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Reason</p>
                  <p className="text-sm font-medium text-gray-700 line-clamp-2">{booking.reason}</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <Link 
              to={`/appointments/${booking.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <FaEye className="text-xs" />
              View Details
            </Link>
            
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

            {/* Prescription Button */}
            <button
              onClick={() => setShowPrescriptionForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              <FaPills className="text-xs" />
              Create Prescription
            </button>
            
            {booking.status === "pending" && (
              <button 
                onClick={handleStatus}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <FaCheckCircle className="text-xs" />
                Mark as Finished
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BookingCardDoctor