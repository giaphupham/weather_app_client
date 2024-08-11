import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/send_otp_email`, { email });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message, {
          autoClose: 3000,
          containerId: 'NavBar'
        });
        setShowModal(false);
        setShowOtpModal(true);
      }
      else{
        toast.error(response.data.message, {
          autoClose: 3000,
          containerId: 'NavBar'});
      }
    } catch (error) {
      toast.error(error.response.data.error, 
        {
          autoClose: 3000,
          containerId: 'NavBar'}
      );
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/verify_otp`, { email, otp });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message, {
          autoClose: 3000,
          containerId: 'NavBar'
        });
        setShowModal(false);
        setShowOtpModal(true);
      }
      else{
        toast.error(response.data.message, {
          autoClose: 3000,
          containerId: 'NavBar'});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, 
        {
          autoClose: 3000,
          containerId: 'NavBar'}
      );
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/send_unsubscribe_otp`, { email });
      if (response.status === 200) {
        toast.success(response.data.message, {
          autoClose: 3000,
          containerId: 'NavBar'
        });
        setShowModal(false);
        setShowOtpModal(true);
      }
      else{
        toast.error(response.data.message, {
          autoClose: 3000,
          containerId: 'NavBar'});
      }
      setShowUnsubscribeModal(false);
      setShowOtpModal(true); // Reuse OTP modal for unsubscribe
    } catch (error) {
      toast.error(error.response.data.error, 
        {
          autoClose: 3000,
          containerId: 'NavBar'}
      );
    }
  };

  const handleUnsubscribeOtpSubmit = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/verify_unsubscribe_otp`, { email, otp });
      if (response.status === 200) {
        toast.success(response.data.message, {
          autoClose: 3000,
          containerId: 'NavBar'
        });
        setShowModal(false);
        setShowOtpModal(true);
      }
      else{
        toast.error(response.data.message, {
          autoClose: 3000,
          containerId: 'NavBar'});
      }
    } catch (error) {
      toast.error(error.response.data.error, 
        {
          autoClose: 3000,
          containerId: 'NavBar'}
      );
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleOtpModalToggle = () => {
    setShowOtpModal(!showOtpModal);
  };

  const handleUnsubscribeModalToggle = () => {
    setShowUnsubscribeModal(!showUnsubscribeModal);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-4xl font-bold ml-12">
          <Link to="/">WeatherApp</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded">Home</Link>
            <Link to="/history" className="text-white hover:bg-blue-700 px-3 py-2 rounded">History</Link>
          </div>
          <button
            onClick={handleModalToggle}
            className="bg-white text-blue-600 hover:bg-gray-200 px-3 py-2 rounded"
          >
            Subscribe
          </button>
          <button
            onClick={handleUnsubscribeModalToggle}
            className="bg-red-600 text-white hover:bg-red-700 px-3 py-2 rounded"
          >
            Unsubscribe
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-blue-700 mt-6`}>
        <div className="flex flex-col items-start p-4">
          <Link to="/" className="text-white hover:bg-blue-800 px-3 py-2 rounded mb-2">Home</Link>
          <Link to="/history" className="text-white hover:bg-blue-800 px-3 py-2 rounded mb-2">History</Link>
          <button
            onClick={handleModalToggle}
            className="bg-white text-blue-600 hover:bg-gray-200 px-3 py-2 rounded mb-2"
          >
            Subscribe
          </button>
          <button
            onClick={handleUnsubscribeModalToggle}
            className="bg-red-600 text-white hover:bg-red-700 px-3 py-2 rounded mb-2"
          >
            Unsubscribe
          </button>
        </div>
      </div>

      {/* Modal for Subscription */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Subscribe to Daily Weather Forecast</h2>
            <p className='my-2'>When you subscribe you will allow us to send you an email for daily weather forecast information.</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded border border-gray-300 w-full mb-4"
              placeholder="Enter your email"
              required
            />
            <button
              onClick={handleRegister}
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded mr-2"
            >
              Subscribe
            </button>
            <button
              onClick={handleModalToggle}
              className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* Modal for Unsubscribe */}
      {showUnsubscribeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Unsubscribe from Daily Weather Forecast</h2>
            <p className='my-2'>Enter your email to unsubscribe from daily weather forecast emails.</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded border border-gray-300 w-full mb-4"
              placeholder="Enter your email"
              required
            />
            <button
              onClick={handleUnsubscribe}
              className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded mr-2"
            >
              Unsubscribe
            </button>
            <button
              onClick={handleUnsubscribeModalToggle}
              className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal for OTP Verification */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Verify OTP Code</h2>
            <p className='my-2'>Enter the OTP code sent to your email.</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="px-3 py-2 rounded border border-gray-300 w-full mb-4"
              placeholder="Enter OTP code"
              required
            />
            <button
              onClick={showUnsubscribeModal ? handleUnsubscribeOtpSubmit : handleOtpSubmit}
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded mr-2"
            >
              Submit
            </button>
            <button
              onClick={handleOtpModalToggle}
              className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <ToastContainer containerId={'NavBar'}/>
    </nav>
  );
};

export default Navbar;
