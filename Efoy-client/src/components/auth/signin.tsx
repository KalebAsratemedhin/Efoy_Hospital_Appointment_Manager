import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";

interface FormData{
    username: string;
    password: string;
    role: string;
}

const Signin = () => {
    const {formState: {errors}, register} = useForm<FormData>();
    const handleSubmit = () => {

    }
    
  return (
    <div className="border shadow-lg bg-white  h-full p-4 flex flex-col justify-center items-center rounded-md">
        <h1 className="text-3xl text-blue-950 font-semibold ">Welcome back!</h1>
        <form noValidate className="mt-2  p-10">
        <div className="flex justify-center gap-8 mb-4 ">
                <div className="flex gap-2">
                    <label className="text-gray-700" htmlFor="role">Patient</label>
                    <input type="radio" className="" value={"patient"} {...register('role', {
                        required: true
                    })} />
                </div>

                <div className="flex gap-2">
                    <label className="text-gray-700" htmlFor="role">Doctor</label>
                    <input type="radio" className="" value={"doctor"} {...register('role', {
                        required: true
                    })} />
                </div>

                {errors.role && <p className="text-red-500 text-base">{errors.role.message}</p>}


            </div>
            <div>
                <label className="text-gray-500 text-base" htmlFor="username">Username</label>
                    <input className="block border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg h-12 px-2 w-full border my-4" id="username" type="text" {...register('username', {
                        required: "Username is required"
                    })} />
                
                <p className="text-red-500 text-base">{errors.username?.message}</p>
            </div>
            <div>
                <label className="text-gray-500 text-base" htmlFor="password">Password</label>
                    <input className="block border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg h-12 px-2 w-full border my-4" id="password" type="text" {...register('password', {
                        required: "Password is required",
                        
                    })} />
               
                <p className="text-red-500 text-base">{errors.password?.message}</p>
            </div>
            <button onClick={handleSubmit} className="w-full  bg-purple-700 text-lg font-semibold hover:shadow-md text-white py-2 rounded-full">Signin</button> 
              
             <p className="text-gray-400 mt-8">Don't have an account? <Link className="text-purple-500 hover:text-purple-800" to='/signup'>Signup</Link> </p>
             <p className="text-gray-400">By clicking 'Signin' you accept our terms or <span className="text-purple-400">privacy</span> and <span className="text-purple-400">security</span></p>

        </form>


    </div>
  )
}

export default Signin