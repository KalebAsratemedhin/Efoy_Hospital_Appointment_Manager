import { useForm } from "react-hook-form";
import { useUpdateApplicationMutation } from "../../redux/api/applicationAPI";
import { DoctorApplication } from "../../types/DoctorApplication"
import TextField from "../utils/TextField";
import FormError from "../utils/FormError";
import FormSuccess from "../utils/FormSuccess";
import Spinner from "../utils/Spinner";
import DisabledTextField from "../utils/DisabledTextField";

interface FormData {
    experience: string;
    orgID: string;
    educationLevel: string;
    speciality: string;
}

const UpdateApplication = ({application}: {application: DoctorApplication}) => {
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
        defaultValues: {
            experience: application.experience,
            orgID: application.orgID,
            educationLevel: application.educationLevel,
            speciality: application.speciality
        }
    });

    const [updateApplication, {isLoading, isError, isSuccess, error}] = useUpdateApplicationMutation()


    const onSubmit = async (data: FormData) => {
        const updateData = {id: application._id!, update: data}
        console.log(updateData);
        await updateApplication(updateData)
    };

  return (
    <div className="mx-auto bg-white p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center ">
          <h1 className="text-2xl text-gray-900 font-normal">Your application </h1>
          <div className="space-y-2 md:col-span-2 w-full lg:w-2/3 xl:w-1/2">
            <TextField
              label="Speciality"
              id="speciality"
              type="text"
              register={register}
              validation={{ required: "Speciality is required" }}
              error={errors.speciality?.message}
            />

            <TextField
              label="Education Level"
              id="educationLevel"
              type="text"
              register={register}
              validation={{ required: "Education level is required" }}
              error={errors.educationLevel?.message}
            />

            <TextField
              label="Experience"
              id="experience"
              type="text"
              register={register}
              validation={{ required: "Experience is required" }}
              error={errors.experience?.message}
            />

            <TextField
              label="Organizational ID"
              id="orgID"
              type="text"
              register={register}
              validation={{ required: "Organizational ID is required" }}
              error={errors.orgID?.message}
            />

            <DisabledTextField 
              label="status"
              type='text'
              value={application.status}
            
            />

            <DisabledTextField 
              label="Applied At"
              type='text'
              value={new Date(application.appliedAt!).toDateString()}
            
            />

          </div>
          

          <div className="space-y-2 md:col-span-2 w-full lg:w-2/3 xl:w-1/2 ">
          {isError && <FormError error={error} />}
          {isLoading && <Spinner />}
          {isSuccess && <FormSuccess message={"Application has been updated."} />}
          
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
  )
}

export default UpdateApplication