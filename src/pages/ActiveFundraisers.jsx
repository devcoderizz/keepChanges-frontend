import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import ViewCard from "../components/ViewCard";
import { Link } from "react-router-dom";

const ActiveFundraisers = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [donationData, setDonationData] = useState([
    {
      title: "help to brighten the lives of abandon children and their family by giving",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 1000,
      goalAmount: 5000,
      daysLeft: 5,
      Suppoters: 2203,
      to: "/fundraisers",
    },
    {
      title: "Supporting Elderly Care",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 3000,
      goalAmount: 6000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Animal Welfare Fund",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 2000,
      goalAmount: 4000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Animal Welfare Fund",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 2000,
      goalAmount: 4000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Animal Welfare Fund",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 2000,
      goalAmount: 4000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Animal Welfare Fund",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 2000,
      goalAmount: 4000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Animal Welfare Fund",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 2000,
      goalAmount: 4000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Animal Welfare Fund",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 2000,
      goalAmount: 4000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Animal Welfare Fund",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 2000,
      goalAmount: 4000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Animal Welfare Fund",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 2000,
      goalAmount: 4000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Animal Welfare Fund",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 2000,
      goalAmount: 4000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Animal Welfare Fund",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 2000,
      goalAmount: 4000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    {
      title: "Animal Welfare Fund",
      by: "by Maitri",
      imageSrc: "https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715067573/samples/balloons.jpg",
      raisedAmount: 2000,
      goalAmount: 4000,
      daysLeft: 5,
      Suppoters: 2203,
    },
    // ... more data
  ]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="w-full flex flex-col items-center mb-10">
      <h1 className="text-4xl font-extrabold py-8 pl-8 md:pl-0">
        Currently Active Fundraiser
      </h1>
      <div className="flex flex-col md:flex-row w-full my-12">
        <div className="flex flex-col items-start w-full md:w-[30vw] pl-10">
          <h1 className="text-3xl font-semibold">Categories</h1>
          <ul className="text-sm flex flex-row flex-wrap gap-4 md:flex-col w-full md:w-[200px] font-semibold my-4">
            <li className="p-2">
              <input type="checkbox" id="item1" className="mx-2" name="item1" />
              <label htmlFor="item1">Causes</label>
            </li>
            <li className="p-2">
              <input type="checkbox" id="item2" className="mx-2" name="item2" />
              <label htmlFor="item2">Children</label>
            </li>
            <li className="p-2">
              <input type="checkbox" id="item3" className="mx-2" name="item3" />
              <label htmlFor="item3">Bread</label>
            </li>
            <li className="p-2">
              <input type="checkbox" id="item4" className="mx-2" name="item4" />
              <label htmlFor="item4">Apples</label>
            </li>
            <li className="p-2">
              <input type="checkbox" id="item5" className="mx-2" name="item5" />
              <label htmlFor="item5">Bananas</label>
            </li>
            <li className="p-2">
              <input type="checkbox" id="item6" className="mx-2" name="item6" />
              <label htmlFor="item6">Grapes</label>
            </li>
            <li className="p-2">
              <input type="checkbox" id="item7" className="mx-2" name="item7" />
              <label htmlFor="item7">Oranges</label>
            </li>
          </ul>
        </div>

        <div className="flex flex-col w-full md:w-[70vw] my-12">
          <div className="w-full flex flex-row md:ml-12">
            <div className="flex items-center w-full md:w-[90%]">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                className="border-2 border-red-300 rounded-full focus-within:ring-1 focus-within:ring-red-400 flex-grow outline-none px-4 sm:px-12 py-2 sm:py-3 bg-transparent rounded-l-full rounded-r-none"
              />
              <button
                onClick={handleSearch}
                className="bg-red-500 hover:bg-red-600 text-white px-5 sm:px-7 py-3 md:py-4 rounded-r-full border-2 border-red-500 rounded-l-none focus:outline-none"
              >
                <BsSearch />
              </button>
            </div>
          </div>

          <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 my-16">
            {donationData.map((data, index) => (
              <div key={index} className="min-h-[400px] h-auto md:h-full">
                <Link to={data.to}>
                  <ViewCard {...data} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFundraisers;
