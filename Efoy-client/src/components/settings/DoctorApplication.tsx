import { useFindMyApplicationQuery } from "../../redux/api/applicationAPI";
import Spinner from "../utils/Spinner";
import UpdateApplication from "./UpdateApplication";
import CreateApplication from "./CreateApplication";
import Error from '../utils/Error';


const DoctorApplication = () => {

  const {isLoading, isError, isSuccess, error, data} = useFindMyApplicationQuery()


  if (isLoading)
    return <Spinner />

  if (isError)
    return <Error error={error} />

  if (isSuccess){
    if (data){
      return <UpdateApplication application={data} />
    } else{
      return <CreateApplication />
    }
  }
  
};

export default DoctorApplication;
