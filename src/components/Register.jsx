import { useSetRecoilState } from "recoil";
import { authScreenAtom } from "../atom/authAtom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "../Yup schema/Schema";

const Register = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [Verify, setVerify] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    number:"",
    otp:"",
    password: "",
    
  };

  const { values, errors, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleVerify = () => {
    setVerify(!Verify);
  };

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
                className="w-[270px] p-2.5 rounded-full focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 "
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
               <p className="absolute -bottom-5 left-20 text-[12px] text-rose-400 font-bold ">{errors.name}</p>
               </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="w-[270px] py-2.5 pl-2.5 pr-24 rounded-full focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 "
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 <p className="absolute -bottom-5 left-20 text-[12px] text-rose-400 font-bold ">{errors.email}</p>
                {!Verify && (
                  <p
                    className="absolute text-end mr-5 bottom-3.5 right-0 text-[12px] font-bold hover:underline cursor-pointer hover:text-[#ff5c5c]"
                    onClick={handleVerify}
                  >
                    Verify Email
                  </p>
                )}
              </div>
              {Verify && (
                <div className="relative">
                  <input
                    type="number"
                    placeholder="OTP"
                    name="otp"
                    className="w-[270px] p-2.5 rounded-full focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 "
                    value={values.otp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                   <p className="absolute -bottom-5 left-16 text-[12px] text-rose-400 font-bold ">{errors.otp}</p>
                  <p className="absolute text-end mr-5 bottom-3.5 right-16  text-[12px] font-bold hover:underline cursor-pointer hover:text-[#ff5c5c]">
                    Verify
                  </p>
                  <p className="absolute text-end mr-5 bottom-3.5 -right-2  text-[12px] font-bold hover:underline cursor-pointer hover:text-[#ff5c5c]">
                    Resend OTP
                  </p>
                </div>
              )}
              <div className="relative">
              <input
                type="number"
                placeholder="Mobile No."
                name="number"
                className="w-[270px] p-2.5 rounded-full focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 "
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
               <p className="absolute -bottom-5 left-16 text-[12px] text-rose-400 font-bold ">{errors.number}</p>
               </div>
               <div className="relative h-[70px]">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-[270px] p-2.5 rounded-full focus:outline-none border-[#FF5C5C] border-2 border-opacity-50 "
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
               <p className="absolute -bottom-15 left-10 text-[12px] text-rose-400 font-bold ">{errors.password}</p>
               </div>

              <div className="flex flex-col items-start">
                <button  className="w-[270px] px-2.5 py-2 rounded-full bg-[#FF5C5C] text-2xl font-bold text-white ">
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
      </div>
    </div>
  );
};

export default Register;
