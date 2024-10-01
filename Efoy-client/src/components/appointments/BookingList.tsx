import { useFindCurrentUserBookingsQuery } from "../../redux/api/bookingAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { CustomSerializedError } from "../../types/CustomSerializedError";
import BookingCardPatient from "./BookingCardPatient";
import { authSelector } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import BookingCardDoctor from "./BookingCardDoctor";
import Pagination from "../utils/Pagination";
import { useState } from "react";

const BookingList = () => {
  const authState = useSelector(authSelector)
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const {isSuccess, isError, isLoading, error, data, refetch} = useFindCurrentUserBookingsQuery({ page: currentPage, limit })


  if (isLoading ) return <Spinner />;
  if (isError ) return <Error error={error} />;

  if (isSuccess){
    const { bookings, totalPages } = data
  
    return (
      <div className="flex gap-2 flex-wrap p-2">
        { authState.role === "patient" && 
          bookings.map((booking) => {
            return <BookingCardPatient key={booking._id} booking={booking} refetch={refetch} />
          })
        }
        { authState.role === "doctor" && 
          bookings.map((booking) => {
            return <BookingCardDoctor key={booking._id} booking={booking} refetch={refetch} />
          })
        }

        {bookings.length > 0 ?  
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          /> :
          <h1 className="text-xl text-gray-500">No appointments yet.</h1>
        }
      </div>
    )
  }
}

export default BookingList