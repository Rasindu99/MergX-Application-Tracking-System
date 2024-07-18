import React from 'react'
import Home from '../../Components/InternalChatComp/home/Home';

export default function Message() {
  return (
    <div className='flex justify-end items-center w-full h-[799px] overflow-hidden bg-neutral-800'>
      <div className='w-[80%] h-[85%] bg-neutral-800 p-5 rounded-3xl ml-5 mr-10 flex justify-center'>
        <div className='w-full h-full'>
          <Home />
        </div>
      </div>
    </div>
  )
}
