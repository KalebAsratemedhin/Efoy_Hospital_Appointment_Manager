
const {formatTime} = require('./formatTime')

function generateTimeSlots(date, start, end, interval) {
    console.log("mello")
    const now = new Date()
    const currPref = date.split('T')[0]
    const startTime = new Date(`${currPref}T${start}:00`);
    const endTime = new Date(`${currPref}T${end}:00`);
    const slots = [];
  
    while (startTime <= endTime) {
      if (startTime > now){
        slots.push(formatTime(startTime));
      }
      startTime.setMinutes(startTime.getMinutes() + interval);
    }
    return slots;
  }

  module.exports = generateTimeSlots
