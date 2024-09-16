const Booking = require("../models/booking")
const Doctor = require("../models/doctor");
const User = require("../models/user");


const findAllDoctors = async (req, res) => {
    try {
        const { query } = req.query;

        if(!query){
            const doctors = await User.find({role: 'doctor'})
            const result = []

            for (doctor of doctors){
                const docData = await Doctor.findOne({user_id: doctor._id})
                result.push({...doctor.toObject(), doctorData: docData})

            }

            return res.status(200).json(result)

        } else{
            const doctors = await Doctor.find({
                $or: [
                  { fullName: { $regex: query, $options: 'i' } },
                  { speciality: { $regex: query, $options: 'i' } },
                ],
              });

            
              return res.status(200).json(doctors)
            
        }
        
     
    } catch (error) {
        res.status(500).send({message: error.message})
    
    }

}

const findOneDoctor = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id);

        const doctor = await Doctor.findOne({user_id: id})

        return res.status(200).json({...user.toObject(), doctorData: doctor})

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}


module.exports = {
    findAllDoctors,
    findOneDoctor,

}