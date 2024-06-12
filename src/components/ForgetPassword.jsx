import { useState } from "react";
import handleError from "../utils/ErrorHandler";
import useAuth from "../utils/IsAuthenticated";

const ForgetPassword = () => {
    const APIBASEURL = import.meta.env.VITE_API_BASEURL;
    const { fetchAccess, isAccessTokenValid } = useAuth();
    const [emailInput, setEmailInput] = useState(null)
    const [emailResponse, setEmailResponse] = useState("")
    const [otpPayload, setOtpPayload] = useState("")


    console.log("otp payload", otpPayload);

   

    const handleChange = (e) => {
        setEmailInput({
          ...emailInput,
          [e.target.id]: e.target.value,
        });
      };

      console.log("email", emailInput);

    const handleEmail = async () => {
        // e.preventDefault()
        if (!isAccessTokenValid()) {
          await fetchAccess();
        }

    //     const payload = new FormData();
       

    // const userUpdateData = {
    //   name,
    //   email,
    //   phone,
    // };
 
    // payload.append(JSON.stringify(userUpdateData));


        
  
        try {
            const res = await fetch(
                `${APIBASEURL}/users/user/${emailInput?.email1}`,
                {
                  method: "GET",
                  headers: {},
                }
              );
              
              if(res.status===200){
                  
                  const data = await res.json();
                  setEmailResponse(data)
            const{name , email ,phone} = data
            const action = "reset-password"
            console.log("name,email,phone", name,email,phone,action);

            const res2 = await fetch(
                `${APIBASEURL}/auth/verification/send-otp`,
                {
                  method: "POST",
                  headers: {"Content-Type": "application/json",},
                  body: JSON.stringify({name,email,phone,action}),
                }
                
              );
          const data2 = await res2.json();
          console.log("data2",data2);

          }
  
         
          if (res.status != 200) {
            handleError(res.status);
            return;
          }
        } catch (error) {
          console.log(error);
        }
      };





  return (
    <div className="h-[450px] w-full flex items-center justify-center ">
        <div className="w-full h-full py-5 flex flex-col items-center justify-center gap-10 ">
            <h1 className="text-3xl text-red-500 font-semibold">Enter Your Email</h1>
        <div className="flex flex-col md:flex-row items-center w-full gap-5 md:gap-0 md:w-[40%]">
              <input
                type="text"
                placeholder="Email"
               id="email1"
                onChange={handleChange}
                className="border-2 border-red-300 rounded-full flex-grow outline-none px-4 sm:px-12 py-2 sm:py-3 bg-transparent rounded-l-full rounded-r-full md:rounded-r-none"
              />
              <button
                onClick={handleEmail}
                className="bg-red-500 text-sm md:text-xl hover:bg-red-600 text-white px-5 sm:px-7 py-3 md:py-2.5 rounded-r-full border-2 border-red-500 rounded-l-full md:rounded-l-none focus:outline-none"
              >
                Send OTP
              </button>
            </div>
        </div>
    </div>
  )
}

export default ForgetPassword