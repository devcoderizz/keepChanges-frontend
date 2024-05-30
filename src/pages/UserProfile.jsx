import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ViewCard from "../components/ViewCard";
// import useAuth from "../utils/IsAuthenticated";
// import { Tabs } from 'antd';
import { Link, useParams } from "react-router-dom";
// import Fundraisers from "./Fundraisers";

const UserProfile = () => {
  // eslint-disable-next-line no-unused-vars
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  // const { fetchAccess, isAccessTokenValid } = useAuth();
  const [userData, setUserData] = useState({});
  const [allFundraisers, setAllFundraisers] = useState([]);
  const [approvedFundraisers, setApprovedFundraisers] = useState([])
  const [pendingFundraisers, setPendingFundraisers] = useState([])
  const [disapprovedFundraisers, setDisapprovedFundraisers] = useState([])
  const localData = JSON.parse(localStorage.getItem("UserData"));
  console.log("userData", userData);
  console.log("fundraisers data", allFundraisers);
  const admin = localData?.roles[1]?.id;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { id } = useParams();
  console.log("user id", userData.id);


  useEffect(() => {
    // Filter the fundraisers based on their status
    const approved = allFundraisers.filter(fundraiser => fundraiser.approval === 'APPROVED');
    const pending = allFundraisers.filter(fundraiser => fundraiser.approval === 'PENDING');
    const rejected = allFundraisers.filter(fundraiser => fundraiser.approval === 'DISAPPROVED');

    setApprovedFundraisers(approved);
    setPendingFundraisers(pending);
    setDisapprovedFundraisers(rejected);
  }, [allFundraisers]);

  // allFundraisers.map((index)=>{
  //   if(index.approval==="APPROVED"){
  //     setApprovedFundraisers(index)
  //   }else if(index.approval==="PENDING"){
  //     setPendingFundraisers(index)
  //   }else{
  //     setRejectedFundraisers(index)
  //   }
  // })

  
  console.log("approved fund",approvedFundraisers);
  console.log("pending fund",pendingFundraisers);
  console.log("DISAPPROVED fund",disapprovedFundraisers);
  
  

  useEffect(() => {
    

    const user = async () => {
      try {
        const res = await fetch(`${APIBASEURL}/users/user_${id}`, {
          method: "GET",
        });
        const userInfo = await res.json();
        setUserData(userInfo);

        if (res.status != 200) {
          return;
        }
        const res2 = await fetch(
          `${APIBASEURL}/fundraisers/poster/${userInfo?.id}`,
          {
            method: "GET",
          }
        );
        const fundraiserInfo = await res2.json();
        setAllFundraisers(fundraiserInfo);

        // if(res.status ===200){
        //     allFundraisers()
        // }
      } catch (error) {
        console.log(error);
      }
    };
    user();
  }, [APIBASEURL]);

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
                    <h1 className="text-sm mt-2 text-red-500 italic font-medium   ">
                      {admin && "(Admin)"}
                    </h1>
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

        <div className="w-full h-full flex md:flex-row flex-col items-center md:items-start justify-center md:justify-start   ">
          <div className="w-[30%] h-[100vh] pt-[52px] flex  flex-col gap-5 items-center justify-start  ">
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
            <h1 className="text-xl md:text-2xl font-semibold mb-5  text-center md:text-left"  >
              Fundraisers that you have created
            </h1>

            {/* <Tabs defaultActiveKey="1"   items={allFundraisers} onChange={onChange} className="text-red-500 " /> */}

            <Tabs className="bg-white min-h-[600px] flex flex-col gap-5 rounded-md">
              <TabList className="flex flex-row items-center justify-center md:justify-around text-sm md:text-xl font-semibold w-full  bg-slate-200 shadow-lg rounded-md">
                <Tab
                  className={
                    selectedIndex === 0
                      ? "text-red-500 underline bg-white py-2 w-1/3 rounded-l-md"
                      : "text-black w-1/3 py-2 rounded-l-md"
                  }
                  onClick={() => setSelectedIndex(0)}
                >
                  Active
                </Tab>
                <Tab
                  className={
                    selectedIndex === 1
                      ? "text-red-500 underline bg-white py-2 w-1/3 "
                      : "text-black w-1/3 py-2  "
                  }
                  onClick={() => setSelectedIndex(1)}
                >
                  Pending
                </Tab>
                <Tab
                  className={
                    selectedIndex === 2
                      ? "text-red-500 underline bg-white py-2  w-1/3 rounded-r-md"
                      : "text-black w-1/3 py-2 rounded-r-md"
                  }
                  onClick={() => setSelectedIndex(2)}
                >
                  Disapproved
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full h-[90%] overflow-y-scroll overflow-x-hidden no-scrollbar ">
                    {approvedFundraisers.map((data, index) => (
                      <div className="p-4" key={index}>
                        <Link to={`/fundraisers/${data.id}`}>
                          <ViewCard {...data} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full h-[90%] overflow-y-scroll overflow-x-hidden no-scrollbar ">
                    {pendingFundraisers.map((data, index) => (
                      <div className="p-4" key={index}>
                        <Link to={`/fundraisers/${data.id}`}>
                          <ViewCard {...data} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full h-[90%] overflow-y-scroll overflow-x-hidden no-scrollbar ">
                {disapprovedFundraisers.map((data, index) => (
                      <div className="p-4" key={index}>
                        <Link to={`/fundraisers/${data.id}`}>
                          <ViewCard {...data} />
                        </Link>
                      </div>
                    ))}
                    </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
