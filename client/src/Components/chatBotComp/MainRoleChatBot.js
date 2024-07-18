import React, { useContext, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { UserContext } from '../../Context/UserContext';
import ChatBotImage from '../../Images/ChatBot.png';

import AiMode from './AiMode';


export default function MainRoleChatBot({ onClose }) {
  const { user } = useContext(UserContext);
  const [mode, setMode] = useState(null); // State to manage the active mode

  const handleModeChange = (mode) => {
    setMode(mode);
  };

  return (
    <div className=''>
      <div className='flex justify-between h-10 my-auto rounded-tl-lg rounded-tr-lg bg-[#27272a] sticky top-0'>
        <div className='my-auto ml-6 '>
          <h1 className='text-[20px]'>Chatty</h1>
        </div>
        <div className='my-auto '>
          <button 
            onClick={onClose}
            className='flex w-10 h-10 my-auto rounded-tr-lg hover:bg-red-700'>
            <IoMdClose className='mx-auto my-auto size-6'/>
          </button>
        </div>    
      </div>
      
      <div className=''>
        {mode === null && (
          <>
            <div className='pt-8'>
              <h1 className='text-xl'>
                Hi {user ? `${user.fname} ${user.lname}` : 'Guest'}
              </h1>
              <p className='opacity-40'>My name is Chatty.. your private assistant</p>
            </div>
            
            <div className='flex justify-center pt-8'>
              <div>
                <img src={ChatBotImage} alt='chatbotimage' className='h-[200px] w-[200px] rounded-full border-orange-400 border-[2px]'></img>
              </div>
            </div>

            <div className='pt-8'>
              
              
              <div className='mt-3'>
                <button 
                  className='h-10 bg-orange-600 rounded-md w-[150px] hover:bg-orange-800'
                  onClick={() => handleModeChange('ai')}
                >
                  Get Start
                </button>
              </div>
            </div>
          </>   
        )}
      </div>
      
      <div >
        
        {mode === 'ai' && <AiMode />}
      </div>
    </div>
  );
}
