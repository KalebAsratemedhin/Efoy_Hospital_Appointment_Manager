const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        patientId:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            requried: true
        },
        doctorId:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            requried: true
        },
        appointmentDate:{
            type: Date,
            validate: {
                validator: (value) => {
                    return value.toISOString().split('T')[0] >= new Date().toISOString().split('T')[0];
                },
                message: props => `${props.value} is a past date`

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