import { useFindCurrentUserFavoritesQuery } from "../../redux/api/ratingAPI"
import Spinner from "../utils/Spinner";
import DoctorCard from "../doctors/DoctorCard";

const FavoritesList = () => {
    const {isLoading, isError, isSuccess, error, data} = useFindCurrentUserFavoritesQuery()

    if (isLoading ) return <Spinner />;
    if (isError ) return <h1>Error</h1>

    if (isSuccess){
        console.log("data favs", data)
        return (
            <div className="flex flex-wrap gap-4">
                {
                    data.map(rating => {
                        return <DoctorCard doctor={rating.doctorId}/>
                    })

                }
            </div>
        )
    }
}

export default FavoritesList