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
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

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
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full w-[600px]">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
                >
                    {/* Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                            Welcome back!
                        </h1>
                        <p className="text-gray-600 text-lg">Sign in to your account</p>
                    </motion.div>
                    
                    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Google Sign In */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full"
                        >
                            <a 
                                href={`${backendUrl}/auth/google`} 
                                className="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-lg"
                            >
                                <FcGoogle className="w-6 h-6" />
                                <span>Continue with Google</span>
                            </a>
                        </motion.div>

                        {/* Divider */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className=" flex items-center justify-center my-8"
                        >
                            <div className="border-t border-gray-200 w-12"></div>
                            <span className="bg-white/80 backdrop-blur-xl px-1 py-2 text-gray-500 text-sm font-medium rounded-full">or continue with email</span>
                            <div className="border-t border-gray-200 w-12"></div>
                        </motion.div>

                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-center"
                            >
                                <Spinner />
                            </motion.div>
                        )}
                        {isError && <FormError error={error} />}

                        <div className="space-y-5">
                            {/* Email Field */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                                    Email address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input 
                                        className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg" 
                                        id="email" 
                                        type="email" 
                                        placeholder="Enter your email"
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
                                    <motion.p 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                                    >
                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                        {errors.email.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Password Field */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input 
                                        className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg" 
                                        id="password" 
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        {...register('password', {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            }
                                        })} 
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <motion.p 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                                    >
                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                        {errors.password.message}
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>

                        {/* Submit Button */}
                        <motion.button 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </motion.button>

                        {/* Footer Links */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="text-center space-y-4"
                        >
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                    Sign up
                                </Link>
                            </p>
                            <p className="text-xs text-gray-500">
                                By signing in, you agree to our{' '}
                                <Link to="/terms" className="text-blue-600 hover:text-blue-700 transition-colors">Terms of Service</Link>
                                {' '}and{' '}
                                <Link to="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors">Privacy Policy</Link>
                            </p>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default Signin
