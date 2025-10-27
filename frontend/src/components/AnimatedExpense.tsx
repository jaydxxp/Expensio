import {  useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface ExpenseCardProps {
  totalExpenses: number;
}

const ExpenseCard = ({ totalExpenses }: ExpenseCardProps) => {
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
      const controls = animate(count, totalExpenses, {
        duration: 2,
        ease: "easeOut",
      });

      return controls.stop;
    }, 50);

    return randomAnimation.stop;
  }, [totalExpenses]);

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
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14"
        >
          <g>
            <path
              d="M16.5169,14.3442l7.7047-4.801,10.2741,8.6883v12.5665l-5.9671,4.836v-11.8175l-12.0117-9.4722Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.0581,9.2578l5.8416-3.6121,10.4601,7.293-6.4328,4.9258"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M36.2041,28.6126l6.2959-5.1397"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M36.2041,25.9523l6.2959-5.1397"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M36.2041,23.292l6.2959-5.1397"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M36.2041,20.6317l6.2959-5.1397"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M35.3139,14.172l2.7236-2.077-1.865-1.2474-1.4987,1.1314"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.5,31.9538l13.5429,10.4006,7.4233-5.9106"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.5,29.2851l13.5429,10.4006,7.4233-5.9106"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.6039,26.6164l13.5429,10.4006,7.4233-5.9106"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.5892,23.9478l13.5429,10.4006,7.4233-5.9106"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.2345,23.7501c-.226,1.0274-1.6933,1.5535-3.2773,1.1753h0c-1.5841-.3783-2.685-1.5178-2.459-2.5451,.226-1.0274,1.6933-1.5535,3.2773-1.1753s2.685,1.5177,2.459,2.5451Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.0514,15.826l-9.2955,5.5946,13.3311,10.1174,7.6392-6.0147"
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      <div>
        <p className="text-gray-400 text-base">Total Expenses</p>
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

export default ExpenseCard;
