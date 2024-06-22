import React, { useState } from 'react'
import Wishlist from '../../../Components/candidateComp/Wishlist/Wishlist';
import SubmittedApplication from '../../../Components/candidateComp/Wishlist/SubmittedApplication';
export default function PendingSubmission() {
  const [state, setState] = useState(1);

    const action = (index) => {
        setState(index);
    }
  return (
    <div>
      <div>

        <div className='flex items-center justify-between'>
          <div onClick={() => action(1)} className={`text-center flex-1 cursor-pointer ${state === 1 ? 'bg-[#2B2B2B] text-white h-20 flex items-center justify-center rounded-tl-[30px]' : 'text-white opacity-25'}`}>
            Wishlist
          </div>
          <div onClick={() => action(2)} className={`text-center flex-1 cursor-pointer ${state === 2 ? 'bg-[#2B2B2B] text-white h-20 flex items-center justify-center rounded-tr-[30px]' : 'text-white opacity-25'}`}>
            Submitted List
          </div>
        </div>
        <div>
                  
                  <div className={` ${state === 1 ? ' text-white rounded-b-[30px] h-[650px]' : 'hidden'}`}>
                     <Wishlist/>
                  </div>
                 
                  <div className={`  ${state === 2 ? ' text-white rounded-b-[30px] h-[650px]' : 'hidden'}`}>
                      <SubmittedApplication/>
                  </div>
              </div>

      </div>
    </div>
  )
}
