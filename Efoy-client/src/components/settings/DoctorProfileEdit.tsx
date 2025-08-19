import { useForm } from "react-hook-form";
import { useGetCurrentUserQuery } from "../../redux/api/userAPI";
import { useGetDoctorByUserIdQuery } from "../../redux/api/doctorAPI";
import { useUpdateDoctorMutation } from "../../redux/api/doctorAPI";
import { useEffect, useState } from "react";
import TextField from "../utils/TextField";
import FormError from "../utils/FormError";
import FormSuccess from "../utils/FormSuccess";
import { motion } from "framer-motion";
import { FaSave, FaClock, FaMoneyBillWave, FaUserMd, FaGraduationCap, FaBriefcase } from "react-icons/fa";

interface WorkingHours {
  start: string;
  end: string;
}

interface WorkingHoursForm {
  [key: string]: WorkingHours;
}

interface DoctorProfileForm {
  speciality: string;
  experience: string;
  educationLevel: string;
  sessionPrice: number;
  workingHours: WorkingHoursForm;
}

const DoctorProfileEdit = () => {
  const { data: user } = useGetCurrentUserQuery();
  const { data: doctorData, isLoading: isDoctorLoading } = useGetDoctorByUserIdQuery(
    user?.id as string,
    { skip: !user?.id }
  );
  
  const [updateDoctor, { isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess }] = useUpdateDoctorMutation();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DoctorProfileForm>();
  
  const [workingHours, setWorkingHours] = useState<WorkingHoursForm>({
    monday: { start: "08:00", end: "17:00" },
    tuesday: { start: "08:00", end: "17:00" },
    wednesday: { start: "08:00", end: "17:00" },
    thursday: { start: "08:00", end: "17:00" },
    friday: { start: "08:00", end: "17:00" },
    saturday: { start: "08:00", end: "17:00" },
    sunday: { start: "08:00", end: "17:00" }
  });

  // Initialize form with existing data
  useEffect(() => {
    if (doctorData) {
      reset({
        speciality: doctorData.speciality || '',
        experience: doctorData.experience || '',
        educationLevel: doctorData.educationLevel || '',
        sessionPrice: doctorData.sessionPrice || 150,
        workingHours: doctorData.workingHours || workingHours
      });
      
      if (doctorData.workingHours) {
        setWorkingHours(doctorData.workingHours);
      }
    }
  }, [doctorData, reset]);

  const handleWorkingHourChange = (day: string, field: 'start' | 'end', value: string) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const onSubmit = async (data: DoctorProfileForm) => {
    if (!doctorData?.id) return;

    const updateData = {
      speciality: data.speciality,
      experience: data.experience,
      educationLevel: data.educationLevel,
      sessionPrice: data.sessionPrice,
      workingHours: workingHours
    };

    await updateDoctor({ id: doctorData.id, update: updateData });
  };

  if (isDoctorLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!doctorData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Doctor profile not found.</p>
      </div>
    );
  }

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <FaUserMd className="text-2xl text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">Professional Profile</h2>
      </div>

      {isUpdateError && <FormError error={updateError} />}
      {isUpdateSuccess && <FormSuccess message="Professional profile updated successfully!" />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Professional Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaUserMd className="text-purple-600" />
                Speciality
              </label>
              <TextField
                label=""
                id="speciality"
                type="text"
                register={register}
                validation={{ required: "Speciality is required" }}
                error={errors.speciality?.message}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaBriefcase className="text-purple-600" />
                Years of Experience
              </label>
              <TextField
                label=""
                id="experience"
                type="text"
                register={register}
                validation={{ required: "Experience is required" }}
                error={errors.experience?.message}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaGraduationCap className="text-purple-600" />
                Education Level
              </label>
              <TextField
                label=""
                id="educationLevel"
                type="text"
                register={register}
                validation={{ required: "Education level is required" }}
                error={errors.educationLevel?.message}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaMoneyBillWave className="text-purple-600" />
                Session Price (ETB)
              </label>
              <TextField
                label=""
                id="sessionPrice"
                type="number"
                register={register}
                validation={{ 
                  required: "Session price is required",
                  min: { value: 0, message: "Price cannot be negative" }
                }}
                error={errors.sessionPrice?.message}
              />
              <p className="text-xs text-gray-500">Price per 20-minute session</p>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
            <FaClock className="text-purple-600" />
            Working Hours
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {days.map(({ key, label }) => (
              <div key={key} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                  {label}
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-2 font-medium">Start Time</label>
                    <input
                      type="time"
                      value={workingHours[key]?.start || "08:00"}
                      onChange={(e) => handleWorkingHourChange(key, 'start', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-medium bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-2 font-medium">End Time</label>
                    <input
                      type="time"
                      value={workingHours[key]?.end || "17:00"}
                      onChange={(e) => handleWorkingHourChange(key, 'end', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-medium bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-100">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2"
          >
            <FaSave className="text-sm" />
            Save Professional Profile
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default DoctorProfileEdit; 