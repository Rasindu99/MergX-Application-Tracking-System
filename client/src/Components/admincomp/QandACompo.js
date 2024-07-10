import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function QandACompo() {
  const [getQandA, setGetQandA] = useState([]);
  const [sendtruegetQandA, setSendtruegetQanda] = useState([]);

  // get q and a
  const getQandAsapi = async () => {
    try {
      const response = await axios.get("/qanda/getsendfalsemessage");
      setGetQandA(response.data.QandAs);
    } catch (error) {
      console.error("error fetching Q and A data: ", error);
    }
  };

  //get true send q and a 
  const getQandAsapisenttrue = async () =>{
    try {
      const response = await axios.get("/qanda/getsendtruemessage");
      setSendtruegetQanda(response.data.QandAs);
    } catch (error) {
      console.error("error fetching Q and A data: ", error);
    }
  }

  useEffect(() => {
    getQandAsapi();
    getQandAsapisenttrue();
  }, []); // Added empty dependency array to prevent infinite loop

  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return { date: formattedDate, time: formattedTime };
  };

  return (
    <div className=''>
      <h1>Hello</h1>
      
      <div className='flex mx-8'>
        <div className='w-2/3 border'>
          <h1>Q&A Messages</h1>
          <div className='mx-4 border h-[600px] overflow-y-auto'>
            <div >
              {getQandA.map((qa, index) => {
                const { date, time } = formatDateTime(qa.createdAt);
                return (
                  <div key={index} className='p-2 border'>
                    <div className='flex items-center'>
                      <div className='relative ml-3'>
                        <FaRegQuestionCircle className='size-[40px] opacity-50'/>
                        {!qa.read && (
                          <div className='absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full'></div>
                        )}
                      </div>
                      <div className='flex-grow ml-3'>
                        <p><strong>Name:</strong> {qa.username}</p>
                        <p><strong>Email:</strong> {qa.useremail}</p>
                        <p><strong>Date:</strong> {date}</p>
                        <p><strong>Time:</strong> {time}</p>
                      </div>
                      <div className='ml-3'>
                        <button className='px-3 py-1 text-white hover:text-opacity-40 '><FaRegEye className='size-[30px]' /></button>
                      </div>
                      <div className='ml-3'>
                        <button className='px-3 py-1 text-red-600 hover:text-opacity-40'><MdDeleteForever className='size-[30px]' /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className='w-1/3 border'>
          <h1>How are you</h1>
          <div  className='mx-4 border h-[600px] overflow-y-auto'>
          <div>
              {sendtruegetQandA.map((qa, index) => {
                const { date, time } = formatDateTime(qa.createdAt);
                return (
                  <div key={index} className='p-2 border'>
                    <div className='flex items-center'>
                      <div className='relative ml-3'>
                        <FaRegQuestionCircle className='size-[40px] opacity-50'/>
                      </div>
                      <div className='flex-grow ml-3'>
                        <p><strong>Name:</strong> {qa.username}</p>
                        <p><strong>Email:</strong> {qa.useremail}</p>
                        <p><strong>Date:</strong> {date}</p>
                        <p><strong>Time:</strong> {time}</p>
                      </div>
                      <div className='ml-3'>
                        <button className='px-3 py-1 text-white bg-blue-500 rounded'>View</button>
                      </div>
                      <div className='ml-3'>
                        <button className='px-3 py-1 text-white bg-red-500 rounded'>Delete</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}