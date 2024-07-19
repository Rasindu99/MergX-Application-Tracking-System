import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Images/Logo';
import Bgg from '../Images/Bgg';
import { IoArrowBackSharp } from "react-icons/io5";
import { MdOutlineConfirmationNumber, MdOutlinePassword } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerifyClick = async () => {
    try {
      const response = await axios.post('/checkotp', { otp });
      if (response.status === 200 && response.data.message === 'OTP is correct') {
        setIsVerified(true);
        toast.success('OTP verified successfully');
      } else {
        toast.error(response.data.error || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.put('/changepassword', { otp, newPassword: password });
      if (response.status === 200) {
        toast.success('Password changed successfully');
        navigate('/login');
      } else {
        toast.error(response.data.error || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='absolute block h-12 mx-6 my-6'>
        <Link to='/forget' className='text-4xl text-white opacity-40'>
          <IoArrowBackSharp />
        </Link>
      </div>

      <section className='flex md:w-full lg:w-full'>
        <div className='w-full px-4 md:px-12 lg:px-24 my-14'>
          <form className='mx-auto md:w-96 my-36'>
            <div className='py-2 '>
              <h1 className='text-4xl '>Create new Password</h1>
            </div>
            <div className='pb-4 text-center opacity-30'>
              <h1 className='text-2xl'>Applicant Tracking System</h1>
            </div>
            <div className='mb-5 opacity-30'>
              <hr />
            </div>
            {!isVerified && (
              <div className='grid gap-8 text-black'>
                <div className='relative'>
                  <MdOutlineConfirmationNumber className='absolute text-white top-4 left-3 opacity-30' />
                  <input
                    type='text'
                    placeholder='Enter verification code'
                    className='w-full px-10 text-white bg-white border rounded-lg bg-opacity-10 h-14'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>
            )}

            {isVerified && (
              <>
                <div className='grid gap-8 pt-3 mt-3 text-black md:w-48'>
                  <div className='px-3 mt-5 text-white opacity-30'><MdOutlinePassword /></div>
                  <input
                    type='password'
                    placeholder='Enter password'
                    className='w-full rounded-lg bg-[white] bg-opacity-10 text-white h-14 border absolute px-10 md:w-96 lg:border sm:border md:border'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className='grid gap-8 pt-2 text-black my-9 md:w-48'>
                  <div className='px-3 mt-5 text-white opacity-30'><MdOutlinePassword /></div>
                  <input
                    type='password'
                    placeholder='Re-Enter password'
                    className='w-full rounded-lg bg-[white] bg-opacity-10 text-white h-14 border absolute px-10 md:w-96 lg:border sm:border md:border'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className='pt-10 pb-4'>
              {!isVerified ? (
                <button
                  type='button'
                  className='w-full h-12 px-12 bg-orange-600 hover:bg-orange-500 rounded-2xl md:w-auto'
                  onClick={handleVerifyClick}
                >
                  Verify
                </button>
              ) : (
                <button
                  type='button'
                  className='w-full h-12 px-12 bg-orange-600 hover:bg-orange-500 rounded-2xl md:w-auto'
                  onClick={handlePasswordChange}
                >
                  Change Password
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

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
