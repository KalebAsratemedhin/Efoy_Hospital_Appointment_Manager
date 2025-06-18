import { useForm } from "react-hook-form";
import { useAdminCreateDoctorMutation } from "../../redux/api/doctorAPI";
import { DoctorCreate } from "../../types/Doctor";
import Spinner from "../utils/Spinner";
import FormError from "../utils/FormError";
import FormSuccess from "../utils/FormSuccess";
// import { Link } from "react-router-dom";

const AdminCreateDoctor = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DoctorCreate>();
  const [createDoctor, { isLoading, isError, isSuccess, error }] = useAdminCreateDoctorMutation();

  const onSubmit = async (data: DoctorCreate) => {
    await createDoctor(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl relative mb-8">
        {/* <Link to="/dashboard" className="absolute left-0 top-0 text-cyan-600 hover:underline font-medium mb-4">← Back to Dashboard</Link> */}
        <h2 className="text-3xl font-bold mb-10 text-center">Create Doctor Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* User Info Section Card */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-cyan-700">User Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
                <input {...register("fullName", { required: "Full name is required" })} className="input w-full rounded-lg border border-cyan-300 focus:ring-blue-700 focus:border-blue-700 bg-cyan-50 px-4 py-3" placeholder="Full Name" />
                <p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Email</label>
                <input {...register("email", { required: "Email is required" })} className="input w-full rounded-lg border border-cyan-300 focus:ring-blue-700 focus:border-blue-700 bg-cyan-50 px-4 py-3" placeholder="Email" type="email" />
                <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Password</label>
                <input {...register("password", { required: "Password is required" })} className="input w-full rounded-lg border border-cyan-300 focus:ring-blue-700 focus:border-blue-700 bg-cyan-50 px-4 py-3" placeholder="Password" type="password" />
                <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Phone Number</label>
                <input {...register("phoneNumber")} className="input w-full rounded-lg border border-cyan-300 focus:ring-blue-700 focus:border-blue-700 bg-cyan-50 px-4 py-3" placeholder="Phone Number" />
              </div>
            </div>
          </section>

          {/* Doctor Info Section Card */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-cyan-700">Doctor Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Organization ID</label>
                <input {...register("orgID", { required: "Org ID is required" })} className="input w-full rounded-lg border border-cyan-300 focus:ring-blue-700 focus:border-blue-700 bg-cyan-50 px-4 py-3" placeholder="Organization ID" />
                <p className="text-red-500 text-sm mt-1">{errors.orgID?.message}</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Speciality</label>
                <input {...register("speciality", { required: "Speciality is required" })} className="input w-full rounded-lg border border-cyan-300 focus:ring-blue-700 focus:border-blue-700 bg-cyan-50 px-4 py-3" placeholder="Speciality" />
                <p className="text-red-500 text-sm mt-1">{errors.speciality?.message}</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Experience</label>
                <input {...register("experience", { required: "Experience is required" })} className="input w-full rounded-lg border border-cyan-300 focus:ring-blue-700 focus:border-blue-700 bg-cyan-50 px-4 py-3" placeholder="Experience" />
                <p className="text-red-500 text-sm mt-1">{errors.experience?.message}</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Education Level</label>
                <input {...register("educationLevel", { required: "Education Level is required" })} className="input w-full rounded-lg border border-cyan-300 focus:ring-blue-700 focus:border-blue-700 bg-cyan-50 px-4 py-3" placeholder="Education Level" />
                <p className="text-red-500 text-sm mt-1">{errors.educationLevel?.message}</p>
              </div>
            </div>
          </section>

          <button type="submit" className="btn btn-primary w-full mt-6 py-3 text-lg font-semibold rounded-lg shadow hover:bg-cyan-700 transition-colors duration-200" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Create Doctor"}
          </button>
          {isError && <FormError error={error} />}
          {isSuccess && <FormSuccess message="Doctor created successfully!" />}
        </form>
      </div>
    </div>
  );
};

export default AdminCreateDoctor;
