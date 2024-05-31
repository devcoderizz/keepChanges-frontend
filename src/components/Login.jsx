import Cookies from 'js-cookie';
import { useSetRecoilState } from "recoil";
import { authScreenAtom } from "../atom/authAtom";
import { Link  } from "react-router-dom";
import { useState } from "react";
// import toast from "react-hot-toast";
import handleError from '../utils/ErrorHandler'; 
const Login = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [formData, setFormData] = useState({});
  const APIBASEURL= import.meta.env.VITE_API_BASEURL
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(null)
   

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch(`${APIBASEURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if(res.status!=200){
        handleError(res.status); 
        }
      const data = await res.json();
      console.log(data);
      if (res.status === 401) {
        setErrorMessage("Invalid User Credentials")
        setLoading(false)
        return;
      }
  
      const { accessToken, refreshToken } = data;
      console.log("access", accessToken);
      console.log("refresh", refreshToken);
  
      Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'strict' });
      // Retrieve the refresh token from the cookie
      const storedRefreshToken = Cookies.get('refreshToken');
      console.log("Stored refresh token:", storedRefreshToken);
      localStorage.setItem("accessToken", accessToken)
  
      // Use setTimeout to delay the execution of the next API call
      if(res.status===200){
      

   
      setTimeout(async () => {
        try {
          const res = await fetch(`${APIBASEURL}/users/user/me`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            },
          });
  
          const userInfo = await res.json();
          if(res.status!=200){
            handleError(res.status); 
            }
          
  
          // Assuming userInfo contains the user's data
          localStorage.setItem("UserData", JSON.stringify(userInfo));
          window.location.reload(false);
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      }, 1000); // Adjust the delay (in milliseconds) as needed
    }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className=" w-full h-full md:h-[89.5vh] flex items-center justify-center my-10 md:my-0">
      <div className=" md:w-[900px] md:h-[550px] flex flex-col items-center justify-center md:flex-row border-2 border-[#FF5C5C]">
        <div className="w-full md:w-1/2 h-full bg-[#FF5C5C] flex flex-col items-center justify-start gap-5 p-10">
          <h1 className=" h-10 text-xl font-bold text-white">
            Welcome! change agent.
          </h1>
          <img
            src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715070413/wheel.png"
            alt="wheel"
            className=" hidden md:block w-[370px]"
          />
        </div>

        <div className="w-full md:w-1/2 md:h-full flex flex-col items-center justify-start gap-10 md:gap-0 p-10">
          <h1 className="text-3xl md:text-2xl font-extrabold text-[#FF5C5C]">
            Login
          </h1>
          <form
            action=""
            onSubmit={handleSubmit}
            className="relative w-full h-[50vh] md:h-full flex flex-col justify-center items-center gap-5"
          >
            <div className="flex flex-col justify-center items-center gap-5">
              <input
                type="text"
                id="username"
                placeholder="Email"
                required
                onChange={handleChange}
                className="w-[270px] p-2.5 rounded-full focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 "
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                onChange={handleChange}
                className="w-[270px] p-2.5 rounded-full focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 "
              />

              <div className="flex flex-col items-start gap-3">
                <button className="w-[270px] px-2.5 py-2 rounded-full bg-[#FF5C5C] text-2xl font-bold text-white ">
                  {loading ? "Loading...": "Login"}
                </button>
                <a href="/" className=" ml-5 text-[13px] font-semibold">
                  Forget Password ?
                </a>
              </div>
            </div>
            <h1 className="text-[15px] font-bold">
              Don&apos;t have an account ?{" "}
              <Link
                onClick={() => setAuthScreen("signup")}
                className="text-[#FF5C5C]"
              >
                Sign Up
              </Link>{" "}
            </h1>
            {errorMessage && <p className="absolute bottom-0 md:bottom-10 text-red-600 font-bold animate-bounce">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
