import { Doctor } from '../../types/User'

const Favorites = ({doctor}: {doctor: Doctor}) => {
  return (
    <div className='bg-white max-w-96 rounded-md shadow-sm flex gap-2 p-3'>
      <div className='bg-gray-400 rounded-full w-20 h-20'>
        <img src="#" alt="" />
      </div>
      <div>

        <h1>{doctor.fullName}</h1>
        <p >{doctor.doctorData.speciality}</p>
        <p>{doctor.doctorData.experience}</p>


      </div>
      
       
    </div>
  )
}

export default Favorites