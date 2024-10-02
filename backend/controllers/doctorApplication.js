const DoctorApplication = require('../models/doctorApplication');
const Doctor = require('../models/doctor');
const User = require('../models/user');


const createApplication = async (req, res) => {
    try {
        const { speciality, experience, educationLevel, orgID } = req.body;
        const userId = req.user.id;  

        const existingApplication = await DoctorApplication.findOne({ userId });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for the doctor role.' });
        }

        const application = new DoctorApplication({
            userId,
            speciality,
            experience,
            orgID,
            educationLevel
        });

        await application.save();
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const updateApplication = async (req, res) => {
    try {
        const userId = req.user.id;
        const { speciality, experience, educationLevel, orgID } = req.body;

        const application = await DoctorApplication.findOneAndUpdate(
            { userId },
            { speciality, experience, educationLevel, orgID },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: 'Application not found.' });
        }

        res.status(200).json({ message: 'Application updated successfully', application });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const evaluateApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        const application = await DoctorApplication.findByIdAndUpdate(
            applicationId,
            { status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: 'Application not found.' });
        }

        if(status === 'approved'){
            const duplicate = await Doctor.findOne({userId: application.userId})

            const doctor = await Doctor.create({
                speciality: application.speciality,
                experience: application.experience,
                educationLevel: application.educationLevel,
                orgID: application.orgID,
                userId: application.userId

            })

            const user = await User.findOneAndUpdate({_id: application.userId}, {role: 'doctor'}, 
                { new: true })
        }

        if(status === 'rejected' || status === 'pending'){
            const doctor = await Doctor.findOneAndDelete({userId: application.userId})
            const user = await User.findOneAndUpdate({_id: application.userId}, {role: 'patient'}, 
                { new: true })
            
        }

        res.status(200).json({ message: `Application ${status} successfully`, application });
    
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteApplication = async (req, res) => {
    try {
        const userId = req.user.id;

        const application = await DoctorApplication.findOneAndDelete({ userId });

        if (!application) {
            return res.status(404).json({ message: 'Application not found.' });
        }

        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getAllApplications = async (req, res) => {
    try {
        const applications = await DoctorApplication.find().populate('userId');

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getMyApplication = async (req, res) => {
    try {
        const userId = req.user.id

        const application = await DoctorApplication.findOne({userId: userId});

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getOneApplication = async (req, res) => {
    try {
        const {applicationId} = req.params

        const application = await DoctorApplication.findById(applicationId).populate('userId');

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
module.exports = {
    createApplication,
    updateApplication,
    evaluateApplication,
    deleteApplication,
    getAllApplications,
    getOneApplication,
    getMyApplication

};
