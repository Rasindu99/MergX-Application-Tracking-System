import React, { useState } from 'react';
import Sidebar from '../../../src/Components/candidateComp/sidebar/Sidebar';
import RightContainer from '../../../src/Components/candidateComp/rightContainer/RightContainer';
import '../candidate/customStyle.css';
import { FaRobot } from "react-icons/fa6";
//import ChatBot from '../../Components/chatBotComp/ChatBot';
import Draggable from 'react-draggable';
import CandiChat from '../../Components/chatBotComp/CandiChat';

export default function Candidatedash() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleClose = async() => {
    setIsChatbotOpen(false);
  };

  return (
    <div className='relative flex'>
      <Sidebar />
      <RightContainer />
      <div className='fixed bottom-0 flex justify-end w-full pr-12 mb-8'>
        <div>
          <button 
            className='rounded-full size-[60px] flex justify-center items-center' 
            onClick={toggleChatbot}
          >
            <FaRobot className='size-[50px] hover:opacity-10' />
          </button>
        </div>
      </div>
      {isChatbotOpen && (
        <Draggable>
          <div className='fixed bottom-0 right-5 w-[450px] bg-[#17171A] border-orange-400 border-[1px] shadow-lg h-2/3 rounded-lg  overflow-auto  '>
            <CandiChat onClose={handleClose} />
          </div>
        </Draggable>
        
      )}
    </div>
  );
}
