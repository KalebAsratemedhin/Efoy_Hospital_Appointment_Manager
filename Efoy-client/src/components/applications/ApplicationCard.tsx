import { Link } from "react-router-dom";
import { DoctorApplicationPopulated } from "../../types/DoctorApplication"


const ApplicationCard = ({application}: {application: DoctorApplicationPopulated}) => {
  const user = application.userId
  const initials = user.fullName.split(' ').map((name) => name[0].toUpperCase()).join('');  
  let stats = <p className="bg-blue-100 px-4 text-blue-600 rounded-md border">Pending</p>;

  if (application.status === "rejected" ){
    stats = <p className="bg-red-100 px-4 text-red-600 rounded-md border">Rejected</p>

  } else if(application.status === 'approved'){
    stats = <p className="bg-green-100 px-4 text-green-600 rounded-md border">Approved</p>

  }

  return (

    <div className="flex bg-white rounded-md shadow-md mb-4">
          <div className="flex flex-col ">
            <div className="w-20 h-20 p-1 flex  justify-center items-center ">
              {user?.profilePic ? (
                <img src={user.profilePic} alt={user.fullName} className="rounded-full w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full flex justify-center items-center bg-gray-300 text-2xl font-semibold text-gray-700">
                  {initials}
                </div>
              )}
            </div>
          </div>

      
          <div className="flex flex-col justify-center py-4">
            <p>{user.fullName}</p>
            <p className="text-gray-500">{user.email}</p>
            <div className="flex gap-4 mt-4">
              <div className="">{ stats }</div>

              
              <Link className="border-purple-600 px-4 text-purple-600 rounded-md border hover:bg-purple-100" to={`/applications/${application._id}`}>More</Link>
            </div>

          </div>
    </div>
  )
}

export default ApplicationCard