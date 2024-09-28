import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useSigninMutation } from "../../redux/api/authAPI";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { useEffect } from "react";
import { authSelector, setAuth } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import FormError from "../utils/FormError";


interface FormData{
    email: string;
    password: string;
    role: string;
}

const Signin = () => {
    const {formState: {errors}, watch, register, handleSubmit} = useForm<FormData>({
        defaultValues: {
            role: 'patient',
        },
        mode: 'onChange'
    });
    const [signinUser, {isError, isLoading, isSuccess, error, data}] = useSigninMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authState = useSelector(authSelector)
    const state = btoa(JSON.stringify({ role: watch('role') }))
    const onSubmit = async(data: FormData) => {

        const result = await signinUser(data)
        console.log('singin result', result)

    }

    useEffect(() => {
        if(isSuccess){
            dispatch(setAuth(data))

        }
        if(authState.id){
            console.log(authState.id, 'email')
            navigate('/dashboard')
        }

    }, [isSuccess, authState])

    
  return (
    <div className="border shadow-lg bg-white  h-full p-4 flex flex-col justify-center items-center rounded-md">
        <h1 className="text-3xl text-blue-950 font-semibold ">Welcome back!</h1>
        
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="  px-10 py-5">
            <div className="mt-4 py-3 w-full">
                <Link to={`http://localhost:5000/auth/google`} className="border p-2 w-full flex justify-center items-center gap-2 rounded-md text-gray-600 hover:shadow-sm"> <FcGoogle className="w-8 h-8" /> Sign in with Google</Link>        
            </div>  
            <div className="flex justify-between items-center my-8  w-full">
                <p className="bg-gray-400 h-[1px] w-1/3"></p>
                <p>or</p>
                <p className="bg-gray-400 h-[1px] w-1/3"></p>
            </div>  

            {isLoading && <Spinner />}
            {isError && <FormError error={error} />}

            <div className="my-3">
                <label className="text-gray-500 text-base" htmlFor="email">Email</label>
                    <input className="block border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg h-12 px-2 w-full border" id="email" type="text" {...register('email', {
                        required: "Email is required"
                    })} />
                
                <p className="text-red-500 text-base mt-1">{errors.email?.message}</p>
            </div>
            <div className="my-3">
                <label className="text-gray-500 text-base" htmlFor="password">Password</label>
                    <input className="block border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg h-12 px-2 w-full border" id="password" type="password" {...register('password', {
                        required: "Password is required",
                        
                    })} />
               
                <p className="text-red-500 text-base mt-1">{errors.password?.message}</p>
            </div>
            <button type="submit" className="w-full  bg-purple-700 text-lg font-semibold hover:shadow-md text-white py-2 rounded-full">Signin</button> 
              
             <p className="text-gray-400 mt-8">Don't have an account? <Link className="text-purple-500 hover:text-purple-800" to='/signup'>Signup</Link> </p>
             <p className="text-gray-400">By clicking 'Signin' you accept our terms or <span className="text-purple-400">privacy</span> and <span className="text-purple-400">security</span></p>

        </form>


    </div>
  )
}

export default Signin
