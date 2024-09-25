import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {



  return (
    <footer className="bg-gray-800 text-white mt-36 pt-16 pb-6 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col justify-start items-start mb-8 md:mb-0">
          <h4 className="text-lg font-semibold mb-2">About</h4>
          <ul>
            <li><Link to="/about-us"  className="text-white hover:text-blue-500">About Us</Link></li>
            <li><a  className="text-white hover:text-blue-500">Blog</a></li>
            <li><Link  to="/faqs" className="text-white hover:text-blue-500">FAQ</Link></li>
          </ul>
        </div>
        <div className="flex flex-col justify-start items-start mb-8 md:mb-0">
          <h4 className="text-lg font-semibold mb-2">Fundraiser Support</h4>
          <ul className="text-md">
            <li><a className="text-white hover:text-blue-500">Reach Out</a></li>
            <li><a  className="text-white hover:text-blue-500">Social Causes</a></li>
            <li><a  className="text-white hover:text-blue-500">NGO</a></li>
          </ul>
        </div>
        <div className="flex flex-col justify-start items-start mb-8 md:mb-0">
          <h4 className="text-lg font-semibold mb-2">Start a Fundraiser for</h4>
          <ul className="text-md">
            <li><a  className="text-white hover:text-blue-500">NGO</a></li>
            <li><a  className="text-white hover:text-blue-500">Blog</a></li>
            <li><Link  to="/faqs" className="text-white hover:text-blue-500">FAQ</Link></li>
          </ul>
        </div>
        <div className="flex flex-col justify-start items-start mb-8 md:mb-0">
          <h4 className="text-lg font-semibold mb-2">Donate to</h4>
          <ul className="text-md">
          <li><Link to="/about-us"  className="text-white hover:text-blue-500">About Us</Link></li>
            <li><a  className="text-white hover:text-blue-500">Blog</a></li>
            <li><Link  to="/faqs" className="text-white hover:text-blue-500">FAQ</Link></li>
          </ul>
        </div>
        <div className="flex flex-col justify-start items-start mb-8 md:mb-14">
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-white text-xl hover:text-blue-500" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-white text-xl hover:text-blue-500" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white text-xl hover:text-blue-500" />
            </a>
          </div>
        </div>
      </div>
      <p className="text-sm mt-16 text-center">
        &copy; {new Date().getFullYear()} Keep Changes. &nbsp; All rights reserved.
      </p>
      <p className="text-base mt-2 text-center">
        Disclaimer: The photos of children and testimonials used on this website are for illustrative purposes only and do not imply endorsement.
      </p>
    </footer>
  );
};

export default Footer;
