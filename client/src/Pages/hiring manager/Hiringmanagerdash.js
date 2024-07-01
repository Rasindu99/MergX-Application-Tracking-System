import React, { useState } from 'react';
import TopbarDash from '../../Components/hiringManagerCompo/DashboardTopBar.jsx';
import CardL from '../../Components/hiringManagerCompo/CardL.jsx';
import CardS from '../../Components/hiringManagerCompo/CardS.jsx';
import Meeting from '../../Components/hiringManagerCompo/Meeting.jsx';
import Jobs from '../../Components/hiringManagerCompo/Jobs.jsx';
import HiringmanagerNav from '../../Components/hiringManagerCompo/HiringManagerNav'


export default function Hiringmanagerdash() {
   
    
 
  return   (
    <div className='flex w-screen'>
      <div className='fixed '>
        <HiringmanagerNav/>
      </div>
      <div className='w-screen lg:ml-[320px] md:ml-72 ml-[260px] '>
          
      <TopbarDash  className='z-40' ></TopbarDash>
        <div className='content -z-40 text-white p-[25px] bg-transparent m-[30px] h-[85vh] overflow-auto rounded-[30px] '> 
        {/*  bg-[linear-gradient(to_top,_#100c08_0%,_#2B2B2B_100%)]  */}
        <div className="card_container mt-[10px] "> 
            <div className="card_container_1 flex  mb-6 justify-center gap-24">
                <CardL name="Applications" val="13" />
                <CardL name="Candidates" val="19"/>
                <CardL name="Posted Jobes" val="16"/>
                <CardL name="Unread Message" val="15"/>
            </div>

            <div className="card_container_2 flex flex-row  mb-6 justify-center gap-20  sm:ml-[50px] sm:mr-[50px] lg:ml-[100px] lg:mr-[100px] ">
                    
                    <CardS name="New Candidates" val="4 "/>
                    <CardS name="Today's Meetings" val="5"/>
                    <CardS name="Pending jobs" val="3"/>
                    <CardS name="New Applications" val="10"/>
                    
                </div> 

            </div>
            <div className=" flex mb-[20px] justify-center gap-32 bg-transparent">
               
            <div className="[perspective:1000px]">
  <div className="bg-[linear-gradient(to_top,_#100c08_0%,_#2B2B2B_100%)] rounded-[15px] [box-shadow:0_10px_20px_rgba(0,_0,_0,_0.3),_0_6px_6px_rgba(0,_0,_0,_0.23)] [transition:transform_0.3s_ease-in-out] [transform:rotateY(0deg)] mb-[20px] w-[400px] p-[5px]">
    <h1 className='text-[#ffffff] 320px:text-[0.7rem] 450px:text-[0.8rem] sm:text-[0.9rem] 900px:text-[1.1rem] 1010px:text-[1.2rem] mb-2'>Today's Meeting</h1>
    <div className="meeting-list h-[400px] overflow-auto">
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
    </div>
  </div>
</div>

           
          
<div className="[perspective:1000px]">
  <div className="bg-[linear-gradient(to_top,_#100c08_0%,_#2B2B2B_100%)] rounded-[15px] [box-shadow:0_10px_20px_rgba(0,_0,_0,_0.3),_0_6px_6px_rgba(0,_0,_0,_0.23)] [transition:transform_0.3s_ease-in-out] [transform:rotateY(0deg)] w-[400px] p-[5px]">
    <h1 className='text-[#ffffff] 320px:text-[0.7rem] 450px:text-[0.8rem] sm:text-[0.9rem] 900px:text-[1.1rem] 1010px:text-[1.2rem] mb-2'>Jobs</h1>
    <div className="jobs-list h-[400px] overflow-auto">
      <Jobs />
    </div>
  </div>
</div>


              
           </div>

        </div>
       

          
                              
         
                  
                </div>
      
    </div>
  )
}
