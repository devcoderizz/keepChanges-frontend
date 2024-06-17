import { useState } from "react";
import handleError from "../utils/ErrorHandler";
import useAuth from "../utils/IsAuthenticated";
import { useNavigate } from "react-router-dom";
import { MdOutlinePassword } from "react-icons/md";
import toast from "react-hot-toast";

const ForgetPassword = () => {
    const APIBASEURL = import.meta.env.VITE_API_BASEURL;
    const navigate = useNavigate();
    const { fetchAccess, isAccessTokenValid } = useAuth();
    const [emailInput, setEmailInput] = useState("");
    const [otpInput, setOtpInput] = useState("");
    const [newPasswordInput, setNewPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const [step, setStep] = useState("email"); // 'email', 'otp', 'newPassword'
    const [error, setError] = useState("");
    const [mainData, setMainData] = useState([])
    console.log("data" , mainData);


    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "email1") setEmailInput(value);
        if (id === "otp") setOtpInput(value);
        if (id === "new-password") setNewPasswordInput(value);
        if (id === "confirm-password") setConfirmPasswordInput(value);
    };

    const handleEmail = async () => {
        if (!isAccessTokenValid()) {
            await fetchAccess();
        }
        try {
            const res = await fetch(
                `${APIBASEURL}/users/user/${emailInput}`,
                { method: "GET", headers: {} }
            );

            if (res.status === 200) {
                const data = await res.json();
                setMainData(data)
                const { name, email, phone } = data;
                const action = "RESET_PASSWORD";

                const res2 = await fetch(
                    `${APIBASEURL}/auth/verification/send-otp`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, email, phone, action })
                    }
                );

                if (res2.status === 200) {
                    setStep("otp");
                } else {
                    handleError(res2.status);
                }
            } else {
                handleError(res.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOTP = async () => {
        if (!isAccessTokenValid()) {
            await fetchAccess();
        }
        try {
            const res = await fetch(
                `${APIBASEURL}/auth/verification/verify-otp`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ otp: otpInput, email: emailInput })
                }
            );

            if (res.status === 200) {
                setStep("newPassword");
            } else {
                handleError(res.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePasswordReset = async () => {
        if (newPasswordInput !== confirmPasswordInput) {
            setError("Passwords do not match");
            return;
        }

        if (!isAccessTokenValid()) {
            await fetchAccess();
        }
        try {
            const res = await fetch(
                `${APIBASEURL}/auth/reset-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password: newPasswordInput, username: mainData?.email })
                }
            );

            if (res.status === 200) {
              toast.success("Password Reset Successfully")
                navigate("/auth");
            } else {
                handleError(res.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-[500px] flex items-center justify-center px-5">
            {step === "email" && (
                <div className="w-full max-w-md h-[200px]  p-5 bg-white shadow-md rounded-lg ">
                    <h1 className=" text-xl md:text-3xl text-red-500 font-semibold mb-5 text-center">Enter Your Email</h1>
                    <div className="flex flex-col  items-center gap-5 ">
                        <input
                            type="email"
                            id="email1"
                            placeholder="Email"
                            value={emailInput}
                            onChange={handleChange}
                            className="flex-grow py-2 px-4 border-2 w-[300px] border-red-300 rounded-full outline-none bg-transparent"
                        />
                        <button
                            onClick={handleEmail}
                            className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 focus:outline-none"
                        >
                            Send OTP
                        </button>
                    </div>
                </div>
            )}

            {step === "otp" && (
                <div className="w-full max-w-md p-5 bg-white shadow-md rounded-lg">
                    <h1 className="text-3xl text-red-500 font-semibold mb-5 text-center">Enter The OTP</h1>
                    <div className="flex flex-col md:flex-row items-center gap-5">
                        <input
                            type="number"
                            id="otp"
                            placeholder="Enter OTP"
                            value={otpInput}
                            onChange={handleChange}
                            className="flex-grow py-2 px-4 border-2 border-red-300 rounded-full outline-none bg-transparent"
                        />
                        <button
                            onClick={handleOTP}
                            className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 focus:outline-none"
                        >
                            Verify OTP
                        </button>
                    </div>
                </div>
            )}

            {step === "newPassword" && (
                <div className="w-full max-w-md p-5 bg-white shadow-md rounded-lg">
                  <h1 className="text-center">Hello &quot;<span className="text-red-400 font-semibold"> {mainData?.name}</span>&quot;</h1>
                  <h1 className="text-center mb-5">Is this you &quot;<span className="text-red-400 font-semibold"> {mainData?.email}</span>&quot;</h1>
                    <h1 className="text-3xl text-red-500 font-semibold mb-5 text-center flex flex-col items-center justify-center">
                        Set new password
                        <MdOutlinePassword className="ml-2" />
                    </h1>
                    <div className="flex flex-col items-center gap-5">
                        <input
                            type="password"
                            id="new-password"
                            placeholder="New password"
                            value={newPasswordInput}
                            onChange={handleChange}
                            className="w-full py-2 px-4 border-2 border-red-400 rounded-md outline-none bg-transparent"
                        />
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm password"
                            value={confirmPasswordInput}
                            onChange={handleChange}
                            className="w-full py-2 px-4 border-2 border-red-400 rounded-md outline-none bg-transparent"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            onClick={handlePasswordReset}
                            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                        >
                            Set password
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgetPassword;
