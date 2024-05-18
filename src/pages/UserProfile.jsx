import { useState } from "react";
import ViewCard from "../components/ViewCard";

const UserProfile = () => {
  const [donationData, setDonationData] = useState([
    {
      title:
        "help to brighten the lives of abandon children and their family by giving ",
      by: "by Maitri",
      imageSrc:
        "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 1000,
      goalAmount: 5000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Supporting Elderly Care",
      by: "by Maitri",
      imageSrc:
        "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 3000,
      goalAmount: 6000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Supporting Elderly Care",
      by: "by Maitri",
      imageSrc:
        "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 3000,
      goalAmount: 6000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Supporting Elderly Care",
      by: "by Maitri",
      imageSrc:
        "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 3000,
      goalAmount: 6000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Supporting Elderly Care",
      by: "by Maitri",
      imageSrc:
        "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 3000,
      goalAmount: 6000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Supporting Elderly Care",
      by: "by Maitri",
      imageSrc:
        "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 3000,
      goalAmount: 6000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Supporting Elderly Care",
      by: "by Maitri",
      imageSrc:
        "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 3000,
      goalAmount: 6000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Supporting Elderly Care",
      by: "by Maitri",
      imageSrc:
        "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 3000,
      goalAmount: 6000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Supporting Elderly Care",
      by: "by Maitri",
      imageSrc:
        "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 3000,
      goalAmount: 6000,
      daysLeft: 5,
      Suppoters: 2203,
    },
  ]);
  return (
    <div className="w-[100%] h-full  flex items-center justify-center ">
      <div className="w-[90vw] h-full py-10">
        <div className=" h-[60vh] flex flex-col items-center ">
          <div className="w-full  ">
            <img
              src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715886057/Rectangle_59_xopodu.png"
              alt="coverImage"
              className="h-[100px] md:h-full"
            />
          </div>
          <div className="absolute">
            <div className="relative top-[50px] md:top-[150px] w-[75vw] flex flex-col md:flex-row items-center justify-between gap-5 md:gap-0">
              <div className="flex flex-col md:flex-row items-center gap-5  ">
                <div className="w-[150px] md:w-[200px] h-[150px] md:h-[200px] bg-black overflow-hidden shadow-xl rounded-md ">
                  <img
                    src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715890998/1636820072193_ktwjrf.jpg"
                    alt=""
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl text-center md:text-start font-semibold">
                    Pranav panga
                  </h1>
                  <p className="font-semibold text-[#5D5D5D] ">
                    pranav@paanga.gmail.com
                  </p>
                </div>
              </div>
              <button className="py-1.5 px-6 rounded-md text-lg font-bold bg-[#F9BBBB] hover:bg-[#ffa1a1]">
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex md:flex-row flex-col items-center justify-start   ">
          <div className="w-[30%] h-[100vh] pt-14 flex  flex-col gap-5 items-center justify-start  ">
            <div className="w-[300px] h-[300px] bg-white flex flex-col items-center py-7 gap-5 rounded-md">
              <p className=" font-semibold text-[#636363]">Added Accounts</p>
              <div className=" w-full  flex flex-col items-center  px-5 gap-5">
                <h1 className="text-lg font-semibold">SBI BANK</h1>
                <h1 className="text-lg font-semibold">SBI BANK</h1>
                <h1 className="text-lg font-semibold">SBI BANK</h1>
                <hr className="w-64 h-1  bg-gray-200 border-0 rounded" />
                <button className="p-2 w-full text-white font-semibold rounded-md bg-[#FF5C5C] hover:bg-[#ff6868]">
                  Add Account
                </button>
              </div>
            </div>
            <div className="w-[300px] h-[200px] bg-white flex flex-col items-center py-7 gap-5 rounded-md">
            <p className=" font-semibold text-[#636363]">Add important details</p>
            <div className=" w-full  flex flex-col items-center  px-5 gap-5">
                <h1 className="text-lg font-semibold">Add pancard</h1>
                <h1 className="text-lg font-semibold">Add Aadharcard</h1>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[70%] h-[100vh]     ">
            <h1 className="text-2xl font-semibold ml-12">
              Fundraisers that you have created
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full  md:w-[65vw] h-full overflow-y-scroll overflow-x-hidden no-scrollbar">
              {donationData.map((data, index) => (
                <div className="py-5" key={index}>
                  <ViewCard {...data} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
