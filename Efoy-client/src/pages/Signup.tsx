import { Link } from "react-router-dom"
import Signup from "../components/auth/signup"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

import { IoArrowBackSharp } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";


const SignupPage = () => {
  const [role, setRole] = useState('patient')
  const [efoyAuth, setEfoyAuth] = useState(false)

  return (
    <div className="min-h-screen w-full  flex justify-center items-center bg-custom-background">
        {!efoyAuth && 
          <div className="border  shadow-lg bg-white  h-full sm:p-24 p-10 flex flex-col justify-center items-center rounded-md ">
            <h1 className="text-3xl text-blue-950 font-semibold mb-2">Welcome to Efoy! </h1>
          
            
            <div className="flex w-full justify-between mb-2  sm:px-20 sm:py-6">
              <div className="flex gap-2">
                  <label className="text-gray-500" htmlFor="role">Patient</label>
                  <input type="radio"  value={"patient"} onChange={() => setRole('patient')} name="role"   />
              </div>

              <div className="flex gap-2">
 
  

                  <label className="text-gray-500" htmlFor="role">Doctor</label>
                  <input type="radio" className="" value={"doctor"} onChange={() => setRole('doctor')} name="role"  />
              </div>
            </div>

          <div className=" py-5 w-full">
              <Link to={'http://localhost:5000/auth/google'} className="border p-4 sm:px-20 w-full flex justify-center items-center gap-2 rounded-md text-gray-600 hover:shadow-sm"> <FcGoogle className="w-8 h-8" /> Sign up with Google</Link>        
          </div>  
          <div className="flex justify-between items-center  w-full">
            <p className="bg-gray-400 h-[1px] w-1/3"></p>
            <p>or</p>
            <p className="bg-gray-400 h-[1px] w-1/3"></p>
          </div>
          <div onClick={() => setEfoyAuth(!efoyAuth)} className=" py-5 w-full">
              <p className="border sm:px-20 p-4 w-full flex justify-center items-center gap-2 rounded-md text-gray-600 hover:shadow-sm"> Sign up with Efoy</p>        
          </div> 

        </div>
        }
        {efoyAuth && <Signup role={role} />}
    </div>
  )
}

export default SignupPage