import { useEffect, useState } from "react";
import ViewCard from "../components/ViewCard";
import useAuth from "../utils/IsAuthenticated";

const UserProfile = () => {
  // eslint-disable-next-line no-unused-vars
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  const { fetchAccess, isAccessTokenValid } = useAuth();
  const [userData, setUserData] = useState({})
  const localData = JSON.parse(localStorage.getItem("UserData"));
  console.log("userData",userData);
  const admin =localData?.roles[1]?.id
 
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
  // if (userData?.roles[1]?.id || userData?.roles[1]?.id === 501) {
  //   console.log("roles");
  //   setIsAdmin(true);
  // }
useEffect(() => {
  const user =async()=>{
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`${APIBASEURL}/users/user/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      const userInfo = await res.json();
      setUserData(userInfo)

      

      // Assuming userInfo contains the user's data
      localStorage.setItem("UserData", JSON.stringify(userInfo));
      // window.location.reload(false);
    } catch (error) {
      console.log(error);
     
    }
  }
  user()
},[APIBASEURL])




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
                  <h1 className="text-2xl md:text-3xl text-center md:text-start font-semibold flex items-center  gap-2 ">
                    {userData.name}
                    <h1 className="text-sm mt-2 text-red-500 italic font-medium   ">{admin && "(Admin)"}</h1>
                  </h1>
                  <p className="font-semibold text-[#5D5D5D] ">
                    {userData.email}
                  </p>
                </div>
              </div>
              <button className="py-1.5 px-6 rounded-md text-lg font-bold bg-[#F9BBBB] hover:bg-[#ffa1a1]">
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex md:flex-row flex-col items-start justify-start   ">
          <div className="w-[30%] h-[100vh] pt-14 flex  flex-col gap-5 items-center justify-start  ">
            <div className="w-[300px] h-[300px] bg-white flex flex-col items-center py-7 gap-5 rounded-md shadow-lg">
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
            <div className="w-[300px] h-[200px] bg-white flex flex-col items-center py-7 gap-5 rounded-md shadow-lg ">
              <p className=" font-semibold text-[#636363]">
                Add important details
              </p>
              <div className=" w-full  flex flex-col items-center  px-5 gap-5">
                <h1 className="text-lg font-semibold">Add pancard</h1>
                <h1 className="text-lg font-semibold">Add Aadharcard</h1>
              </div>
            </div>
          </div>
          <div className="w-full h-full md:w-[70%]">
            <h1 className="text-2xl font-semibold ml-4 md:ml-12">
              Fundraisers that you have created
            </h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full h-[90%] overflow-y-scroll overflow-x-hidden no-scrollbar">
              {donationData.map((data, index) => (
                <div className="p-4" key={index}>
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
