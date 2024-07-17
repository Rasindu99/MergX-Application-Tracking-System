import React , { useState } from 'react'
import { FaRobot } from "react-icons/fa6";
import ChatBot from '../../Components/chatBotComp/MainRoleChatBot';
import Draggable from 'react-draggable';

export default function AdminChatBotBottom() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
      setIsChatbotOpen(!isChatbotOpen);
    };
  
    const handleClose = async() => {
      setIsChatbotOpen(false);
    };
  
  return (
    <div>
        <div className="absolute text-white bottom-4 right-4 ">
        <button 
            className='rounded-full size-[60px] flex justify-center items-center' 
            onClick={toggleChatbot}
          >
            <FaRobot className='size-[50px] hover:opacity-10' />
          </button>

          {isChatbotOpen && (
        <Draggable>
          <div className='fixed bottom-0 right-5 w-[450px] bg-[#17171A] border-orange-400 border-[1px] shadow-lg h-2/3 rounded-lg  overflow-auto  '>
            <ChatBot onClose={handleClose} />
          </div>
        </Draggable>
        
      )}
        </div>
    </div>
  )
}
