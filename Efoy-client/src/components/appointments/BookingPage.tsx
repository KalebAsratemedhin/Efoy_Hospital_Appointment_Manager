import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useFindOneDoctorQuery } from "../../redux/api/userAPI";
import FormError from "../utils/FormError";
import FormSuccess from "../utils/FormSuccess";
import Spinner from "../utils/Spinner";

import Error from "../utils/Error";
import { useCreateBookingMutation } from "../../redux/api/bookingAPI";
import TimeDate from "./TimeDate";

interface FormData {
  appointmentDate: string;
  time: string;
  reason: string;
}

const BookingPage = () => {
  const { id } = useParams();
  const { data: doctor, isLoading, isError, isSuccess, error } = useFindOneDoctorQuery(id as string);
  const [createBooking, { isLoading: isCreateLoading, isError: isCreateError, isSuccess: isCreateSuccess, error: createError }] = useCreateBookingMutation();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
        appointmentDate: new Date().toISOString().split("T")[0],
    }
  });


  const onSubmit = async (data: FormData) => {
    const bookingData = {
      ...data,
      doctorId: doctor?._id,
    };
    
    await createBooking(bookingData).unwrap();

  };


  if (isLoading || isCreateLoading) return <Spinner />;
  if (isError || isCreateError) return <Error error={error || createError} />;
  if (isSuccess)
    return (
      <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">Book an Appointment</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Doctor Information</h2>
          <p className="text-gray-700">
            <strong>Name:</strong> {doctor?.fullName}
          </p>
          <p className="text-gray-700">
            <strong>Specialty:</strong> {doctor?.doctorData.speciality}
          </p>
          <p className="text-gray-700">
            <strong>Experience:</strong> {doctor?.doctorData.experience} years
          </p>
        </div>
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
            doctorId={doctor._id}
          />

          {isCreateError && <FormError error={error} />}
          {isCreateLoading && <Spinner />}
          {isCreateSuccess && <FormSuccess message={"Booking has been created."} />}


          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Book Appointment
          </button>
        </form>
      </div>
    );
};

export default BookingPage;
