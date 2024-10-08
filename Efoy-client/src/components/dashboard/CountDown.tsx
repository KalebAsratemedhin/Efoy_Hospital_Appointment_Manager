import { useState, useEffect } from 'react';
import {  FaClock } from 'react-icons/fa';

const CountDown = ({eventDate}: {eventDate: Date}) => {
    const now = new Date()
    const calculateTimeLeft = () => {
        const diffInMilliseconds: number = eventDate.getTime() - now.getTime();

        let remaining = {
            'days': Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)),
            'hours': Math.floor(diffInMilliseconds / (1000 * 60 * 60 )) % 24,
            'minutes': Math.floor(diffInMilliseconds / (1000 * 60 )) % 60,
            'seconds': Math.floor(diffInMilliseconds / (1000)) % 60,

          };


        return  remaining
      };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    

    useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
    
        return () => clearInterval(timer);
      }, [now]);
    
      const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="flex flex-col items-center">
          <div className="text-3xl font-semibold text-indigo-600">
            {value}
          </div>
          <div className="text-sm text-gray-600">{interval}</div>
        </div>
      ));
    
      return (
        <div className="p-6 flex flex-col items-center space-y-4">
          
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
}

export default CountDown