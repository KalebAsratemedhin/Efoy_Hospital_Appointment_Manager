import { useForm } from "react-hook-form"
import { useParams, useSearchParams } from "react-router-dom";

interface FormData{
    date: string;
    reason: string;
    doctorName: string;

}

const Booking = () => {
    const {doctorId} = useParams()
    const {formState: {errors}} = useForm<FormData>()
  return (
    <div>
        <form noValidate>
            <div>
                <label htmlFor="doctorName">Doctor</label>
                <input id="doctorName" type="text" />
                <p className="text-red-400">{errors.doctorName?.message}</p>
            </div>
            <div>
                <label htmlFor="date">Date</label>
                <input id="date" type="date" />
                <p className="text-red-400">{errors.date?.message}</p>
            </div>
            <div>
                <label htmlFor="reason">Reason</label>
                <input type="text" multiple={true} />
                <p className="text-red-400">{errors.date?.message}</p>
            </div>
        </form>

    </div>
  )
}

export default Booking