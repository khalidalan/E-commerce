import { useEffect, useState } from "react";
import Title from "./Title";

function Timer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const getNextEndDate = () => {
      const now = new Date();
      const next = new Date();
      next.setHours(12, 0, 0, 0);
      if (now >= next) {
        // لو عدينا 12 الظهر، خليها لبكرة
        next.setDate(next.getDate() + 1);
      }
      return next;
    };
  
    let endDate = getNextEndDate();
  
    const updateTimer = () => {
      const now = new Date();
      const diff = endDate - now;
  
      if (diff <= 0) {
        // تحديث التاريخ لليوم اللي بعده
        endDate = getNextEndDate();
      }
  
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
  
      setTimeLeft({ days, hours, minutes, seconds });
    };
  
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
  
    return () => clearInterval(interval);
  }, []);
  

  const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  return (
    <div className="flex gap-30 ">
      <Title title="Flash Sales" />
      <div className=" gap-4 hidden md:flex">
        <div className="flex flex-col items-start justify-center">
          <p className="text-xs font-medium">Days</p>
          <p className="text-3xl font-bold inter">
            {formatNumber(timeLeft.days)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
          <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-xs font-medium">Hours</p>
          <p className="text-3xl font-bold inter">
            {formatNumber(timeLeft.hours)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
          <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-xs font-medium">Minutes</p>
          <p className="text-3xl font-bold inter">
            {formatNumber(timeLeft.minutes)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
          <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-xs font-medium">Seconds</p>
          <p className="text-3xl font-bold inter">
            {formatNumber(timeLeft.seconds)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Timer;
