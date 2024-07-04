const passport = require('../strategies/jwt_strategy.js'); 
const authenticateToken = require('../middlewares/authenticateToken.js')
const Doctor = require('../models/doctorModel')
const Patient = require('../models/patientModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.jwt_secret;


const getUser = async(req, res) => {
    res.status(200).json(req.user)

} 



const signup = async (req, res) => {
    const {role, fullName, password, email, phoneNumber} = req.body;
    console.log(req.body)

        if (role == "patient"){
            const hashedPassword = await bcrypt.hash(password, 10);
            const [duplicate] = await Patient.find({email: email})
            if (duplicate){
                console.log(duplicate, "duplicate")
                return res.status(500).json({message: "Duplicate account found."})

            }
            const patient = await Patient.create({
                fullName: fullName,
                phoneNumber: phoneNumber,
                email: email,
                password: hashedPassword,

            });
            console.log(`patient ${patient}`)
            const payload = { id: patient._id , role: role};
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true, 
                maxAge: 3600000,  
            })
            res.status(201).json({id: patient._id, role: "patient"});

        } else if(role == "doctor"){
            const { speciality, experience} = req.body;
            const [duplicate] = await Doctor.find({email: email})
            if (duplicate){
                return res.status(500).json({message: "Duplicate account found."})
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const doctor = await Doctor.create({
                fullName: fullName,
                speciality: speciality,
                experience: experience,
                phoneNumber: phoneNumber,
                email: email,
                password: hashedPassword
            });
            console.log(`doctor ${doctor}`)
            const payload = { id: doctor._id , role: role};
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true, 
                maxAge: 3600000,  
            })
            res.status(201).json({id: doctor._id, role: "doctor"});
            
            
        } else{
            return res.status(400).json({message: "malformed input role."});
        } 

}
const login = async (req, res) => {
    try {
        const {role, email, password} = req.body;
        if (role == "patient"){
            const [patient] = await Patient.find({email: email});
            console.log(patient, "patient login")
            if(!patient){
                return res.status(404).json({message: "No such account"});

            } 
            bcrypt.compare(password, patient.password).then(isMatch => {
                if (isMatch) {
                  const payload = { id: patient._id , role: role};
                  const token = jwt.sign(payload, secret, { expiresIn: '2h' });
                  res.cookie('token', token, {
                    httpOnly: true, 
                    maxAge: 3600000, 
                    })
                    res.status(201).json({id: patient._id, role: "patient"});
                } else {
                  return res.status(400).json({ error: 'Incorrect password' });
                }
              });

        } else if(role == "doctor"){
            const [doctor] = await Doctor.find({email: email});
            console.log(doctor)
            if(!doctor){
                return res.status(404).json({message: "No such doctor"});

            }
            bcrypt.compare(password, doctor.password).then(isMatch => {
                if (isMatch) {
                  const payload = { id: doctor._id , role: role};
                  const token = jwt.sign(payload, secret, { expiresIn: '2h' });
                  res.cookie('token', token, {
                    httpOnly: true, 
                    maxAge: 3600000, 
                })
                res.status(201).json({id: doctor._id, role: "doctor"});
                } else {
                  return res.status(400).json({ error: 'Incorrect password' });
                }
              });


        } else{
            return res.status(404).json({message: "No such role"});
        }


    } catch (error) {
        res.status(500).send({message: error.message})

    }
    

}



const logout = async (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    })
    res
        .status(200)
        .json({ success: true, message: 'User logged out successfully' })
}

module.exports = {
    getUser,
    signup,
    login,
    logout
}