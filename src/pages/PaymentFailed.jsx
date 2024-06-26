
import { useLocation } from 'react-router-dom';
import { BsXCircle } from 'react-icons/bs';

const PaymentFailed = () => {
  const location = useLocation();
  const { paymentId, amount, date } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <BsXCircle className="text-red-500 text-6xl mb-4 ml-36" />
        <h1 className="text-2xl font-semibold mb-2">Payment Failed!</h1>
        <p className="text-gray-700 mb-6">Unfortunately, your payment could not be processed.</p>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
          <p className="text-gray-800"><strong>Payment ID:</strong> {paymentId}</p>
          <p className="text-gray-800"><strong>Amount:</strong> ₹{amount}</p>
          <p className="text-gray-800"><strong>Date:</strong> {date}</p>
        </div>
        <div className='flex gap-2 items-center justify-center'>
        <button 
          onClick={() => window.location.href = '/'} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Go to Home
        </button>
        <button 
          onClick={() => window.location.href = '/'} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Go to Fundraiser
        </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
