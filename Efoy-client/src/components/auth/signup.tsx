import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/api/authAPI";
import Spinner from "../utils/Spinner";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice";
import { SignupCredential } from "../../types/User";
import { FcGoogle } from "react-icons/fc";
import FormError from "../utils/FormError";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface FormData {
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
  const { formState: { errors, isValid }, register, handleSubmit } = useForm<FormData>({
    mode: 'onChange'
  });

  const [signupUser, { isError, isLoading, isSuccess, error, data: signupData }] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormData) => {
    if (isValid) {
      const result = await signupUser(data as SignupCredential);
      console.log('result signup', result);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('signup data', signupData)
      dispatch(setAuth(signupData));
      navigate('/dashboard');
    }
  }, [isSuccess]);

  if (isLoading) return <Spinner />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Efoy!</h1>
          <p className="text-gray-600">Create your account</p>
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

          {isError && <FormError error={error} />}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" 
                  id="fullName" 
                  type="text" 
                  {...register('fullName', {
                    required: "Full name is required"
                  })} 
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>

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
                    },
                    validate: (value: string) => {
                      if (!/[a-zA-Z]/.test(value)) {
                        return "Password must contain at least one letter";
                      }
                      return true;
                    }
                  })} 
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phoneNumber">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" 
                  id="phoneNumber" 
                  type="tel" 
                  {...register('phoneNumber', {
                    required: "Phone number is required"
                  })} 
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="w-full bg-cyan-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors"
          >
            Create Account
          </motion.button>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-cyan-600 hover:text-cyan-700">
                Sign in
              </Link>
            </p>
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-cyan-600 hover:text-cyan-700">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-cyan-600 hover:text-cyan-700">Privacy Policy</Link>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
