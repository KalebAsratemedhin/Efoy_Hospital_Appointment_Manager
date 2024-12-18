const User = require("../models/user")
const Booking = require("../models/booking");
const Doctor = require("../models/doctor")

const getUser = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'doctor') {
            const doctor = await Doctor.findOne({ userId: user._id });
            return res.status(200).json({ ...user.toObject(), doctorData: doctor });
        }

        res.status(200).json(user.toObject());
    } catch (error) {
        res.status(500).json({ message: 'Server Error.' });
    }
};


const findAllUsers = async (req, res) => {
    try {
        const users = await User.findMany({});

        return res.status(200).json(users)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const findOneUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id);

        return res.status(200).json(user)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const updateUser = async (req, res) => {
    try {

        const {id} = req.params 

       
        if (id !== req.user.id){
            return res.status(401).json({message: 'Unauthorized.'})
        }

        const user = await User.findByIdAndUpdate(id, req.body);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully', user });

        
    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const updateProfilePicture = async (req, res) => {

      try {

        const photoPath = req.file.path
 
        if (!photoPath) {
        return res.error('Photo is required', 404);
        }

        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }


  
        user.profilePic = req.file.path;
        await user.save();
  
        res.status(200).json({ message: "Profile picture updated", user });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  }
  
const adminStats = async (req, res) => {
    try {

        const doctorsCount = await Doctor.countDocuments();
        const patientsCount = await User.find({role: 'patient'}).countDocuments();
        const appointmentsCount = await Booking.countDocuments();



        return res.status(200).json({doctorsCount, patientsCount, appointmentsCount})

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}



module.exports = {
    getUser,
    findAllUsers,
    findOneUser,
    updateUser,
    updateProfilePicture,
    adminStats
}