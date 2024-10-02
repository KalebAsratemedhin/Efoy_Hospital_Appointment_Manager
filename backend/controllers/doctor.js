const Booking = require("../models/booking")
const Doctor = require("../models/doctor");
const User = require("../models/user");


const findAllDoctors = async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;


        const searchTerm = req.query?.search 

        if(!searchTerm){

            const doctors = await User.find({role: 'doctor'}).skip(skip)
            .limit(parseInt(limit))
            const result = []

            for (doctor of doctors){
                const docData = await Doctor.findOne({userId: doctor._id})
                result.push({...doctor.toObject(), doctorData: docData})

            }

            const totalDoctors = await Doctor.countDocuments();
            return res.status(200).json({
                totalPages: Math.ceil(totalDoctors/ limit),
                currentPage: page,
                doctors: result,
            });


        } else{
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