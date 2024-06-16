import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/IsAuthenticated";
import handleError from '../utils/ErrorHandler'; 




const StartFundraiser = () => {
  const { fetchAccess, isAccessTokenValid } = useAuth();
  const navigate = useNavigate();
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [validationMessage, setValidationMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [displayImage, setDisplayImage] = useState(null);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
// console.log("form data", formData);
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  
  
  // const refreshToken = getCookie('refreshToken');

  // const validatePhoneNumber = (number) => {
  //   // A simple regex for validating phone numbers (e.g., 10 digits)
  //   const phoneRegex = /^[0-9]{10}$/;

  //   if (phoneRegex.test(number)) {
  //     setValidationMessage('Phone number is valid');
  //     setPhoneNumber(number);
  //   } else {
  //     setValidationMessage('Phone number is invalid');
      
  //   }
  // };
  // const handlePhoneChange = (event) => {
  //   const { value } = event.target;
  //   setPhoneNumber(value);
  //   validatePhoneNumber(value);
  // };



  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${APIBASEURL}/categories/getall`,{
          method: "GET",
          headers: {
            // "Authorization": `Bearer ${accessToken}I`,
          },
        });

        if(response.status!=200){
          handleError(response.status); 
          }
    
        const data = await response.json();
        const categories = data
         setCategories(categories); 
        console.log("categories",data)
      } catch (error) {
        
        console.error("Error fetching categories:", error);
      }
    };
    const today = new Date();
const minDate = new Date(today.setDate(today.getDate() + 15));
const maxDate = new Date(today.setDate(today.getDate() + 365)); // 1 year in the future

setMinDate(minDate.toISOString().split("T")[0]);
setMaxDate(maxDate.toISOString().split("T")[0]);
    fetchCategories();
  }, [APIBASEURL]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

 
  const handleFileChange = (e) => {
    setDisplayImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAccessTokenValid()) {
       await fetchAccess();

  }
  const accessToken =  localStorage.getItem("accessToken")

    const { fundraiserTitle, raiseGoal, endDate, id, email, phone, fundraiserDescription,beneficiary } = formData;

   
    const fundraiserData = {
        fundraiserTitle,
        raiseGoal,
        endDate,
        email,
        phone,
        fundraiserDescription,
        beneficiary
    };

    const payload = new FormData();
    payload.append("fundraiserData", JSON.stringify(fundraiserData));
    

    if (displayImage) {
        payload.append("displayImage", displayImage);
    }

 
    payload.append("categoryId", id);

    console.log("payload" , payload);

    try {
      const response = await fetch(`${APIBASEURL}/fundraisers/add`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`, 
        },
        body: payload,
      });


      console.log("payload", payload)
      const data = await response.json();
      // console.log("response", response);

      const urlParams = new URLSearchParams(location.search);
      if(response.status!=200){
        handleError(response.status); 
        }
  
      if (response.ok) {
        toast.success("Fundraiser created successfully!");
        urlParams.set('fundraiserId', data.id);
        navigate(`/fundraisers/${data.id}`)
      } else {
        // toast.error(data.error || "Error creating fundraiser");
      }
   

    } catch (error) {
      console.error("Error creating fundraiser:", error);
  
    }
};


  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-2xl flex flex-col items-center gap-10 py-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#FF5C5C] tracking-wide">
            Start your fundraiser
          </h1>
          <p className="text-sm font-normal w-full max-w-xs text-center">
            *You have the flexibility to update these details whenever you choose.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-[80%] flex flex-col items-center gap-4 p-5">
          <div className="flex flex-col items-start w-full">
            <label htmlFor="fundraiserTitle" className="font-bold">Fundraiser Title*</label>
            <input
             required
              type="text"
              name="fundraiserTitle"
              id="fundraiserTitle"
              placeholder="Give your fundraiser a name"
              value={formData.fundraiserTitle}
              onChange={handleChange}
              className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="Beneficiary" className="font-bold">Beneficiary*</label>
            <input
             required
              type="text"
              name="beneficiary"
              id="beneficiary"
              placeholder="This fundraiser will benefit"
              value={formData.beneficiary}
              onChange={handleChange}
              className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
            <div className="relative flex flex-col items-start w-full md:w-1/2">
              <label htmlFor="raiseGoal" className="font-bold">Goal*</label>
              <input
               required
                type="number"
                name="raiseGoal"
                id="raiseGoal"
                placeholder="Amount in Rupees"
                value={formData.raiseGoal}
                onChange={handleChange}
                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md pr-7 focus:outline-none"
              />
              <p className="absolute bottom-2.5 right-3 font-bold">₹</p>
            </div>
            <div className="flex flex-col items-start w-full md:w-1/2">
              <label htmlFor="endDate" className="font-bold">End date*</label>
              <input
               required
                type="date"
                name="endDate"
                id="endDate"
                placeholder="mm/dd/yyyy"
                value={formData.endDate}
                onChange={handleChange}
                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
                min={minDate}
                max={maxDate}
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="categoryName" className="font-bold">Category*</label>
            <select
             required
              name="id"
              id="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Select category"
              className="p-2.5 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
            >
              <option  >
              Select category
                </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
            <div className="flex flex-col items-start w-full md:w-1/2">
              <label htmlFor="email" className="font-bold">Email*</label>
              <input
               required
                // type="email"
                name="email"
                id="email"
                placeholder="abc@xyz.com"
                value={formData.email}
                onChange={handleChange}
                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md pr-7 focus:outline-none"
              />
            </div>
            <div className="relative flex flex-col items-start w-full md:w-1/2">
              <label htmlFor="phone" className="font-bold">Phone*</label>
              <input
              required
                type="number"
                name="phone"
                id="phone"
                placeholder="0123456789"
                value={formData.phone}
                   onChange={handleChange}
                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
              />
              {/* <p className="absolute -bottom-6 text-sm  text-red-500" >{validationMessage}</p> */}
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="fundraiserDescription" className="font-bold">Description*</label>
            <textarea
            required
              name="fundraiserDescription"
              id="fundraiserDescription"
              placeholder="Description....."
              value={formData.fundraiserDescription}
              onChange={handleChange}
              className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
            />
          </div>
          <div className="w-full">
            <input
            required
              type="file"
              onChange={handleFileChange}
              className="flex items-center gap-5 px-4 py-2.5 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
            />
          </div>
          <button className="gap-5 px-4 py-2.5 w-full bg-[#FF5C5C] text-lg font-bold text-white rounded-md focus:outline-none">
            Create fundraiser
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartFundraiser;
