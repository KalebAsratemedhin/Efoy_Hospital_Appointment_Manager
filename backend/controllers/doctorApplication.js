const DoctorApplication = require('../models/doctorApplication');

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
        const applications = await DoctorApplication.find().populate('userId', 'email name');

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getOneApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;

        const application = await DoctorApplication.findById(applicationId).populate('userId', 'email name');

        if (!application) {
            return res.status(404).json({ message: 'Application not found.' });
        }

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
    getOneApplication
};
