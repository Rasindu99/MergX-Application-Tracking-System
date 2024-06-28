import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/hiringManagerCompo/Navbar.jsx';
import axios from 'axios';
import Topbar from '../../Components/hiringManagerCompo/Topbar.jsx';
import CardEsm from '../../Components/hiringManagerCompo/CardEsm.jsx';
import BarChart from '../../Components/hiringManagerCompo/BarCharts.jsx'
import TimelineToHire from '../../Components/hiringManagerCompo/TimelineToHire.jsx';
import PiechartWithIcon from '../../Components/hiringManagerCompo/PiechartWithIcon.jsx';
import { FaCheckCircle } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
 import HiringmanagerNav from '../../Components/hiringManagerCompo/HiringManagerNav';

export default function Dashboard() {
  
  const [jobPostings,setjobPostings]= useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [source,setsource]=useState({
    allhiredcount:0,
    hiredcountbyposition:0,
    facedcountbyposition:0,
    totalsubmittedapplications:0,
    submittedapplicationsbyposition:0,
    totalacceptedapplications:0,
    acceptedapplicationsbyposition:0,
    salary:0,
    vacancies:0,
    createdAt:null,
    updatedAt:null
  });

  const getApprovedJobs = async ()  =>{
     try{
    const response =await axios.get('/reporting/getallapprovedjobpostingsid');
    setjobPostings(response.data);
    
    
  }catch(error){
    console.log('Error fetching approved job postings:', error);
  }
  
  };

  // allhieredcount

 const getAllHiredCount = async ()=>{
  try{
      const response = await axios.get('/reporting/getallhiredcount');
      setsource(prevState=>({...prevState, allhiredcount:response.data.hiredcount }));
  }
  catch(error){
    console.log('Error fetching hired count:', error);
  }
 };

//  hiredcountbyposition

const getHiredCountByPosition = async (jobId) => {
  try{
     const response = await axios.get(`/reporting/gethiredcountbyposition/${jobId}`);
      setsource(prevState=>({...prevState, hiredcountbyposition:response.data.count}));

  }catch(error){
    console.log('Error fetching hired count by position:', error);
  }

}

 useEffect(()=>{
  getApprovedJobs();
  getAllHiredCount();
  
 },[]);


 useEffect(() => {
  console.log('Approved job postings:', jobPostings);
 }, [jobPostings]);

 useEffect(() => {
          console.log('Selected job:', selectedJob);
          if(selectedJob){
            getHiredCountByPosition(selectedJob._id);
          }
 },[selectedJob]);

 useEffect(() => {
     console.log('Source:', source);
 }, [source]);
 




  return (
    <div className='flex w-screen'>
      <div className='fixed'>
        <HiringmanagerNav/>
      </div>
      <div className='w-screen lg:ml-[320px] md:ml-72 ml-[260px] '>
          
        <Topbar title='Reporting' ></Topbar>
        <div className='content text-white flex flex-row p-[0px]  bg-[#2b2b2b] m-[30px]  h-fit rounded-[30px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  '>
        <div className='  flex flex-col bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px]  sm:w-auto 450px:w-[165px] 500px:w-[175px] lg:w-[250px] esm:w-[140px] sm:pl-[0px] sm:pr-[0px]'>
        
          <p className='text-center text-[#FFFFFF]  esm:p-[4px] 450px:p-[6px] sm:p-[10px] sm:pb-[25px] font-general-sans pt-[0px]'> Position </p>
         
         <div className='flex flex-col'>
          {jobPostings.map((job,index)=>(
                 <button key={index}
                 onClick={()=>{
                    setSelectedJob(job);
                 }}
                 className='hover:scale-110 p-[10px] text-center text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem] border-[1px] border-[solid] border-[grey] hover:bg-[#2b2b2b]  m-[10px] my-[5px]  items-center   rounded-[30px]  '
                 >
                     <p>{job.jobTitle}</p>
                 </button>
                ))}
         </div>


         </div>

        <div className='description flex flex-col w-full pt-[20px] box-border mb-[20px]'>
             <div className='details flex flex-row justify-around pb-[20px] '>
             <CardEsm name="Hire" val="4 " numSize={'0.8rem'}/>
             <CardEsm name="Applications per hire" val="2 " numSize='20px'/>
             <CardEsm name="Days to hire" val="4 " numSize='20px'/>
             </div>

             <p className='bg-[#242424] pl-[20px] pt-[10px] pb-[10px] rounded-[20px]'>Recruitment Funnel</p>
             
             <div>
           <BarChart></BarChart>
           </div>  
           <p className='bg-[#242424] pl-[20px] pt-[10px] pb-[10px] rounded-[20px]'>Recruitment Timeline(Days to Hire)</p>
           <p className='pl-[20px] pt-[20px] pb-[20px]'>Total days to Hire</p>
       
           <div className='m-auto mt-[40px] mb-[40px]'>
             <TimelineToHire day1='7' day2='5' day3='10' day4='3' day5='8'></TimelineToHire>
           </div>

           <p className='bg-[#242424] pl-[20px] pt-[10px] pb-[10px] rounded-[20px]'>Application Rate Metrics </p>

           <div className='flex flex-row items-center justify-around mt-[20px]'>
           <div className='flex flex-col'>
           <PiechartWithIcon value='70' name='Application Completion Rate ' icon={ AiTwotoneLike }></PiechartWithIcon> 
           <p className='text-white m-auto'>Application Completion Rate </p>
           </div> 
           <div className='flex flex-col'> 
           <PiechartWithIcon value='40' name='Application Completion Rate' icon= { FaCheckCircle } ></PiechartWithIcon>
           <p className='text-white m-auto'>Qulaified Candidate Rate</p>
           </div>
           <div className='flex flex-col'>
           <PiechartWithIcon value='90' name='Application Completion Rate' icon= { FaPeopleGroup } ></PiechartWithIcon>
           <p className='text-white m-auto'>Interview to Offer Rate</p>
           </div>
           <div className='flex flex-col'>
           <PiechartWithIcon value='20' name='Application Completion Rate' icon={ PiCertificateFill } ></PiechartWithIcon>
           <p className='text-white m-auto'>Other Acceptance Rate</p>
           </div>
         
           </div>

            </div>   

          
           
           
          
            
               
          
          
             
             
        </div>
        </div>
        </div>
        
    
  )
}
