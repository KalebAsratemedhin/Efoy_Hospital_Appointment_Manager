import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../components/utils/Spinner";
import Error from "../components/utils/Error";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/slices/authSlice";
import { useUpdateCurrentUserMutation } from "../redux/api/authAPI"
import DoctorRegistrationInfo from "../components/auth/DoctorRegistrationInfo";
import { User } from "../types/User";


interface FormData{
  speciality?: string;
  orgID?: string;
  experience?: string;
  educationLevel?: string;
}

const GoogleAuth = () => {
  const [searchParams] = useSearchParams()

  const {formState: {errors, isValid}, watch, register, handleSubmit} = useForm<FormData>({
    mode: 'onChange'
  });
 
  const [updateUser, {isError, isLoading, isSuccess, error, data}] = useUpdateCurrentUserMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit =  async (data: FormData) => {
      if (isValid){
          const result = await updateUser(data as User)
          console.log('result signup', data)
      }

  
  } 
    
    useEffect(() => {
        const id = searchParams.get('id');
        const role = searchParams.get('role');

        if(id && role){
            dispatch(setAuth({id, role}))
            if(role === "patient")
              navigate('/dashboard')
        }

        if(isSuccess){
          navigate('/dashboard')

      }



    }, [])



  if(isLoading)
    return <Spinner />
  
  if (isError)
      return <Error error={error} />

  return (
    <div className="flex justify-center py-10">

      <div className=" w-2/3 flex justify-center items-center  flex-col bg-white rounded-md ">
        <h1 className="text-2xl mt-12 text-gray-500">Finish up your profile doctor.</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="p-10 ">
         
          <DoctorRegistrationInfo register={register} errors={errors} /> 
        </form>
      </div>
        


    </div>
  )
}

export default GoogleAuth



