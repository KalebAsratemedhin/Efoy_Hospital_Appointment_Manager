const Booking = require("../models/bookingModel")

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
        const booking = await Booking.findById(id);

        return res.status(200).json(booking)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}
const createBooking = async (req, res) => {
    try {
        if( !req.body.doctorId | !req.body.appointmentDate){
            return res.status(400).send({
                message: "Missing fields!",
            });
        }
        const booking = await Booking.create({
            patientId: req.user.data._id,
            doctorId: req.body.doctorId,
            appointmentDate: req.body.appointmentDate,
            status: "pending" 
            
        });
        console.log(booking, 'created') 

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
    createBooking,
    updateBooking,
    deleteBooking
}