import { useFindCurrentUserBookingsQuery } from "../../redux/api/bookingAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { CustomSerializedError } from "../../types/CustomSerializedError";
import BookingCardPatient from "./BookingCardPatient";
import { authSelector } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import BookingCardDoctor from "./BookingCardDoctor";

const BookingList = () => {
  const {isSuccess, isError, isLoading, error, data, refetch} = useFindCurrentUserBookingsQuery()
  const authState = useSelector(authSelector)


  if (isLoading ) return <Spinner />;
  if (isError ) return <Error error={error} />;

  if (isSuccess)
    return (
      <div className="flex gap-2 flex-wrap p-2">
        { authState.role === "patient" && 
          data.map((booking) => {
            return <BookingCardPatient key={booking._id} booking={booking} refetch={refetch} />
          })
        }
        { authState.role === "doctor" && 
          data.map((booking) => {
            return <BookingCardDoctor key={booking._id} booking={booking} refetch={refetch} />
          })
        }
          
      </div>
    )
}

export default BookingList