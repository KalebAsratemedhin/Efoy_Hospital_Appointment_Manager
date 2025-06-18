import { useForm } from "react-hook-form";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import { useEffect } from "react";
import TextField from "../utils/TextField"; // Import the reusable TextField component
import FormError from "../utils/FormError";
import { useUpdateUserMutation } from "../../redux/api/userAPI";
import FormSuccess from "../utils/FormSuccess";
import ProfilePicture from "./ProfilePicture";
import { UserUpdate } from "../../types/User";

interface FormData {
  fullName: string;
  email: string;
  address: string;
  sex: string;
  age: number;
  phoneNumber: string;
}

const Profile = () => {
  const { isSuccess, data: user } = useGetCurrentUserQuery();
  const [updateUser, {isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess}] = useUpdateUserMutation()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    let update: UserUpdate = {fullName: data.fullName, phoneNumber: data.phoneNumber}
    if(data.address)
      update.address = data.address
  
    if (data.age)
      update.age = data.age
    
    if(data.sex)
      update.sex = data.sex as 'male' | 'female' | 'other'


    await updateUser({id: user?.id as string, update: update})

  };

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || '',
        email: user.email || '',
        sex: user.sex || '',
        age: user.age,
        phoneNumber: user.phoneNumber || '',
        address: user.address || ''
      });
    }
  }, [user, reset]);

 
 
  if (isSuccess) return (
    <div className="mx-auto bg-white p-10 grid lg:grid-cols-3">
      <ProfilePicture user={user} />  

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:col-span-2 lg:grid-cols-2 gap-8">

        
        <div className="space-y-2 md:col-span-1">
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

        <div className="space-y-2 md:col-span-1">
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
