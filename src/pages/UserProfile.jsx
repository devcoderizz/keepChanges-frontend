import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Textarea } from "@chakra-ui/react";
import ViewCard from "../components/ViewCard";

// import useAuth from "../utils/IsAuthenticated";
// import { Tabs } from 'antd';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
import toast from "react-hot-toast";
import useAuth from "../utils/IsAuthenticated";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { TiArrowBack } from "react-icons/ti";
import { IoIosRemoveCircle, IoMdAddCircle } from "react-icons/io";
// import Fundraisers from "./Fundraisers";
import handleError from "../utils/ErrorHandler";
import { BsBank2 } from "react-icons/bs";
import DonateFund from "../components/modal/DonateFund";

const UserProfile = () => {
  const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
  // eslint-disable-next-line no-unused-vars
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  // const { fetchAccess, isAccessTokenValid } = useAuth();
  const [userData, setUserData] = useState({});
  const [allFundraisers, setAllFundraisers] = useState([]);
  const [approvedFundraisers, setApprovedFundraisers] = useState([]);
  const [pendingFundraisers, setPendingFundraisers] = useState([]);
  const [disapprovedFundraisers, setDisapprovedFundraisers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAccount, setIsModalOpenAccount] = useState(false);
  const [allAccount, setAllAccount] = useState([]);
  const [allreadyAccount, setallreadyAccount] = useState(true);
  const [accountFormData, setAccountFormData] = useState({});
  const [deleteAccount, setDeleteAccount] = useState(true);
  const [inputData, setInputData] = useState(null);
  const [panFormData, setPanFormData] = useState({});
  const localData = JSON.parse(localStorage.getItem("UserData"));
  const { fetchAccess, isAccessTokenValid } = useAuth();
  const admin =
    localData?.roles[1]?.id === 501 || localData?.roles[0]?.id === 501;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedHeadIndex, setSelectedHeadIndex] = useState(0);
  const [isUpdateShow, setIsUpdateShow] = useState(false);
  const [userUpdateForm, setUserUpdateForm] = useState({});
  const [displayImage, setDisplayImage] = useState(null);
  const [isPanDetails, setIsPanDetails] = useState([]);
  const [allUserDonations, setAllUserDonations] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  
  console.log("pandetails state", isPanDetails);
  const { id } = useParams();

  useEffect(() => {
    const approved = allFundraisers.filter(
      (fundraiser) => fundraiser.approval === "APPROVED"
    );
    const pending = allFundraisers.filter(
      (fundraiser) => fundraiser.approval === "PENDING"
    );
    const rejected = allFundraisers.filter(
      (fundraiser) => fundraiser.approval === "DISAPPROVED"
    );

    setApprovedFundraisers(approved);
    setPendingFundraisers(pending);
    setDisapprovedFundraisers(rejected);
  }, [allFundraisers]);

  useEffect(() => {
    const user = async () => {
     
      if (!isAccessTokenValid()) {
        await fetchAccess();
      }
      try {
        const res = await fetch(`${APIBASEURL}/users/user_${id}`, {
          method: "GET",
        });
        const userInfo = await res.json();
        setUserData(userInfo);

        if (res.status != 200) {
          handleError(res.status);
          navigate(`/user-profile/${localData.id}`)
          window.location.reload(false)
          return;
        }
        const res2 = await fetch(
          `${APIBASEURL}/fundraisers/poster/${userInfo?.id}`,
          {
            method: "GET",
          }
        );
        if (res2.status != 200) {
          handleError(res2.status);
          return;
        }
        const fundraiserInfo = await res2.json();
        setAllFundraisers(fundraiserInfo);
      } catch (error) {
        console.log(error);
       
      }
    };
    user();

    const Accounts = async () => {
      if (!isAccessTokenValid()) {
        await fetchAccess();
      }

      try {
        const res = await fetch(
          `${APIBASEURL}/accounts/account/user_${localData.id}`,
          {
            method: "GET",
            headers: {},
          }
        );
        const data = await res.json();

        setAllAccount(data);
        if (res.status != 200) {
          handleError(res.status);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    Accounts();

    const PanDetails = async () => {
      if (!isAccessTokenValid()) {
        await fetchAccess();
      }

      try {
        const res = await fetch(`${APIBASEURL}/pans/user/${localData.id}`, {
          method: "GET",
          headers: {},
        });
        const data = await res.json();
        console.log("pan data", data);
        setIsPanDetails(data);
        // if (res.status != 200) {
        //   handleError(res.status);
        //   return;
        // }
      } catch (error) {
        console.log(error);
      }
    };
    PanDetails();

    const getUserDonations = async () => {
      if (!isAccessTokenValid()) {
        await fetchAccess();
      }
      const accessToken = localStorage.getItem("accessToken");

      try {
        const res = await fetch(`${APIBASEURL}/users/user_${id}/donations`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.status != 200) {
          handleError(res.status);
          return;
        }
        const data = await res.json();
        setAllUserDonations(data)
        console.log("donations ",data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserDonations();



  }, [APIBASEURL]);

  const showModalAccount = () => {
    setIsModalOpenAccount(true);
  };
  const showModalPan = () => {
    setIsModalOpen(true);
  };
  const showModalUpdate = () => {
    setIsUpdateShow(true);
    setUserUpdateForm({});
  };


  const handleCancelAccount = () => {
    setIsModalOpenAccount(false);
  };

  const handleCancelPan = () => {
    setIsModalOpen(false);
    setPanFormData({});
  };

  const handleCancelUpdate = () => {
    setIsUpdateShow(false);
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
  const handleChangeUpdate = (e) => {
   
    setUserUpdateForm({
      ...userUpdateForm,
      [e.target.id]: e.target.value,
    });
  };

  


  const handleFileChange = (e) => {
    setDisplayImage(e.target.files[0]);
  };

  const handleAccountAdd = async () => {
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await fetch(`${APIBASEURL}/accounts/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountFormData),
      });

      if (res.status === 200) {
        toast.success("Account Added");
      }
      if (res.status != 200) {
        handleError(res.status);
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

  const handleInputChange = (e) => {
    setInputData({
      [e.target.id]: e.target.value,
    });
  };

  const handleInputPanChange = (e) => {
    setPanFormData({
      ...panFormData,
      [e.target.id]: e.target.value,
    });
  };

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

      if (res.status === 200) {
        toast.success("Account Selected");
      }
      if (res.status != 200) {
        handleError(res.status);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountDelete = async (e) => {
    e.preventDefault();
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

      if (res.status != 200) {
        handleError(res.status);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePanSubmit = async (e) => {
    e.preventDefault();
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await fetch(`${APIBASEURL}/pans/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(panFormData),
      });
      if (res.status != 201) {
        handleError(res.status);
        return;
      }
      window.location.reload(false);
      if (res.status === 201) {
        toast.success("PAN Added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = new FormData();
    const { name, about, password, email, phone } = userUpdateForm;

    const userUpdateData = {
      name,
      password,
      about,
      email,
      phone,
    };
    // console.log("userupdate data api " , userUpdateData);
    payload.append("userData", JSON.stringify(userUpdateData));

    if (displayImage) {
      payload.append("profileImage", displayImage);
    }
    console.log("displayImage", displayImage)
    console.log("payload " , payload);
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await fetch(
        `${APIBASEURL}/users/user/update-profile_${localData.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: payload,
        }
      );
      window.location.reload(false)
      if (res.status != 200) {
        handleError(res.status);
        setLoading(false)
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const handleDeletePan = async () => {
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await fetch(`${APIBASEURL}/pans/pan/${isPanDetails.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status != 200) {
        handleError(res.status);
        return;
      }
      window.location.reload(false);
      if (res.status === 200) {
        toast.success("PAN DELETED");
      }
    } catch (error) {
      console.log(error);
    }
  };
console.log("User Data", userData)
  return (
    <div className="w-[100%] h-full  flex items-center justify-center ">
      <div className="w-[90vw] h-full py-10">
        <div className="h-[60vh] md:h-[80vh] flex flex-col items-center ">
          <div className="w-full  ">
            <img
              src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715886057/Rectangle_59_xopodu.png"
              alt="coverImage"
              className="h-[100px] md:h-full"
            />
          </div>
          <div className="absolute">
            <div className="relative top-[50px] md:top-[150px] w-[75vw] flex flex-col md:flex-row items-center justify-between gap-5 md:gap-0">
              <div className="flex flex-col  md:flex-row items-center gap-5   ">
                <div className="relative">
                  <div className=" w-[150px] md:w-[200px] h-[150px] md:h-[200px] bg-black overflow-hidden shadow-xl rounded-md object-cover">
                    <img
                      src={`${VITE_BASE_IMAGE_URL}${userData.displayImage}`}
                      alt=""
                      className="object-fill"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-start md:relative h-full mt-1 w-[300px] md:w-[700px] ">
                  <h1 className="text-2xl md:text-3xl text-center md:text-start font-semibold flex items-center  gap-2 ">
                    {userData.name}
                    <h1 className="text-sm mt-2 text-red-500 italic font-medium   ">
                      {admin && "(Admin)"}
                    </h1>
                  </h1>
                  <p className="font-semibold text-[#5D5D5D] ">
                    {userData.email}
                  </p>
                  <p className=" absolute  top-72 md:top-16 font-semibold text-[#1f1f1f] text-[12px] md:text-sm mt-5    ">
                    {userData.about}
                  </p>
                </div>
              </div>
              {localData && localData?.id === userData?.id && (
                <button
                  onClick={showModalUpdate}
                  className="py-1.5 px-6 rounded-md text-lg font-bold bg-[#F9BBBB] hover:bg-[#ffa1a1]"
                >
                  Edit
                </button>
              )}
              <Modal
                title="Update User Detials "
                open={isUpdateShow}
                onCancel={handleCancelUpdate}
                footer={null}
              >
                <form action="" className="p-5 flex flex-col gap-3 ">
                  <div className="flex flex-col ">
                    <label htmlFor="" className="font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={userData.name}
                      onChange={handleChangeUpdate}
                      placeholder="Name"
                      className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="" className="font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      disabled
                      defaultValue={userData.email}
                      onChange={handleChangeUpdate}
                      placeholder="Email"
                      className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md opacity-60 "
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="" className="font-semibold">
                      Phone
                    </label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      defaultValue={userData.phone}
                      onChange={handleChangeUpdate}
                      placeholder="Phone"
                      className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="" className="font-semibold">
                      About
                    </label>
                    <Textarea
                      type="text"
                      name="about"
                      id="about"
                      rows={4}
                      defaultValue={userData.about}
                      onChange={handleChangeUpdate}
                      placeholder="About"
                      maxlength ="500"
                      className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                    ></Textarea>
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="" className="font-semibold">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      name="profileImage"
                      id="profileImage"
                      onChange={handleFileChange}
                      placeholder="ProfileImage"
                      className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                    />
                  </div>

                  <button
                    onClick={handleUpdateSubmit}
                    className=" py-1 px-2 bg-transparent border-[#EF5757] border-2 font-bold text-lg"
                  >
                   {loading ? "Loading..." : "Submit"}
                  </button>
                </form>
              </Modal>
            </div>
          </div>
        </div>

        <div className="w-full h-full mt-48 md:mt-0 flex md:flex-row flex-col items-center md:items-start justify-center md:justify-center   ">
          {localData && localData?.id === userData?.id && (
            <div className="w-[30%] h-[100vh] pt-[52px] flex  flex-col gap-5 items-center justify-start  ">
              <div className="w-[300px] min-h-[300px] max-h-[500px] bg-white flex flex-col items-center py-7 gap-5 rounded-md shadow-lg">
                <div className="w-full  flex flex-col gap-5 items-center justify-center px-5">
                  <h1 className="text-md  text-center font-semibold text-[#636363] ">
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
                            <button
                              onClick={handleAccountSelect}
                              className="flex  items-center gap-2 p-2 bg-green-500 rounded-md text-white text-[15px] font-bold"
                            >
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
                  <div className=" flex flex-col items-center border-t-2 pt-2 w-full h-full">
                    <h1 className="font-semibold mb-2 text-center text-[#636363]">
                      Bank accounts
                    </h1>
                    <ul className="flex flex-col  text-sm text-red-500 font-semibold capitalize ml-5">
                      {allAccount.map((accounts) => (
                        <li
                          className="flex items-center gap-2 "
                          key={accounts.id}
                          value={accounts.id}
                        >
                          <BsBank2 className="text-green-600 text-[15px]" />{" "}
                          {accounts.bankName}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-[300px] h-[200px] bg-white flex flex-col items-center py-7 gap-5 rounded-md shadow-lg ">
                <p className=" font-semibold text-[#636363]">
                  important details
                </p>
                <div className=" w-full  flex flex-col items-center  px-5 gap-5">
                  <button
                    onClick={showModalPan}
                    className="text-md text-red-500 py-3 px-6 text-nowrap border border-red-500 mx-10 rounded-xl font-semibold hover:bg-red-500 hover:text-white "
                  >
                    {isPanDetails.id ? "PAN Details" : "+ Add pancard"}
                  </button>
                  <Modal
                    title={isPanDetails.id ? "PAN Details" : "Add PAN"}
                    open={isModalOpen}
                    onCancel={handleCancelPan}
                    footer={null}
                  >
                    {isPanDetails.id ? (
                      <div className="flex flex-col items-center text-xl font-medium gap-5">
                        <div className="flex flex-col gap-3">
                          <h1 className="border-2 p-2 px-5 border-red-300">
                            PAN Number -{" "}
                            <span className="text-red-500 font-bold">
                              {" "}
                              {isPanDetails.panNumber}{" "}
                            </span>
                          </h1>
                          <h1 className="border-2 p-2 px-5 border-red-300">
                            Name On PAN -
                            <span className="text-red-500 font-bold">
                              {" "}
                              {isPanDetails.nameOnPan}
                            </span>
                          </h1>
                          <h1 className="border-2 p-2 px-5 border-red-300">
                            Address -
                            <span className="text-red-500 font-bold">
                              {" "}
                              {isPanDetails.address}
                            </span>
                          </h1>
                          <h1 className="border-2 p-2 px-5 border-red-300">
                            City -
                            <span className="text-red-500 font-bold">
                              {" "}
                              {isPanDetails.city}
                            </span>{" "}
                          </h1>
                          <h1 className="border-2 p-2 px-5 border-red-300">
                            State -
                            <span className="text-red-500 font-bold">
                              {" "}
                              {isPanDetails.state}
                            </span>
                          </h1>
                          <h1 className="border-2 p-2 px-5 border-red-300">
                            Country -
                            <span className="text-red-500 font-bold">
                              {" "}
                              {isPanDetails.country}
                            </span>
                          </h1>
                          <h1 className="border-2 p-2 px-5 border-red-300">
                            Pincode -{" "}
                            <span className="text-red-500 font-bold">
                              {isPanDetails.pincode}
                            </span>
                          </h1>
                        </div>

                        <button
                          onClick={handleDeletePan}
                          className="text-[15px] text-red-500 py-2 px-5 text-nowrap border border-red-500 mx-10 rounded-md font-semibold hover:bg-red-500 hover:text-white"
                        >
                          DELETE PANCARD
                        </button>
                      </div>
                    ) : (
                      <form action="" className="p-5 flex flex-col gap-3 ">
                        <div className="flex flex-col ">
                          <label htmlFor="" className="font-semibold">
                            Pan Number
                          </label>
                          <input
                            type="text"
                            name="panNumber"
                            id="panNumber"
                            onChange={handleInputPanChange}
                            placeholder="Pan Number"
                            className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label htmlFor="" className="font-semibold">
                            Name on pan
                          </label>
                          <input
                            type="text"
                            name="nameOnPan"
                            id="nameOnPan"
                            onChange={handleInputPanChange}
                            placeholder="Name on pan"
                            className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label htmlFor="" className="font-semibold">
                            Address
                          </label>
                          <input
                            type="address"
                            name="address"
                            id="address"
                            onChange={handleInputPanChange}
                            placeholder="Address"
                            className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label htmlFor="" className="font-semibold">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            onChange={handleInputPanChange}
                            placeholder="City"
                            className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label htmlFor="" className="font-semibold">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            id="state"
                            onChange={handleInputPanChange}
                            placeholder="State"
                            className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label htmlFor="" className="font-semibold">
                            Country
                          </label>
                          <input
                            type="text"
                            name="country"
                            id="country"
                            onChange={handleInputPanChange}
                            placeholder="Country"
                            className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label htmlFor="" className="font-semibold">
                            Pincode
                          </label>
                          <input
                            type="number"
                            name="pincode"
                            id="pincode"
                            onChange={handleInputPanChange}
                            placeholder="Pincode"
                            className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
                          />
                        </div>

                        <button
                          onClick={handlePanSubmit}
                          className=" py-1 px-2 bg-transparent border-[#EF5757] border-2 font-bold text-lg"
                        >
                          Submit
                        </button>
                      </form>
                    )}
                  </Modal>
                </div>
              </div>
            </div>
          )}
          <div className="w-full h-full md:w-[70%]">
            <h1 className="text-xl md:text-2xl font-semibold mb-5  text-center md:text-left">
              Fundraisers that you have created
            </h1>

            <Tabs className="bg-white min-h-[600px] flex flex-col  rounded-md">
              <TabList className="flex flex-row items-center justify-center md:justify-around text-sm md:text-xl font-semibold w-full  bg-red-200 rounded-md">
                <Tab
                  className={
                    selectedHeadIndex === 0
                      ? "text-white underline bg-red-500 py-2 w-1/2 rounded-l-md"
                      : "text-black w-1/2 py-2 rounded-l-md"
                  }
                  onClick={() => setSelectedHeadIndex(0)}
                >
                  Fundraisers
                </Tab>
                <Tab
                  className={
                    selectedHeadIndex === 1
                      ? "text-white underline bg-red-500 py-2 w-1/2 rounded-l-md"
                      : "text-black w-1/2 py-2 rounded-l-md"
                  }
                  onClick={() => setSelectedHeadIndex(1)}
                >
                  Donated Funds
                </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <div>
                      <Tabs className="bg-white min-h-[600px] flex flex-col gap-5 rounded-md py-5">
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
                          {admin ? (
                            <>
                              <Tab
                                className={
                                  selectedIndex === 1
                                    ? "text-red-500 underline bg-white py-2 w-1/3 "
                                    : "text-black w-1/3 py-2"
                                }
                                onClick={() => setSelectedIndex(1)}
                              >
                                Pending
                              </Tab>
                              <Tab
                                className={
                                  selectedIndex === 2
                                    ? "text-red-500 underline bg-white py-2 w-1/3 rounded-r-md"
                                    : "text-black w-1/3 py-2 rounded-r-md"
                                }
                                onClick={() => setSelectedIndex(2)}
                              >
                                Disapproved
                              </Tab>
                            </>
                          ) : (
                            localData &&
                            localData?.id === userData?.id && (
                              <>
                                <Tab
                                  className={
                                    selectedIndex === 1
                                      ? "text-red-500 underline bg-white py-2 w-1/3 "
                                      : "text-black w-1/3 py-2"
                                  }
                                  onClick={() => setSelectedIndex(1)}
                                >
                                  Pending
                                </Tab>
                                <Tab
                                  className={
                                    selectedIndex === 2
                                      ? "text-red-500 underline bg-white py-2 w-1/3 rounded-r-md"
                                      : "text-black w-1/3 py-2 rounded-r-md"
                                  }
                                  onClick={() => setSelectedIndex(2)}
                                >
                                  Disapproved
                                </Tab>
                              </>
                            )
                          )}
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
                  </TabPanel>
                  <TabPanel><div className="  grid grid-cols-1 gap-3 md:grid-cols-2  w-full h-[90%] place-items-center p-5  ">
                  {allUserDonations.map((data, index) => (
                                <div className="" key={index}>
                                  <Link to={`/fundraisers/${data.fundraiser.id}`}>
                                  <DonateFund {...data}  />
                                  </Link>
                                </div>
                              ))}
                 
                    </div></TabPanel>
                </TabPanels>
              

              {/* ........................ */}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
