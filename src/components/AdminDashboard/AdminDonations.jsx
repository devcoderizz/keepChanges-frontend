import { useEffect, useState } from "react"
import handleError from "../../utils/ErrorHandler";

const AdminDonations = () => {

  const [donationData, setDonationData] = useState([])

  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  useEffect(()=>{

    const getAllFundraisers = async () => {
      try {
        const res = await fetch(`${APIBASEURL}/admin/dashboard/donations/`, {
          method: "GET",
        });
        if (res.status !== 200) {
          handleError(res.status);
        }
        const data = await res.json();
        console.log("data", data);
        setDonationData(data)
      } catch (error) {
        console.log(error);
      }
    };
    getAllFundraisers();

  },[APIBASEURL])



  return (
    <div className="p-4  "  >
          <h1 className='text-3xl font-semibold my-4 ' >All Donations</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-14">
     <div className="h-[200px] md:w-[450px] bg-white p-4 rounded-2xl shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
       <div className="text-md font-bold">Total Raised
       <h1 className="text-5xl " > {donationData.sumOfRaised} </h1>
       </div>
     </div>
     <div className="md:ml-20 bg-white p-4 rounded-2xl h-[200px] w-[300px] md:w-[300px] shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
       <div className="text-md font-bold">Total Raise Goal 
       <h1 className="text-5xl " > {donationData.sumOfRaiseGoal} </h1>
       </div>
     </div>
     <div className="bg-white p-4 rounded-2xl h-[200px] md:w-[300px] shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
       <div className="text-md font-bold">Total Donations
       <h1 className="text-5xl " > {donationData.totalDonations} </h1>
       </div>
     </div>
   </div>
   <div className='my-4' >
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-14">
     <div className="h-[200px] md:w-[450px] bg-white p-4 rounded-2xl shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
       <div className="text-md font-bold">Total Donors 
       <h1 className="text-5xl " > {donationData.totalDonors} </h1>
       </div>
     </div>
     <div className="md:ml-20 bg-white p-4 rounded-2xl h-[200px] w-[300px] md:w-[300px] shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
       <div className="text-md font-bold">Total Donated Fundraisers
       <h1 className="text-5xl " > {donationData.donatedFundraisers} </h1>
       </div>
     </div>
     <div className="bg-white p-4 rounded-2xl h-[200px] md:w-[300px] shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
       <div className="text-md font-bold">Total Donation this week
       <h1 className="text-5xl " > {donationData.donationsThisWeek} </h1>
       </div>
     </div>
   </div>
 </div>
 </div>
  )
}

export default AdminDonations