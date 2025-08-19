import { useForm } from "react-hook-form";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import { useEffect, useState } from "react";
import TextField from "../utils/TextField";
import FormError from "../utils/FormError";
import { useUpdateUserMutation } from "../../redux/api/userAPI";
import FormSuccess from "../utils/FormSuccess";
import ProfilePicture from "./ProfilePicture";
import DoctorProfileEdit from "./DoctorProfileEdit";
import { UserUpdate } from "../../types/User";
import { motion } from "framer-motion";
import { FaSave, FaUser, FaEnvelope, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake, FaPhone, FaUserMd } from "react-icons/fa";

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
  const [activeTab, setActiveTab] = useState<'personal' | 'professional'>('personal');

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
    <div className="max-w-6xl mx-auto">
      {/* Profile Picture Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
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

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('personal')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'personal'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <FaUser className="text-sm" />
                Personal Profile
              </div>
            </button>
            
            {user?.role === 'doctor' && (
              <button
                onClick={() => setActiveTab('professional')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'professional'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaUserMd className="text-sm" />
                  Professional Profile
                </div>
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'personal' ? (
          /* Personal Profile Tab */
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaUser className="text-2xl text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            </div>

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
          </div>
        ) : (
          /* Professional Profile Tab */
          <DoctorProfileEdit />
        )}
      </motion.div>
    </div>
  );
}

export default Profile;
