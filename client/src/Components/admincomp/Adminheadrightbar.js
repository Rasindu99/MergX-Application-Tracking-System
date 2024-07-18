import React, { useState,  useContext  } from 'react'
import { UserContext } from '../../Context/UserContext';


export default function Adminheadrightbar() {
    const { user } = useContext(UserContext);
    const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='flex'>
      <div className='flex items-center mr-4'>
        
      </div>
      <div 
      className="relative flex items-center justify-between px-2  bg-neutral-700 h-[60px] rounded-3xl w-[150px]" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}>
      <div
        className={`box-border h-[54px] w-[54px] rounded-full  bg-center bg-cover overflow-hidden mr-2 relative ${
          isHovered ? 'border-s-2 animate-spin border-orange-500' : 'border-2 border-orange-500'
        }`}
      ></div>
      <div className="box-border absolute  h-[46px] w-[46px] ml-1 mr-2 overflow-hidden bg-center bg-cover border-orange-500 rounded-full">
        <img src={user.image} alt='profilepic'/>
      </div>

      <p className='flex flex-col mb-2 mr-2'>
        <span className='text-sm font-bold text-neutral-200'>{user.fname}</span>
        <span className='text-xs font-bold text-neutral-500'>{user.role}</span>
      </p>

    </div>
    </div>
    
  )
}
