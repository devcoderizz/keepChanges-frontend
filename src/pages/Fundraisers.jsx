import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { FaHands } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import DonationCircle from "../components/LoadingCircle";
import { useEffect, useState } from "react";
import DonationListModal from "../components/modal/DonationListModal";
import { RxCross2 } from "react-icons/rx";

const Fundraisers = ({
  benefactors = 69,
  raisedAmount = 97550,
  goalAmount = 50000,
}) => {
  const APIBASEURL= import.meta.env.VITE_API_BASEURL;
  const [isUser, setIsUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [fundraiserDetails, setFundraiserDetails] = useState({})
  // const [postedBy, setPostedBy] = useState()
  const localData=JSON.parse(localStorage.getItem("UserData"))
  // console.log("roles",localData.roles[1].id);
  const currentUser= fundraiserDetails.postedBy ? fundraiserDetails.postedBy.id :" "
  console.log("currentUser", currentUser);

  // const adminRole= fundraiserDetails.postedBy ? fundraiserDetails.postedBy.roles[1].id :" "
  // console.log("admin role",localData.roles[1].id);

  // setPostedBy(fundraiserDetails.postedBy)
// console.log("fuaksdbvaskdvba", fundraiserDetails.map(obj=>obj.postedBy.id));



 
  console.log("fundraiser panga",fundraiserDetails);

  const handleSeeMore = () => {
    setShowModal(!showModal);
  };

  const { id } = useParams();
  const agentData = [
    { name: "Agent 1", donation: 69.69 },
    { name: "Agent 2", donation: 50.5 },
    { name: "Agent 3", donation: 100.0 },
    { name: "Agent 4", donation: 80.0 },
    // Add more agents as needed
  ];


  // console.log("bsdk tune naam diya tha kya usko",fundraiserDetails.postedBy.name); 
  useEffect(() => {
    if(localData?.id === currentUser){
      console.log("hello");
      setIsUser(true)
    }

    if(localData?.roles[1]?.id || localData?.roles[0]?.id === 501){
      console.log("roles");
      setIsAdmin(true)
    }


   const fundraiserDetails =async()=>{
    try {
      const res = await fetch(`${APIBASEURL}/fundraisers/fundraiser_${id}`, {
        method: "GET",
        headers: {
          // "Authorization": `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      console.log("fundraiser data",data);
      setFundraiserDetails(data)
      // setPostedBy(fundraiserDetails.postedBy)
      // console.log("posted By", postedBy);

      if (!data.ok) {
        // setErrorMessage("Invalid User")
        
        return;
      }
   

      // Assuming userInfo contains the user's data
      // localStorage.setItem("UserData", JSON.stringify(userInfo));
      // window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
   }
   fundraiserDetails()
    
  }, [APIBASEURL, currentUser, id] )
  

  return (
    <>
      <div className="flex flex-col items-center h-full my-12 md:mx-32">
        <div className="text-2xl md:text-4xl font-bold w-[90vw] md:w-[75vw]">
          <span className="text-wrap">
           {fundraiserDetails.fundraiserTitle}
          </span>
          <span>✅</span>
        </div>

        <div className="flex flex-col md:flex-row w-[90%] gap-8 my-4 md:ml-0  ">
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
              <DonationCircle percentage={17} />
              <div className="flex md:gap-96">
                <span className="text-sm mt-4 -ml-10  md:text-nowrap ">
                  Raised <br />{" "}
                  <span className="text-red-500 mt-2">
                    {" "}
                    Rs&nbsp;{fundraiserDetails.raiseGoal}
                  </span>{" "}
                  &nbsp; of <strong> {60} </strong>
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

            <div className="py-4 md:mx-[84px]">
              <h1 className="text-red-500 text-xl font-extrabold">Narrative</h1>
              <p className="w-full">
                {fundraiserDetails.fundraiserDescription}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 my-4 ">
            {isUser ? (
              <div className="flex flex-col w-[340px] h-[450px] md:h-[430px] md:w-[380px] rounded-xl bg-white shadow-lg mr-5">
                <div className="flex flex-col gap-4 my-4">
                  <div className="w-full flex flex-col justify-center px-10">
                    <h1 className="text-md my-4 ml-16 font-semibold ">
                      Add your bank account
                    </h1>
                    <button className="text-md text-red-500 py-3 px-6 text-nowrap border border-red-500 mx-10 rounded-xl font-semibold hover:bg-red-500 hover:text-white ">
                      Account Details
                    </button>
                  </div>
                  <div className="w-full flex flex-col justify-center px-10">
                    <h1 className="text-md my-4 ml-16 font-semibold ">
                      Fundraiser Images
                    </h1>
                    <button className="text-md text-blue-500 py-3 px-6 text-nowrap border border-blue-500 mx-10 rounded-xl font-semibold hover:bg-blue-500 hover:text-white ">
                      Images
                    </button>
                  </div>
                  <div className="w-full flex flex-col justify-center px-10">
                    <h1 className="text-md my-4 ml-16 font-semibold ">
                      Add your bank account
                    </h1>
                    <button className="text-md text-green-500 py-3 px-6 text-nowrap border border-green-500 mx-10 rounded-xl font-semibold  hover:bg-green-500 hover:text-white">
                      Documnets
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-[340px] h-[450px] md:h-[430px] md:w-[380px] rounded-xl bg-white shadow-lg mr-5 ">
                <span className="text-red-500 text-[25px] font-extrabold ml-12 mt-2  ">
                  Be a &quot;Change Agent&quot;
                </span>
                <div className="flex flex-row mt-3">
                  <FaHands size={20} className="ml-4 mt-2" />
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
                  <FaHands size={20} className="ml-4 mt-2" />
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
            )}

            {}

            <div className="grid md:grid-cols-2 grid-cols-1 gap-2 md:pr-5">
              <img
                className="md:w-[25vw] md:h-[30vh]"
                src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715707962/1636820098720_gcweet.jpg"
                alt=""
              />
              <img
                className="md:w-[25vw] md:h-[30vh]"
                src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715707962/1636820098720_gcweet.jpg"
                alt=""
              />
              <img
                className="md:w-[25vw] md:h-[30vh]"
                src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715707962/1636820098720_gcweet.jpg"
                alt=""
              />
              <img
                className="md:w-[25vw] md:h-[30vh]"
                src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715707962/1636820098720_gcweet.jpg"
                alt=""
              />
              <img
                className="md:w-[25vw] md:h-[30vh]"
                src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715707962/1636820098720_gcweet.jpg"
                alt=""
              />
              <img
                className="md:w-[25vw] md:h-[30vh]"
                src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715707962/1636820098720_gcweet.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        {isAdmin && (
          <div className="w-[90%] md:w-[90%]  flex flex-col md:flex-row gap-6 md:gap-20 my-8 md:ml-28 bg-[#FFE3E3] rounded-lg">
            <div className="flex flex-col gap-2 px-4 my-4">
              <h1 className="text-lg font-bold">Review Fundraiser</h1>
              <textarea
                className="resize-none  rounded-md p-2 border-red-500 border-2  focus:border-[#ab4543]  "
                rows="4"
                cols="70"
                placeholder="Enter your message..."
              />
              <button className="text-md text-white py-3 md:mr-96 mt-1 border border-red-500 bg-red-500 rounded-xl font-semibold hover:bg-red-600 ">
                Submit
              </button>
            </div>
            <div className="flex flex-col gap-2 my-4 px-4">
              <h1 className="text-lg font-semibold" >Set Status</h1>
              <select
                id="mySelect"
                name="mySelect"
                className="w-[300px] md:w-[400px] h-[40px] rounded-md p-2 "
              >
                <option value="option1" className="font-semibold" >Option 1</option>
                <option value="option2" className="font-semibold">Option 2</option>
                <option value="option3" className="font-semibold">Option 3</option>
                <option value="option4" className="font-semibold">Option 4</option>
              </select>
            </div>
          </div>
        )}

        <div className="w-[90%] md:w-[90%]  flex flex-col md:flex-row gap-6 md:gap-96 my-8 md:ml-28 bg-[#FFE3E3] rounded-lg">
          <div className="py-4 px-2 ">
            <h1 className="text-2xl text-red-400 font-semibold text-nowrap">
              Support the Fundraiser
            </h1>
            <span className="">Every small share and donation count</span>
          </div>
          <div className="flex gap-4 py-4 md:ml-28 flex-col md:flex-row px-2  ">
            <button className="bg-white text-red-500 px-4 md:px-12 py-2 border-2 border-red-500 rounded-xl font-semibold hover:bg-red-500 hover:text-white">
              Share
            </button>
            <button className="bg-red-500 text-white px-8 md:px-12 py-2 border-2 border-red-500 rounded-xl font-semibold hover:bg-red-600 ">
              Donate now{" "}
            </button>
          </div>
        </div>

        <div className="relative flex md:flex-row flex-col my-12 md:gap-32 gap-10 md:ml-24 ">
          <div className=" flex flex-col bg-[#FFEBEB] w-[360px] md:w-[600px] h-[540px] items-center justify-center rounded-lg">
            <h1 className="text-2xl mt-3 mb-6 text-red-500 border-b-2 border-spacing-2 border-dashed border-gray-500 font-semibold ">
              Change Agents
            </h1>

            {agentData.map((agent, index) => (
              <>
                <div key={index} className="flex flex-row gap-10 my-2">
                  <FaCircleUser size={40} color="gray" className="mt-4" />
                  <div className="flex flex-col gap-1">
                    <p className="text-xl text-[#858585]"> {agent.name}</p>
                    <p>Donation: ${agent.donation}</p>
                    <span className="text-gray-500 font-medium ">
                      Thank you for being an agent
                    </span>
                  </div>
                </div>
                <div className="border-t-2 border-gray-300 w-[280px] md:w-[450px]"></div>
              </>
            ))}
            <button
              onClick={handleSeeMore}
              className="text-xl my-5 underline font-semibold "
            >
              See More
            </button>

            {showModal && (
              <div className="absolute  transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[100%] h-[100vh]  z-30">
                {" "}
                <div className=" absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[100%] h-[100vh] bg-[#f4f7f6da]"></div>{" "}
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-[540px] w-[300px] md:w-[500px] ">
                  {" "}
                  <RxCross2
                    size={30}
                    onClick={handleSeeMore}
                    className="relative z-50 cursor-pointer text-red-500 top-8 md:left-[450px] hover:text-red-800 "
                  />{" "}
                  <DonationListModal onClose={() => setShowModal(false)} />
                </div>
              </div>
            )}
          </div>

          <div className=" relative bg-[#FFEBEB] w-[320px] md:w-[400px] h-[180px] mx-4">
            <div className="relative flex flex-row gap-4 p-4  z-20">
              <FaCircleUser size={35} color="gray" className="mt-2" />
              <div className="flex flex-col ">
                <span className="font-semibold  text-gray-500">Created by</span>
                <span className="font-semibold">{fundraiserDetails.postedBy ? fundraiserDetails.postedBy.name : 'Anonymous'}</span>
              </div>
            </div>
            <div className="absolute bg-black h-[70px] w-[2px] left-8 bottom-16 z-10"></div>
            <div className=" relative flex flex-row gap-4 p-4 z-20">
              <FaCircleUser size={35} color="gray" className="mt-2" />
              <div className="flex flex-col ">
                <span className="font-semibold  text-gray-500 ">
                  This Fundraiser will benifit
                </span>
                <span className="font-semibold">Pranav Panga</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Fundraisers.propTypes = {
  benefactors: PropTypes.number.isRequired,
};

export default Fundraisers;

