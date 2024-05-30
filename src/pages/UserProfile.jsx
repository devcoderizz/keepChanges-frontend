import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ViewCard from "../components/ViewCard";
// import useAuth from "../utils/IsAuthenticated";
// import { Tabs } from 'antd';
import { Link, useParams } from "react-router-dom";
import { Modal } from "antd";
import toast from "react-hot-toast";
import useAuth from "../utils/IsAuthenticated";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { TiArrowBack } from "react-icons/ti";
import { IoIosRemoveCircle, IoMdAddCircle } from "react-icons/io";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAccount, setIsModalOpenAccount] = useState(false);
  const [allAccount, setAllAccount] = useState([]); const [allreadyAccount, setallreadyAccount] = useState(true);
  const [accountFormData, setAccountFormData] = useState({});
  const [deleteAccount, setDeleteAccount] = useState(true);
  const [inputData, setInputData] = useState(null);
  const localData = JSON.parse(localStorage.getItem("UserData"));
  const { fetchAccess, isAccessTokenValid } = useAuth();
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

    const Accounts = async () => {
      if (!isAccessTokenValid()) {
        await fetchAccess();
      }
      // const accessToken = localStorage.getItem("accessToken");

      try {
        const res = await fetch(`${APIBASEURL}/accounts/account/user_${localData.id}`, {
          method: "GET",
          headers: {
          
          },
        });

        const data = await res.json();
        // console.log("bank data", data);
        setAllAccount(data);
        if (!data.ok) {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    Accounts();


  }, [APIBASEURL]);


  const showModalAccount = () => {
    setIsModalOpenAccount(true);
  };

  const handleAccountShown = (e) => {
    e.preventDefault();
    setallreadyAccount(!allreadyAccount);
  };

  const handleChange = (e) => {
    setAccountFormData({
      ...accountFormData,
      [e.target.id]: e.target.value,
    });
  };
  const handleAccountAdd = async (e) => {
    e.preventDefault();
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await fetch(
        `${APIBASEURL}/accounts/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(accountFormData),
        }
      );

      const data = await res.json();
      console.log("add bank data", data);
      // setAllAccount(data);
      if(res.status===200){
        toast.success("Account Added")
      }
      if (!data.ok) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteForm = (e) => {
    e.preventDefault();
    setDeleteAccount(!deleteAccount);
  };
  const handleCancelAccount = () => {
    // setSelectedImages([]);
    setIsModalOpenAccount(false);
  };

  const handleInputChange = (e) => {
    setInputData({
      [e.target.id]: e.target.value,
    });
  };
  console.log(inputData);

  const handleAccountSelect = async (e) => {
    e.preventDefault();
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await fetch(
        `${APIBASEURL}/fundraisers/fundraiser_${id}/account_${inputData.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputData.id),
        }
      );

      const data = await res.json();
      console.log("account added", data);
      if(res.status===200){
        toast.success("Account Selected")
      }
      // setAllAccount(data);
      if (!data.ok) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };


  

  const handleAccountDelete = async (e) => {
    e.preventDefault()
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await fetch(
        `${APIBASEURL}/accounts/account_${inputData.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputData.id),
        }
      );

      const data = await res.json();
      console.log("delete data", data);
      // setAllAccount(data);
      if (!data.ok) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };





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
            <div className="w-full flex flex-col justify-center px-5">
                    <h1 className="text-md my-4 ml-16 font-semibold ">
                      Add your bank account
                    </h1>
                    <button
                      onClick={showModalAccount}
                      className="text-md text-red-500 py-3 px-6 text-nowrap border border-red-500 mx-10 rounded-xl font-semibold hover:bg-red-500 hover:text-white "
                    >
                      Account Details
                    </button>
                    <Modal
                      title="Add Account"
                      open={isModalOpenAccount}
                      onCancel={handleCancelAccount}
                      footer={null}
                    >
                      {allreadyAccount ? (
                        <div className="px-5  py-3 flex flex-col items-end  gap-2 mb-10">
                          <button
                            onClick={handleAccountShown}
                            className="gap-2 p-2 bg-[#ed6a6a] rounded-md text-white text-xs font-bold "
                          >
                            {allreadyAccount
                              ? "Add New Account"
                              : "Select existing account"}
                          </button>

                          <button
                            onClick={handleDeleteForm}
                            className="flex items-center gap-2 bg-gray-400  p-1 rounded font-bold text-white hover:bg-red-400"
                          >
                            {deleteAccount ? (
                              <h1 className="flex items-center gap-1">
                                <RiDeleteBin2Fill />
                                account
                              </h1>
                            ) : (
                              <h1 className="flex items-center gap-1">
                                {" "}
                                <TiArrowBack /> back
                              </h1>
                            )}
                          </button>
                          {deleteAccount ? (
                            <form className=" flex flex-col w-full gap-3  p-4 rounded-md">
                              <label
                                htmlFor=""
                                className="font-bold text-[#696763] "
                              >
                                User Accounts
                              </label>
                              <select
                                name="id"
                                id="id"
                                value={allAccount.id}
                                onChange={handleInputChange}
                                className="p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md  "
                              >
                                <option
                                  value=""
                                  className="font-bold text-[#696763]"
                                >
                                  select an account
                                </option>

                                {allAccount.map((accounts) => (
                                  <option key={accounts.id} value={accounts.id}>
                                    {accounts.bankName}
                                  </option>
                                ))}
                              </select>
                              <button onClick={handleAccountSelect} className="flex  items-center gap-2 p-2 bg-green-500 rounded-md text-white text-[15px] font-bold">
                                    <IoMdAddCircle /> Add
                              </button>
                            </form>
                          ) : (
                            <form className=" flex flex-col w-full gap-3 bg-red-200 p-4 rounded-md">
                              <label
                                htmlFor=""
                                className="font-bold text-red-500 "
                              >
                                *Delete User Accounts
                              </label>
                              <select
                                name="id"
                                id="id"
                                value={allAccount.id}
                                onChange={handleInputChange}
                                className="p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md  "
                              >
                                <option
                                  value=""
                                  className="font-bold text-[#696763]"
                                >
                                  select an account
                                </option>

                                {allAccount.map((accounts) => (
                                  <option key={accounts.id} value={accounts.id}>
                                    {accounts.bankName}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={handleAccountDelete}
                                className="flex  items-center gap-2 p-2 bg-green-500 rounded-md text-white text-[15px] font-bold"
                              >
                              <IoIosRemoveCircle /> Remove    
                              </button>
                            </form>
                          )}
                        </div>
                      ) : (
                        <form
                          action=""
                          className="px-5  py-3 flex flex-col items-end  gap-2 mb-10"
                        >
                          <button
                            onClick={handleAccountShown}
                            className="gap-2 p-2 bg-[#ed6a6a] rounded-md text-white text-xs font-bold "
                          >
                            {allreadyAccount
                              ? "Add New Account"
                              : "Select existing account"}
                          </button>
                          <div className=" flex flex-col gap-3 w-full">
                            <label
                              htmlFor=""
                              className="font-bold text-[#696763] "
                            >
                              Add a new account{" "}
                            </label>
                            <input
                              type="text"
                              name="bankName"
                              id="bankName"
                              onChange={handleChange}
                              placeholder="Enter bank Name"
                              className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                            />
                            <input
                              type="number"
                              name="accountNumber"
                              id="accountNumber"
                              onChange={handleChange}
                              placeholder="Enter account number"
                              className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                            />
                            <input
                              type="text"
                              name="branch"
                              id="branch"
                              onChange={handleChange}
                              placeholder="Enter branch name"
                              className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                            />
                            <input
                              type="text"
                              name="ifsc"
                              id="ifsc"
                              onChange={handleChange}
                              placeholder="Enter IFSC code"
                              className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                            />
                            <input
                              type="text"
                              name="holderName"
                              id="holderName"
                              onChange={handleChange}
                              placeholder="Enter account holder’s name"
                              className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                            />
                          </div>
                          <button
                            onClick={handleAccountAdd}
                            className="flex  items-center gap-2 p-1.5 bg-[#EF5757] rounded-md text-white text-xl"
                          >
                            <IoMdAddCircle /> Add
                          </button>
                        </form>
                      )}
                    </Modal>
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
