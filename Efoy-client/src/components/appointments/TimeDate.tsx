import { useFindAvailableTimeSlotsQuery } from "../../redux/api/bookingAPI";

interface TimeDateProps {
    register: any,
    errors: any, 
    watch: any, 
    setValue: any,
    doctorId: string

}

const TimeDate = ({register, errors, watch, doctorId}: TimeDateProps) => {
    const selectedDate = watch('appointmentDate')
    const { data: availableSlots } = useFindAvailableTimeSlotsQuery({ doctorId: doctorId, date: selectedDate });


    return (
        <div>
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
                    {watch('time')}
                    </option>
                    {availableSlots && availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                        {slot}
                    </option>
                    ))}
                </select>
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
            </div>
        </div>
    )
}

export default TimeDate

