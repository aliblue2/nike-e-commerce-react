import { useEffect, useState } from "react";

const CountDown = ({ targetTime }) => {
  const goalTime = new Date(targetTime);
  const now = new Date();
  if (goalTime < now) {
    return <p className="font-medium text-white text-lg">پایان تخفیفات</p>;
  }
  const intialtime = goalTime.getTime() - now.getTime();

  const [remainingTime, setRemainingTime] = useState(intialtime);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((remTime) => remTime - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [intialtime]);

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return (
    <p className="flex items-center justify-center gap-[2px] text-white">
      <span className="bg-white text-blackColor font-medium rounded-full text-center w-7 h-7">
        {seconds}
      </span>{" "}
      :
      <span className="bg-white text-blackColor font-medium rounded-full text-center w-7 h-7">
        {minutes}
      </span>{" "}
      :
      <span className="bg-white text-blackColor font-medium rounded-full text-center w-7 h-7">
        {hours}
      </span>{" "}
      :
      <span className="bg-white text-blackColor font-medium rounded-full text-center w-7 h-7">
        {days}
      </span>
    </p>
  );
};

export default CountDown;
