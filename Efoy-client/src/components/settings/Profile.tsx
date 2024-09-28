import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";

import { useGetCurrentUserQuery } from "../../redux/api/authAPI";
import { useEffect } from "react";
// import Error from "../utils/Error";

interface FormData {
    fullName: string;
    email: string;
    address: string;
    sex: string;
    age: number;
    password: string;
    profilePic: string;
  }

const Profile = () => {
    const {isSuccess, data: user} = useGetCurrentUserQuery()

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({

    });

    const onSubmit = () => {

    }

    useEffect(() => {
        if (user) {
          reset({
            fullName: user.fullName || '',
            email: user.email || '',
            sex: user.sex || '',
            age: user.age,
            address: user.address || '',
            profilePic: user.profilePic || ''
          });
        }
      }, [user, reset]);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            setValue("profilePic", base64String); 
          };
          reader.readAsDataURL(file); 
        }
      };

    const initials = user?.fullName.split(' ').map((name) => name[0].toUpperCase()).join('');  
  
    if(isSuccess)
        
    return (
        <div className="mx-auto bg-white p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="flex flex-col space-y-1 items-center">
              <div className="w-36 h-36 rounded-lg flex items-center justify-center relative">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profilePicture"
                  onChange={onFileChange}
                />
                <label htmlFor="profilePicture" className="cursor-pointer absolute right-3 bottom-3">
                  <FaCamera className="w-10 h-10 text-primary" />

                </label>
                <div className="flex justify-center items-center">
                  { user.profilePic &&
                    <img className="bg-yellow-50 w-36 h-36 rounded-full" src={user.profilePic} alt="profile" />
                  }
                  {user.fullName && !user.profilePic &&
                    <div className='w-28 h-28 text-3xl font-medium rounded-full bg-gray-300 flex justify-center items-center'>
                      <p>{initials}</p>
                    </div>  
                  }
                </div>
              </div>
            </div>
    
            <div className="space-y-2 md:col-span-2">
              <div>
                <label htmlFor="fullName" className="block text-custom-light-dark mb-2 text-base font-normal">Your Name</label>
                <input
                  id="fullName"
                  type="text"
                  {...register('fullName')}
                  className="w-full p-2 border border-custom-light-grey rounded-xl text-custom-light-purple text-base font-normal focus:outline-none focus:ring-2 focus:ring-custom-bright-purple focus:border-transparent"
                />
                {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
              </div>
    
              <div>
                <label htmlFor="email" className="block text-custom-light-dark mb-2 text-base font-normal">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full p-2 border border-custom-light-grey rounded-xl text-custom-light-purple text-base font-normal focus:outline-none focus:ring-2 focus:ring-custom-bright-purple focus:border-transparent"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
    
              <div>
                <label htmlFor="address" className="block text-custom-light-dark mb-2 text-base font-normal">Address</label>
                <input
                  id="address"
                  type="text"
                  {...register('address')}
                  className="w-full p-2 border border-custom-light-grey rounded-xl text-custom-light-purple text-base font-normal focus:outline-none focus:ring-2 focus:ring-custom-bright-purple focus:border-transparent"
                />
              </div>
    
              <div>
                <label htmlFor="sex" className="block text-custom-light-dark mb-2 text-base font-normal">Sex</label>
                <input
                  id="sex"
                  type="text"
                  {...register('sex')}
                  className="w-full p-2 border border-custom-light-grey rounded-xl text-custom-light-purple text-base font-normal focus:outline-none focus:ring-2 focus:ring-custom-bright-purple focus:border-transparent"
                />
              </div>
    
              <div>
                <label htmlFor="age" className="block text-custom-light-dark mb-2 text-base font-normal">Age</label>
                <input
                  id="age"
                  type="text"
                  {...register('age')}
                  className="w-full p-2 border border-custom-light-grey rounded-xl text-custom-light-purple text-base font-normal focus:outline-none focus:ring-2 focus:ring-custom-bright-purple focus:border-transparent"
                />
              </div>
            </div>
    
            <div className="space-y-2 md:col-span-2">
          
    
              <div>
                <label htmlFor="password" className="block text-custom-light-dark mb-2 text-base font-normal">Password</label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="w-full p-2 border border-custom-light-grey rounded-xl text-custom-light-purple text-base font-normal focus:outline-none focus:ring-2 focus:ring-custom-bright-purple focus:border-transparent"
                />
              </div>
    
            
    
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary w-full sm:w-2/4 text-white px-4 py-2 hover:shadow-md font-body font-medium text-md rounded-xl mt-6"
                >
                  Save
                </button>
              </div>
            </div>
            {/* {isUpdateError && <Alert type="error" message={errorUpdate.data.message} duration={2000} />}
            {isUpdateSuccess && <Alert type="success" message="Successfully updated! Refresh to see the changes." duration={2000} />} */}
    
          </form>
        </div>  
      );
}

export default Profile





  