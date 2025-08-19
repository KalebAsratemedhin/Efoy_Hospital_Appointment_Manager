import { useAvailableTimeSlotsQuery } from "../../redux/api/doctorAPI";
import { useWebSocket } from "../../hooks/useWebSocket";
import { FaCalendarAlt, FaClock, FaWifi, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo, useCallback } from "react";
import { formatTime } from "../../utils/timeUtils";

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
    const [slots, setSlots] = useState<string[]>([]);
    
    // Memoize the WebSocket parameters to prevent unnecessary reconnections
    const wsParams = useMemo(() => ({
        doctorId,
        appointmentDate: selectedDate
    }), [doctorId, selectedDate]);
    
    // Only make the API call when we have both doctorId and selectedDate
    const { data: availableSlots } = useAvailableTimeSlotsQuery(
        { doctorId: doctorId, date: selectedDate },
        { skip: !doctorId || !selectedDate }
    );

    // WebSocket for real-time updates
    const { isConnected, availableSlots: realtimeSlots, error: wsError } = useWebSocket({
        ...wsParams,
        onSlotUpdate: useCallback((newSlots: string[]) => {
            setSlots(newSlots);
            console.log('Real-time slot update received:', newSlots);
        }, [])
    });

    // Combine API data with real-time updates
    useEffect(() => {
        if (availableSlots) {
            setSlots(availableSlots);
        }
    }, [availableSlots]);

    // Use real-time slots if available, fallback to API slots
    const displaySlots = useMemo(() => {
        return realtimeSlots.length > 0 ? realtimeSlots : slots;
    }, [realtimeSlots, slots]);

   useEffect(() => {
    console.log('availableSlots', availableSlots);
   }, [availableSlots]);

   // Set the current time when available slots are loaded and current time is provided
   useEffect(() => {
    if (displaySlots && currentTime && displaySlots.includes(currentTime)) {
        setValue('time', currentTime);
    }
   }, [displaySlots, currentTime, setValue]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
            >
                <label htmlFor="appointmentDate" className="block text-gray-700 font-semibold mb-3 flex items-center gap-2">
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
                className="lg:col-span-3"
            >
                <label htmlFor="time" className="block text-gray-700 font-semibold mb-3 flex items-center gap-2">
                    <FaClock className="text-purple-500" />
                    Preferred Time
                    {/* Real-time connection indicator */}
                    <div className="flex items-center gap-1 ml-2">
                        {isConnected ? (
                            <FaWifi className="text-green-500 text-sm" title="Real-time updates active" />
                        ) : (
                            <FaTimes className="text-gray-400 text-sm" title="Real-time updates inactive" />
                        )}
                    </div>
                </label>
                
                {/* Real-time status message */}
                {isConnected && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-700 text-xs flex items-center gap-1">
                            <FaWifi className="text-green-500" />
                            Live updates active - slots update in real-time
                        </p>
                    </div>
                )}
                
                {wsError && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-700 text-xs">
                            Real-time updates unavailable - showing cached data
                        </p>
                    </div>
                )}

                {/* Interactive Time Slot Grid */}
                <div className="space-y-4">
                    {displaySlots && displaySlots.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6 border-2 border-gray-200 rounded-xl bg-gray-50 min-h-[200px]">
                            {displaySlots.map((slot: string) => {
                                const isSelected = watch('time') === slot;
                                return (
                                    <motion.button
                                        key={slot}
                                        type="button"
                                        onClick={() => setValue('time', slot)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`
                                            px-4 py-4 text-sm font-medium rounded-lg border-2 transition-all duration-200 min-h-[60px] flex items-center justify-center
                                            ${isSelected 
                                                ? 'bg-purple-600 text-white border-purple-600 shadow-lg transform scale-105' 
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400 hover:bg-purple-50 hover:shadow-md'
                                            }
                                        `}
                                    >
                                        {formatTime(slot)}
                                    </motion.button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 min-h-[200px]">
                            <FaClock className="text-gray-400 text-4xl mx-auto mb-4" />
                            <p className="text-gray-500 text-base">No available time slots for this date</p>
                            <p className="text-gray-400 text-sm mt-2">Try selecting a different date</p>
                        </div>
                    )}
                    
                    {/* Hidden input for form validation */}
                    <input
                        type="hidden"
                        {...register("time", { required: "Time is required" })}
                    />
                    
                    {/* Selected time display */}
                    {watch('time') && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl shadow-sm mt-4"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-700 text-sm font-medium mb-1">Selected Time</p>
                                    <p className="text-purple-800 text-xl font-bold">{formatTime(watch('time'))}</p>
                                </div>
                                <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                            </div>
                        </motion.div>
                    )}
                </div>
                
                {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
                )}
            </motion.div>
        </div>
    );
};

export default TimeDate;

