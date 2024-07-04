import React,{useEffect, useState} from 'react'
import Card from '../../../Components/candidateComp/LandingPage/Card'
import AvatarBio from '../../../Components/candidateComp/LandingPage/AvatarBio'
import Description from '../../../Components/candidateComp/LandingPage/Description'
import Education from '../../../Components/candidateComp/LandingPage/Education'
import CardS from '../../../Components/hiringManagerCompo/CardS'
import axios from 'axios'


const LandingPage = () => {

  const [dashboardcount, setDashboardCount] = useState({
        interviewcount:0,
        deletedcount:0,
        viewedcount:0,
        upcomingcount:0,
  });

  const removeDuplicates = (array) => {
    return [...new Set(array)];
  };
  

  const getinterviewcount = async()=>{
    try{
      const response = await axios.get('/dashboard/getinterviewscount');
      setDashboardCount((prevState)=>({
        ...prevState,
        interviewcount:response.data.interviewcount
      }));
    }catch(err){
      console.log(err);
    }
  }
  const getupcomingInterviews = async ()=>{
    try{
      const response = await axios.get('/dashboard/getupcominginterviews');
      setDashboardCount((prevState)=>({
        ...prevState,
        upcomingcount:response.data.upcomingInterviews
      }));

    }catch(err){
      console.log(err);
    }
  }
  

  const getDeleteCount = ()=>{
    const storedDeletedInterviews = window.localStorage.getItem('deletedInterviews');
    if(storedDeletedInterviews){
      const deletedInterviewsArray = JSON.parse(storedDeletedInterviews);
      setDashboardCount((prevState)=>({
        ...prevState,
        deletedcount:deletedInterviewsArray.length
      }));
    }
  }
  
  const getViewCount = ()=>{
    const storedReadInterviews = window.localStorage.getItem('readInterviews')
    if(storedReadInterviews){
      const viewdInterviews = removeDuplicates(JSON.parse(storedReadInterviews));
      setDashboardCount((prevState)=>({
        ...prevState,
        viewedcount:viewdInterviews.length
      }))
    }
  }


  useEffect(()=>{
    getinterviewcount();
    getDeleteCount();
    getViewCount();
    getupcomingInterviews();
     
  },[]);
  useEffect(()=>{
    console.log(dashboardcount.interviewcount);
    console.log(dashboardcount.deletedcount);
    console.log(dashboardcount.viewedcount);
  },[dashboardcount]);


  return (
    <div className='flex h-full flex-col gap-6 box-border items-center'>
      <AvatarBio />
      <div className='flex flex-col  w-1/3 min-w-fit items-start mb-5'>
        <Education />
        <Description />
      </div>
      <div className='flex flex-wrap gap-9 justify-center mb-3'>
        <CardS name="New Interview" subName='Invitations' val={dashboardcount.interviewcount-dashboardcount.deletedcount-dashboardcount.viewedcount} w={150} h={150} />
        <CardS name="Upcoming" subName=' Interviews' val={dashboardcount.upcomingcount} w={150} h={150} />
        <CardS name="New " subName='Messages' val='6' w={150} h={150} />
       
       
      </div>

    </div>
  )
}

export default LandingPage
