
import { useLocation, useParams } from 'react-router-dom';
import { BsCheckCircle } from 'react-icons/bs';

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
         
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <BsCheckCircle className="text-green-500 text-6xl mb-4 ml-24" />
        <h1 className="text-2xl font-semibold mb-2">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for your payment.</p>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
          <p className="text-gray-800"><strong>Payment ID:  &nbsp;</strong> {paymentId}</p>
          <p className="text-gray-800"><strong>Donation Amount:&nbsp; &nbsp; </strong> ₹{donationAmount}</p>
          <p className="text-gray-800"><strong>total Amount: &nbsp; &nbsp; </strong> ₹{totalAmount}</p>
          <p className="text-gray-800"><strong> Tip Amount &nbsp; &nbsp;</strong> ₹{tipAmount}</p>
        </div>

        <div className='flex gap-3'>
        <button 
          onClick={() => window.location.href = '/'} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Go to Home
        </button>
        <button 
          onClick={() => window.location.href = '/fundraisers/:id'} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Go to Fundraiser
        </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
