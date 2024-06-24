import React from 'react'
import profileImg from '../../../Images/Profile.jpg'

const Avatar = () => {
  return (
    <div className=" flex flex-col items-center bg-neutral-800 font-sans mb-3">
      <div className=" h-[250px] w-[250px] rounded-full border-2 border-zinc-500 bg-center bg-cover mt-5 overflow-hidden mb-5">
        <img src={profileImg} alt='prifilepic'/>
      </div>
      <div className='bg-neutral-800 '>
        <p className='text-xl text-white'>Rasindu Sandeep</p>
        <p className='text-sm text-neutral-500 font-bold'>CANDIDATE </p>
      </div>
    </div>
  )
}

export default Avatar
