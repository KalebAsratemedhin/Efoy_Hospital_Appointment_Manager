import { useFindCurrentUserFavoritesQuery } from "../../redux/api/ratingAPI"
import Spinner from "../utils/Spinner";
import DoctorCard from "../doctors/DoctorCard";
import Error from "../utils/Error";
import { faV } from "@fortawesome/free-solid-svg-icons";

const FavoritesList = () => {
    const {isLoading, isError, isSuccess, error, data} = useFindCurrentUserFavoritesQuery()

    if (isLoading ) return <Spinner />;
    if (isError ) return <Error error={error} />

    if (isSuccess){
        console.log("data favs", data)
        return (
            <div className="flex flex-wrap gap-4  p-8">
                {!data.length && <p>No favorites yet.</p> }
                {
                    data.map(fav => {
                        return <DoctorCard key={fav._id} doctor={fav}/>
                    })

                }
            </div>
        )
    }
}

export default FavoritesList