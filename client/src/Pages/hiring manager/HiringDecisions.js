import React, { useContext, useState } from 'react';
import Topbar from '../../Components/hiringManagerCompo/Topbar.jsx';
import PostTag from '../../Components/hiringManagerCompo/PostTag.jsx';
import ProgressLine from '../../Components/hiringManagerCompo/ProgressLine.jsx';
import HiringmanagerNav from '../../Components/hiringManagerCompo/HiringManagerNav';
import { UserContext } from '../../Context/UserContext.js';

export default function HiringDecision() {

  
  const [selected,setselected]=useState(null);
  const { users, setUsers } = useContext(UserContext);
  const [showDetails,setshowDetails]=useState(false); 
  

return (
  <div className='flex w-screen'>
      <div className='fixed'>
        <HiringmanagerNav/>
      </div>
      <div className='w-screen lg:ml-[320px] md:ml-72 ml-[260px] '>
      <Topbar title='Hiring Decision' ></Topbar>
      <div className={`content  text-white flex flex-row p-[0px]   bg-[#212121] m-[30px]  h-fit rounded-[30px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  ${showDetails===false ? ' justify-center' :null}`} >
      <div className='candidates  flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px]  sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]'>
          <p className='text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]'>Interviewed Candidates</p>
          {/* <PostTag></PostTag> */}
          <div>
    {users.map((user) => (
      <button key={user._id}  onClick={()=>{setshowDetails(true);setselected(user)}}   className={` hover:scale-110 accLabel m-[10px] my-[5px]  flex flex-row   bg-[#2b2b2b] sm:pl-[5px]  items-center   rounded-[30px]  sm:gap-[4px] esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]   sm:w-[150px] sm:h-[45px]  lg:rounded-[25px]  lg:gap-[12px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] ${showDetails===false ? 'lg:w-[500px] justify-between hover:scale-105' :null}`}>
           <div className={` ${showDetails===false ? 'flex justify-evenly gap-[12px]' :' flex flex-row  gap-[12px] justify-start'} `}>
            <img src={user.image} alt="" className='userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]' />
           <div className='block '>
           <p className='name text-left text-[#ffffff] mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]'>{user.fname} </p>
            <p className='post text-left text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]'>{user.role}</p>
           </div>
           </div>
           <p className={`post ${showDetails === false ? 'block' :'hidden'} mr-[60px] text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]`} >System Rank: </p>
          </button>
    ) )}
</div>
        

        </div>
        {showDetails ? (
        <div className='description flex flex-col w-full pt-[20px] box-border'>
        <div  className='flex flex-row py-[20px] justify-center gap-5 border-[grey]  border-b-[2px] '>
              <img src={selected.image} alt="" className=' userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[100px] lg:h-[100px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]' />
             <div className='details flex flex-col justify-evenly  '>
              <p className='text-left'>{selected.fname}</p>
              <p className='text-left text-[#ffffff] opacity-[30%] '>{selected.role}</p>
              <p className='text-left text-[#ffffff] opacity-[30%] '>System Rank: </p>
             </div>
             </div>
         
                <p className='pl-[20px] pt-[10px]'>Top Strength</p>
              

              <div className='flex flex-row justify-around mt-[15px] mb-[15px]'>
                <div className='pt-[15px] pb-[15px] pl-[25px] pr-[25px]  text-[#575757] rounded-[20px] bg-[#1E1E1E]'>Adoptability</div>
                <div className='pt-[15px] pb-[15px] pl-[25px] pr-[25px]  text-[#575757] rounded-[20px] bg-[#1E1E1E]'>Leadership</div>
                <div className='pt-[15px] pb-[15px] pl-[25px] pr-[25px]  text-[#575757] rounded-[20px] bg-[#1E1E1E]'>Self Confidence</div>

              </div>
              <p className='pl-[20px] pt-[10px]'>Requirements to be considered</p>
           <div className='mb-[35px]'>
           <div className='mb-[35px]'>
                <div className='pl-[40px] pr-[40px]'>
              <div className=''>
              <p className='text-[0.9rem] mt-[20px] mb-[25px]'>Technical details</p>
               <div className='pl-[80px] pr-[80px]'>
               <ProgressLine progress='80' buffer='60'></ProgressLine>
               </div>
               </div>
              </div>
              <div className='pl-[40px] pr-[40px]'>
              <div className=''>
              <p className='text-[0.9rem] mt-[20px] mb-[25px]'>Cultural Fit</p>
               <div className='pl-[80px] pr-[80px]'>
               <ProgressLine progress='20' buffer='50'></ProgressLine>
               </div>
               </div>
              </div>
              <div className='pl-[40px] pr-[40px]'>
              <div className=''>
              <p className='text-[0.9rem] mt-[20px] mb-[25px]'>Communiaction</p>
               <div className='pl-[80px] pr-[80px]'>
               <ProgressLine progress='50' buffer='85'></ProgressLine>
               </div>
               </div>
              </div>
              </div>
              <div className='flex flex-col gap-[15px] items-center'>
              <button type='submit' className="float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">Reject</button>
              <button type='submit' className="float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">Hire</button>
              </div>
           </div>
           
          
            
               
          
             </div>):null}
             
        </div>

      </div> 
      </div>

      
 
)
}