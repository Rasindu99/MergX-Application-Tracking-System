import React from 'react'
import HiringmanagerNav from '../../Components/hiringManagerCompo/HiringManagerNav'
import Topbar from '../../Components/hiringManagerCompo/Topbar'
import AdminChatBotBottom from '../../Components/admincomp/AdminChatBotBottom'

export default function MessageHiringManager() {
  return (
    <div  className='flex w-screen'>
      <div className='fixed'>
        <HiringmanagerNav/>
      </div>
      <div className='w-screen lg:ml-[320px] md:ml-72 ml-[260px] '>
      <Topbar title='Message' ></Topbar>
      </div>
       {/* Move AdminChatBotBottom here and wrap it in a positioned div */}
       <div className="absolute bottom-0 right-0 z-50">
        <AdminChatBotBottom/>
      </div>
    </div>
  )
}
