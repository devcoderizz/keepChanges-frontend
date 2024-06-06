import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4 bg-gray-100 md:h-[80vh] h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-14">
        <div className="h-[200px] md:w-[450px] bg-white p-4 rounded-2xl shadow-md hover:bg-yellow-300 transition duration-300 ease-in-out">
          <div className="text-md font-medium">Total Donation</div>
        </div>
        <div className="md:ml-20 bg-white p-4 rounded-2xl h-[200px] w-[300px] md:w-[300px] shadow-md hover:bg-yellow-300 transition duration-300 ease-in-out">
          <div className="text-md font-medium">Donation Today</div>
        </div>
        <div className="bg-white p-4 rounded-2xl h-[200px] md:w-[300px] shadow-md hover:bg-yellow-300 transition duration-300 ease-in-out">
          <div className="text-md font-medium">Total Donor</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-4 gap-14">
        <div className="h-[400px] md:w-[800px] bg-white p-4 rounded-2xl shadow-md hover:bg-yellow-300 transition duration-300 ease-in-out">
          <div className="text-xl font-bold">Donation Analytics</div>
        </div>
        <div className="h-[400px] ml-0 md:ml-52 w-[300px]  bg-white p-4 rounded-2xl shadow-md hover:bg-yellow-300 transition duration-300 ease-in-out">
          <div className="text-xl font-bold">Your Fundraising</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
