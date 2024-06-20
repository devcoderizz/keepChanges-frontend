import { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
} from "@chakra-ui/react";
import ViewCard from "../components/ViewCard";

// import useAuth from "../utils/IsAuthenticated";
// import { Tabs } from 'antd';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
import toast from "react-hot-toast";
import useAuth from "../utils/IsAuthenticated";
import { IoMdAddCircle } from "react-icons/io";
// import Fundraisers from "./Fundraisers";
import handleError from "../utils/ErrorHandler";
import DonateFund from "../components/modal/DonateFund";
import EditAndDeleteAccount from "../components/EditAndDeleteAccount";
import Button from "../components/Button";

const UserProfile = () => {
  const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
  // eslint-disable-next-line no-unused-vars
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  // const { fetchAccess, isAccessTokenValid } = useAuth();
  const [userData, setUserData] = useState({});
  const [allFundraisers, setAllFundraisers] = useState([]);
  const [openFundraisers, setOpenFundraisers] = useState([]);
  const [pendingFundraisers, setPendingFundraisers] = useState([]);
  const [disapprovedFundraisers, setDisapprovedFundraisers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAccount, setIsModalOpenAccount] = useState(false);
  const [allAccount, setAllAccount] = useState([]);
  console.log("all accounts", allAccount);
  const [accountFormData, setAccountFormData] = useState({});

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
  const [allUserDonations, setAllUserDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log("pandetails state", isPanDetails);
  const { id } = useParams();

  useEffect(() => {
    const open = allFundraisers.filter(
      (fundraiser) => fundraiser.status === "OPEN"
    );
    const complete = allFundraisers.filter(
      (fundraiser) => fundraiser.status === "INACTIVE"
    );
    const cancel = allFundraisers.filter(
      (fundraiser) => fundraiser.status === "CANCELLED"
    );

    setOpenFundraisers(open);
    setPendingFundraisers(complete);
    setDisapprovedFundraisers(cancel);
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
          navigate(`/user-profile/${localData.id}`);
          window.location.reload(false);
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
        setAllFundraisers(fundraiserInfo.fundraisers);
      } catch (error) {
        console.log(error);
      }
    };
    user();

    const Accounts = async (e) => {
      e.preventDefault();
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
        setAllUserDonations(data);
        console.log("donations ", data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserDonations();
  }, [APIBASEURL,id]);

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

  // const handleAccountShown = (e) => {
  //   e.preventDefault();
  //   setallreadyAccount(!allreadyAccount);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountFormData({
      ...accountFormData,
      [name]: value,
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
    // Perform validation
    const errors = validateAccountFormData(accountFormData);
    if (Object.keys(errors).length > 0) {
      // Display errors to the user
      for (const [key, value] of Object.entries(errors)) {
        toast.error(`${key}: ${value}`);
      }
      return;
    }
  
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
  
      if (res.status === 201) {
        toast.success("Account Added");
        window.location.reload(false);
      } else {
        handleError(res.status);
        toast.error("This account already exists.");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  // const handleDeleteForm = (e) => {
  //   e.preventDefault();
  //   setDeleteAccount(!deleteAccount);
  // };

  // const handleInputChange = (e) => {
  //   setInputData({
  //     [e.target.id]: e.target.value,
  //   });
  // };

  const handleInputPanChange = (e) => {
    const { name, value } = e.target;
    setPanFormData({
      ...panFormData,
      [name]: value,
    });
  };
  

  

  const handlePanSubmit = async (e) => {
    e.preventDefault();
  
    // Perform validation
    const errors = validatePanFormData(panFormData);
    if (Object.keys(errors).length > 0) {
      // Display errors to the user
      for (const [key, value] of Object.entries(errors)) {
        toast.error(`${key}: ${value}`);
      }
      return;
    }
  
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
  
      if (res.status !== 201) {
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
    e.preventDefault();
    setLoading(true);
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
    console.log("displayImage", displayImage);
    console.log("payload ", payload);
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
      window.location.reload(false);
      if (res.status != 200) {
        handleError(res.status);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
  console.log("User Data", userData);



  // ---------------------------------- VALIDATIONS LOGIC-----------------------------------
  const validatePanFormData = (data) => {
    const errors = {};
  
    // PAN Number validation: assuming a typical PAN number format
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!data.panNumber || !panRegex.test(data.panNumber)) {
      errors.panNumber = "Invalid PAN Number format.";
    }
  
    // Validate name on PAN (should not be empty)
    if (!data.nameOnPan || data.nameOnPan.trim().length === 0) {
      errors.nameOnPan = "Name on PAN is required.";
    }
  
    // Validate address (should not be empty)
    if (!data.address || data.address.trim().length === 0) {
      errors.address = "Address is required.";
    }
  
    // Validate city (should not be empty)
    if (!data.city || data.city.trim().length === 0) {
      errors.city = "City is required.";
    }
  
    // Validate state (should not be empty)
    if (!data.state || data.state.trim().length === 0) {
      errors.state = "State is required.";
    }
  
    // Validate country (should not be empty)
    if (!data.country || data.country.trim().length === 0) {
      errors.country = "Country is required.";
    }
  
    // Validate pincode (should be a number and not empty)
    if (!data.pincode || isNaN(data.pincode) || data.pincode.trim().length === 0) {
      errors.pincode = "Pincode is required and should be a valid number.";
    }
  
    return errors;
  };

  const validateAccountFormData = (data) => {
    const errors = {};
  
    // Bank Name validation
    if (!data.bankName || data.bankName.trim().length === 0) {
      errors.bankName = "Bank name is required.";
    }
  
    // Account Number validation: must be a number and not empty
    if (!data.accountNumber || isNaN(data.accountNumber) || data.accountNumber.toString().trim().length === 0) {
      errors.accountNumber = "Valid account number is required.";
    }
  
    // Branch Name validation
    if (!data.branch || data.branch.trim().length === 0) {
      errors.branch = "Branch name is required.";
    }
  
    // IFSC Code validation: assuming a typical IFSC code format
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!data.ifsc || !ifscRegex.test(data.ifsc)) {
      errors.ifsc = "Invalid IFSC code format.";
    }
  
    // Account Holder's Name validation
    if (!data.holderName || data.holderName.trim().length === 0) {
      errors.holderName = "Account holder’s name is required.";
    }
  
    return errors;
  };
  
  







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
                <div className=" flex items-center gap-5">
                  <button
                    onClick={showModalUpdate}
                    className="py-1 px-6 rounded-md text-lg font-bold bg-[#F9BBBB] hover:bg-[#ffa1a1]"
                  >
                    Edit
                  </button>
                  <Button />
                </div>
              )}

              <Modal
                title="Update User Details "
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
                      maxlength="500"
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
                    Add Account
                  </button>
                  <Modal
                    title="Add Account"
                    open={isModalOpenAccount}
                    onCancel={handleCancelAccount}
                    footer={null}
                  >
                    <form
  action=""
  className="px-5 py-3 flex flex-col items-end gap-2 mb-10"
>
<div className="flex flex-col gap-3 w-full">
    <label htmlFor="bankName" className="font-bold text-[#696763]">
      Bank Name
    </label>
    <input
      type="text"
      name="bankName"
      id="bankName"
      onChange={handleChange}
      placeholder="Enter bank name"
      className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
    />

    <label htmlFor="accountNumber" className="font-bold text-[#696763]">
      Account Number
    </label>
    <input
      type="number"
      name="accountNumber"
      id="accountNumber"
      onChange={handleChange}
      placeholder="Enter account number"
      className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
    />

    <label htmlFor="branch" className="font-bold text-[#696763]">
      Branch Name
    </label>
    <input
      type="text"
      name="branch"
      id="branch"
      onChange={handleChange}
      placeholder="Enter branch name"
      className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
    />

    <label htmlFor="ifsc" className="font-bold text-[#696763]">
      IFSC Code
    </label>
    <input
      type="text"
      name="ifsc"
      id="ifsc"
      onChange={handleChange}
      placeholder="Enter IFSC code"
      className="font-bold p-2 border-[#EF5757] border-2 border-opacity-45 focus:outline-none rounded-md"
    />

    <label htmlFor="holderName" className="font-bold text-[#696763]">
      Account Holder’s Name
    </label>
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
    type="button"
    className="flex items-center gap-2 p-1.5 bg-[#EF5757] rounded-md text-white text-xl"
  >
    <IoMdAddCircle /> Add
  </button>
</form>

                  </Modal>

                  <EditAndDeleteAccount />
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
                      <div className="flex flex-col items-center text-lg font-medium gap-6 bg-gray-100 py-4 rounded-lg ">
                      <div className="flex flex-col  w-full max-w-md">
                        <div className="border-b-2 px-4 py-2 border-blue-300">
                          <span className="block text-gray-600">PAN Number</span>
                          <span className="text-blue-600 font-bold">{isPanDetails.panNumber}</span>
                        </div>
                        <div className="border-b-2 px-4 py-2 border-blue-300">
                          <span className="block text-gray-600">Name On PAN</span>
                          <span className="text-blue-600 font-bold">{isPanDetails.nameOnPan}</span>
                        </div>
                        <div className="border-b-2 px-4 py-2 border-blue-300">
                          <span className="block text-gray-600">Address</span>
                          <span className="text-blue-600 font-bold">{isPanDetails.address}</span>
                        </div>
                        <div className="border-b-2 px-4 py-2 border-blue-300">
                          <span className="block text-gray-600">City</span>
                          <span className="text-blue-600 font-bold">{isPanDetails.city}</span>
                        </div>
                        <div className="border-b-2 px-4 py-2 border-blue-300">
                          <span className="block text-gray-600">State</span>
                          <span className="text-blue-600 font-bold">{isPanDetails.state}</span>
                        </div>
                        <div className="border-b-2 px-4 py-2 border-blue-300">
                          <span className="block text-gray-600">Country</span>
                          <span className="text-blue-600 font-bold">{isPanDetails.country}</span>
                        </div>
                        <div className="border-b-2 px-4 py-2 border-blue-300">
                          <span className="block text-gray-600">Pincode</span>
                          <span className="text-blue-600 font-bold">{isPanDetails.pincode}</span>
                        </div>
                      </div>
                
                      <button
                        onClick={handleDeletePan}
                        className="text-sm text-red-500 py-2 px-6 border border-red-500 rounded-md font-semibold hover:bg-red-500 hover:text-white transition duration-300"
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
               {admin ? <Tab
                  className={
                    selectedHeadIndex === 1
                      ? "text-white underline bg-red-500 py-2 w-1/2 rounded-l-md"
                      : "text-black w-1/2 py-2 rounded-l-md"
                  }
                  onClick={() => setSelectedHeadIndex(1)}
                >
                  Donated Funds
                </Tab> : (localData &&
                          localData?.id === userData?.id && <Tab
                          className={
                            selectedHeadIndex === 1
                              ? "text-white underline bg-red-500 py-2 w-1/2 rounded-l-md"
                              : "text-black w-1/2 py-2 rounded-l-md"
                          }
                          onClick={() => setSelectedHeadIndex(1)}
                        >
                          Donated Funds
                        </Tab>)

               } 
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div>
                    <h1 className="text-xl underline font-semibold mb-5  text-center mt-5 ">
                      Fundraisers that has created
                    </h1>
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
                            {openFundraisers.map((data, index) => (
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

                {admin ?  <TabPanel>
                  <h1 className="text-xl underline font-semibold mb-5  text-center mt-5 ">
                    Donation that you have Made
                  </h1>
                  <div className="  grid grid-cols-1 gap-3 md:grid-cols-2  w-full h-[90%] place-items-center p-5  ">
                    {allUserDonations.map((data, index) => (
                      <div className="" key={index}>
                        <Link to={`/fundraisers/${data.fundraiserId}`}>
                          <DonateFund {...data} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </TabPanel> : (localData &&
                          localData?.id === userData?.id &&  <TabPanel>
                          <h1 className="text-xl underline font-semibold mb-5  text-center mt-5 ">
                            Donation that you have Made
                          </h1>
                          <div className="  grid grid-cols-1 gap-3 md:grid-cols-2  w-full h-[90%] place-items-center p-5  ">
                            {allUserDonations.map((data, index) => (
                              <div className="" key={index}>
                                <Link to={`/fundraisers/${data.fundraiser.id}`}>
                                  <DonateFund {...data} />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </TabPanel>)}
                
               
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
