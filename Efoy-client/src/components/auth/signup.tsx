import { useState } from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";


interface FormData{
    username: string;
    password: string;
    fullName: string;
    email: string;
    role: string;
    phoneNumber: string;
    speciality?: string;
    orgID?: string;
    experience?: string;
    educationLevel?: string;
    gender: 'Male' | 'Female' | 'Other' | 'Rather not say'; 
    age: number;
    address: string;
}

const Signup = () => {
    const {formState: {errors}, watch, register} = useForm<FormData>();
    const [step, setStep] = useState(1)

    const handleSubmit = () => {

    } 

    return (
      <div className="border shadow-lg bg-white  h-full p-4 flex flex-col justify-center items-center rounded-md ">
         <h1 className="text-3xl text-blue-950 font-semibold mb-2">Welcome to Efoy! </h1>
         <p className="text-3xl text-purple-500 font-semibold ">Signup </p>
         
         
          <form noValidate className="mt-2  p-10">
            <div className="flex justify-between items-center">
                <div>
                    {step > 1 && <IoArrowBackSharp className="text-xl mb-4 hover:cursor-pointer" onClick={() => setStep(step - 1)} /> }
                </div>
                <p className="text-gray-500 text-lg text-center mb-4">Step {step} / 3</p>
                <div>
                    {step < 3 && <IoArrowForwardSharp className="text-xl mb-4 hover:cursor-pointer" onClick={() => setStep(step + 1)} /> }
                </div>
            </div>
             
             {step === 1 && <div>

                <div className="flex justify-center gap-8 mb-4 ">
                <div className="flex gap-2">
                    <label className="text-gray-500" htmlFor="role">Patient</label>
                    <input type="radio" className="" value={"patient"} {...register('role', {
                        required: true
                    })} />
                </div>

                <div className="flex gap-2">
                    <label className="text-gray-500" htmlFor="role">Doctor</label>
                    <input type="radio" className="" value={"doctor"} {...register('role', {
                        required: true
                    })} />
                </div>

                {errors.role && <p className="text-red-500 text-base">{errors.role.message}</p>}


            </div>

             <div className="w-full">
                  <label className="text-gray-500" htmlFor="fullName">Fullname</label>
                      <input className="w-full mt-2  block mb-3 border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="fullName" type="text" {...register('fullName', {
                          required: "Fullname is required"
                      })} />
                  
                  <p className="text-red-500 text-base">{errors.fullName?.message}</p>
              </div>
              <div className="w-full">
                  <label className="text-gray-500" htmlFor="username">Username</label>
                      <input className="w-full mt-2  block mb-3 border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="username" type="text" {...register('username', {
                          required: "Username is required",
                          pattern: {
                            value: /^[A-Za-z\d]{6} $/,
                            message: 'Username should have letters, digits and should be atleast six.'
                          }
                      })} />
                  
                  <p className="text-red-500 text-base">{errors.username?.message}</p>
              </div>
              <div className="w-full">
                  <label className="text-gray-500" htmlFor="password"> Password </label>
                      <input className="w-full mt-2  block mb-3 border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="password" type="password" {...register('password', {
                          required: "Password is required",
                          pattern: {
                              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                              message: "Password should include letters an digits"
                          },    
                          validate: (value) => value.length >= 6 || "Password should not be shorter than six characters."
                      
                      })} />
                 
                  <p className="text-red-500 text-base">{errors.password?.message}</p>
              </div>
              <button onClick={() => setStep(step + 1)} className="w-full bg-purple-700 text-lg font-semibold hover:shadow-md text-white py-2 rounded-full">Next</button>
             </div>}

             {step === 2 && <div>
                <div className="w-full">
                  <label className="text-gray-500" htmlFor="email">Email</label>
                      <input className="w-full mt-2  block mb-3 border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="email" type="text" {...register('email', {
                          required: "Email is required",
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Email should include letters and digits"
                          } 
                      })} />
                  
                  <p className="text-red-500 text-base">{errors.email?.message}</p>
              </div>
              <div className="w-full">
                  <label className="text-gray-500" htmlFor="phoneNumber">Phone Number</label>
                      <input className="w-full mt-2  block mb-3 border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="phoneNumber" type="text" {...register('phoneNumber', {
                          required: "Phone Number is required",
                          
                      })} />
                  
                  <p className="text-red-500 text-base">{errors.phoneNumber?.message}</p>
              </div>
              <div className="w-full">
                  <label className="text-gray-500" htmlFor="gender"> Gender </label>
                    <select className="block my-3 bg-slate-100  rounded-md p-3 focus:border-yellow-500 focus:ring-yellow-500 w-full focus:outline-none appearance-none " id="gender" {...register('gender')}>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                        <option value="Rather Not Say">Rather Not Say</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 12z" clipRule="evenodd" />
                        </svg>
                    </div>
              </div>
              <div className="w-full">
                  <label className="text-gray-500" htmlFor="age"> Age </label>
                      <input className="w-full mt-2  block mb-3 border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="age" type="text" {...register('age', {
                          required: "age is required",
                          
                      })} />
                 
                  <p className="text-red-500 text-base">{errors.age?.message}</p>
              </div>
              <div className="w-full">
                  <label className="text-gray-500" htmlFor="address"> Address </label>
                      <input className="w-full mt-2  block mb-3 border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="address" type="text" {...register('address', {
                          required: "Address is required",
                          
                      })} />
                 
                  <p className="text-red-500 text-base">{errors.address?.message}</p>
              </div>

              {watch('role') === "patient" ? 
              <button onClick={handleSubmit} className="w-full  bg-purple-700 text-lg font-semibold hover:shadow-md text-white py-2 rounded-full">Signup</button> 
                    :
              <button onClick={() => setStep(step + 1)} className="w-full bg-purple-700 text-lg font-semibold hover:shadow-md text-white py-2 rounded-full">Next</button>
                }
              
             </div> }

             {step === 3 && watch('role') === "doctor" && <div>
                <div className="w-full">
                  <label className="text-gray-500" htmlFor="speciality">Speciality</label>
                      <input className="w-full mt-2  block mb-3 border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="speciality" type="text" {...register('speciality', {
                          required: "Speciality is required"
                      })} />
                  
                  <p className="text-red-500 text-base">{errors.speciality?.message}</p>
              </div>
              <div className="w-full">
                  <label className="text-gray-500" htmlFor="orgID">Organization ID</label>
                      <input className="w-full mt-2  block mb-3 border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="orgID" type="text" {...register('orgID', {
                          required: "OrgID is required",
                          pattern: {
                            value: /^[A-Za-z\d]{6} $/,
                            message: 'OrgID should have letters, digits and should be atleast six.'
                          }
                      })} />
                  
                  <p className="text-red-500 text-base">{errors.orgID?.message}</p>
              </div>
              <div className="w-full">
                  <label className="text-gray-500" htmlFor="experience"> Experience </label>
                      <input className="w-full mt-2  block mb-3 border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="experience" type="text" {...register('experience', {
                          required: "Experience is required",
                          
                      })} />
                 
                  <p className="text-red-500 text-base">{errors.experience?.message}</p>
              </div>
              <div className="w-full">
                  <label className="text-gray-500" htmlFor="educationLevel"> EducationLevel </label>
                      <input className="w-full mt-2  block mb-3 border rounded-xl px-2 focus:outline-none focus:ring-purple-400 focus:ring-2 border-gray-300 h-12" id="educationLevel" type="text" {...register('educationLevel', {
                          required: "EducationLevel is required",
                          
                      })} />
                 
                  <p className="text-red-500 text-base">{errors.educationLevel?.message}</p>
              </div>
              <button onClick={handleSubmit} className="w-full  bg-purple-700 text-lg font-semibold hover:shadow-md text-white py-2 rounded-full">Signup</button> 
              

             </div> }

             <p className="text-gray-400 mt-8">Have an account? <Link className="text-purple-500 hover:text-purple-800" to='/signin'>Signin</Link> </p>
             <p className="text-gray-400">By clicking 'Signup' you accept our terms or <span className="text-purple-400">privacy</span> and <span className="text-purple-400">security</span></p>

          </form>
  
  
      </div>
    )
}

export default Signup