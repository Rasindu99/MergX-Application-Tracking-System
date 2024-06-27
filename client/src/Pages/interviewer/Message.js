import React from 'react';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import Home from '../../Components/InternalChatComp/home/Home';

export default function Message() {
  const name = 'Good Morning, Gangamina';

  return (
    <div className=''>
      <div className='flex'>
        <div>
          <InterviewNav />
        </div>
        <div className='flex flex-col justify-around items-center w-full'>
          <div className='h-auto bg-blue-300 z-20 w-full'>
            <Description name={name} />
          </div>
          <div className='flex h-5/6 w-5/6 overflow-y-auto'>
            <Home />
          </div>
        </div>
      </div>
    </div>
  )
}