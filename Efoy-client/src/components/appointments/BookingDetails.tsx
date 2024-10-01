import { useFindOneBookingQuery, useUpdateBookingMutation } from '../../redux/api/bookingAPI'
import { useParams } from 'react-router-dom'
import Spinner from "../utils/Spinner";
import FormError from "../utils/FormError";
import FormSuccess from "../utils/FormSuccess";
import Error from "../utils/Error";
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/authSlice';
import TimeDate from './TimeDate';
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
    await updateBooking({id: id as string, update: data}).unwrap();
  
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Error error={error} />;
  if (isSuccess)

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
          
            <strong>Specialty:</strong> {data.doctorData?.speciality}
          </p>
          <p className="text-gray-700">
            <strong>Experience:</strong> {data.doctorData?.experience} years
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

          <TimeDate 
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            doctorId={data.doctorId._id}
          />

          {isUpdateError && <FormError error={error} />}
          {isUpdateLoading && <Spinner />}
          {isUpdateSuccess && <FormSuccess message={"Booking has been updated."} />}


         
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