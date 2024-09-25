import React from 'react';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <div className="bg-white min-h-screen p-8">
    
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Welcome to <span className="font-semibold text-red-500">Keep Changes</span>, where we believe in the power of people coming together to make a difference. Our mission is to help you raise funds for the causes that matter the most to you.
        </p>
      </div>

     
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          We are committed to making fundraising easy, transparent, and impactful. Our platform empowers individuals and organizations to bring their ideas to life, help communities in need, and create lasting change.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="bg-red-100 p-8 rounded-lg shadow-lg flex-1">
          <h3 className="text-2xl font-bold text-red-500 mb-4">Trust</h3>
          <p className="text-lg text-gray-700">
            We believe in building trust by ensuring transparency, security, and accountability in every campaign.
          </p>
        </div>
        <div className="bg-red-100 p-8 rounded-lg shadow-lg flex-1">
          <h3 className="text-2xl font-bold text-red-500 mb-4">Community</h3>
          <p className="text-lg text-gray-700">
            We foster a sense of community by connecting people with common goals, allowing them to support each other.
          </p>
        </div>
        <div className="bg-red-100 p-8 rounded-lg shadow-lg flex-1">
          <h3 className="text-2xl font-bold text-red-500 mb-4">Impact</h3>
          <p className="text-lg text-gray-700">
            Every contribution, big or small, has the power to change lives. We help amplify that impact through our platform.
          </p>
        </div>
      </div>

     
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Founder"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">Teeku badmas</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="CTO"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">Pranav Panga</h3>
            <p className="text-gray-600">Chief Technology Officer</p>
          </div>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Marketing Head"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">Moland Sama</h3>
            <p className="text-gray-600">Head of Marketing</p>
          </div>
        </div>
      </div>

     
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Join Us Today!</h2>
        <p className="text-xl text-gray-600 mb-6 max-w-xl mx-auto">
          Whether you're looking to start a campaign or contribute to one, we invite you to be part of our growing community.
        </p>
        <Link to="/" className="bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition duration-300">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default About;
