import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetDoctorByIdQuery } from "../../redux/api/doctorAPI";
import { useCreateBookingMutation } from "../../redux/api/bookingAPI";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaUserMd, FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: doctor, isLoading, error } = useGetDoctorByIdQuery(id as string);
  const [createBooking, { isLoading: isBookingLoading }] = useCreateBookingMutation();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const authState = useSelector(authSelector);

  useEffect(() => {
    if (!authState.id) {
      navigate("/signin");
    }
  }, [authState.id, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Error loading doctor information. Please try again later.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking({
        doctorId: id as string,
        date: selectedDate,
        time: selectedTime,
        reason,
      }).unwrap();
      navigate("/appointments");
    } catch (error) {
      console.error("Failed to book appointment:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <img
              src={doctor.profilePic || `https://ui-avatars.com/api/?name=${doctor.fullName}&background=0D8ABC&color=fff`}
              alt={doctor.fullName}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{doctor.fullName}</h1>
              <p className="text-cyan-600 font-medium">{doctor.doctorData.speciality}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-cyan-500" />
                    Appointment Date
                  </div>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-cyan-500" />
                    Preferred Time
                  </div>
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="">Select a time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <FaInfoCircle className="text-cyan-500" />
                  Reason for Visit
                </div>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                rows={4}
                placeholder="Please describe your symptoms or reason for visit..."
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="text-cyan-600 font-semibold">
                Consultation Fee: ${doctor.doctorData.fee || "Contact for fee"}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isBookingLoading}
                className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBookingLoading ? "Booking..." : "Book Appointment"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Book; 