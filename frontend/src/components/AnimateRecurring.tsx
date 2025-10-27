import {  useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface RecurringExpensesCardProps {
  recurringTotal: number;
}

const RecurringExpensesCard = ({
  recurringTotal,
}: RecurringExpensesCardProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(
    count,
    (latest) => Math.round(latest * 100) / 100
  );
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const randomAnimation = animate(count, Math.random() * 1000, {
      duration: 1,
      ease: "easeOut",
    });

    setTimeout(() => {
      const controls = animate(count, recurringTotal, {
        duration: 2,
        ease: "easeOut",
      });

      return controls.stop;
    }, 1500);

    return randomAnimation.stop;
  }, [recurringTotal]);

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
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width="3.5rem"
          height="3.5rem"
          fill="#ffffff"
        >
          <g id="SVGRepo_bgCarrier"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M4.922 16.71l-.651.758a6.832 6.832 0 0 1-2.07-4.983A6.372 6.372 0 0 1 8.585 6h7.454L14.4 4.36l.706-.708L17.954 6.5l-2.848 2.848-.707-.707L16.04 7H8.586A5.386 5.386 0 0 0 3.2 12.5a5.92 5.92 0 0 0 1.722 4.21zm14.8-9.178l-.652.758a5.944 5.944 0 0 1 1.73 4.21 5.39 5.39 0 0 1-5.395 5.5H7.96l1.64-1.64-.706-.708L6.046 18.5l2.848 2.848.707-.707L7.96 19h7.445a6.376 6.376 0 0 0 6.395-6.486 6.857 6.857 0 0 0-2.079-4.982z"></path>
            <path fill="none" d="M0 0h24v24H0z"></path>
          </g>
        </svg>
      </div>
      <div>
        <p className="text-gray-400 text-base">Recurring Expenses</p>
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

export default RecurringExpensesCard;
