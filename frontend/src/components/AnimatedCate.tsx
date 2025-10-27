import {  useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface TopCategoryCardProps {
  amount: number;
}

const TopCategoryCard = ({ amount }: TopCategoryCardProps) => {
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
      const controls = animate(count, amount, {
        duration: 2,
        ease: "easeOut",
      });

      return controls.stop;
    }, 1000);

    return randomAnimation.stop;
  }, [amount]);

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
          width="3.5rem"
          height="3.5rem"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 2C3.79086 2 2 3.79086 2 6V7C2 9.20914 3.79086 11 6 11H7C9.20914 11 11 9.20914 11 7V6C11 3.79086 9.20914 2 7 2H6ZM17 2C14.7909 2 13 3.79086 13 6V7C13 9.20914 14.7909 11 17 11H18C20.2091 11 22 9.20914 22 7V6C22 3.79086 20.2091 2 18 2H17ZM6 13C3.79086 13 2 14.7909 2 17V18C2 20.2091 3.79086 22 6 22H7C9.20914 22 11 20.2091 11 18V17C11 14.7909 9.20914 13 7 13H6ZM17 13C14.7909 13 13 14.7909 13 17V18C13 20.2091 14.7909 22 17 22H18C20.2091 22 22 20.2091 22 18V17C22 14.7909 20.2091 13 18 13H17Z"
              fill="#000000"
            />
          </g>
        </svg>
      </div>
      <div>
        <p className="text-gray-400 text-base">Top Category Expense</p>
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

export default TopCategoryCard;
