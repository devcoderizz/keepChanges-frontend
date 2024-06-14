
import PropTypes from 'prop-types';
import { MdPeopleAlt } from "react-icons/md";

const ViewCard = ({...data}) => {
  const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
  const completionPercentage = (300005 / data.raiseGoal) * 100;

  const truncatedTitle = data.fundraiserTitle?.length > 70 ? data.fundraiserTitle.substring(0, 80) + ' ...' : data.fundraiserTitle;

  return (
    
      <div className="md:w-[400px] w-[80vw] h-[70vh]  mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <img className="w-full md:h-[300px] h-[240px] object-cover  object-center " src={`${VITE_BASE_IMAGE_URL}${data.displayPhoto}`} alt="Donation" />
          <div className="px-6 py-4">
              <h1 className="  flex flex-row font-bold text-sm md:text-lg mb-2 truncate w-[290px] md:w-[400px] text-wrap pr-2  md:pr-0 ">{truncatedTitle}</h1>
              <span className=' my-1  text-gray-500 font-semibold'>{data?.postedBy ? data?.postedBy.name : 'Anonymous'}</span> <br/>
              <div className='mt-4'>
                <div className='flex flex-row gap-28 justify-between'>
              <span className='font-semibold text-sm text-red-500'>₹{data.raised ? data.raised : "69656 "}</span>
              <p className="text-gray-500 text-xs md:text-sm  "> Raised of ₹{data.raiseGoal}</p>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
             
                  <div className="bg-red-500 w-[80vw] h-1 text-[10px] leading-none  text-center text-white rounded-full" style={{ width: `${completionPercentage}%` }}></div>
              </div>
              </div>
             
          </div>
          <div className="flex flex-row px-6 items-center pb-2 gap-28 ">
            <span className='text-sm  flex  items-center gap-2 w-[450px] '> <MdPeopleAlt /> Suppoters </span>
            <span className=' text-gray-500 flex text-sm w-[250px] '>{ data.daysLeft ? data.daysLeft : "50 "}daysLeft </span>
          </div>
      </div>
  );
};

// ViewCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   imageSrc: PropTypes.string.isRequired,
//   raisedAmount: PropTypes.number.isRequired,
//   goalAmount: PropTypes.number.isRequired,
//   Suppoters: PropTypes.number.isRequired,
//   daysLeft: PropTypes.number.isRequired,
//   by: PropTypes.string.isRequired,
// };
export default ViewCard;
