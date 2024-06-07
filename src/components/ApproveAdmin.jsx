import { useState } from "react";
import useAuth from "../utils/IsAuthenticated";
import handleError from "../utils/ErrorHandler";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";


const ApproveAdmin = ({fundraiserDetails}) => {
    const APIBASEURL = import.meta.env.VITE_API_BASEURL;
    const { fetchAccess, isAccessTokenValid } = useAuth();
    const [approvalFormData, setApprovalFormData] = useState("")


    

    const handleChange = (e) => {
        setApprovalFormData({
          ...approvalFormData,
          [e.target.id]: e.target.value,
        });
      };

      console.log("handle change" , approvalFormData);

      const HandleApproval =async()=>{

        if (!isAccessTokenValid()) {
            await fetchAccess();
     
       }
       const accessToken =  localStorage.getItem("accessToken")
        const { adminRemark, adminStatus  } = approvalFormData;

   
  
    
        const payload = new FormData();
        payload.append("adminRemarks", JSON.stringify(adminRemark));
        
        payload.append("adminStatus",adminStatus);
        console.log("admin status ", adminStatus);
    
        console.log("payload" , payload);

        try {
            const response = await fetch(`${APIBASEURL}/admin/fundraisers/fundraiser_${fundraiserDetails.id}`, {
              method: "PATCH",
              headers: {
                "Authorization": `Bearer ${accessToken}`, 
              },
              body: payload,
            });
      
      
            console.log("payload", approvalFormData)
            const data = await response.json();
           
            if(response.status!=200){
              handleError(response.status); 
              }
        
            if (response.ok) {
              toast.success("Fundraiser Approved successfully!");
            // window.location.reload(false)
              // Navigate(`/fundraisers/${data.id}`)
            } else {
              toast.error(data.error || "Error Approving fundraiser");
            }
         
      
          } catch (error) {
            console.error("Error Approving fundraiser:", error);
        
          }


      }



    
  return (
    <form className="w-[90%] md:w-[90%]  flex flex-col-reverse md:flex-row gap-6 md:gap-20 my-8 md:ml-28 bg-[#FFE3E3] rounded-lg">
            <div className="flex flex-col gap-2 px-4 my-4">
              <h1 className="text-lg font-bold">Review Fundraiser</h1>
              <textarea
              onChange={handleChange}
              id="adminRemark"
              defaultValue={fundraiserDetails?.adminRemarks}
                className="resize-none  rounded-md p-2 border-red-500 border-2  focus:border-[#ab4543]  "
                rows="4"
                cols="70"
                placeholder="Enter your message..."
              />
              
              <button type="button" onClick={HandleApproval} className="text-md text-white py-3 md:mr-96 mt-1 border border-red-500 bg-red-500 rounded-xl font-semibold hover:bg-red-600 ">
                Submit
              </button>
            </div>
            <div className="flex flex-col gap-2 my-4 px-4">
              <h1 className="text-lg font-semibold">Set Status</h1>
              <select
                id="adminStatus"
                name="adminStatus"
                defaultValue={fundraiserDetails.approval}
                onChange={handleChange}
                className="w-[300px] md:w-[400px] h-[40px] rounded-md p-2 "
              >
                <option >
                 Select Admin Status
                </option>
                <option value="APPROVED" className="font-semibold">
                 APPROVED
                </option>
                <option value="DISAPPROVED" className="font-semibold">
                DISAPPROVED
                </option>
                
              </select>
            </div>
          </form>
  )
}

export default ApproveAdmin