const passport = require('../strategies/jwt_strategy.js'); 
const authenticateToken = require('../middlewares/authenticateToken.js')
const Doctor = require('../models/doctor.js')
const User = require('../models/user.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
 

const getUser = async(req, res) => {
    try {
        const {id} = req.user

        const user = await User.findById(id)

        if (user.role === 'doctor') {
            const doctor = await Doctor.findOne({ user_id: user._id });
            return res.status(200).json({ ...user.toObject(), doctorData: doctor })

        }

        res.status(200).json(user.toObject())
        
    } catch (error) {
        res.status(500).json({message: "Server Error."})
    }
    
} 


const signup = async (req, res) => {
    try {
        const {role, fullName, password, email, phoneNumber} = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);
            const duplicate = await User.findOne({email: email})
            if (duplicate){
                console.log(duplicate, "duplicate")
                return res.status(500).json({message: "Duplicate account found."})

            }
            const user = await User.create({
                fullName: fullName,
                phoneNumber: phoneNumber,
                email: email,
                role: role,
                password: hashedPassword
            });

            if (role === "doctor"){
                const { speciality, experience, educationLevel, orgID} = req.body;
                const doctor = await Doctor.create({
                    user_id: user._id,
                    speciality: speciality,
                    orgID: orgID,
                    experience: experience,
                    educationLevel: educationLevel,
                  
                });

            }

            const payload = { id: user._id , role: role};
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true, 
                maxAge: 3600000,  
            })
            res.status(201).json({...user.toObject(), role: role});

                
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({message: "Server Error."})        
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message: "User not found."});

        } 

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user._id , role: user.role};
                const token = jwt.sign(payload, secret, { expiresIn: '2h' });
                res.cookie('token', token, {
                httpOnly: true, 
                maxAge: 3600000, 
                })
                res.status(201).json({id: user._id, role: role});
            } else {
                return res.status(400).json({ error: 'Incorrect password' });
            }
            });


    } catch (error) {
        res.status(500).send({message: error.message})

    }
    

}

const googleAuthSuccess = async (req, res) => {
    console.log("google auth success", req.user)


    const token = jwt.sign({ id: req.user._id, role: req.user.role}, process.env.JWT_SECRET, { expiresIn: '2h' });
 
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000});
    const redirectUrl = `http://localhost:3000/google-auth?id=${req.user._id}&role=${req.user.role}`;
 
    res.redirect(redirectUrl)
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


const updateUserProfile = async (req, res) => {

    try {
        const {id, role} = req.user

        const { fullName, email, phoneNumber, speciality, experience, educationLevel } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                fullName,
                email,
                phoneNumber,

            },
            { new: true }
        );
    
        
    
        if (!updatedUser ) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (role === "doctor"){
            const updatedDoctor = await Doctor.findOneAndUpdate(
                { user_id: doctorId },  
                {
                    speciality,
                    experience,
                    educationLevel
                },
                { new: true }
            );

            return res.status(200).json()
        }

        res.status(200).json({
            user: updatedUser,
            doctor: updatedDoctor
        });
        
        
    } catch (error) {
        console.log("error", error)
    }

}

module.exports = {
    getUser,
    signup,
    login,
    googleAuthSuccess,
    updateUserProfile,
    logout
} 