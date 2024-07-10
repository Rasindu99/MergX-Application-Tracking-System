import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export default function QandACompo() {
  const [getQandA, setGetQandA] = useState([]);
  const [sendtruegetQandA, setSendtruegetQanda] = useState([]);
  const [messageShowModel, setMessageShowModel] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState();

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

  //handle view send is false
  const handleview = (message) => {
    setMessageShowModel(true);
    setSelectedMessage(message)
  }

  //handle close
  const handleModalClose = () =>{
    setMessageShowModel(false);
    setSelectedMessage(null);
  }

  //handle reply submission
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!selectedMessage || !reply.trim()) return;

    try {
      const response = await axios.put(`/qanda/putreply/${selectedMessage._id}`, { reply });
      if (response.status === 200) {
        // Update local state
        setGetQandA(prevQandA => prevQandA.filter(qa => qa._id !== selectedMessage._id));
        setSendtruegetQanda(prevQandA => [...prevQandA, response.data.qanda]);
        handleModalClose();
        // Optionally, show a success message
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      // Optionally, show an error message
    }
  };

  // New function to handle marking a message as read
  const handleMarkAsRead = async (id) => {
    try {
      const response = await axios.put(`/qanda/putreadtrue/${id}`);
      if (response.status === 200) {
        // Update the local state to reflect the change
        setGetQandA(prevQandA => 
          prevQandA.map(qa => 
            qa._id === id ? { ...qa, read: true } : qa
          )
        );
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

   // Handle reply text change
   const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  // Handle reply clear
  const handleReplyClear = () => {
    setReply('');
  };

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
          <h1 className='pb-4 text-2xl text-orange-500 text-bold'>New Messages</h1>
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
                        <button 
                        onClick={() => {
                          handleview(qa);
                          if (!qa.read) {
                            handleMarkAsRead(qa._id);
                          }
                        }}
                        className='px-3 py-1 text-white hover:text-opacity-40 '><FaRegEye className='size-[30px]' /></button>
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
          <h1 className='pb-4 text-2xl text-orange-500 text-bold'>Replied Messages</h1>
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
      </div>
      {messageShowModel && selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
          <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[800px] w-[1000px] border-orange-700 border-[1px] relative">
              <button onClick={handleModalClose} className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12">
                <IoMdClose className="text-white hover:text-red-700" />
              </button>

            <div>
            <h2 className='text-xl font-bold'>Message Details</h2>
              <p><strong>Name:</strong> {selectedMessage.username}</p>
              <p><strong>Email:</strong> {selectedMessage.useremail}</p>
              <p><strong>Date:</strong> {formatDateTime(selectedMessage.createdAt).date}</p>
              <p><strong>Time:</strong> {formatDateTime(selectedMessage.createdAt).time}</p>
              <p><strong>Message:</strong> {selectedMessage.message}</p>

              <div>
                <form onSubmit={handleReplySubmit}>
                  <div>
                    <textarea 
                      className='w-full p-2 mt-4 text-black border rounded'
                      value={reply}
                      onChange={handleReplyChange}
                      placeholder="Type your reply here..."
                      rows="4"
                    ></textarea>
                  </div>
                  <div className='flex justify-end mt-4 space-x-4'>
                    <button 
                      type="submit"
                      className='px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700'
                    >
                      Send
                    </button>
                    <button 
                      type="button"
                      onClick={handleReplyClear}
                      className='px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700'
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}