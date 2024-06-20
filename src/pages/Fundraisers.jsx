import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHands } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import DonationCircle from "../components/LoadingCircle";
import { useEffect, useRef, useState } from "react";
import DonationListModal from "../components/modal/DonationListModal";
import { RxCross2 } from "react-icons/rx";
import { Modal } from "antd";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { HiLink } from "react-icons/hi";
import { IoMdAddCircle } from "react-icons/io";
import useAuth from "../utils/IsAuthenticated";
import handleError from "../utils/ErrorHandler";
import AddDocuments from "../components/AddDocuments";
import ApproveAdmin from "../components/ApproveAdmin";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import DeleteFundraiserImages from "../components/DeleteFundraiserImages";
import { MdOutlineMoreVert } from "react-icons/md";
const Fundraisers = () => {
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  // const BASE_DISPLAY_PHOTO = import.meta.env.VITE_FUNDRAISER_DISPLAY;

  const { id } = useParams();
  const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
  const [isUser, setIsUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [fundraiserDetails, setFundraiserDetails] = useState({});
  console.log("details", fundraiserDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAccount, setIsModalOpenAccount] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [formDataUpdate, setFormDataUpdate] = useState([]);
  const [displayImageUpdate, setDisplayImageUpdate] = useState([]);
  const [categories, setCategories] = useState([]);
  const imgUploadRef = useRef(null);
  const [images1, setImages] = useState([]);
  const [allAccount, setAllAccount] = useState([]);
  const [allreadyAccount, setallreadyAccount] = useState(true);
  const [accountFormData, setAccountFormData] = useState({});
  const [inputData, setInputData] = useState(null);
  const localData = JSON.parse(localStorage?.getItem("UserData"));
  const navigate = useNavigate();
  const { fetchAccess, isAccessTokenValid } = useAuth();
  const [selectedHeadIndex, setSelectedHeadIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  const toggleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };

  // console.log("image1", images1)
  console.log("imagesfundraiser", fundraiserDetails?.photos);

  const currentUser = fundraiserDetails.postedById
    ? fundraiserDetails.postedById
    : " ";

  const percentage = Math.floor(
    (fundraiserDetails.raised / fundraiserDetails?.raiseGoal) * 100
  );

  

  const showModal2 = () => {
    setIsModalOpen(true);
  };
  const showModalAccount = () => {
    setIsModalOpenAccount(true);
  };
  const showModalUpdate = () => {
    setIsModalOpenUpdate(true);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isAccessTokenValid()) {
      await fetchAccess();
    }

    const accessToken = localStorage?.getItem("accessToken");

    try {
      const formData = new FormData();

      // formData.append("images", images1);

      images1?.forEach((image) => {
        formData.append("images", image);
      });
      console.log("form data", formData.get("images"));

      const res = await fetch(
        `${APIBASEURL}/fundraisers/fundraiser_${id}/add-photos`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data"
            // content-type: ‘multipart/form-data’,
          },
          body: formData,
        }
      );

      if (res.status === 200) {
        toast.success("Image Uploaded");
        window.location.reload(false);
      }

      if (res.status !== 200) {
        handleError(res.status);
      }

      const data = await res.json();
      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setImages([]);
    setIsModalOpen(false);
  };
  const handleCancelAccount = () => {
    // setSelectedImages([]);
    setIsModalOpenAccount(false);
  };
  const handleCancelUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleChangeUpdate = (e) => {
    setFormDataUpdate({
      ...formDataUpdate,
      [e.target.id]: e.target.value,
    });
  };
  const handleFileChangeUpdate = (e) => {
    setDisplayImageUpdate(e.target.files[0]);
  };

  const handleSeeMore = () => {
    setShowModal(!showModal);
  };


  useEffect(() => {
    if (localData?.id === currentUser) {
      setIsUser(true);
    }

    if (localData?.roles[1]?.id || localData?.roles[0]?.id === 501) {
      setIsAdmin(true);
    }

    const fundraiserDetails = async () => {
      if (!isAccessTokenValid()) {
        await fetchAccess();
      }
      try {
        const res = await fetch(`${APIBASEURL}/fundraisers/fundraiser_${id}`, {
          method: "GET",
          headers: {},
        });
        if (res.status != 200) {
          handleError(res.status);
        }
        const data = await res.json();
        // console.log("fundraiser data", data);
        setFundraiserDetails(data);

        if (
          data.approval === "APPROVED" ||
          localData?.id === data.postedById ||
          localData?.roles[1]?.id ||
          localData?.roles[0]?.id === 501
        ) {
          console.log(" ");
        } else {
          navigate("/");
        }

        const response = await fetch(`${APIBASEURL}/categories/getall`, {
          method: "GET",
          headers: {
           
          },
        });

        if (response.status != 200) {
          handleError(response.status);
        }

        const data2 = await response.json();
        setCategories(data2);
       
      } catch (error) {
        console.log(error);
      }
    };
    fundraiserDetails();

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
        if (res.status != 200) {
          handleError(res.status);
        }
        const data = await res.json();
      
        setAllAccount(data);
        if (!data.ok) {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    Accounts();
  }, [APIBASEURL, currentUser, id, setImages]);

  const copylink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("Link Copied");
    });
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
  console.log(accountFormData);

  const handleAccountAdd = async () => {
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await fetch(
        `${APIBASEURL}/fundraisers/fundraiser_${id}/account/add`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(accountFormData),
        }
      );
      if (res.status != 200) {
        handleError(res.status);
      }
      if (res.status === 200) {
        toast.success("Account Added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setInputData({
      [e.target.id]: e.target.value,
    });
  };
  console.log(inputData);

  const handleAccountSelect = async () => {
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
      if (res.status != 200) {
        handleError(res.status);
      }
      // const data = await res.json();
      // console.log("account added", data);
      if (res.status === 200) {
        toast.success("Account Selected");
      }
      // setAllAccount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    const accessToken = localStorage.getItem("accessToken");

    const {
      fundraiserTitle,
      raiseGoal,
      endDate,
      id,
      email,
      phone,
      fundraiserDescription,
      beneficiary,
    } = formDataUpdate;

    const fundraiserData = {
      fundraiserTitle,
      raiseGoal,
      endDate,
      email,
      phone,
      fundraiserDescription,
      beneficiary,
    };

    const payload = new FormData();
    payload.append("fundraiserData", JSON.stringify(fundraiserData));

    if (displayImageUpdate) {
      payload.append("displayImage", displayImageUpdate);
    }

    payload.append("categoryId", id);

    console.log("payload", payload);

    try {
      const response = await fetch(
        `${APIBASEURL}/fundraisers/fundraiser_${fundraiserDetails.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: payload,
        }
      );

      console.log("payload", payload);
      const data = await response.json();
      // console.log("response", response);

      if (response.status != 200) {
        handleError(response.status);
      }

      if (response.ok) {
        toast.success("Fundraiser created successfully!");
        window.location.reload(false);
        navigate(`/fundraisers/${data.id}`);
      } else {
        // toast.error(data.error || "Error creating fundraiser");
      }
    } catch (error) {
      console.error("Error creating fundraiser:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-full my-12 md:mx-32">
        <div className="text-2xl md:text-4xl font-bold w-[90vw] md:w-[75vw]">
          <span className="text-wrap">
            {fundraiserDetails.fundraiserTitle}{" "}
          </span>

          {fundraiserDetails.approval === "APPROVED" && (
            <span title="Approved By Admin">✅</span>
          )}
        </div>
        {isUser && <button className="origin-top-right absolute right-4 md:right-10 md:mt-2 md:top-28" type="button" onClick={toggleDropdown2}>
          <MdOutlineMoreVert className="text-3xl hover:text-gray-700 hover:scale-105 duration-50" />
        </button> }
        
        {dropdownOpen2 && (
          <div
            className="origin-top-right absolute right-4 md:right-10 mt-8 md:mt-5 md:w-auto w-[100px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1 md:w-auto w-[100px]" role="none">
              <Link
                to={`/fundraiser-options/${id}`}
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                role="menuitem"
              >
                More
              </Link>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row w-[90%] gap-8 my-4 md:ml-0  ">
          <div className="flex flex-col items-start justify-start">
            <div className="flex items-center justify-between w-full px-2">
              <span className="text-[12px] md:text-sm">
                Capmaign by{" "}
                <Link to={"/"} className="text-red-500 underline  ">
                  {" "}
                  Keep changes
                </Link>
              </span>
              {fundraiserDetails.approval === "APPROVED" && (
                <span className="text-red-500 text-[12px] underline">
                  Approved By Admin
                </span>
              )}
            </div>
            <div className="flex flex-row gap-8">
              <img
                className="md:w-[50vw] md:h-[50vh] h-[30vh] w-[90vw] object-cover rounded-xl "
                src={`${VITE_BASE_IMAGE_URL}${fundraiserDetails.displayPhoto}`}
                alt=""
              />
            </div>
            <div className="flex ">
              <DonationCircle percentage={percentage} />
              <div className=" flex md:gap-96 ">
                <span className="text-sm mt-4 -ml-10  md:text-nowrap ">
                  Raised <br />{" "}
                  <span className="text-red-500 mt-2">
                    {" "}
                    Rs&nbsp;
                    {fundraiserDetails?.raised}
                  </span>{" "}
                  &nbsp; of <strong> {fundraiserDetails.raiseGoal} </strong>
                </span>
                <div className="flex items-center pl-16 -mt-10 gap-3 ml-5 text-xl  ">
                  {isUser ? (
                    <>
                      <button
                        onClick={showModalUpdate}
                        className="hover:text-blue-600"
                      >
                        <FiEdit title="Edit" />
                      </button>
                      <Modal
                        title="Edit Fundraiser Details"
                        open={isModalOpenUpdate}
                        onCancel={handleCancelUpdate}
                        footer={null}
                      >
                        <form
                          onSubmit={handleSubmitUpdate}
                          className=" flex flex-col items-center gap-4 p-5"
                        >
                          <div className="flex flex-col items-start w-full">
                            <label
                              htmlFor="fundraiserTitle"
                              className="font-bold"
                            >
                              Fundraiser Title*
                            </label>
                            <input
                              type="text"
                              name="fundraiserTitle"
                              id="fundraiserTitle"
                              placeholder="Give your fundraiser a name"
                              defaultValue={fundraiserDetails.fundraiserTitle}
                              onChange={handleChangeUpdate}
                              className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col items-start w-full">
                            <label htmlFor="Beneficiary" className="font-bold">
                              Beneficiary*
                            </label>
                            <input
                              type="text"
                              name="beneficiary"
                              id="beneficiary"
                              placeholder="This fundraiser will benefit"
                              defaultValue={fundraiserDetails.beneficiary}
                              onChange={handleChangeUpdate}
                              className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
                            <div className="relative flex flex-col items-start w-full md:w-1/2">
                              <label htmlFor="raiseGoal" className="font-bold">
                                Goal*
                              </label>
                              <input
                                type="number"
                                name="raiseGoal"
                                id="raiseGoal"
                                placeholder="Amount in Rupees"
                                defaultValue={fundraiserDetails.raiseGoal}
                                onChange={handleChangeUpdate}
                                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md pr-7 focus:outline-none"
                              />
                              <p className="absolute bottom-2.5 right-3 font-bold">
                                ₹
                              </p>
                            </div>
                            <div className="flex flex-col items-start w-full md:w-1/2">
                              <label htmlFor="endDate" className="font-bold">
                                End date*
                              </label>
                              <input
                                type="date"
                                name="endDate"
                                id="endDate"
                                placeholder="mm/dd/yyyy"
                                defaultValue={fundraiserDetails.endDate}
                                onChange={handleChangeUpdate}
                                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-start w-full">
                            <label htmlFor="categoryName" className="font-bold">
                              Category*
                            </label>
                            <select
                              name="id"
                              id="id"
                              // defaultValue={fundraiserDetails.id}
                              onChange={handleChangeUpdate}
                              value={fundraiserDetails.category.id}
                              placeholder="Select category"
                              className="p-2.5 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
                            >
                              <option>Select category</option>
                              {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.categoryName}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
                            <div className="flex flex-col items-start w-full md:w-1/2">
                              <label htmlFor="email" className="font-bold">
                                Email*
                              </label>
                              <input
                                name="email"
                                id="email"
                                disabled
                                placeholder="abc@xyz.com"
                                defaultValue={fundraiserDetails.email}
                                onChange={handleChangeUpdate}
                                className="p-2 w-full opacity-50 border-2 border-[#FF5C5C] border-opacity-55 rounded-md pr-7 focus:outline-none"
                              />
                            </div>
                            <div className="relative flex flex-col items-start w-full md:w-1/2">
                              <label htmlFor="phone" className="font-bold">
                                Phone*
                              </label>
                              <input
                                type="number"
                                name="phone"
                                id="phone"
                                placeholder="0123456789"
                                defaultValue={fundraiserDetails.phone}
                                onChange={handleChangeUpdate}
                                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
                              />
                              {/* <p className="absolute -bottom-6 text-sm  text-red-500" >{validationMessage}</p> */}
                            </div>
                          </div>
                          <div className="flex flex-col items-start w-full">
                            <label
                              htmlFor="fundraiserDescription"
                              className="font-bold"
                            >
                              Description*
                            </label>
                            <textarea
                              name="fundraiserDescription"
                              id="fundraiserDescription"
                              placeholder="Description....."
                              defaultValue={
                                fundraiserDetails.fundraiserDescription
                              }
                              onChange={handleChangeUpdate}
                              className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
                            />
                          </div>
                          <div className="w-full">
                            <input
                              type="file"
                              onChange={handleFileChangeUpdate}
                              className="flex items-center gap-5 px-4 py-2.5 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
                            />
                          </div>
                          <button className="gap-5 px-4 py-2.5 w-full bg-[#FF5C5C] text-lg font-bold text-white rounded-md focus:outline-none">
                            Update fundraiser
                          </button>
                        </form>
                      </Modal>
                      <button
                        className="hover:text-rose-600"
                        
                      >
                        <RiDeleteBin6Line title="delete" />
                      </button>
                    </>
                  ) : (
                    <button
                      className="flex items-center justify-center gap-2 text-xl bg-red-400 hover:bg-red-500 p-2 rounded-full"
                      onClick={copylink}
                    >
                      <HiLink size={20} color="white" />
                    </button>
                  )}
                </div>
              </div>
              
            </div>
            
            
            
            <div className="text-[16px] md:-mt-12 md:ml-[85px] ml-2  ">
              Be a catalyst for change – support our cause and become a{" "}
              <span className="text-red-500"> change agent</span> today.
            </div>

            <div className="text-[16px] pt-3 md:ml-[85px] ml-2 text-black  ">
            Category: <span className="font-bold text-[15px] text-red-500 underline">{fundraiserDetails?.category?.categoryName}</span>
            </div>
            

            <div className="py-4 md:mx-[84px]">
              <h1 className="text-red-500 text-xl font-extrabold">Narrative</h1>
              <p className="w-full">
                {fundraiserDetails.fundraiserDescription}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 my-4 ">
            {isUser ? (
              <div className="flex flex-col w-[340px] h-[450px] md:h-[430px] md:w-[380px] rounded-xl bg-white shadow-lg mr-5">
                <div className="flex flex-col gap-4 my-4">
                  <div className="w-full flex flex-col justify-center px-10">
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
                  <div className="w-full flex flex-col justify-center px-10">
                    <h1 className="text-md my-4 ml-16 font-semibold ">
                      Fundraiser Images
                    </h1>
                    <button
                      className="text-md text-blue-500 py-3 px-6 text-nowrap border border-blue-500 mx-10 rounded-xl font-semibold hover:bg-blue-500 hover:text-white "
                      onClick={showModal2}
                    >
                      Images
                    </button>
                    <Modal
                      title="Upload Images"
                      open={isModalOpen}
                      onCancel={handleCancel}
                      footer={null}
                    >
                      <div>
                        <form
                          action=""
                          className="flex flex-col items-center gap-5  py-5"
                        >
                          <input
                            type="file"
                            ref={imgUploadRef}
                            multiple
                            onChange={handleFileChange}
                            hidden
                            accept="image/*"
                          />

                          {images1?.length + fundraiserDetails.photos.length >=
                          6 ? (
                            " "
                          ) : (
                            <div
                              onClick={() => {
                                imgUploadRef.current.click();
                              }}
                              className="w-full h-[150px] bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-400 cursor-pointer"
                            >
                              Upload Images
                            </div>
                          )}

                          {images1?.length + fundraiserDetails.photos?.length >
                          6 ? (
                            <h1 className="text-red-500 font-bold">
                              *You can select only 6 images
                            </h1>
                          ) : (
                            <button
                              onClick={handleImageUpload}
                              className="text-xl px-4 py-2 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-md capitalize"
                              disabled={loading}
                            >
                              {loading ? "Uploading..." : "Upload"}
                            </button>
                          )}

                          <div className="flex flex-wrap gap-4 mt-5">
                            {images1?.map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  className="md:w-[100px] md:h-[100px] object-cover"
                                  src={URL.createObjectURL(image)}
                                  alt={`Selected image ${index + 1}`}
                                />
                                <button
                                  onClick={() => handleDeleteImage(index)}
                                  className="absolute top-0 right-0 bg-red-500 text-white px-1.5 rounded-full"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        </form>

                        {error && <p className="text-red-500">{error}</p>}

                        <DeleteFundraiserImages
                          fundraiserDetails={fundraiserDetails}
                        />
                      </div>
                    </Modal>
                  </div>

                  <AddDocuments fundraiserDetails={fundraiserDetails} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-[340px] h-[450px] md:h-[430px] md:w-[380px] rounded-xl bg-white shadow-lg mr-5 ">
                <span className="text-red-500 text-[25px] font-extrabold ml-12 mt-2  ">
                  Be a &quot;Change Agent&quot;
                </span>
                <div className="flex flex-row mt-3">
                  <FaHands size={20} className="ml-4 mt-2" />
                  <span className=" text-[15px] font-semibold tracking-wide ml-2 mt-2  ">
                    {" "}
                    Change agents
                  </span>
                  <span className="text-[13px] ml-24 mt-2 text-red-500 font-semibold">
                    69 Donators{" "}
                  </span>
                </div>

                <Link
                  to={`/donation-page/${fundraiserDetails.id}`}
                  className="bg-[#FF5C5C] text-center rounded-full text-white text-[25px] mt-6 mx-10 py-1 font-semibold hover:bg-[#da5151] "
                >
                  Donate now
                </Link>

                <div className="border-t border-black  mt-8 w-[280px] mx-6 "></div>

                <span className="text-[#2E9732] text-[25px] font-extrabold ml-8 mt-2">
                  Be a &quot;Change Catalyst&quot;
                </span>
                <div className="flex flex-row mt-3">
                  <FaHands size={20} className="ml-4 mt-2" />
                  <span className=" text-[15px] font-semibold tracking-wide ml-2 mt-2  ">
                    {" "}
                    Change catalysts
                  </span>
                  <span className="text-[13px] ml-24 mt-2 text-[#2E9732] font-semibold">
                    69 Shares{" "}
                  </span>
                </div>
                {/* https://api.whatsapp.com/send?text=Check%20out%20this%20fundraiser!%20https://yourdomain.com/fundraiser/ */}
                <Link to={`https://api.whatsapp.com/send?text=Check%20out%20this%20fundraiser!%20http://localhost:5173/fundraiser/${id}`} className="bg-[#2E9732] rounded-full text-white text-[25px] mt-6 mx-10 py-1 font-semibold hover:bg-[#42aa46] ">
                  Share now
                </Link>
              </div>
            )}

            <Tabs className="bg-white min-h-[600px] w-[340px] md:w-[380px] flex flex-col rounded-md">
              <TabList className="flex flex-row items-center justify-center md:justify-around  text-sm md:text-xl font-semibold w-full  bg-red-200 rounded-md">
                <Tab
                  className={
                    selectedHeadIndex === 0
                      ? "text-white underline bg-red-500 py-2 w-1/2 rounded-l-md"
                      : "text-black w-1/2 py-2 rounded-l-md"
                  }
                  onClick={() => setSelectedHeadIndex(0)}
                >
                  Images
                </Tab>
                <Tab
                  className={
                    selectedHeadIndex === 1
                      ? "text-white underline bg-red-500 py-2 w-1/2 rounded-l-md"
                      : "text-black w-1/2 py-2 rounded-l-md"
                  }
                  onClick={() => setSelectedHeadIndex(1)}
                >
                  Documents
                </Tab>
              </TabList>

              <TabPanels className=" h-full max-h-[700px] overflow-y-scroll no-scrollbar pt-5 ">
                {/* <TabPanel className="flex items-center justify-center">
                 
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-2 ">
                    SDVASDVASDVA
                  </div>
                
                </TabPanel> */}

                <TabPanel>
                  <div className="flex items-center justify-center p-2">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2  ">
                      {" "}
                      {fundraiserDetails?.photos?.map((image) => (
                        <img
                          key={image.id}
                          className="w-[75vw] md:w-[25vw] md:h-[30vh] object-cover"
                          src={`${VITE_BASE_IMAGE_URL}${image.photoUrl}`}
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="flex items-center justify-center p-2">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2  ">
                      {" "}
                      {fundraiserDetails?.documents?.map((documents) => (
                        <img
                          key={documents.id}
                          className="w-[75vw] md:w-[27vw] md:h-[30vh] object-cover"
                          src={`${VITE_BASE_IMAGE_URL}${documents.documentUrl}`}
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
        {isAdmin && <ApproveAdmin fundraiserDetails={fundraiserDetails} />}

        <div className="w-[90%] md:w-[90%]  flex flex-col md:flex-row gap-6 md:gap-96 my-8 md:ml-28 bg-[#FFE3E3] rounded-lg">
          <div className="py-4 px-2 ">
            <h1 className="text-2xl text-red-400 font-semibold text-nowrap">
              Support the Fundraiser
            </h1>
            <span className="">Every small share and donation count</span>
          </div>
          <div className="flex gap-4 py-4 md:ml-28 flex-col md:flex-row px-2  ">
            <button className="bg-white text-red-500 px-4 md:px-12 py-2 border-2 border-red-500 rounded-xl font-semibold hover:bg-red-500 hover:text-white">
              Share
            </button>
            <Link
              to={`/donation-page/${fundraiserDetails.id}`}
              className="bg-red-500 flex items-center justify-center text-white px-8 md:px-12 py-2 border-2 border-red-500 rounded-xl font-semibold hover:bg-red-600 "
            >
              Donate Now
            </Link>
          </div>
        </div>

        <div className="relative flex md:flex-row flex-col my-12 md:gap-32 gap-10 md:ml-24 ">
          <div className=" flex flex-col bg-[#FFEBEB] w-[360px] md:w-[600px] h-[540px] items-center justify-center rounded-lg">
            <h1 className="text-2xl mt-3 mb-6 text-red-500 border-b-2 border-spacing-2 border-dashed border-gray-500 font-semibold ">
              Change Agents
            </h1>

            {fundraiserDetails?.donations?.slice(0, 5).map((agent, index) => (
              <div key={index}>
                <div className="flex flex-row gap-10 my-2">
                  <FaCircleUser size={40} color="gray" className="mt-4" />
                  <div className="flex flex-col gap-1">
                    <p className="text-xl text-[#858585]">
                     
                      {agent.donorName}
                    </p>
                    <p>Donation: ${agent.donationAmount}</p>
                    <span className="text-gray-500 font-medium ">
                      Thank you for being a agent
                    </span>
                  </div>
                </div>
                <div className="border-t-2 border-gray-300 w-[280px] md:w-[450px]"></div>
              </div>
            ))}
            <button
              onClick={handleSeeMore}
              className="text-xl my-5 underline font-semibold "
            >
              See More
            </button>

            {showModal && (
              <div className="absolute  transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[100%] h-[100vh]  z-30">
                {" "}
                <div className=" absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[100%] h-[100vh] bg-[#f4f7f6da]"></div>{" "}
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-[540px] w-[300px] md:w-[500px] ">
                  {" "}
                  <RxCross2
                    size={30}
                    onClick={handleSeeMore}
                    className="relative z-50 cursor-pointer text-red-500 top-8 md:left-[450px] hover:text-red-800 "
                  />{" "}
                  <DonationListModal
                    fundraiserDetails={fundraiserDetails}
                    onClose={() => setShowModal(false)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className=" relative bg-[#FFEBEB] w-[320px] md:w-[400px] h-[180px] mx-4">
            <div className="relative flex flex-row gap-4 p-4  z-20">
              <FaCircleUser size={35} color="gray" className="mt-2" />
              <div className="flex flex-col ">
                <span className="font-semibold  text-gray-500">Created by</span>
                <span className="font-semibold hover:text-red-500 underline">
                  <Link to={`/user-profile/${fundraiserDetails?.postedBy?.id}`}>
                    {fundraiserDetails.postedBy
                      ? fundraiserDetails.postedBy.name
                      : "Anonymous"}
                  </Link>
                </span>
              </div>
            </div>
            <div className="absolute bg-black h-[70px] w-[2px] left-8 bottom-16 z-10"></div>
            <div className=" relative flex flex-row gap-4 p-4 z-20">
              <FaCircleUser size={35} color="gray" className="mt-2" />
              <div className="flex flex-col ">
                <span className="font-semibold  text-gray-500 ">
                  This Fundraiser will benifit
                </span>
                <span className="font-semibold">
                  {fundraiserDetails?.beneficiary
                    ? fundraiserDetails?.beneficiary
                    : "Anonymous"}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Fundraisers.propTypes = {
  benefactors: PropTypes.number.isRequired,
};

export default Fundraisers;
