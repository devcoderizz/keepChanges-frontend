import { useEffect, useState } from "react";

  




const DonationCircle = ({ percentage }) => {
  
  console.log("circle percentage", percentage);
  const validPercentage = isNaN(percentage) ? 0 : percentage;
  const [progress, setProgress] = useState(validPercentage);
  const circleRadius = 20;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const progressOffset = circleCircumference - (progress / 100) * circleCircumference;
  useEffect(() => {
    setProgress(validPercentage);
  }, [validPercentage]);
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
          // r={circleRadius}
          fill="none"
          stroke="#ddd"
          strokeWidth="6"
        />
        <circle
          cx="70"
          cy="30"
          r="20"
          // r={circleRadius}
          fill="none"
          stroke="#FF5C5C"
          strokeWidth="6"
          strokeLinecap="round"
          // strokeDasharray={`${progress}, 100`}
          strokeDasharray={circleCircumference}
          strokeDashoffset={progressOffset}
          transform="rotate(-90 50 50)" // Rotate to start from the top
        />
        
        <text x="30" y="30" textAnchor="middle" dominantBaseline="middle" fill="#FF5C5C" className="text-[12px]">
          {progress}%
        </text>
      </svg>
    </div>
  );
};

export default DonationCircle;
