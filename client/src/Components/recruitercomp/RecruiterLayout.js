import React from 'react';
import RecruiterNav from './RecruiterNav';
import RecruiterHeader from './RecruiterHeader';
import {Outlet} from 'react-router-dom'



export default function Layout() {
  return (
    <div className='flex flex-row h-[950px] bg-[#191919]'>
      <RecruiterNav />
      <div className='flex-1'>
        <RecruiterHeader />
        <div className='pt-20'>{<Outlet />}</div>
      </div>
    </div>
  )
}