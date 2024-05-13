
import PropTypes from 'prop-types';
import { MdPeopleAlt } from "react-icons/md";
const ViewCard = ({ title, imageSrc, raisedAmount, goalAmount, by, Suppoters, daysLeft}) => {

  const completionPercentage = (raisedAmount / goalAmount) * 100;

  const truncatedTitle = title.length > 70 ? title.substring(0, 70) + ' ...' : title;

  return (
      <div className="md:w-[80%] w-[80vw] h-[70vh]  mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <img className="w-full h-54 object-fill  object-center" src={imageSrc} alt="Donation" />
          <div className="px-6 py-4">
              <h1 className="  flex flex-row font-bold text-lg mb-2 truncate w-[290px] md:w-[350px] text-wrap ">{truncatedTitle}</h1>
              <span className=' my-1  text-gray-500 font-semibold'>{by}</span> <br/>
              <div className='mt-4'>
                <div className='flex flex-row gap-28'>
              <span className='font-semibold text-sm text-red-500'>₹{raisedAmount}</span>
              <p className="text-gray-500 text-sm "> Raised of ₹{goalAmount} goal</p>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
             
                  <div className="bg-red-500 h-1 text-[10px] leading-none  text-center text-white rounded-full" style={{ width: `${completionPercentage}%` }}></div>
              </div>
              </div>
             
          </div>
          <div className="flex flex-row px-6 items-center pb-2 gap-28 ">
            <span className='text-sm  flex  items-center gap-2 w-[450px] '> <MdPeopleAlt /> {Suppoters} Suppoters</span>
            <span className=' text-gray-500 flex text-sm w-[250px] '>{daysLeft} days left</span>
          </div>
      </div>
  );
};

ViewCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  raisedAmount: PropTypes.number.isRequired,
  goalAmount: PropTypes.number.isRequired,
  Suppoters: PropTypes.number.isRequired,
  daysLeft: PropTypes.number.isRequired,
  by: PropTypes.string.isRequired,
};
export default ViewCard;
