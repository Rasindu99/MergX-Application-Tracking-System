import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../Images/Logo';
import Bgg from '../Images/Bgg';
import { FaRegUser, FaMobileAlt } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { toast } from 'react-hot-toast';

function Forget() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/forgetPassword', { email, phone_number: phoneNumber });
      setMessage(response.data.message);
      if (response.data.message === 'Verification code sent') {
        toast.success('Verification code sent');
        navigate('/verifyotp');
      } else {
        toast.error('Email or phone number is incorrect'); // Display toast notification for incorrect email or phone number
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='absolute block h-12 mx-6 my-6'>
        <Link to='/login' className='text-4xl text-white opacity-40'><IoArrowBackSharp /></Link>
      </div>

      {/* Left Section */}
      <section className='flex md:w-full lg:w-full'>
        <div className='w-full px-4 md:px-12 lg:px-24 my-14'>
          <form className='mx-auto md:w-96 my-36' onSubmit={handleSubmit}>
            <div className='py-2'>
              <h1 className='text-5xl'>Forget Password</h1>
            </div>
            <div className='pb-4 text-center opacity-30'>
              <h1 className='text-2xl'>Applicant Tracking System</h1>
            </div>
            <div className='mb-5 opacity-30'>
              <hr />
            </div>
            <div className='grid gap-8 text-black'>
              <div className='relative'>
                <FaRegUser className='absolute text-white top-4 left-3 opacity-30'/>
                <input 
                  type='text' 
                  placeholder='Enter Email here' 
                  className='w-full px-10 text-white bg-white border rounded-lg bg-opacity-10 h-14' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className='grid gap-8 mt-3 text-black pt-7'>
              <div className='relative'>
                <FaMobileAlt className='absolute text-white top-4 left-3 opacity-30'/>
                <input 
                  type='text' 
                  placeholder='Enter mobile number here' 
                  className='w-full px-10 text-white bg-white border rounded-lg bg-opacity-10 h-14' 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            
            <div className='pt-10'>
              <button type='submit' className='w-full h-12 px-12 bg-orange-600 rounded-2xl'>Send verification code</button>
            </div>
            <div className='opacity-30'>
              <label>Check your email</label>
            </div>
            {message && <div className='mt-4 text-white'>{message}</div>}
          </form>
        </div>
      </section>

      {/* Right Section */}
      <div className='flex justify-center text-center bg-white md:w-3/12 sm:w-auto lg:w-5/12'>
        <div className='absolute items-center my-48 text-center'>
          <Logo />
        </div>
        <div className='opacity-20 blur'>
          <Bgg />
        </div>
      </div>
    </div>
  );
}

export default Forget;
