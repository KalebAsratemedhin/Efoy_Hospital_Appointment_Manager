import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useSigninMutation } from "../../redux/api/authAPI";
import Spinner from "../utils/Spinner";
import { useEffect } from "react";
import { authSelector, setAuth } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import FormError from "../utils/FormError";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope } from "react-icons/fa";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface FormData {
    email: string;
    password: string;
    role: string;
}

const Signin = () => {
    const {formState: {errors}, register, handleSubmit} = useForm<FormData>({
        defaultValues: {
            role: 'patient',
        },
        mode: 'onChange'
    });
    const [signinUser, {isError, isLoading, isSuccess, error, data}] = useSigninMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authState = useSelector(authSelector)

    const onSubmit = async(data: FormData) => {
        const result = await signinUser(data)
        console.log('singin result', result)
    }

    useEffect(() => {
        if(isSuccess){
            console.log('just success', authState, data)
            dispatch(setAuth(data))
        }
        if(authState.id){
            console.log(authState.id, 'email', authState.role)
            navigate('/dashboard')
        }
    }, [isSuccess, authState])

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
        >
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>
                
                <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="w-full"
                    >
                        <Link 
                            to={`${backendUrl}/auth/google`} 
                            className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <FcGoogle className="w-6 h-6" />
                            <span className="font-medium">Continue with Google</span>
                        </Link>
                    </motion.div>

                    <div className="relative flex items-center justify-center my-6">
                        <div className="border-t border-gray-300 w-full"></div>
                        <span className="bg-white px-4 text-gray-500 text-sm">or continue with email</span>
                        <div className="border-t border-gray-300 w-full"></div>
                    </div>

                    {isLoading && <Spinner />}
                    {isError && <FormError error={error} />}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                <input 
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" 
                                    id="email" 
                                    type="email" 
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })} 
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input 
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" 
                                    id="password" 
                                    type="password" 
                                    {...register('password', {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })} 
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="w-full bg-cyan-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors"
                    >
                        Sign in
                    </motion.button>

                    <div className="text-center space-y-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-cyan-600 hover:text-cyan-700">
                                Sign up
                            </Link>
                        </p>
                        <p className="text-xs text-gray-500">
                            By signing in, you agree to our{' '}
                            <Link to="/terms" className="text-cyan-600 hover:text-cyan-700">Terms of Service</Link>
                            {' '}and{' '}
                            <Link to="/privacy" className="text-cyan-600 hover:text-cyan-700">Privacy Policy</Link>
                        </p>
                    </div>
                </form>
            </div>
        </motion.div>
    )
}

export default Signin
