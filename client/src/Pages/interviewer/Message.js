import React from 'react';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import AdminChatBotBottom from '../../Components/admincomp/AdminChatBotBottom';
import Home from '../../Components/InternalChatComp/home/Home';


export default function Message() {
  const name = 'Good Morning, Gangamina';

  return (
    <div className='h-screen bg-neutral-900'>
      <div className='flex h-full'>
        <div>
          <InterviewNav />
        </div>
        <div className='flex flex-col justify-around items-center w-full h-full'>
          <div className='w-full'>
            <Description name={name} />
          </div>
          <div className='flex justify-center overflow-y-auto items-center w-11/12 p-12 h-5/6 bg-[#232323] rounded-badge mx-2'>
            <Home />
          </div>
        </div>
        </div>
      <div className="absolute bottom-0 right-0 z-50">
        <AdminChatBotBottom />
      </div>
    </div>
  )
}