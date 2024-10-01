const Booking = require("../models/booking")
const Doctor = require("../models/doctor");
const User = require("../models/user");




const findAllDoctors = async (req, res) => {
    try {

        console.log('query', req.query, )
        const { query } = req.query;
        const searchTerm = req.query?.search 

        if(!searchTerm){
            console.log('return all ', searchTerm)

            const doctors = await User.find({role: 'doctor'})
            const result = []

            for (doctor of doctors){
                const docData = await Doctor.findOne({userId: doctor._id})
                result.push({...doctor.toObject(), doctorData: docData})

            }

            return res.status(200).json(result)

        } else{
            console.log('searching', searchTerm)
            const doctors = await User.find({
                $or: [
                  { fullName: { $regex: searchTerm, $options: 'i' } },
                  { speciality: { $regex: searchTerm, $options: 'i' } },
                ],
                role: 'doctor'
              });

            

              const result = []

              for (doctor of doctors){
                  const docData = await Doctor.findOne({userId: doctor._id})
                  result.push({...doctor.toObject(), doctorData: docData})
  
              }
              console.log('searched', result)


            
              return res.status(200).json(result)
            
        }
        
     
    } catch (error) {
        res.status(500).send({message: error.message})
    
    }

}

const findOneDoctor = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id);

        const doctor = await Doctor.findOne({userId: id})

        return res.status(200).json({...user.toObject(), doctorData: doctor})

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}


// const searchDoctors = async (req, res) => {
//     try {
//         const searchTerm = req.query.search || ''
        
//         const doctors = await Doctor.find({
//             name: { $regex: searchTerm, $options: 'i' }, // Case-insensitive search
//         });
//         res.json(doctors);

//         const doctor = await Doctor.findOne({userId: id})

//         return res.status(200).json({...user.toObject(), doctorData: doctor})

//     } catch (error) {
//         res.status(500).send({message: error.message})

//     }

// }





const updateDoctor = async (req, res) => {
    try {
        const {id} = req.params
        if(req.user.id !== id){
            return res.status(401).json({message: 'Unauthorized.'})
        }

        const doc = await Doctor.findOneAndUpdate({user_id: id}, req.body);

        return res.status(200).json(doc)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}


module.exports = {
    findAllDoctors,
    findOneDoctor,
    updateDoctor

}