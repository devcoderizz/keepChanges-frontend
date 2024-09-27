import { useLocation } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PaymentSuccess = () => {
  const query = useQuery();
  const totalAmount = query.get("totalAmount");
  const tipAmount = query.get("tipAmount");
  const paymentId = query.get("paymentId");
  const donationAmount = query.get("donationAmount");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg">
        <BsCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-2xl font-semibold mb-2">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for your payment.</p>

        <div className="flex flex-col bg-gray-100 p-4 rounded-lg mb-6 w-full">
          <h2 className="text-lg font-semibold mb-4 text-center">Payment Details:</h2>
          
          <div className="flex justify-between mb-2">
            <p className="text-gray-800 font-bold">Payment ID:</p>
            <p className="text-gray-800">{paymentId}</p>
          </div>
          
          <div className="flex justify-between mb-2">
            <p className="text-gray-800 font-bold">Total Amount:</p>
            <p className="text-gray-800">₹{totalAmount}</p>
          </div>
          
          <div className="flex justify-between mb-2">
            <p className="text-gray-800 font-bold">Donation Amount:</p>
            <p className="text-gray-800">₹{donationAmount}</p>
          </div>
          
          <div className="flex justify-between mb-2">
            <p className="text-gray-800 font-bold">Tip Amount:</p>
            <p className="text-gray-800">₹{tipAmount}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Go to Home
          </button>
          <button
            onClick={() => (window.location.href = "/fundraisers/:id")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Go to Fundraiser
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
