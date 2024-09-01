const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        patientId:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Patient",
            requried: true
        },
        doctorId:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Doctor",
            requried: true
        },
        appointmentDate:{
            type: Date,
            validate: {
                validator: (value) => {
                    return value >= Date.now();
                },
                message: props => `${props.value} is a passed date`

            },
            required: true
        },
        time: {
            type: String,
            requried: true,
        },
        reason: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            default: "pending"

        },
        
    },
    {
        timestamps: true
    }
)

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking