import { useFindCurrentUserBookingsQuery } from "../../redux/api/bookingAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { CustomSerializedError } from "../../types/CustomSerializedError";
import BookingCardPatient from "./BookingCardPatient";

const BookingList = () => {
  const {isSuccess, isError, isLoading, error, data, refetch} = useFindCurrentUserBookingsQuery()
  const customError = error as CustomSerializedError

  if (isLoading ) return <Spinner />;
  if (isError ) return <Error message={customError.data.message} />;

  if (isSuccess)
    return (
      <div className="flex gap-2 flex-wrap p-2">
        {
          data.map((booking) => {
            return <BookingCardPatient key={booking._id} booking={booking} refetch={refetch} />
          })
        }
          
      </div>
    )
}

export default BookingList