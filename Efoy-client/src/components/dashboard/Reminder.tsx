
// const Reminder = () => {
//   return (
//     <div className="border-purple-300 rounded-md">

//     </div>
//   )
// }

// export default Reminder

import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const Countdown = () => {
  const curr: string = new Date().toISOString()
  const eventDate =   new Date('2024-08-29T15:01:26.409Z')
  const now = new Date()
  const calculateTimeLeft = () => {

    return  {
        'days': Math.floor(eventDate.getDay() - now.getDay()),
        'hours': Math.floor(eventDate.getHours() - now.getHours()),
        'minutes': Math.floor(60 - eventDate.getMinutes() - now.getMinutes()),
      };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
    <div key={interval} className="flex flex-col items-center">
      <div className="text-3xl font-semibold text-indigo-600">
        {value}
      </div>
      <div className="text-sm text-gray-600">{interval}</div>
    </div>
  ));

  return (
    <div className="bg-white  shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-2 text-indigo-600">
        <FaCalendarAlt className="h-6 w-6" />
        <h2 className="text-xl font-bold">Your next appointment</h2>
      </div>
      <div className="flex space-x-6">
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
      <div className="flex items-center space-x-2 text-gray-600">
        <FaClock className="h-5 w-5" />
        <p className="text-sm">
          Event Date: {eventDate.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Countdown;
