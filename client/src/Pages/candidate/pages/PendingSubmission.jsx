import React, { useState } from 'react'
import Wishlist from '../../../Components/candidateComp/Wishlist/Wishlist';
import SubmittedApplication from '../../../Components/candidateComp/Wishlist/SubmittedApplication';

export default function PendingSubmission() {
  const [state, setState] = useState(1);

    const action = (index) => {
        setState(index);
    }
  return (
      
    <div className='overflow-hidden h-full w-full'>
      <div className='flex items-center justify-between'>
        <div onClick={() => action(1)} className={`text-center flex-1 cursor-pointer ${state === 1 ? 'bg-[#2B2B2B] text-white h-20 flex items-center justify-center rounded-tl-[30px]' : 'text-white opacity-25'}`}>
          Wishlist
        </div>
        <div onClick={() => action(2)} className={`text-center flex-1 cursor-pointer ${state === 2 ? 'bg-[#2B2B2B] text-white h-20 flex items-center justify-center rounded-tr-[30px]' : 'text-white opacity-25'}`}>
          Submitted List
        </div>
      </div>
      <div>

        <div className={` ${state === 1 ? ' text-white h-full w-full overflow-y-auto' : 'hidden'}`}>
          <Wishlist />
        </div>

        <div className={`  ${state === 2 ? ' text-white h-full w-full overflow-y-auto' : 'hidden'}`}>
          <SubmittedApplication />
        </div>
      </div>
    </div>
    

  )
}
