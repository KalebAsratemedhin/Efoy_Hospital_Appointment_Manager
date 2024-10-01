
  
  // format time in 12-hour format with AM/PM
 function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = hours < 10 ? `0${hours}` : hours;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hoursStr}:${minutesStr} ${ampm}`;
  }

  function convertTo24HourFormat(time12h) {
    const [time, modifier] = time12h.split(' '); // Split time and AM/PM
    let [hours, minutes] = time.split(':'); // Split hours and minutes
  
    hours = parseInt(hours, 10); // Convert hours to integer
  
    // Handle PM modifier
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }
  
    // Handle 12 AM case (which is 00 in 24-hour format)
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
  
    // Convert hours and minutes to two-digit format if necessary
    const hoursStr = hours < 10 ? `0${hours}` : hours;
    const minutesStr = minutes.length === 1 ? `0${minutes}` : minutes;
  
    return `${hoursStr}:${minutesStr}`;
  }
  

module.exports = {
  formatTime,
  convertTo24HourFormat
}
