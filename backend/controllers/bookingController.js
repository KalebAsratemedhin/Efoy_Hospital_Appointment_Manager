const Booking = require("../models/bookingModel");
const formatTime = require("../utils/formatTime")
const generateTimeSlots = require("../utils/generateTimeSlots")

const findAllUserBookings = async (req, res) => {
    try {
        console.log("role", req.user)

        if(req.user.role == "patient"){
            const bookings = await Booking.find({patientId: req.user.data._id}).populate('patientId').populate('doctorId');
            console.log("bookings", bookings)
            return res.status(200).json(bookings)

        } else if (req.user.role == "doctor"){
            const bookings = await Booking.find({doctorId: req.user.data._id}).populate('patientId').populate('doctorId');
            return res.status(200).json(bookings)

        } else{
            throw Error("No such role")
            }
        

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const findOneBooking = async (req, res) => {
    try {
        const {id} = req.params
        const booking = await Booking.findById(id).populate('patientId').populate('doctorId');;

        return res.status(200).json(booking)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const findAvailableTimeSlots = async (req, res) => {
    try {
        console.log("hello", req.params)
        const { doctorId, date } = req.params;
        console.log("mello", doctorId, date)

        const start = "08:00";
        const end = "17:30";
        const interval = 20;

        console.log("h slots")

        const allSlots = generateTimeSlots(start, end, interval);
        console.log("h bookings", allSlots)

        const bookings = await Booking.find({doctorId, appointmentDate: date})

        const doctorBookedSlots = bookings.map(booking => booking.time)

        const availableSlots = allSlots.filter(slot => !doctorBookedSlots.includes(slot));
        console.log("available", allSlots)


        res.json(availableSlots);
        
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}


const createBooking = async (req, res) => {
    try {
        console.log("booking req body", req.body)
        const {doctorId, appointmentDate, time, reason} = req.body

        const existing = await Booking.find({doctorId, appointmentDate, time})

        if(existing && existing.length > 0){
            return res.status(402).json({message: "Time slot is unavailable."})
            
        }
        const booking = await Booking.create({
            patientId: req.user.data._id,
            doctorId: doctorId,
            appointmentDate: appointmentDate,
            time: time,
            reason: reason,
            status: "pending" 
            
        });

        return res.status(201).json(booking)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const updateBooking = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("hi", id, req.body)

        const result = await Booking.findByIdAndUpdate(id, req.body);
        console.log('res', result)

        return res.status(201).json(result)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const deleteBooking = async (req, res) => {
    try {
        
        const {id} = req.params;
        console.log("hi del", id, req.body)
        const result = await Booking.findByIdAndDelete(id);
        console.log('res del', result)


        if(!result){
            return res.status(404).json({message: "Not found"})
        }
        console.log('res del past', result)

        return res.status(204).json({message: "Sucessfully deleted."})

    } catch (error) {
        res.status(500).json({message: error.message})

    }

}

module.exports = {
    findAllUserBookings,
    findOneBooking,
    findAvailableTimeSlots,
    createBooking,
    updateBooking,
    deleteBooking
}