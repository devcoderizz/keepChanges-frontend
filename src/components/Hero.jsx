import { FaChildren } from "react-icons/fa6";
import { MdOutlineElderly } from "react-icons/md";
import { FaPaw } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { FaWheelchairMove } from "react-icons/fa6";
import { FaHouseDamage } from "react-icons/fa";
import { CgGirl } from "react-icons/cg";
import { BsGrid1X2Fill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import React from "react";
import "../index.css";
import { useMediaQuery } from "react-responsive";
import ViewCard from "./ViewCard";
const Hero = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const swiperRef = React.useRef(null);
  const [donationData, setDonationData] = React.useState([
    {
      title:
        "help to brighten the lives of abandon children and their family by giving ",
      by: "by Maitri",
      imageSrc:
        "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 1000,
      goalAmount: 5000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Supporting Elderly Care",
      by: "by Maitri",
      imageSrc:
        "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 3000,
      goalAmount: 6000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Animal Welfare Fund",
      by: "by Maitri",
      imageSrc:
        "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 2000,
      goalAmount: 4000,
      daysLeft: 5,
      Suppoters: 2203,
    },
 
  ]);

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
  const notify = () =>{ toast('Here is your toast.')
    console.log("Toast")
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-12">
        <div className="w-[70%] md:w-[50%] flex flex-col items-start justify-center">
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
            <button onClick={notify} className="px-8 py-4 border-1 text-lg border-red-600  font-semibold bg-[#EF5757] text-white rounded-lg hover:bg-[#d84f4f]">
              Start a Fundraiser
            </button>
           
          </div>
        </div>

        <div>
          <img
            src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067696/Group_4_wfvpsb.png"
            alt=""
            className="h-[40vh] w-[70vw]  md:h-[60vh] md:w-[28vw]"
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
            <SwiperSlide>
              <BsGrid1X2Fill size={30} color={"gray"} />
            </SwiperSlide>
            <SwiperSlide>
              <FaChildren size={30} color={"gray"} />
            </SwiperSlide>
            <SwiperSlide>
              <MdOutlineElderly size={30} color={"gray"} />
            </SwiperSlide>
            <SwiperSlide>
              <FaPaw size={30} color={"gray"} />
            </SwiperSlide>
            <SwiperSlide>
              <GiHealthNormal size={30} color={"gray"} />
            </SwiperSlide>
            <SwiperSlide>
              <FaWheelchairMove size={30} color={"gray"} />
            </SwiperSlide>
            <SwiperSlide>
              <FaHouseDamage size={30} color={"gray"} />
            </SwiperSlide>
            <SwiperSlide>
              <CgGirl size={30} color={"gray"} />
            </SwiperSlide>
            <div className="swiper-button-next " onClick={goNext}></div>
            <div className="swiper-button-prev" onClick={goPrev}></div>
          </Swiper>
        </div>
      </div>
      <div className="flex flex-col ml-5   md:justify-end md:items-end my-10 mr-40">
        <span className="text-4xl text-[#FF5C5C] font-bold  ">
          Support a Fundraiser Today!
        </span>
        <p className="mt-2 text-nowrap">
          Your contribution can make an impact.&nbsp;
          {isSmallScreen && <br />}
          Join us in making a difference.
        </p>
      </div>

<div className=" mx-10 ">
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-2  md:ml-8 mr-10 my-16 `}
      >
        {donationData.map((data, index) => (    
          <div key={index}>
            <ViewCard {...data} />
          </div>
        ))}
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-2  md:ml-8 mr-10 my-16`}
      >
        {donationData.map((data, index) => (
          <div key={index}>
            <ViewCard {...data} />
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
        <h1 className="text-2xl md:text-4xl  text-[#FF5C5C] font-bold">
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

      <img  className="  w-[80vw] md:w-[50vw]"
       src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715070580/Group_22_af2hke.png" alt=""  />
      

    </div>






    </div>
  );
};

export default Hero;
