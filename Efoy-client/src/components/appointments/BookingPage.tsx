import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useFindOneDoctorQuery } from "../../redux/api/userAPI";
import { CustomSerializedError } from "../../types/CustomSerializedError";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { useCreateBookingMutation, useFindAvailableTimeSlotsQuery } from "../../redux/api/bookingAPI";

interface FormData {
  appointmentDate: string;
  time: string;
  reason: string;
}

const BookingPage = () => {
  const { id } = useParams();
  const { data: doctor, isLoading, isError, isSuccess, error } = useFindOneDoctorQuery(id as string);
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

  const selectedDate = watch("appointmentDate");

  const { data: availableSlots, isSuccess: isSlotsFetchSuccess } = useFindAvailableTimeSlotsQuery({ doctorId: id as string, date: selectedDate });

  const [createBooking, { isLoading: isCreateLoading, isError: isCreateError, isSuccess: isCreateSuccess, error: createError }] = useCreateBookingMutation();

  useEffect(() => {
    setValue("appointmentDate", new Date().toISOString().split("T")[0]);
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    const bookingData = {
      ...data,
      doctorId: id as string,
    };


    try {
      const result = await createBooking(bookingData).unwrap();
      console.log('res book', result)

    } catch (error) {
      console.error(error);
    }
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
            <strong>Specialty:</strong> {doctor?.speciality}
          </p>
          <p className="text-gray-700">
            <strong>Experience:</strong> {doctor?.experience} years
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
                Select a time
              </option>
              {availableSlots && availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
          </div>
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
