import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { FaHands } from "react-icons/fa";

import DonationCircle from "../components/LoadingCircle";

const Fundraisers = ({
  benefactors = 69,
  raisedAmount = 97550,
  goalAmount = 50000,
}) => {
  const { id } = useParams();
  return (
    <div className="flex flex-col items-center h-full my-12 md:mx-32">
       <div className="text-2xl md:text-4xl font-bold w-[90vw] md:w-[75vw]">
          <span className="text-wrap">
            Help Shiv Prasad, a loving son to 350 abandoned parents, provide
            them with shelter and care
          </span>
          <span>✅</span>
        </div>

    <div className="flex flex-col md:flex-row w-[90%] gap-6 my-4 md:ml-0  " >
      <div className="flex flex-col items-start justify-start">
        <span className="text-[12px] md:text-sm">
          Capmaign by{" "}
          <Link to={"/"} className="text-red-500 underline  ">
            {" "}
            Keep changes
          </Link>
        </span>
        <div className="flex flex-row gap-8">
          <img
            className="md:w-[50vw] md:h-[50vh] h-[30vh] w-[90vw] object-cover rounded-xl "
            src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067580/cld-sample.jpg"
            alt=""
          />
        </div>
        <div className="flex ">
          <DonationCircle percentage={30} />
          <div className="flex md:gap-96">
            <span className="text-sm mt-4 -ml-10  md:text-nowrap ">
              Raised <br />{" "}
              <span className="text-red-500 mt-2">
                {" "}
                Rs&nbsp;{raisedAmount}{" "}
              </span>{" "}
              &nbsp; of <strong> {goalAmount}{" "}</strong>
            </span>
            <span className="text-sm text-red-500 pl-16 mt-6 md:mt-9 md:text-nowrap">
              {benefactors} benefactors
            </span>
          </div>
        </div>
        <div className="text-[16px] md:-mt-12 md:ml-[85px] ml-2  ">
          Be a catalyst for change – support our cause and become a{" "}
          <span className="text-red-500"> change agent</span> today.
        </div>
      </div>




      <div className=" my-4 " >
      <div className="flex flex-col w-[340px] h-[450px] md:h-[430px] md:w-[350px] rounded-xl bg-white shadow-lg mr-5 ">
            <span className="text-red-500 text-[25px] font-extrabold ml-12 mt-2  ">
              Be a &quot;Change Agent&quot;
            </span>
            <div className="flex flex-row mt-3">
              <FaHands size={20} className="ml-4 mt-4" />
              <span className=" text-[15px] font-semibold tracking-wide ml-2 mt-2  ">
                {" "}
                Change agents
              </span>
              <span className="text-[13px] ml-24 mt-2 text-red-500 font-semibold">
                69 Donators{" "}
              </span>
            </div>
            <button className="bg-[#FF5C5C] rounded-full text-white text-[25px] mt-6 mx-10 py-1 font-semibold hover:bg-[#da5151] ">
              Donate now
            </button>

            <div className="border-t border-black  mt-8 w-[280px] mx-6 "></div>

            <span className="text-[#2E9732] text-[25px] font-extrabold ml-8 mt-2">
              Be a &quot;Change Catalyst&quot;
            </span>
            <div className="flex flex-row mt-3">
              <FaHands size={20} className="ml-4 mt-4" />
              <span className=" text-[15px] font-semibold tracking-wide ml-2 mt-2  ">
                {" "}
                Change catalysts
              </span>
              <span className="text-[13px] ml-24 mt-2 text-[#2E9732] font-semibold">
                69 Shares{" "}
              </span>
            </div>
            <button className="bg-[#2E9732] rounded-full text-white text-[25px] mt-6 mx-10 py-1 font-semibold hover:bg-[#42aa46] ">
              Share now
            </button>
          </div>
      </div>
      </div>











    </div>
  );
};




Fundraisers.propTypes = {
  benefactors: PropTypes.number.isRequired,
};

export default Fundraisers;
