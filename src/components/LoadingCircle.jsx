import { useState } from "react";

 

const DonationCircle = ({ percentage }) => {
  const [progress, setProgress] = useState(percentage);

  return (
    <div className="relative w-32 h-32">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="30"
          cy="30"
          r="20"
          fill="none"
          stroke="#ddd"
          strokeWidth="6"
        />
        <circle
          cx="30"
          cy="30"
          r="20"
          fill="none"
          stroke="#FF5C5C"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${progress}, 100`}
        />
        <text x="30" y="30" textAnchor="middle" dominantBaseline="middle"  fill="#FF5C5C" className="text-[12px] " >
          {progress}%
        </text>
      </svg>
    </div>
  );
};

export default DonationCircle;