import { useFindOneBookingQuery, useUpdateBookingMutation } from '../../redux/api/bookingAPI'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from "../utils/Spinner";
import FormError from "../utils/FormError";
import FormSuccess from "../utils/FormSuccess";
import Error from "../utils/Error";
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/authSlice';
import TimeDate from './TimeDate';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUserMd, FaUser, FaCalendarAlt, FaClock, FaStethoscope, FaGraduationCap, FaPhone, FaEnvelope, FaBirthdayCake, FaCheckCircle } from 'react-icons/fa';
import { formatTime } from "../../utils/timeUtils";

interface FormData {
  appointmentDate: string;
  time: string;
  reason: string;
}

const BookingDetails = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {isLoading, isSuccess, isError, error, data} = useFindOneBookingQuery(id as string)
  const [updateBooking, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError} ]= useUpdateBookingMutation()
  const authState = useSelector(authSelector)
  const doctor = data?.doctorId
  const patient = data?.patientId
  let appointment = data
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
  });
  
  useEffect(() => {
    console.log(appointment, 'appointment details and watch time', watch('time'))
    if (appointment) {
      reset({
        appointmentDate: appointment.appointmentDate.split('T')[0],
        reason: appointment.reason,
        time: appointment.time
      })
    }
  }, [data, reset])

  const onSubmit = async (data: FormData) => {
    await updateBooking({id: id as string, update: data}).unwrap();
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Error error={error} />;
  if (isSuccess)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <FaArrowLeft />
            <span>Back to Appointments</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
              Appointment Details
            </h1>
            <p className="text-gray-600 text-lg">
              View and manage your appointment information
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Doctor/Patient Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              {authState.role === "patient" ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FaUserMd className="text-blue-600 text-xl" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Doctor Information</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        {doctor?.profilePic ? (
                          <img src={doctor.profilePic} alt={doctor.fullName} className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                          <span className="text-blue-600 font-semibold">
                            {doctor?.fullName?.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{doctor?.fullName}</p>
                        <p className="text-sm text-gray-600">Medical Professional</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FaStethoscope className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600">Specialty</p>
                          <p className="font-medium text-gray-900">{data?.doctorData?.speciality}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <FaGraduationCap className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600">Experience</p>
                          <p className="font-medium text-gray-900">{data?.doctorData?.experience} years</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <FaUser className="text-green-600 text-xl" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Patient Information</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        {patient?.profilePic ? (
                          <img src={patient.profilePic} alt={patient.fullName} className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                          <span className="text-green-600 font-semibold">
                            {patient?.fullName?.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{patient?.fullName}</p>
                        <p className="text-sm text-gray-600">Patient</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-green-500" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium text-gray-900">{patient?.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <FaPhone className="text-green-500" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium text-gray-900">{patient?.phoneNumber || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      {patient?.age && (
                        <div className="flex items-center gap-3">
                          <FaBirthdayCake className="text-green-500" />
                          <div>
                            <p className="text-sm text-gray-600">Age</p>
                            <p className="font-medium text-gray-900">{patient.age} years</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* Appointment Status Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaCalendarAlt className="text-purple-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Appointment Status</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaClock className="text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      appointment?.status === 'approved' ? 'bg-green-100 text-green-800' :
                      appointment?.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment?.status ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1) : 'Pending'}
                    </span>
                  </div>
      </div>

                                 <div className="flex items-center gap-3">
                   <FaCalendarAlt className="text-purple-500" />
                   <div>
                     <p className="text-sm text-gray-600">Date</p>
                     <p className="font-medium text-gray-900">
                       {appointment?.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                         weekday: 'long',
                         year: 'numeric',
                         month: 'long',
                         day: 'numeric'
                       }) : 'Not set'}
          </p>
        </div>
                 </div>
                
                <div className="flex items-center gap-3">
                  <FaClock className="text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium text-gray-900">{appointment?.time ? formatTime(appointment.time) : 'Not set'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment?.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                        appointment?.paymentStatus === 'refunded' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {appointment?.paymentStatus ? appointment.paymentStatus.charAt(0).toUpperCase() + appointment.paymentStatus.slice(1) : 'Unpaid'}
                      </span>
                      {appointment?.paymentAmount && (
                        <span className="text-sm font-medium text-gray-700">
                          {appointment.paymentAmount} {appointment.paymentCurrency || 'ETB'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FaCalendarAlt className="text-indigo-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Edit Appointment</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
                  <label htmlFor="reason" className="block text-gray-700 font-semibold mb-3">
              Reason for Appointment
            </label>
            <textarea
              id="reason"
              {...register("reason", { required: "Reason is required" })}
                    className={`w-full px-4 py-3 border ${
                      errors.reason ? "border-red-500" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
              placeholder="Enter the reason for your appointment"
                    rows={4}
            />
                  {errors.reason && <p className="text-red-500 text-sm mt-2">{errors.reason.message}</p>}
          </div>

          <TimeDate 
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
                  doctorId={data?.doctorId?.id}
                  currentTime={data?.time}
          />

          {isUpdateError && <FormError error={error} />}
          {isUpdateLoading && <Spinner />}
                {isUpdateSuccess && <FormSuccess message={"Appointment has been updated successfully!"} />}
         
                {authState.role === "patient" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
            type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
          >
                    Save Changes
                  </motion.button>
                )}
        </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetails