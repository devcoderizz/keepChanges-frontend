import { useEffect, useState } from "react";
import useAuth from "../utils/IsAuthenticated";
import handleError from "../utils/ErrorHandler";

const PancardDetails = ({ id }) => {
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  const [isPanDetails, setIsPanDetails] = useState([]);
  const { fetchAccess, isAccessTokenValid } = useAuth();
  // const localData = JSON.parse(localStorage.getItem("UserData"));

  console.log("pandata", isPanDetails);

  useEffect(() => {
    const PanDetails = async () => {
      if (!isAccessTokenValid()) {
        await fetchAccess();
      }

      try {
        const res = await fetch(`${APIBASEURL}/pans/user/${id}`, {
          method: "GET",
          headers: {},
        });
        const data = await res.json();
        console.log("pan data", data);
        setIsPanDetails(data);
        if (res.status != 200) {
          handleError(res.status);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    PanDetails();
  }, [APIBASEURL, id]);

  return (
    <div className="w-[300px] flex flex-col items-center text-base font-medium gap-4 bg-gray-100 py-3 rounded-lg">
        <h1 className="text-red-400 text-lg font-bold">PAN DETAILS</h1>
      <div className="flex flex-col w-full max-w-sm">
        <div className="border-b px-3 py-1 border-blue-300">
          <span className="block text-gray-600">PAN Number</span>
          <span className="text-blue-600 font-bold">
            {isPanDetails.panNumber}
          </span>
        </div>
        <div className="border-b px-3 py-1 border-blue-300">
          <span className="block text-gray-600">Name On PAN</span>
          <span className="text-blue-600 font-bold">
            {isPanDetails.nameOnPan}
          </span>
        </div>
        <div className="border-b px-3 py-1 border-blue-300">
          <span className="block text-gray-600">Address</span>
          <span className="text-blue-600 font-bold">
            {isPanDetails.address}
          </span>
        </div>
        <div className="border-b px-3 py-1 border-blue-300">
          <span className="block text-gray-600">City</span>
          <span className="text-blue-600 font-bold">{isPanDetails.city}</span>
        </div>
        <div className="border-b px-3 py-1 border-blue-300">
          <span className="block text-gray-600">State</span>
          <span className="text-blue-600 font-bold">{isPanDetails.state}</span>
        </div>
        <div className="border-b px-3 py-1 border-blue-300">
          <span className="block text-gray-600">Country</span>
          <span className="text-blue-600 font-bold">
            {isPanDetails.country}
          </span>
        </div>
        <div className="px-3 py-1">
          <span className="block text-gray-600">Pincode</span>
          <span className="text-blue-600 font-bold">
            {isPanDetails.pincode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PancardDetails;
