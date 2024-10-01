import { useParams } from "react-router-dom"
import { useEvaluateApplicationMutation, useFindOneApplicationQuery } from "../../redux/api/applicationAPI"
import DisabledTextField from "../utils/DisabledTextField"
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import FormError from "../utils/FormError";
import FormSuccess from "../utils/FormSuccess";

const ApplicationDetails = () => {
  const {id} = useParams()
  const {isLoading, isSuccess, isError, error, data} = useFindOneApplicationQuery(id!)
  const [evaluate, {isLoading: isEvalLoading, isSuccess: isEvalSuccess, isError: isEvalError, error: evalError, data: evalData}] = useEvaluateApplicationMutation()

  const handleApprove = async () => {
    await evaluate({id: id!, update: {status: 'approved'}})
  }

  const handleReject = async () => {
    await evaluate({id: id!, update: {status: 'rejected'}})
  }

  const handleCancel = async () => {
    await evaluate({id: id!, update: {status: 'pending'}})
  }

  if (isLoading ) return <Spinner />;
  if (isError ) return <Error error={error} />;

  if (isSuccess){
    const user = data.userId

  return (
    <div className="flex flex-col gap-4">
        <div className="bg-white rounded-md p-4">
            <p>FullName: <span className="ml-1 text-gray-500">{user.fullName}</span></p>
            <p>Email: <span className="ml-1 text-gray-500">{user.email}</span> </p>
            <p>Phone Number: <span className="ml-1 text-gray-500">{user.phoneNumber}</span></p>

        </div>
        <div className="bg-white rounded-md p-4">
            <DisabledTextField
                label='Speciality'
                type='text'
                value={data.speciality}
            />
            
            <DisabledTextField
                label='Experience'
                type='text'
                value={data.experience}
            />
            <DisabledTextField
                label='Education Level'
                type='text'
                value={data.educationLevel}
            />
            <DisabledTextField
                label='OrgID'
                type='text'
                value={data.orgID}
            />
            <DisabledTextField
                label='Status'
                type='text'
                value={data.status}
            />

            {isEvalError && <FormError error={error} />}
            {isEvalLoading && <Spinner />}
            {isEvalSuccess && <FormSuccess message={"Application has been evaluated."} />}


            <div className="flex gap-4 mt-4">
              
              {data.status !== 'approved' && <button onClick={handleApprove} className="bg-green-100 px-4 text-green-600 rounded-md border ">Approve</button>}
              {data.status !== 'rejected' &&<button onClick={handleReject} className="bg-red-100 px-4 text-red-600 rounded-md border ">Reject</button>}
              {data.status !== 'pending' &&<button onClick={handleCancel} className="bg-gray-100 px-4 text-gray-600 rounded-md border ">Cancel</button>}

            </div>

            
        </div>

    </div>
  )}
}

export default ApplicationDetails