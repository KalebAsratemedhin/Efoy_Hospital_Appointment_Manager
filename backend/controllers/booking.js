const Booking = require("../models/booking");
const Doctor = require("../models/doctor");
const {convertTo24HourFormat} = require("../utils/formatTime")
const generateTimeSlots = require("../utils/generateTimeSlots")

const findAllUserBookings = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;


        if(req.user.role == "patient"){
            const bookings = await Booking.find({patientId: req.user.id}).sort({
                appointmentDate: 1,
                time: 1,
              }).skip(skip)
                .limit(parseInt(limit))
                .populate('patientId')
                .populate('doctorId')
              
            
            const result = []


            for( booking of bookings){
                const doc = await Doctor.findOne({userId: booking.doctorId})
                result.push({...booking.toObject(), doctorData: doc})
            }

            const totalBookings = await Booking.countDocuments();


            return res.status(200).json({
                totalPages: Math.ceil(totalBookings / limit),
                currentPage: page,
                bookings: result,
            });




        } else if (req.user.role == "doctor"){
            const bookings = await Booking.find({doctorId: req.user.id}).sort({
                appointmentDate: 1,
                time: 1,
              }).skip(skip)
                .limit(parseInt(limit))
                .populate('patientId')
                .populate('doctorId')

            const result = []

            for( booking of bookings){
                const doc = await Doctor.findOne({userId: booking.doctorId})
                result.push({...booking.toObject(), doctorData: doc})
            }

            const totalBookings = await Booking.countDocuments();


            return res.status(200).json({
                totalPages: Math.ceil(totalBookings / limit),
                currentPage: page,
                bookings: result,
            });
            
        } else{
            throw Error("No such role")
        }
        

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const findRecentBooking = async (req, res) => {
    const query = req.user.role === "patient" ? { patientId: req.user.id } : { doctorId: req.user.id };
  
    const now = new Date();
  
    const [booking] = await Booking.find({
        ...query,
        $or: [
            { appointmentDate: { $gt: now } }, 
            { appointmentDate: now.toISOString().split('T')[0], time: { $gte: now.toTimeString().split(' ')[0] } } 
          ]
        })
      .sort({
        appointmentDate: 1,  
        time: 1 
      })
      .limit(1);
  
    res.status(200).json(booking);
  };
  

const findOneBooking = async (req, res) => {
    try {
        const {id} = req.params
        const booking = await Booking.findById(id).populate('patientId').populate('doctorId');;
        const doc = await Doctor.findOne({userId: booking.doctorId})
        return res.status(200).json({...booking.toObject(), doctorData: doc})

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const findAvailableTimeSlots = async (req, res) => {
    try {
        const { doctorId, date } = req.params;

        const start = "08:00";
        const end = "17:30";
        const interval = 20;


        const allSlots = generateTimeSlots(date, start, end, interval);

              
        const bookings = await Booking.find({doctorId, appointmentDate: date})

        const doctorBookedSlots = bookings.map(booking => booking.time)

        const availableSlots = allSlots.filter(slot => !doctorBookedSlots.includes(slot));


        res.json(availableSlots);
        
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}


const createBooking = async (req, res) => {
    try {
        const {doctorId, appointmentDate, time, reason} = req.body

        const existing = await Booking.find({doctorId, appointmentDate, time})

        if(existing && existing.length > 0){
            return res.status(402).json({message: "Time slot is unavailable."})
            
        }
        const booking = await Booking.create({
            patientId: req.user.id,
            doctorId: doctorId,
            appointmentDate: appointmentDate,
            time: convertTo24HourFormat(time),
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
        const { appointmentDate, time, reason } = req.body

        const result = await Booking.findByIdAndUpdate(id, {
            appointmentDate: appointmentDate,
            time: convertTo24HourFormat(time),
            reason: reason,
        });

        return res.status(201).json(result)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const deleteBooking = async (req, res) => {
    try {
        
        const {id} = req.params;
        const result = await Booking.findByIdAndDelete(id);


        if(!result){
            return res.status(404).json({message: "Not found"})
        }

        return res.status(204).json({message: "Sucessfully deleted."})

    } catch (error) {
        res.status(500).json({message: error.message})

    }

}

const doctorSummary = async(req, res) => {
    try {
        const {doctorId} = req.params

        const bookings = await Booking.find({doctorId})

        const data = Array(12).fill(0)

        for (const booking of bookings){

            const month = new Date(booking.appointmentDate).getMonth()
            data[month] += 1
        }

        res.status(200).json(data)


        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const patientSummary = async (req, res) => {
    try {
        const {patientId} = req.params

        const bookings = await Booking.find({patientId})

        const data = Array(12).fill(0)


        for (const booking of bookings){
            const month = new Date(booking.appointmentDate).getMonth()
            data[month] += 1
        }

        res.status(200).json(data)


        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    findAllUserBookings,
    findOneBooking,
    findRecentBooking,
    findAvailableTimeSlots,
    patientSummary,
    doctorSummary,
    createBooking,
    updateBooking,
    deleteBooking
}