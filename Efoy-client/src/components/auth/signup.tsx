import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/api/authAPI";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice";
import { SignupCredential } from "../../types/SignupCredential";
import { FcGoogle } from "react-icons/fc";

interface FormData{
    password: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    speciality?: string;
    orgID?: string;
    experience?: string;
    educationLevel?: string;
}

const Signup = () => {
    const {formState: {errors, isValid}, watch, register, handleSubmit} = useForm<FormData>({
        defaultValues: {
        },
        mode: 'onChange'
    });
    const [step, setStep] = useState(1)
    const [signupUser, {isError, isLoading, isSuccess, error, data: signupData}] = useSignupMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSubmit =  async (data: FormData) => {
        if (isValid){
            const result = await signupUser(data as SignupCredential)
            console.log('result signup', result)
        }

    
    }

    useEffect(() => {
        if(isSuccess){
            dispatch(setAuth({id: signupData._id, role: signupData.role} ))
            navigate('/dashboard')

        }

    }, [isSuccess])
    

    if(isLoading)
        return <Spinner />
    
    if (isError)
        return <Error error={error} />
        

    return (
      <div className="border shadow-lg bg-white  h-full p-4  flex flex-col justify-center items-center rounded-md ">
         <h1 className="text-3xl text-blue-950 font-semibold mb-2">Welcome to Efoy! </h1>
         <p className="text-3xl text-purple-500 font-semibold mt-5">Signup </p>

          <form noValidate onSubmit={handleSubmit(onSubmit)} className="p-10">
          <div className=" py-5 w-full">
              <Link to={'http://localhost:5000/auth/google'} className="border p-4 sm:px-20 w-full flex justify-center items-center gap-2 rounded-md text-gray-600 hover:shadow-sm"> <FcGoogle className="w-8 h-8" /> Sign up with Google</Link>        
          </div>  
          <div className="flex justify-between items-center  w-full">
            <p className="bg-gray-400 h-[1px] w-1/3"></p>
            <p>or</p>
            <p className="bg-gray-400 h-[1px] w-1/3"></p>
          </div>
            <div>
             <div className="w-full my-4">
                  <label className="text-gray-500" htmlFor="fullName">Fullname</label>
                      <input className="w-full block border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="fullName" type="text" {...register('fullName', {
                          required: "Fullname is required"
                      })} />
                  
                  <p className="text-red-500 text-base mt-1">{errors.fullName?.message}</p>
              </div>
             
              <div className="w-full my-4">
                  <label className="text-gray-500" htmlFor="password"> Password </label>
                      <input className="w-full block border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="password" type="password" {...register('password', {
                          required: "Password is required",  
                          validate: (value) => {
                            
                            if(value.length < 6)
                                return "Password should not be shorter than six characters."

                            return /[a-zA-Z]{1,}/.test(value) || 'Password must contain at least one letter'
                            
                            

                          }                      
                      })} />
                 
                  <p className="text-red-500 text-base mt-1">{errors.password?.message}</p>
              </div>
              <div className="w-full my-4">
                  <label className="text-gray-500" htmlFor="email">Email</label>
                      <input className="w-full block border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="email" type="text" {...register('email', {
                          required: "Email is required",
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Email should include letters and digits"
                          } 
                      })} />
                  
                  <p className="text-red-500 text-base mt-1">{errors.email?.message}</p>
              </div>
              <div className="w-full my-4">
                  <label className="text-gray-500" htmlFor="phoneNumber">Phone Number</label>
                      <input className="w-full block border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="phoneNumber" type="text" {...register('phoneNumber', {
                          required: "Phone Number is required",
                          
                      })} />
                  
                  <p className="text-red-500 text-base mt-1">{errors.phoneNumber?.message}</p>
              </div>
              
                <button type="submit"  className="w-full bg-purple-700 text-lg font-semibold hover:shadow-md text-white py-2 rounded-full">Signup</button>
              
             </div>

             <p className="text-gray-400 mt-8">Have an account? <Link className="text-purple-500 hover:text-purple-800" to='/signin'>Signin</Link> </p>
             <p className="text-gray-400">By clicking 'Signup' you accept our terms or <span className="text-purple-400">privacy</span> and <span className="text-purple-400">security</span></p>

          </form>
  
  
      </div>
    )
}

export default Signup