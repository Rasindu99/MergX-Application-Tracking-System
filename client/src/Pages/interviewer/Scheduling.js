import React from 'react';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import ViewJobButton from '../../Components/interviewercomp/ViewJobButton';

export default function Scheduling() {
  const name = 'Interview Scheduling'; 

  return (
   


<div className='flex w-screen '>
      
      <div>
      <InterviewNav />
      </div>
      
      <div className='w-screen '>
        
        
        <div className='flex pt-8 pb-8 pl-5'>
          <div className=''>
          <Description name={name} />
          </div>
          
          <div>
            
          </div>
        </div>
          
        
    <div className='mx-[70px] bg-gradient-to-b from-[#272727] to-[#17171A] rounded-[30px] mt-10 h-[800px]'>
      <div className='pt-12'>
        <div className='flex mx-14'>
          <ViewJobButton/>
        </div>
      </div>
    </div>
       
        
                            
       
                
              </div>
    
  </div>
  );
}