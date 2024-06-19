import { FaCircleUser } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
const DonationListModal = ({onClose, fundraiserDetails}) => {
  
  const agentData = [
    { name: "Agent 1", donation: 69.69 },
    { name: "Agent 2", donation: 50.5 },
    { name: "Agent 3", donation: 100.0 },
    { name: "Agent 4", donation: 80.0 },
    { name: "Agent 4", donation: 80.0 },
    { name: "Agent 4", donation: 80.0 },
    { name: "Agent 4", donation: 80.0 },
    { name: "Agent 4", donation: 80.0 },
    { name: "Agent 4", donation: 80.0 },
    { name: "Agent 4", donation: 80.0 },
    { name: "Agent 4", donation: 80.0 },
    { name: "Agent 4", donation: 80.0 },
    { name: "Agent 4", donation: 80.0 },
    { name: "Agent 4", donation: 80.0 },
    { name: "Agent 4", donation: 80.0 },
    
    // Add more agents as needed
  ];
  return (
    <div className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col bg-[#FFEBEB] w-[360px] md:w-[600px] h-[540px] items-center justify-center rounded-2xl shadow-2xl">
  <h1 className="text-3xl mb-6 text-red-500 border-b-2 border-dashed border-gray-500 font-semibold px-4 pb-2">
    Change Agents
  </h1>
  <div className="h-[350px] overflow-y-scroll w-[90%] px-4 rounded-lg bg-[#f7e4e4]">
    {fundraiserDetails?.donations?.map((agent, index) => (
      <div key={index} className="my-4 p-4 bg-white rounded-lg shadow-md flex flex-row items-center gap-4">
        <FaCircleUser size={40} color="gray" className="mt-1" />
        <div className="flex flex-col">
          <p className="text-xl text-[#858585] font-semibold">{agent.donorName}</p>
          <p className="text-lg text-gray-700">Donation: ${agent.donationAmount}</p>
          <span className="text-gray-500 font-medium">Thank you for being a agent</span>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default DonationListModal;
