import { useForm } from "react-hook-form";

interface FormData {
    experience: string;
    orgID: string;
    educationLevel: string;
    speciality: string;
    
  }

const DoctorApplication = () => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
        defaultValues: {

        }
    });

    const onSubmit = () => {

    }
  return (
    <div>
        <div className="mx-auto bg-white p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            <div className="space-y-2 md:col-span-2">
              <div>
                <label htmlFor="speciality" className="block text-custom-light-dark mb-2 text-base font-normal">Speciality</label>
                <input
                  id="speciality"
                  type="text"
                  {...register('speciality')}
                  className="w-full p-2 border border-custom-light-grey rounded-xl text-custom-light-purple text-base font-normal focus:outline-none focus:ring-2 focus:ring-custom-bright-purple focus:border-transparent"
                />
                {errors.speciality && <p className="text-red-500">{errors.speciality.message}</p>}
              </div>
    
              <div>
                <label htmlFor="educationLevel" className="block text-custom-light-dark mb-2 text-base font-normal">Education Level</label>
                <input
                  id="educationLevel"
                  type="educationLevel"
                  {...register('educationLevel')}
                  className="w-full p-2 border border-custom-light-grey rounded-xl text-custom-light-purple text-base font-normal focus:outline-none focus:ring-2 focus:ring-custom-bright-purple focus:border-transparent"
                />
                {errors.educationLevel && <p className="text-red-500">{errors.educationLevel.message}</p>}
              </div>
    
              <div>
                <label htmlFor="experience" className="block text-custom-light-dark mb-2 text-base font-normal">Experience</label>
                <input
                  id="experience"
                  type="text"
                  {...register('experience')}
                  className="w-full p-2 border border-custom-light-grey rounded-xl text-custom-light-purple text-base font-normal focus:outline-none focus:ring-2 focus:ring-custom-bright-purple focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="orgID" className="block text-custom-light-dark mb-2 text-base font-normal">Organizational ID</label>
                <input
                  id="orgID"
                  type="orgID"
                  {...register('orgID')}
                  className="w-full p-2 border border-custom-light-grey rounded-xl text-custom-light-purple text-base font-normal focus:outline-none focus:ring-2 focus:ring-custom-bright-purple focus:border-transparent"
                />
              </div>
            </div>
    
            <div className="space-y-2 md:col-span-2">
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
    </div>
  )
}

export default DoctorApplication