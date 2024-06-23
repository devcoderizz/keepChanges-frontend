import { useEffect, useState } from "react";
import handleError from "../utils/ErrorHandler";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../utils/IsAuthenticated";
import { Popconfirm, message } from "antd";

const FundraiserOptions = () => {
  const { id } = useParams();
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
  const [fundraiserDetails, setFundraiserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const { fetchAccess, isAccessTokenValid } = useAuth();
  const navigate = useNavigate();

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const deleteCategory = () => {
    handleDeleteFundraiser();
  };
  const HandleShow = () => {
    setShowPasswordInput(true);
  };
  const handleRequest = () => {
    alert("request done");
  };

  useEffect(() => {
    const getFundraiser = async () => {
      try {
        const res = await fetch(`${APIBASEURL}/fundraisers/fundraiser_${id}`, {
          method: "GET",
        });
        if (res.status !== 200) {
          handleError(res.status);
        }
        const data = await res.json();
        setFundraiserDetails(data);
      } catch (error) {
        console.log(toast.error(error));
      }
    };
    getFundraiser();
  }, [APIBASEURL]);

  const handleDeleteFundraiser = async () => {
    setLoading(true);
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await fetch(`${APIBASEURL}/fundraisers/fundraiser_${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status != 200) {
        handleError(res.status);
      }
      const data = res.json();
      console.log(data);
      navigate("/");
      toast.success("Fundraiser Deleted");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start py-10 px-4 md:px-0">
      <div className="w-full md:w-[900px] flex flex-col items-start justify-start gap-5">
        <div className="w-full h-auto bg-red-100 rounded-md p-5 flex flex-col md:flex-row items-start md:items-center justify-around shadow">
          <h1 className="text-lg md:text-2xl capitalize font-bold flex flex-col text-red-500">
            Delete Your Fundraiser From Here
            <span className="text-[10px] md:text-[12px] font-semibold text-black">
              Once you delete the fundraiser, it cannot be undone
            </span>
          </h1>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => deleteCategory()}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            className="w-full md:w-[180px]  "
          >
            <button className="relative px-3 py-2 mt-4 md:mt-0 text-lg font-bold hover:bg-red-500 border-red-400 border-2 hover:text-white rounded-lg">
              {loading ? "Deleting Fundraiser" : "Delete Fundraiser"}
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-400 rounded-full">
                <div className="animate-ping h-3 w-3 bg-white rounded-full"></div>
              </div>
            </button>
          </Popconfirm>
        </div>

        <div className="w-full flex flex-col-reverse md:flex-row gap-5  justify-between">
          <div className="w-full md:w-[350px] h-auto pb-6 flex flex-col gap-2 bg-white shadow-xl rounded-md p-2">
            <div className="w-full h-[200px] rounded-md overflow-hidden">
              <img
                src={`${VITE_BASE_IMAGE_URL}${fundraiserDetails.displayPhoto}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-[18px] font-bold px-2">
              {fundraiserDetails?.fundraiserTitle}
            </h1>
            <h1 className="text-[15px] px-2 font-semibold">
              Raised{" "}
              <span className="text-red-500">
                {" "}
                Rs {fundraiserDetails.raised} -{" "}
              </span>{" "}
              of Rs {fundraiserDetails?.raiseGoal}
            </h1>
            <div className="w-full h-auto">
              <div className="px-2">
                <div className="mt-5 flex flex-col items-start justify-between gap-2 font-extrabold text-[15px]">
                  <h1>Input Money</h1>
                  <input
                    type="number"
                    required
                    placeholder="Enter Money"
                    className="w-full border-2 border-red-400 p-2 rounded-lg"
                  />
                  {showPasswordInput && (
                    <>
                      <h1>Confirm Password</h1>
                      <input
                        type="text"
                        required
                        placeholder="Enter Password"
                        className="w-full border-2 border-red-400 p-2 rounded-lg"
                      />
                    </>
                  )}
                </div>
                <button
                  className="w-full flex items-center justify-center mt-2 gap-2 p-2 bg-red-500 hover:bg-red-600 rounded-md text-white text-[18px] font-bold"
                  onClick={showPasswordInput ? handleRequest : HandleShow}
                >
                  {showPasswordInput ? "Submit" : "Request Money"}
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[350px] h-auto flex flex-col items-center gap-4 bg-red-200 shadow-lg rounded-lg p-4 ">
  <h1 className="text-xl font-semibold text-gray-800 mb-2">Money Requests</h1>
  <div className="w-full h-[350px] bg-white bg-opacity-40 rounded-lg flex flex-col gap-3 p-3 overflow-y-scroll">
    <div className="px-2 py-1 border-b-[1px] border-gray-300 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xs font-medium text-gray-700">Request for Money</h1>
          <h1 className="text-lg text-red-600 font-bold">Rs 10,000</h1>
        </div>
        <div className="font-bold w-[90px] text-center bg-green-500 text-white py-2 rounded-md shadow-sm text-xs">
          APPROVED
        </div>
      </div>
      <h1 className="text-xs text-gray-500 text-right flex items-center justify-between"><span className="text-red-500 font-bold">Approved by Admin</span> <span>12/05/2024</span></h1>
    </div>
    <div className="px-2 py-1 border-b-[1px] border-gray-300 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xs font-medium text-gray-700">Request for Money</h1>
          <h1 className="text-lg text-red-600 font-bold">Rs 10,000</h1>
        </div>
        <div className="font-bold w-[90px] text-center bg-red-500 text-white py-2 rounded-md shadow-sm text-xs">
          REJECTED
        </div>
      </div>
      <h1 className="text-xs text-gray-500 text-right flex items-center justify-between"><span className="text-red-500 font-bold">Rejected by Admin</span> <span>12/05/2024</span></h1>
    </div>
    <div className="px-2 py-1 flex flex-col gap-1  ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xs font-medium text-gray-700">Request for Money</h1>
          <h1 className="text-lg text-red-600 font-bold">Rs 10,000</h1>
        </div>
        <div className="font-bold w-[90px] text-center bg-yellow-500 text-white py-2 rounded-md shadow-sm text-xs">
          PENDING
        </div>
      </div>
      <h1 className="text-xs text-gray-500 text-right flex items-center justify-between"><span className="text-red-500 font-bold">Pending</span> <span>12/05/2024</span></h1>
    </div>
    <div className="px-2 py-1 flex flex-col gap-1  ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xs font-medium text-gray-700">Request for Money</h1>
          <h1 className="text-lg text-red-600 font-bold">Rs 10,000</h1>
        </div>
        <div className="font-bold w-[90px] text-center bg-yellow-500 text-white py-2 rounded-md shadow-sm text-xs">
          PENDING
        </div>
      </div>
      <h1 className="text-xs text-gray-500 text-right flex items-center justify-between"><span className="text-red-500 font-bold">Pending</span> <span>12/05/2024</span></h1>
    </div>
    <div className="px-2 py-1 flex flex-col gap-1  ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xs font-medium text-gray-700">Request for Money</h1>
          <h1 className="text-lg text-red-600 font-bold">Rs 10,000</h1>
        </div>
        <div className="font-bold w-[90px] text-center bg-yellow-500 text-white py-2 rounded-md shadow-sm text-xs">
          PENDING
        </div>
      </div>
      <h1 className="text-xs text-gray-500 text-right flex items-center justify-between"><span className="text-red-500 font-bold">Pending</span> <span>12/05/2024</span></h1>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default FundraiserOptions;
