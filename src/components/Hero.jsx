const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import React, { useEffect, useState } from "react";
import "../index.css";
import { useMediaQuery } from "react-responsive";
import ViewCard from "./ViewCard";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import handleError from '../utils/ErrorHandler'; 
const Hero = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const APIBASEURL= import.meta.env.VITE_API_BASEURL;
  const localData = JSON.parse(localStorage.getItem("UserData"));
  const swiperRef = React.useRef(null);
  const [allFundraiser, setAllFundraiser] = useState([])
  const [allCetegories, setAllCetegories] = useState([])
  

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };


  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  useEffect(() => {
    const fundraiserDetails =async()=>{
      try {
        const res = await fetch(`${APIBASEURL}/fundraisers/latest`, {
          method: "GET",
          headers: {
            // "Authorization": `Bearer ${accessToken}`,
          },
        });
        if(res.status!=200){
          handleError(res.status); 
          }
        const data = await res.json();
        console.log("fundraiser data",data);
        setAllFundraiser(data)
        console.log("kajbaskbc",allFundraiser);
      
    
  
      } catch (error) {
        console.log(error);
      }
     }
     fundraiserDetails()

     const getAllCategories =async()=>{
      try {
        const res = await fetch(`${APIBASEURL}/categories/getall/`, {
          method: "GET",
          headers: {
            // "Authorization": `Bearer ${accessToken}`,
          },
        });
        if(res.status!=200){
          handleError(res.status); 
          }
        const data = await res.json();
        console.log("get cetegories data",data);
        setAllCetegories(data)
        console.log("kajbaskbc",allCetegories);
      
    
  
      } catch (error) {
        console.log(error);
      }
     }
     getAllCategories()




  }, [APIBASEURL])
  

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-12">
        <div className="w-full px-10 md:w-[57%] flex flex-col items-start justify-center">
          <span className="text-4xl text-[#FF5C5C] font-bold">
            Greetings, Change Agent
          </span>
          <span className="text-2xl font-semibold">
            Thank you for being a vital part of our mission to
            <br /> create lasting impact.
          </span>
          <p className="mt-10">
            Your support fuels our determination and empowers us to drive <br />
            meaningful change. Thank you for your invaluable contribution to our
            mission together, we&apos;re forging lasting impact.
          </p>
          <div className="mt-6 ml-6 md:ml-1  ">
            {localData ? (
              <Link
                to={"/startFundraiser"}
                className="px-8 py-4 border-1 text-lg border-red-600  font-semibold bg-[#EF5757] text-white rounded-lg hover:bg-[#d84f4f]"
              >
                Start a Fundraiser
              </Link>
            ) : (
              <Link
                to={"/auth"}
                onClick={() => {
                  toast.error("You have to login first");
                }}
                className="px-8 py-4 border-1 text-lg border-red-600  font-semibold bg-[#EF5757] text-white rounded-lg hover:bg-[#d84f4f]"
              >
                Start a Fundraiser
              </Link>
            )}
          </div>
        </div>

        <div className=" w-[300px] h-[300px]  md:w-[350px] md:h-[300px] xl:w-[400px] xl:h-[400px]">
          <img
            src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067696/Group_4_wfvpsb.png"
            alt=""
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="flex flex-col ml-5 justify-center  md:ml-[150px]  my-12">
        <h1 className="text-4xl text-[#FF5C5C] font-bold">What we aim</h1>
        <p>
          Welcome to Keep Changes! Our community of Change Agents, like you, is
          the heart of <br /> everything we do. Your support is what keeps our
          mission alive and enables us to <br /> make a real difference in the
          world. <br />
          <br />
          Together, we are creating positive change that ripples far and wide.
          Your generosity <br />
          fuels our efforts, and we are deeply grateful for your commitment to
          our cause. Thank you <br />
          for being a vital part of our journey to make the world a better
          place, <br /> one change at a time
        </p>
      </div>
      <div className="flex flex-col justify-center ml-5 md:ml-[150px]  my-10">
        <span className="text-4xl  text-[#FF5C5C] font-bold">
          Support a Cause
        </span>
        <p className="mt-2">
          Empower positive change by supporting a cause close to your heart.
        </p>
        <div className="mt-4  ">
          <Swiper
      className=""
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={6}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {allCetegories.map((data, index) => (
        <SwiperSlide key={index}>
          <div className="h-[60px] w-[60px] object-fill overflow-hidden">
          <img src={`${VITE_BASE_IMAGE_URL}${data.categorySvg}`} alt=""   />
          
          </div>
        </SwiperSlide>
      ))}

      <div className="swiper-button-next" onClick={goNext}></div>
      <div className="swiper-button-prev" onClick={goPrev}></div>
    </Swiper>
        </div>
      </div>
      <div className="flex flex-col ml-5   md:justify-end md:items-end my-10 mr-40">
        <span className=" text-2xl md:text-4xl  text-[#FF5C5C] font-bold  ">
          Support a Fundraiser Today!
        </span>
        <p className="mt-2 text-nowrap">
          Your contribution can make an impact.&nbsp;
          {isSmallScreen && <br />}
          Join us in making a difference.
        </p>
      </div>

      <div className=" mx-10 ">
        {/* <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-2  md:ml-8 mr-10 my-16 `}
        >
          {donationData.map((data, index) => (
            <div key={index}>
              <Link to={data.to}>
                <ViewCard {...data} />
              </Link>
            </div>
          ))}
        </div> */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3  gap-y-6  md:ml-8 mr-10 my-16`}
        >
          {allFundraiser.slice(0, 6).map((data) => (
        <div key={data.id}>
          <Link to={`/fundraisers/${data.id}`}>
            <ViewCard {...data} />
          </Link>
        </div>
      ))}
        </div>
      </div>

      {/* <div className={`flex flex-col md:flex-row ${isSmallScreen ? 'flex-col ' : 'flex-row'} md:ml-8 gap-8 ml-6 mr-8 my-16`}>
        {donationData.map((data, index) => (
          <div key={index}>
            <ViewCard {...data} />
          </div>
        ))}
      </div> */}

      <div className="flex flex-col justify-center items-center my-12 ">
        <h1 className="text-2xl md:text-4xl text-center  text-[#FF5C5C] font-bold">
          Start Your Fundraiser in three simple steps:
        </h1>
        <img
          className="w-[80vw] md:w-[40vw] mt-10"
          src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715239260/Group_77_nglmhu.svg"
          alt=""
        />
        <div className="mt-16 ml-4">
          <button className="px-10 py-4 border-1 text-2xl  border-red-600  font-semibold bg-[#EF5757] text-white rounded-lg hover:bg-[#d84f4f]">
            Start a Fundraiser
          </button>
        </div>
      </div>

      <div className="flex justify-center my-28">
        <img
          className="  w-[80vw] md:w-[50vw]"
          src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715070580/Group_22_af2hke.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
