import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Timer2() {
  const { t } = useTranslation();
  const [endDate, setEndDate] = useState(getInitialEndDate());
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(getInitialEndDate()));

  function getInitialEndDate() {
    const now = new Date();
    const target = new Date("2025-06-14T12:00:00");

    return now >= target
      ? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      : target;
  }

  function getTimeLeft(targetDate) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTime = getTimeLeft(endDate);

      if (!updatedTime) {
        const newEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        setEndDate(newEnd);
        setTimeLeft(getTimeLeft(newEnd));
      } else {
        setTimeLeft(updatedTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  const format = (n) => (n < 10 ? `0${n}` : n);

  if (!timeLeft) return null;

  const timeUnits = [
    { label: t("flashSales.days"), value: timeLeft.days },
    { label: t("flashSales.hours"), value: timeLeft.hours },
    { label: t("flashSales.minutes"), value: timeLeft.minutes },
    { label: t("flashSales.seconds"), value: timeLeft.seconds },
    
  ];

  return (
    <div className="bg-black/70  rounded-xl px-6 py-4 w-fit mx-auto text-center shadow-md">
      <div className="text-white font-semibold text-sm mb-2 flex items-center justify-center gap-2">
        ⏰ <span>{t("musicOffer.limitedTimeOffer")}</span>
      </div>

      <div className="flex justify-center text-2xl sm:text-3xl font-bold text-green-400 space-x-3 sm:space-x-5">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center">
            <span>{format(unit.value)}</span>
            {index !== timeUnits.length - 1 && (
              <span className="text-white px-1">:</span>
            )}
          </div>
        ))}
      </div>

      <div className="text-gray-400 text-xs sm:text-sm mt-2">
        Days : Hours : Minutes : Seconds
      </div>
    </div>
  );
}

export default Timer2;
