import { useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface AverageDailySpendCardProps {
  avgDaily: number;
}

const AverageDailySpendCard = ({ avgDaily }: AverageDailySpendCardProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(
    count,
    (latest) => Math.round(latest * 100) / 100
  );
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const randomAnimation = animate(count, Math.random() * 1000, {
      duration: 0.5,
      ease: "easeOut",
    });

    setTimeout(() => {
      const controls = animate(count, avgDaily, {
        duration: 2,
        ease: "easeOut",
      });

      return controls.stop;
    }, 2000);

    return randomAnimation.stop;
  }, [avgDaily]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return () => unsubscribe();
  }, [rounded]);

  return (
    <div className="bg-[#171717] border border-[#282828] rounded-2xl p-8 h-48 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <svg
          fill="#ffffff"
          viewBox="0 0 16 16"
          width="3.5rem"
          height="3.5rem"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M4,8.39l2,2.09L8.39,7.76l2.69,2.75,4.7-5.89L14.22,3.38l-3.3,4.11L8.29,4.81,6,7.52l-1.91-2L.29,9.29l1.42,1.42ZM0,12.3v1.4H16V12.3Z"></path>
          </g>
        </svg>
      </div>
      <div>
        <p className="text-gray-400 text-base">Average Daily Spend</p>
        <p className="text-4xl font-bold text-white tabular-nums">
          $
          {displayValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  );
};

export default AverageDailySpendCard;
