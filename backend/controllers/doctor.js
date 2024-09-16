const Booking = require("../models/booking")
const Doctor = require("../models/doctor")


const findAllDoctors = async (req, res) => {
    try {
        const { query } = req.query;

        if(!query){
            const doctors = await Doctor.find({});

            return res.status(200).json(doctors)

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
        const doctor = await Doctor.findById(id);

        return res.status(200).json(doctor)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}


module.exports = {
    findAllDoctors,
    findOneDoctor,

}