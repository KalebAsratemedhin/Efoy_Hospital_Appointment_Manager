import { bookingAPI, useFindAvailableTimeSlotsQuery, useFindOneBookingQuery, useUpdateBookingMutation } from '../../redux/api/bookingAPI'
import { useParams } from 'react-router-dom'
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { CustomSerializedError } from "../../types/CustomSerializedError";
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/authSlice';
interface FormData {
  appointmentDate: string;
  time: string;
  reason: string;
}

const BookingDetails = () => {
  const {id} = useParams()
  const {isLoading, isSuccess, isError, error, data} = useFindOneBookingQuery(id as string)
  const [updateBooking, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError, data: updateData} ]= useUpdateBookingMutation()
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
  const selectedDate = watch("appointmentDate");

  const { data: availableSlots, isSuccess: isSlotsFetchSuccess } = useFindAvailableTimeSlotsQuery({ doctorId: doctor?._id as string, date: selectedDate });


  useEffect(() => {
    reset(
      {
        appointmentDate: appointment?.appointmentDate.split('T')[0],
        reason: appointment?.reason,
        time: appointment?.time
      }
    )

  }, [data, reset])

  const onSubmit = async (data: FormData) => {
    

    try {
      const result = await updateBooking({id: id as string, update: data}).unwrap();
      console.log('res book update', result)
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading || isUpdateLoading ) return <Spinner />;
  if (isError || isUpdateError  ) return <Error error={error || updateError} />;
  if(isUpdateSuccess)
    appointment = updateData

  if (isSuccess && data)

  return (
      <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">Details</h1>
        { authState.role === "patient" && 
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Doctor Information</h2>
          <p className="text-gray-700">
            <strong>Name:</strong> {doctor?.fullName}
          </p>
          <p className="text-gray-700">
            <strong>Specialty:</strong> {doctor?.speciality}
          </p>
          <p className="text-gray-700">
            <strong>Experience:</strong> {doctor?.experience} years
          </p>
      </div>

        } 
        {
          authState.role === "doctor" && 
          <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Patient Information</h2>
          <p className="text-gray-700">
            <strong>Name:</strong> {patient?.fullName}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {patient?.email}
          </p>
          <p className="text-gray-700">
            <strong>Phone Number:</strong> {patient?.phoneNumber}
          </p>
          <p className="text-gray-700">
            <strong>Age:</strong> {patient?.age} years
          </p>
        </div>
        }
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="reason" className="block text-gray-700 font-semibold mb-2">
              Reason for Appointment
            </label>
            <textarea
              id="reason"
              {...register("reason", { required: "Reason is required" })}
              className={`w-full px-4 py-2 border ${
                errors.reason ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter the reason for your appointment"
            />
            {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
          </div>
          <div>
            <label htmlFor="appointmentDate" className="block text-gray-700 font-semibold mb-2">
              Date
            </label>
            <input
              type="date"
              id="appointmentDate"
              {...register("appointmentDate", { required: "Date is required" })}
              className={`w-full px-4 py-2 border ${
                errors.appointmentDate ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.appointmentDate && <p className="text-red-500 text-sm mt-1">{errors.appointmentDate.message}</p>}
          </div>
          <div>
            <label htmlFor="time" className="block text-gray-700 font-semibold mb-2">
              Time
            </label>
            <select
              id="time"
              {...register("time", { required: "Time is required" })}
              className={`w-full px-4 py-2 border ${
                errors.time ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option disabled selected>
                {data.time}
              </option>
              {availableSlots && availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
          </div>
          {authState.role === "patient"  && <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save
          </button>}
        </form>
      </div>
    
  )
}

export default BookingDetails