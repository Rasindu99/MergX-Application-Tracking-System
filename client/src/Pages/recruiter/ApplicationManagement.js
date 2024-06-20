import React from 'react';
import PostTag from '../../Components/recruitercomp/PostTag';

export default function ApplicationManagement() {
  return (
    <div>
      <div className='w-full bg-[#191919] pl-5 pr-5 pb-5' >
        <div className='w-full bg-[#525252] h-200 rounded-[30px]'>
          <div className='flex'>
           <div className='w-1/4  border-solid border-r-[3px]' style={{borderImage: 'linear-gradient(to bottom, #383838,rgb(56, 56, 56,0)) 1'}} >
              <div className='candidates flex flex-col gap-[10px] bg-[#1E1E1E] esm:p-[10px] 450px:p-[15px] sm:p-[25px] h-[110vh] sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px] rounded-tl-[30px] rounded-br-[30px] rounded-bl-[30px]' >
              <p className='text-center text-[#FFFFFF] w-full bg-[#1E1E1E] p-[5px]'>Short List</p>
               <div className="pt-[20px]">
                <SinglePosition position='Software Engineer' time='5' applications='10' />
               </div>
              </div>
            </div>

            <div className='w-1/4  border-solid border-r-[3px]' style={{borderImage: 'linear-gradient(to bottom, #383838,rgb(56, 56, 56,0)) 1'}}>
              <p className="text-center text-white w-full bg-[#1E1E1E] p-[25px]">New</p>
              <div className="flex flex-col items-center justify-center mt-6">
              <div className="mb-2"><PostTag name='Rasindu' post='Software Engineer' section='new' ></PostTag></div>
              </div>
            </div>
            <div className='w-1/4  border-solid border-r-[3px]' style={{borderImage: 'linear-gradient(to bottom, #383838,rgb(56, 56, 56,0)) 1'}}>
              <p className="text-center text-white w-full bg-[#1E1E1E] p-[25px]">Rejected</p>
              <div className="flex flex-col items-center justify-center mt-6">
              <div className="mb-2"><PostTag name='Rasindu' post='Software Engineer' section='rejected' ></PostTag></div>
              </div>
            </div>
            <div className='w-1/4'>
            <p className="text-center text-white w-full bg-[#1E1E1E] p-[25px] rounded-tr-[30px]">Accepted</p>
            <div className="flex flex-col items-center justify-center mt-6">
            <div className="mb-2"><PostTag name='Rasindu' post='Software Engineer' section='accepted' ></PostTag></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SinglePosition({position, time, applications }) {
  return (
      <div className="p-2" style={{background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 5%, rgba(217, 217, 217, 0) 75%, rgba(217, 217, 217, 0) 75%)'}}>
        <div className="text-[15px] text-white">{position}</div>
  
        <div className="w-full flex flex-col items-center justify-center mt-3">
        <div className="flex items-center justify-center text-white text-[12px]">{time} days ago</div>
        <div className="flex items-center justify-center text-[12px] text-white">{applications} applications</div>
      </div>
    </div>
  )
}

