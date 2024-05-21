import { useState, useEffect } from "react";
import toast from "react-hot-toast";


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}


const StartFundraiser = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    fundraiserTitle: "",
    raiseGoal: "",
    endDate: "",
    id: "",
    email: "",
    phone: "",
    fundraiserDescription: "",
  });
  const [displayImage, setDisplayImage] = useState(null);

  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  const accessToken =  localStorage.getItem("accessToken")
  const refreshToken = getCookie('refreshToken');
  console.log("token",accessToken)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${APIBASEURL}/categories/getall`,{
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}I`,
          },
        });


        const data = await response.json();
        const categories = data
         setCategories(categories); 
        console.log("categories",data)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [APIBASEURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

 
  const handleFileChange = (e) => {
    setDisplayImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fundraiserTitle, raiseGoal, endDate, id, email, phone, fundraiserDescription } = formData;

   
    const fundraiserData = {
        fundraiserTitle,
        raiseGoal,
        endDate,
        email,
        phone,
        fundraiserDescription
    };

    const payload = new FormData();
    payload.append("fundraiserData", JSON.stringify(fundraiserData));
    

    if (displayImage) {
        payload.append("displayImage", displayImage);
    }

 
    payload.append("categoryId", id);

    try {
      const response = await fetch(`${APIBASEURL}/fundraisers/add`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdW11a2g5MDM2QGdtYWlsLmNvbSIsImlhdCI6MTcxNjMwMDExMiwiZXhwIjoxNzE2Mzg2NTEyfQ.Kst2r17Sv_APciQt8MTT33rRv09Pn0c6ZbH6qznt_fhv8HqPHL0T3v6AwwO_KhDI`, 
        },
        body: payload,
      });

      console.log("payload", payload)
      const data = await response.json();
      // console.log("response", response);

      if (response.ok) {
        toast.success("Fundraiser created successfully!");
      } else {
        toast.error(data.error || "Error creating fundraiser");
      }
    } catch (error) {
      console.error("Error creating fundraiser:", error);
      toast.error("An error occurred. Please try again.");
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
              type="text"
              name="fundraiserTitle"
              id="fundraiserTitle"
              placeholder="Give your fundraiser a name"
              value={formData.fundraiserTitle}
              onChange={handleChange}
              className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
            <div className="relative flex flex-col items-start w-full md:w-1/2">
              <label htmlFor="raiseGoal" className="font-bold">Goal*</label>
              <input
                type="text"
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
                type="date"
                name="endDate"
                id="endDate"
                placeholder="mm/dd/yyyy"
                value={formData.endDate}
                onChange={handleChange}
                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="categoryName" className="font-bold">Category*</label>
            <select
              name="id"
              id="id"
              value={formData.id}
              onChange={handleChange}
              className="p-2.5 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
            >
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
                type="email"
                name="email"
                id="email"
                placeholder="abc@xyz.com"
                value={formData.email}
                onChange={handleChange}
                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md pr-7 focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-start w-full md:w-1/2">
              <label htmlFor="phone" className="font-bold">Phone*</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="0123456789"
                value={formData.phone}
                onChange={handleChange}
                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="fundraiserDescription" className="font-bold">Description*</label>
            <textarea
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
