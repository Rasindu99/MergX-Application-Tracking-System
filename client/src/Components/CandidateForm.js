import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Images/Logo';
import Bgg from '../Images/Bgg';
//import { FaRegUser } from "react-icons/fa";
//import { FaMobileAlt } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
//import ChangePassword from './ChangePassword';

function Forget() {
  return (
    <div className='flex h-screen'>

       {/* left Section */}
       <div className='flex justify-center text-center bg-white md:w-3/12 sm:w-auto lg:w-5/12'>
        <div className='absolute items-center my-48 text-center '>
          <Logo className='' />
        </div>
        <div className='opacity-20 blur'>
          <Bgg />
        </div>
      </div>
      
      <div div className='flex h-12 mx-6 my-6 text-left '>
        <Link to='/' className='text-4xl text-white opacity-40'><IoArrowBackSharp /></Link>
        </div>

      {/* right Section */}
      <section className='flex items-center justify-center md:w-screen lg:w-screen '>
      
        <div className='px-4  lg:w-[610px] md:px-12 lg:px-1 md:w-[500px] '>
          <div className=''>
            <form className=''>
              <div className='py-2'>
                <h1 className='text-5xl'>Sign up as a candidate </h1>
              </div>
              <div className='pb-4 text-left opacity-30'>
                <h1 className='text-2xl '>It's quick and easy</h1>
              </div>
              <div className='mb-5 opacity-30'>
                <hr className=''></hr>
              </div>
              
              {/* input filed */}
              <div>
              
                <div className=' md:justify-between lg:flex md:flex lg:justify-center sm:block md:w-96 lg:justify-between lg:w-full'>
                  <div>
                    <input className='lg:w-[250px] h-10 text-center rounded-lg bg-[white] bg-opacity-10 md:48 ' placeholder='first name'></input>
                  </div>
                  <div className='my-5 sm:my-5 md:my-0 lg:my-0'>
                    <input className='lg:w-[250px] h-10 text-center rounded-lg bg-[white] bg-opacity-10 md:48 lg:ml-auto' placeholder='Middle name'></input>
                  </div>
                </div>
                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] lg:justify-between'>
                    <input type='Email' placeholder='Email' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'></input>
                </div>

                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] lg:justify-between'>
                    <input type='Email' placeholder='Contact Number' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'></input>
                </div>

                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] lg:justify-between'>
                    <input type='Email' placeholder='New Password' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'></input>
                </div>

                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] lg:justify-between'>
                    <input type='Email' placeholder='Re-Enter Password' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'></input>
                </div>
                
                <div>
                  <div className='text-left'>
                    <label>Date Of Birth</label>
                  </div>
                  <div className='my-2  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] lg:justify-between'>
                    <input type='date'  className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'></input>
                  </div>
                </div>

                <div>
                  
                  <div className='text-left'>
                    <label>Gender</label>
                  </div>
                  
                  <div className='my-2  lg:flex  lg:justify-center  justify-between md:items-center md:w-[400px] lg:justify-between px-12 pt-2 md:px-1 text-center  lg:w-[610px] md:block sm:block '>
                      <div className='h-10 pt-2 border rounded-lg w-28 bg-[white] bg-opacity-10 md:mx-12 sm:py-2'>
                        <lable className='px-4 '>Male</lable>
                        <input className='' type='checkbox'></input>
                      </div>
                      
                      <div className='h-10 pt-2 border rounded-lg w-28 bg-[white] bg-opacity-10 md:mx-12 md:my-3 sm:my-3'>
                        <lable className='px-4'>Female</lable>
                        <input type='checkbox' className='bg-[white] bg-opacity-10'></input>
                      </div>

                      <div className='h-10 pt-2 border rounded-lg w-28 bg-[white] bg-opacity-10 md:mx-12'>
                        <lable className='px-4 '>Other</lable>
                        <input type='checkbox' className='bg-none'></input>
                      </div>
                  </div>
                </div>
              
              </div>
              
              
              <div className='pt-10'>
                  <Link to='#'>
                    <button className='w-full h-12 px-12 bg-orange-600 rounded-2xl md:w-auto'>SIGN UP</button>
                  </Link>
              </div>
              
            </form>
          </div>
        </div>
      </section>

     
    </div>
  );
}

export default Forget;
