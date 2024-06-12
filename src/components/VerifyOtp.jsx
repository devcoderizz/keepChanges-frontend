import { useState } from "react";
import useAuth from "../utils/IsAuthenticated";
import { Button, Form } from 'antd';
import { InputOTP } from 'antd-input-otp';

const VerifyOtp = () => {
    const APIBASEURL = import.meta.env.VITE_API_BASEURL;
    const { fetchAccess, isAccessTokenValid } = useAuth();
    const [otpInput, setOtpInput] = useState(null)

    const handleChange = (e) => {
        setOtpInput({
          ...otpInput,
          [e.target.id]: e.target.value,
        });
      };

  return (
    <div className="h-[450px] w-full flex items-center justify-center ">
    <div className="w-full h-full py-5 flex flex-col items-center justify-center gap-10 ">
        <h1 className="text-3xl text-red-500 font-semibold">Enter The OTP</h1>
    <div className="flex flex-col md:flex-row items-center w-full gap-5 md:gap-0 md:w-[40%]">
    <Form onFinish={handleFinish} form={form}>
      <Form.Item label="OTP" name="otp">
        <InputOTP autoSubmit={form} inputType="numeric" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
        </div>
    </div>
</div>
  )
}

export default VerifyOtp