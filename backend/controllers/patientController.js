const Patient = require("../models/patientModel")


const findAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findMany({});

        return res.status(200).json(patients)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const findOnePatient = async (req, res) => {
    try {
        const {id} = req.params
        const patient = await Patient.findById(id);
        console.log("finding one", id, patient)

        return res.status(200).json(patient)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

module.exports = {
    findAllPatients,
    findOnePatient,

}