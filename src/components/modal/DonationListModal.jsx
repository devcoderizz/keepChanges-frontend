import { FaCircleUser } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
const DonationListModal = ({onClose}) => {
  
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
    <div className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  flex flex-col bg-[#FFEBEB] w-[360px] md:w-[600px] h-[540px] items-center justify-center rounded-lg shadow-2xl   ">
      
    
      <h1 className="text-2xl  mb-6 text-red-500 border-b-2 border-spacing-2 border-dashed border-gray-500 font-semibold ">
        Change Agents
      </h1>
    <div className="h-[350px]  overflow-y-scroll w-[90%] md:w-[65%] px-4 rounded-lg bg-[#f7e4e4] " >
      {agentData.map((agent, index) => (
        <div key={index} className="flex flex-row gap-10 my-2">
          <FaCircleUser size={40} color="gray" className="mt-4" />
          <div className="flex flex-col gap-1">
            <p className="text-xl text-[#858585]">{agent.name}</p>
            <p>Donation: ${agent.donation}</p>
            <span className="text-gray-500 font-medium">
              Thank you for being an agent
            </span>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default DonationListModal;
