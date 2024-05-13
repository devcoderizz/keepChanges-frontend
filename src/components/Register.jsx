import { useSetRecoilState } from "recoil";
import { authScreenAtom } from "../atom/authAtom";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "../Yup schema/Schema";
import toast, { Toaster } from "react-hot-toast";


const Register = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [Verify, setVerify] = useState(false);
  const [formData, setFormData] = useState({});
  const [otp, setOtp] = useState(null);
  const { password, ...otpData } = formData;
  const [error, setError] = useState(null);
  // console.log(otpData);
  const navigate = useNavigate();

  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  // const initialValues = {
  //   name: "",
  //   email: "",
  //   number:"",
  //   password: "",

  // };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleOtp = (e) => {
    setOtp({
      ...otp,
      [e.target.id]: e.target.value,
    });
  };
  console.log(otp);
  const { errors, handleBlur } = useFormik({
    // initialValues: initialValues,
    validationSchema: registerSchema,
    // onSubmit: (values) => {
    //   console.log(values);
    //   setVerify(!Verify)

    // },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setVerify(!Verify);
    console.log(formData);
    console.log("otpdata", otpData)
    try {
      const res = await fetch(`${APIBASEURL}/api/auth/verification/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otpData),
      });
      console.log(otpData);
      const data = await res.json();
      console.log(data);
      if (data.error) {
        console.log("error");
        return;
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${APIBASEURL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        // Display toast message with error from the server
    
        toast.error(data.error);
        
        
        return;
      }

      if (data.error) {
        console.error("Error:", data.error);
        return;
      }

      console.log(data);
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${APIBASEURL}/api/auth/verification/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(otp),
        }
      );

      const data = await res.json();
      
      if (res.status === 200) {
        toast.success(res.message);
      }

      // console.log(data);
      if (data.error) {
        console.log("error");
        return;
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleServerResponse = async () => {
  //   try {
  //     // Your API call here
  //     const response = await fetch(
  //       `${APIBASEURL}/api/auth/verification/verify-otp`
  //     );

  //     if (!response.ok) {
  //       const responseData = await response.json();

  //       if (response.status === 409) {
  //         toast.error(responseData.message);
  //       } else {
  //         setError(responseData.message);
  //       }
  //     } else {
  //       // Handle success
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setError("An error occurred, please try again.");
  //   }
  // };

  return (
    <div className=" w-full h-[89.5vh] flex items-center justify-center">
      <div className=" md:w-[900px] md:h-[85vh] flex flex-col items-center justify-center md:flex-row border-2 border-[#FF5C5C] ">
        <div className="w-full md:w-1/2 h-full bg-[#FF5C5C] flex flex-col items-center justify-start gap-5 p-10">
          <h1 className="h-10 text-xl font-bold text-white text-center">
            One step closer to becoming a <br /> change agent.
          </h1>
          <img
            src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715070413/wheel.png"
            alt="wheel"
            className=" hidden md:block w-[370px]"
          />
        </div>

        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-start gap-10 md:gap-0 p-5">
          <h1 className="text-3xl md:text-2xl font-extrabold text-[#FF5C5C]">
            Signup
          </h1>
          <form
            onSubmit={handleSubmit}
            className=" w-full h-full flex flex-col justify-center items-center gap-5"
          >
            <div className="flex flex-col justify-center items-center gap-7">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  required
                  className="w-[270px] p-2.5 rounded-full focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 "
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="absolute -bottom-5 left-20 text-[12px] text-rose-400 font-bold ">
                  {errors.name}
                </p>
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="email"
                  required
                  className="w-[270px] py-2.5 pl-2.5   rounded-full focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 "
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="absolute -bottom-5 left-20 text-[12px] text-rose-400 font-bold ">
                  {errors.email}
                </p>
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Mobile No."
                  name="phone"
                  required
                  className="w-[270px] p-2.5 rounded-full focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 "
                  id="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="absolute -bottom-5 left-16 text-[12px] text-rose-400 font-bold ">
                  {errors.phone}
                </p>
              </div>
              <div className="relative h-[70px]">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  className="w-[270px] p-2.5 rounded-full focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 "
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="absolute -bottom-15 left-10 text-[12px] text-rose-400 font-bold ">
                  {errors.password}
                </p>
              </div>

              <div className="flex flex-col items-start">
                <button className="w-[270px] px-2.5 py-2 rounded-full bg-[#FF5C5C] text-2xl font-bold text-white ">
                  Signup
                </button>
              </div>
            </div>
            <h1 className="text-[15px] font-bold">
              Already have an account ?{" "}
              <Link
                onClick={() => setAuthScreen("login")}
                className="text-[#FF5C5C]"
              >
                Login
              </Link>{" "}
            </h1>
          </form>
        </div>
        {Verify && (
          <div className="absolute w-screen h-[100vh] z-10 flex items-center top-0  ">
            <div className="absolute bg-gray-500 w-screen h-[100vh] z-10   opacity-50    "></div>
            <div className="absolute bg-white md:w-[500px] md:h-[400px] z-20 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-10 flex flex-col items-center gap-5     ">
              <h1 className="  text-xl font-bold text-[#FF5C5C] ">Enter OTP</h1>
              <form
                action=""
                onSubmit={handleVerifyOtp}
                className=" flex flex-col gap-5 items-center "
              >
                <div>
                  <input
                    type="number"
                    placeholder="OTP"
                    name="otp"
                    id="otp"
                    maxLength={6}
                    onChange={handleOtp}
                    className="w-[270px] p-2.5 rounded-full focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 "
                  />

                  <p className="text-[12px] text-right font-bold hover:text-[#FF5C5C] hover:underline cursor-pointer">
                    Resend OTP
                  </p>
                </div>

                <button className="w-[270px] px-2.5 py-2 rounded-full bg-[#FF5C5C] text-xl font-bold text-white ">
                  Verify OTP
                </button>

                <button
                  onClick={handleRegister}
                  className="w-[270px] px-2.5 py-2 rounded-full bg-[#FF5C5C] text-xl font-bold text-white "
                >
                  Signup
                </button>
               
                <p className={`text-red-600 font-bold `}>Incorrect OTP</p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
