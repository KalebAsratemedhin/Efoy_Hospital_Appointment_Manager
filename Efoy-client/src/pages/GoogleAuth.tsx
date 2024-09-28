import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/slices/authSlice";


interface FormData{
  speciality?: string;
  orgID?: string;
  experience?: string;
  educationLevel?: string;
}

const GoogleAuth = () => {
  const [searchParams] = useSearchParams() 
  const navigate = useNavigate()
  const dispatch = useDispatch()

    
    useEffect(() => {
        const id = searchParams.get('id');
        const role = searchParams.get('role');

        if(id && role){
            dispatch(setAuth({id, role}))
            navigate('/dashboard')
        }



    }, [])


  return (
    <div className="flex justify-center py-10">

      <div className=" w-2/3 flex justify-center items-center  flex-col bg-white rounded-md ">
        <h1 className="text-2xl mt-12 text-gray-500">Error in google auth</h1>

        
      </div>
        


    </div>
  )
}

export default GoogleAuth



