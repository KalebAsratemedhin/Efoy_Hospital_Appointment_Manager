import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/api/authAPI";
import Spinner from "../utils/Spinner";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice";
import { SignupCredential } from "../../types/User";
import { FcGoogle } from "react-icons/fc";
import TextField from "../utils/TextField"; 
import FormError from "../utils/FormError";

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
    <div className="border shadow-lg bg-white h-full p-4 flex flex-col justify-center items-center rounded-md">
      <h1 className="text-3xl text-blue-950 font-semibold mb-2">Welcome to Efoy!</h1>
      <p className="text-3xl text-purple-500 font-semibold mt-5">Signup</p>

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="p-10">
        <div className="py-5 w-full">
          <Link to={'http://localhost:5000/auth/google'} className="border p-4 sm:px-20 w-full flex justify-center items-center gap-2 rounded-md text-gray-600 hover:shadow-sm">
            <FcGoogle className="w-8 h-8" /> Sign up with Google
          </Link>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="bg-gray-400 h-[1px] w-1/3"></p>
          <p>or</p>
          <p className="bg-gray-400 h-[1px] w-1/3"></p>
        </div>
        {isError && <FormError error={error} />}


        <TextField
          label="Fullname"
          id="fullName"
          type="text"
          register={register}
          validation={{ required: "Fullname is required" }}
          error={errors.fullName?.message}
        />

        <TextField
          label="Password"
          id="password"
          type="password"
          register={register}
          validation={{
            required: "Password is required",
            validate: (value: string) => {
              if (value.length < 6) return "Password should not be shorter than six characters.";
              return /[a-zA-Z]{1,}/.test(value) || 'Password must contain at least one letter';
            }
          }}
          error={errors.password?.message}
        />

        <TextField
          label="Email"
          id="email"
          type="email"
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email should include letters and digits"
            }
          }}
          error={errors.email?.message}
        />

        <TextField
          label="Phone Number"
          id="phoneNumber"
          type="text"
          register={register}
          validation={{ required: "Phone Number is required" }}
          error={errors.phoneNumber?.message}
        />

        <button type="submit" className="w-full bg-purple-700 text-lg font-semibold hover:shadow-md text-white py-2 rounded-full">Signup</button>
      </form>

      <p className="text-gray-400 mt-8">Have an account? <Link className="text-purple-500 hover:text-purple-800" to='/signin'>Signin</Link></p>
      <p className="text-gray-400">By clicking 'Signup' you accept our terms or <span className="text-purple-400">privacy</span> and <span className="text-purple-400">security</span></p>
    </div>
  );
};

export default Signup;
