import React from 'react'
import HiringmanagerNav from '../../Components/hiringManagerCompo/HiringManagerNav'
import Topbar from '../../Components/hiringManagerCompo/Topbar'
import AdminChatBotBottom from '../../Components/admincomp/AdminChatBotBottom'
import Home from '../../../src/Components/InternalChatComp/home/Home'

export default function MessageHiringManager() {
  return (
    <div className='flex w-screen h-screen relative justify-end flex-col'>
      <div className='h-full w-full'>
        <div className='fixed'>
          <HiringmanagerNav />
        </div>
        <div className='w-[82%] absolute top-0 right-0'>
          <Topbar title='Message' ></Topbar>
        </div>
        {/* Move AdminChatBotBottom here and wrap it in a positioned div */}
        <div className="absolute bottom-0 right-0 z-50">
          <AdminChatBotBottom />
        </div>
      </div>
      <div className='bg-[#2d2c2c78] rounded-3xl w-[81%] h-[87%] flex items-center justify-center absolute right-5 top-24'>
        <div className=' w-[80%] h-[80%]'>
        <Home/>
        </div>
      </div>
    </div>
  )
}
