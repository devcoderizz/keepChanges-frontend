import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import useAuth from "../utils/IsAuthenticated";
import handleError from "../utils/ErrorHandler";
import toast from "react-hot-toast";

const DonationPage = () => {
  const { id } = useParams();
  // const { fetchAccess, isAccessTokenValid } = useAuth();
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
  const [donationInput, setDonationInput] = useState("");
  const [fundraiserDetails, setFundraiserDetails] = useState({});
  const [tipFormData, setTipFormData] = useState({});
  console.log("donation", donationInput);
  console.log("donationTip", tipFormData);
  console.log(fundraiserDetails);

  const handleChange = (e) => {
    setDonationInput({
      ...donationInput,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeTip = (e) => {
    setTipFormData({
      ...tipFormData,
      [e.target.id]: e.target.value,
    });
  };

  function calculatePercentage(base, percentage) {
    if (typeof base !== "number" || typeof percentage !== "number") {
      throw new Error("Both arguments must be numbers");
    }
    return Math.round(base * percentage) / 100;
  }

  const tip = calculatePercentage(
    Number(donationInput.Donation),
    Number(tipFormData.tip)
  );
  const total = Number(tip ) + Number(donationInput.Donation);

  useEffect(() => {
    const getFundraiser = async () => {
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
      } catch (error) {
        console.log(toast.error(error));
      }
    };
    getFundraiser();
  }, [APIBASEURL, id]);

  return (
    <div className="w-full md:h-screen h-full flex  items-center justify-center">
      <div className=" w-[900px] md:h-screen h-full flex flex-col-reverse md:flex-row items-center md:items-start gap-5 py-10 md:py-20">
        <div className="w-[350px] h-[470px] flex flex-col gap-2 bg-white shadow-xl rounded-md p-2">
          <div className="w-full h-[200px] rounded-md overflow-hidden">
            <img
              src={`${VITE_BASE_IMAGE_URL}${fundraiserDetails.displayPhoto}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-[15px] font-semibold px-2 ">
            {fundraiserDetails.fundraiserTitle}
          </h1>
          <h1 className="text-[12px] px-2 font-semibold ">Raised <span className="text-red-500"> Rs {fundraiserDetails.raised}</span> of Rs {fundraiserDetails.raiseGoal}</h1>
          <div className="w-full h-[200px]">
            <div className="w-full h-[75px] border-y-[2px] border-[#C9C9C9] flex flex-col justify-center gap-2 my-2">
              <div className=" flex items-center justify-between px-2 font-semibold text-[15px]">
                <h1>Donation Amount</h1>{" "}
                <span className="text-red-500">
                  ₹ {donationInput ? donationInput?.Donation : "000"}
                </span>
              </div>
              <div className=" flex items-center justify-between px-2 font-semibold text-[15px]">
                <h1>Give Tip : {tipFormData.tip}</h1>{" "}
                <span className="text-red-500">₹ {tip ? tip : "000"}</span>
              </div>
            </div>
            <div>
              <div className=" flex items-center justify-between px-2 font-extrabold text-[15px]">
                <h1>Total Donation</h1>{" "}
                <span className="text-red-500">₹ {total ? total : "000"}</span>
              </div>
              <button className="w-full flex  items-center justify-center mt-5  gap-2 p-2 bg-red-500 hover:bg-red-600 rounded-md text-white text-[15px] font-bold">
                Proceed to pay ₹{total ? total : "000"} --
              </button>
            </div>
          </div>
        </div>
        <div className="  flex flex-col h-[270px]  gap-5  ">
          <div className="w-[300px] md:w-[500px] h-[200px] p-5 flex flex-col gap-3  ">
            <h1 className="text-xl font-bold ">Donation amount</h1>
            <input
              onChange={handleChange}
              type="number"
              id="Donation"
              placeholder="Enter Some Amount"
              className="w-full p-2.5 rounded-lg focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 text-red-500 font-semibold"
            />
            <div className="flex  items-center justify-between pr-5">
              <div className="flex font-semibold text-sm px-2">
                <h1>Give Tip:</h1>
                <select
                  onClick={handleChangeTip}
                  name="tip"
                  id="tip"
                  required
                  className="w-[50px] bg-transparent text-red-500 focus:outline-none"
                >
                  <option required value="8">8%</option>
                  <option value="10">10%</option>
                  <option value="12">12%</option>
                </select>
              </div>
              <span className="text-red-500 font-semibold">
                ₹ {tip ? tip : "000"}
              </span>
            </div>
            <button className="w-full flex  items-center justify-center mt-5  gap-2 p-2 bg-red-500 hover:bg-red-600 rounded-md text-white text-[15px] font-bold">
              Proceed to pay ₹{total ? total : "000"} --
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
