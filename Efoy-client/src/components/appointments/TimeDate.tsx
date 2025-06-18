import { useAvailableTimeSlotsQuery } from "../../redux/api/doctorAPI";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface TimeDateProps {
    register: any,
    errors: any, 
    watch: any, 
    setValue: any,
    doctorId: string,
    currentTime?: string // Add current time prop
}

const TimeDate = ({register, errors, watch, setValue, doctorId, currentTime}: TimeDateProps) => {
    const selectedDate = watch('appointmentDate')
    
    // Only make the API call when we have both doctorId and selectedDate
    const { data: availableSlots } = useAvailableTimeSlotsQuery(
        { doctorId: doctorId, date: selectedDate },
        { skip: !doctorId || !selectedDate }
    );

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    };

   useEffect(() => {
    console.log('availableSlots', availableSlots);
   }, [availableSlots]);

   // Set the current time when available slots are loaded and current time is provided
   useEffect(() => {
    if (availableSlots && currentTime && availableSlots.includes(currentTime)) {
        setValue('time', currentTime);
    }
   }, [availableSlots, currentTime, setValue]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <label htmlFor="appointmentDate" className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-purple-500" />
                    Appointment Date
                </label>
                <input
                    type="date"
                    id="appointmentDate"
                    {...register("appointmentDate", { required: "Date is required" })}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-3 border ${
                        errors.appointmentDate ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
                />
                {errors.appointmentDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.appointmentDate.message}</p>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <label htmlFor="time" className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                    <FaClock className="text-purple-500" />
                    Preferred Time kala
                </label>
                <select
                    id="time"
                    {...register("time", { required: "Time is required" })}
                    className={`w-full px-4 py-3 border ${
                        errors.time ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
                >
                    <option value="">Select a time slot</option>
                    {availableSlots && availableSlots.map((slot: string) => (
                        <option key={slot} value={slot}>
                            {formatTime(slot)}
                        </option>
                    ))}
                </select>
                {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
                )}
                {availableSlots && availableSlots.length === 0 && (
                    <p className="text-yellow-600 text-sm mt-1">No available time slots for this date</p>
                )}
            </motion.div>
        </div>
    );
};

export default TimeDate;

