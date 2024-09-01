
const formatTime = require('./formatTime')

function generateTimeSlots(start, end, interval) {
    console.log("mello")
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const slots = [];
  
    while (startTime <= endTime) {
      slots.push(formatTime(startTime));
      startTime.setMinutes(startTime.getMinutes() + interval);
    }
    return slots;
  }

  module.exports = generateTimeSlots
