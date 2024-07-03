import {React, useContext, useEffect, useState} from 'react'
import Card from '../../../Components/candidateComp/LandingPage/Card'
import AvatarBio from '../../../Components/candidateComp/LandingPage/AvatarBio'
import Description from '../../../Components/candidateComp/LandingPage/Description'
import Education from '../../../Components/candidateComp/LandingPage/Education'
import { UserContext } from '../../../Context/UserContext'
import axios from 'axios'


const LandingPage = () => {

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    axios.get('/profile')
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      })
  },[]);

  if (!profileData) {
    return <div>Loading...</div>; // Show a loading message while the data is being fetched
  }

  return (
    <div className='flex h-full flex-col gap-6 box-border items-center'>
      <AvatarBio user={profileData}/>
      <div className='flex flex-col  w-1/3 min-w-fit items-start mb-5'>
        <Education education={profileData.education}/>
        <Description description={profileData.bio}/>
      </div>
      <div className='flex flex-wrap gap-9 justify-center mb-3'>
        <Card />
        <Card />
        <Card />
      </div>

    </div>
  )
}

export default LandingPage
