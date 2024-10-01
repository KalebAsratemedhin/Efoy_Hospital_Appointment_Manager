import { useFindAllApplicationsQuery } from "../../redux/api/applicationAPI"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import ApplicationCard from "./ApplicationCard";

const applicationList = () => {
    const {isLoading, isSuccess, isError, error, data} = useFindAllApplicationsQuery()

    if (isLoading ) return <Spinner />;
    if (isError ) return <Error error={error} />;

    if (isSuccess)
        return (
            <div className="p-6 ">
                <h1 className="text-gray-800 font-normal text-xl">Recent Applications</h1>
                {
                    data.map(application => {
                        return <ApplicationCard key={application._id} application={application} />
                    })

                }
            </div>
        )
}

export default applicationList