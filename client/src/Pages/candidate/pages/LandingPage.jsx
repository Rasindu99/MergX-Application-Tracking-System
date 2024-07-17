import {React, useEffect, useState} from 'react'
import Card from '../../../Components/candidateComp/LandingPage/Card'
import Card2 from '../../../Components/candidateComp/LandingPage/Card2'
import AvatarBio from '../../../Components/candidateComp/LandingPage/AvatarBio'
import Description from '../../../Components/candidateComp/LandingPage/Description'
import Education from '../../../Components/candidateComp/LandingPage/Education'
import LoadingWheel from '../../../Components/LoadingComp/LoadingWheel'
import { useInterviewContext } from '../../../Context/InterviewContext'
import CardS from '../../../Components/candidateComp/LandingPage/CardS'
import axios from 'axios'


const LandingPage = () => {

  const [profileData, setProfileData] = useState(null);
  const {triggerUpdate} = useInterviewContext();

  const fetchProfileData = () => {
    axios.get('/profile')
      .then(response => {
        setProfileData(response.data);
        triggerUpdate();
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (!profileData) {
    return (
      <div class="loader h-[100px] w-full absolute top-[50%] left-[55%]">
        <LoadingWheel />
      </div>
    ) // Show a loading message while the data is being fetched
  }

  return (
    <div className='flex h-full flex-col gap-6 box-border items-center'>
      <AvatarBio user={profileData}/>
      <div className='flex flex-col  w-1/3 min-w-fit items-start mb-5'>
        <Education education={profileData.education}/>
        <Description description={profileData.bio}/>
      </div>
      <div className='flex flex-wrap gap-9 justify-center mb-3'>
        <Card  w={170} h={170} />
        <Card2  w={170} h={170} />
        <CardS  w={170} h={170} />
      </div>

    </div>
  )
}

export default LandingPage
