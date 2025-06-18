import { useFindCurrentUserFavoritesQuery } from "../../redux/api/ratingAPI"
import Spinner from "../utils/Spinner";

import Error from "../utils/Error";

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
                        // TODO: Fix doctor type mismatch
                        return <div key={fav.doctor.id}>Doctor: {fav.doctor.fullName}</div>
                    })

                }
            </div>
        )
    }
}

export default FavoritesList