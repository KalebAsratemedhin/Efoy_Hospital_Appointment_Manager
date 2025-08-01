import { useForm } from "react-hook-form";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import { useEffect } from "react";
import TextField from "../utils/TextField";
import FormError from "../utils/FormError";
import { useUpdateUserMutation } from "../../redux/api/userAPI";
import FormSuccess from "../utils/FormSuccess";
import ProfilePicture from "./ProfilePicture";
import { UserUpdate } from "../../types/User";
import { motion } from "framer-motion";
import { FaSave, FaUser, FaEnvelope, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake, FaPhone } from "react-icons/fa";

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
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Profile Picture Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-1"
      >
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <ProfilePicture user={user} />
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{user?.fullName}</h3>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}</p>
          </div>
        </div>
      </motion.div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-2"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {isUpdateError && <FormError error={updateError} />}
          {isUpdateSuccess && <FormSuccess message={"Profile updated successfully!"} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaUser className="text-blue-600" />
                Full Name
              </label>
              <TextField
                label=""
                id="fullName"
                type="text"
                register={register}
                validation={{ required: "Full name is required" }}
                error={errors.fullName?.message}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaEnvelope className="text-blue-600" />
                Email Address
              </label>
              <TextField
                label=""
                id="email"
                type="email"
                register={register}
                validation={{ required: "Email is required" }}
                error={errors.email?.message}
                disabled={true}
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaMapMarkerAlt className="text-blue-600" />
                Address
              </label>
              <TextField
                label=""
                id="address"
                type="text"
                register={register}
                error={errors.address?.message}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaPhone className="text-blue-600" />
                Phone Number
              </label>
              <TextField
                label=""
                id="phoneNumber"
                type="tel"
                register={register}
                error={errors.phoneNumber?.message}
              />
            </div>

            {/* Sex */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaVenusMars className="text-blue-600" />
                Gender
              </label>
              <select
                {...register('sex')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaBirthdayCake className="text-blue-600" />
                Age
              </label>
              <TextField
                label=""
                id="age"
                type="number"
                register={register}
                error={errors.age?.message}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2"
            >
              <FaSave className="text-sm" />
              Save Changes
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Profile;
