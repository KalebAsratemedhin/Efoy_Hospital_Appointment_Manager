import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useGetDoctorByIdQuery } from "../../redux/api/doctorAPI";
import FormError from "../utils/FormError";
import FormSuccess from "../utils/FormSuccess";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { useCreateBookingMutation } from "../../redux/api/bookingAPI";
import TimeDate from "./TimeDate";
import { motion } from "framer-motion";
import { FaUserMd, FaClock, FaInfoCircle, FaArrowLeft } from "react-icons/fa";

interface FormData {
  appointmentDate: string;
  time: string;
  reason: string;
}

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: doctor, isLoading, isError, isSuccess, error } = useGetDoctorByIdQuery(id as string);
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
      doctorId: doctor?.userId?.id,
    };
    
    await createBooking(bookingData).unwrap();
  };

  if (isLoading || isCreateLoading) return <Spinner />;
  if (isError || isCreateError) return <Error error={error || createError} />;
  if (isSuccess)
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <FaArrowLeft />
            <span>Back</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white mb-2">Book an Appointment</h1>
              <p className="text-white/80">Schedule your consultation with Dr. {doctor?.userId?.fullName}</p>
            </div>

            {/* Doctor Info */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-6">
                <div className="relative">
                  {doctor?.userId?.profilePic ? (
                    <img
                      src={doctor.userId.profilePic}
                      alt={doctor.userId.fullName}
                      className="w-24 h-24 rounded-full object-cover border-4 border-purple-100"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-2xl font-semibold text-purple-600">
                      {doctor?.userId?.fullName
                        ? doctor.userId.fullName.split(' ').map((n: string) => n[0]).join('')
                        : '--'}
                    </div>
                  )}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {doctor?.speciality}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Dr. {doctor?.userId?.fullName}</h2>
                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaUserMd className="text-purple-500" />
                      {doctor?.speciality}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaClock className="text-purple-500" />
                      {doctor?.experience} years experience
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
              <div>
                <label htmlFor="reason" className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-purple-500" />
                  Reason for Appointment
                </label>
                <textarea
                  id="reason"
                  {...register("reason", { required: "Reason is required" })}
                  className={`w-full px-4 py-3 border ${
                    errors.reason ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
                  placeholder="Please describe your symptoms or reason for visit..."
                  rows={4}
                />
                {errors.reason && (
                  <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
                )}
              </div>

              <TimeDate 
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                doctorId={doctor?.userId?.id}
              />

              {isCreateError && <FormError error={error} />}
              {isCreateLoading && <Spinner />}
              {isCreateSuccess && <FormSuccess message={"Booking has been created successfully!"} />}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
              >
                Book Appointment
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    );
};

export default BookingPage;
