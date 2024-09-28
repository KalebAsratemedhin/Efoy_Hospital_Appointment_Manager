import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { useGetCurrentUserQuery } from "../../redux/api/authAPI";
import { useEffect } from "react";
import TextField from "../utils/TextField"; // Import the reusable TextField component
import FormError from "../utils/FormError";
import { useUpdateUserMutation } from "../../redux/api/userAPI";
import FormSuccess from "../utils/FormSuccess";

interface FormData {
  fullName: string;
  email: string;
  address: string;
  sex: string;
  age: number;
  phoneNumber: string;
  profilePic: string;
}

const Profile = () => {
  const { isSuccess, data: user } = useGetCurrentUserQuery();
  const [updateUser, {isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess, isLoading: isUpdateLoading, data}] = useUpdateUserMutation()
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Handle form submission logic here
    console.log("update", data)
    await updateUser({id: user?._id as string, update: data})

  };

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || '',
        email: user.email || '',
        sex: user.sex || '',
        age: user.age,
        phoneNumber: user.phoneNumber || '',
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
  
  if (isSuccess) return (
    <div className="mx-auto bg-white p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Profile Picture Upload Section */}
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
              {user.profilePic && (
                <img className="bg-yellow-50 w-36 h-36 rounded-full" src={user.profilePic} alt="profile" />
              )}
              {user.fullName && !user.profilePic && (
                <div className='w-28 h-28 text-3xl font-medium rounded-full bg-gray-300 flex justify-center items-center'>
                  <p>{initials}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        
        <div className="space-y-2 md:col-span-2">
        {isUpdateError && <FormError error={updateError} />}
        {isUpdateSuccess && <FormSuccess message={"Successfully updated."} />}


          <TextField
            label="Full Name"
            id="fullName"
            type="text"
            register={register}
            validation={{ required: "Fullname is required" }}
            error={errors.fullName?.message}
          />

          <TextField
            label="Email"
            id="email"
            type="email"
            register={register}
            validation={{ required: "Email is required" }}
            error={errors.email?.message}
            disabled={true}
          />
          
          <TextField
            label="Address"
            id="address"
            type="text"
            register={register}
            error={errors.address?.message}
          />

          <TextField
            label="Sex"
            id="sex"
            type="text"
            register={register}
            error={errors.sex?.message}
          />

          <TextField
            label="Age"
            id="age"
            type="number"
            register={register}
            error={errors.age?.message}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <TextField
            label="Phone number"
            id="phoneNumber"
            type="phoneNumber"
            register={register}
            error={errors.phoneNumber?.message}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary w-full sm:w-2/4 text-white px-4 py-2 hover:shadow-md font-body font-medium text-md rounded-xl mt-6"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
