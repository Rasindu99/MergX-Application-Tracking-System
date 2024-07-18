import React from 'react';
import RecruiterNav from './RecruiterNav';
import RecruiterHeader from './RecruiterHeader';
import {Outlet} from 'react-router-dom'
import AdminChatBotBottom from '../admincomp/AdminChatBotBottom';



export default function Layout() {
  return (
    <div className='flex flex-row h-fit bg-[#191919]  '>
      <RecruiterNav />
      <div className='flex-1 '>
        <RecruiterHeader />
        <div className='pt-20 '>{<Outlet />}</div>
      </div>
       {/* Move AdminChatBotBottom here and wrap it in a positioned div */}
       <div className="absolute bottom-0 right-0 z-50">
        <AdminChatBotBottom/>
      </div>
    </div>
  )
}