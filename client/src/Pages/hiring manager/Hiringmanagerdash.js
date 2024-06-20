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
      <div className='fixed'>
        <HiringmanagerNav/>
      </div>
      <div className='w-screen lg:ml-[320px] md:ml-72 ml-[260px] '>
          
      <TopbarDash  className='z-40' ></TopbarDash>
        <div className='content -z-40 text-white p-[30px] bg-[#212121] m-[30px] h-screen rounded-[30px] '>
        <div className="card_container mt-[10px] "> 
            <div className="card_container_1 flex gap-[2.2rem] mb-6 justify-between">
                <CardL name="Applications" val="13" />
                <CardL name="Candidates" val="19"/>
                <CardL name="Posted Jobes" val="16"/>
                <CardL name="Unread Message" val="15"/>
            </div>

            <div className="card_container_2 flex gap-10 mb-6 justify-between  sm:ml-[50px] sm:mr-[50px] lg:ml-[100px] lg:mr-[100px] ">
                    
                    <CardS name="New Candidates" val="4 "/>
                    <CardS name="Today's Meetings" val="5"/>
                    <CardS name="Pending jobs" val="3"/>
                    <CardS name="New Applications" val="10"/>
                    
                </div> 

            </div>
            <div className="middle flex 320px:flex-col 900px:max-[]: 900px:flex-row 900px:flex-row pl-[20px] pr-[20px] justify-between bg-transparent">
               
               <div className="meetings scrollable-content overflow-auto w-[400px] h-[400px] p-[5px]"> 
                   <h1 className='text-[#ffffff] 320px:text-[0.7rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem] mb-2'>Today's Meeting</h1>
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
           
          
               <div className="mejobsetings scrollable-content overflow-auto w-[400px] h-[400px] p-[5px]"> 
                   <h1 className='text-[#ffffff]  320px:text-[0.7rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem] mb-2'>Jobs</h1>
                   <Jobs />
                   
               </div>

              
           </div>

        </div>
       

          
                              
         
                  
                </div>
      
    </div>
  )
}
