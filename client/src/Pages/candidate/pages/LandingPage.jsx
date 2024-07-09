import React from 'react'
import Card from '../../../Components/candidateComp/LandingPage/Card'
import Card2 from '../../../Components/candidateComp/LandingPage/Card2'
import AvatarBio from '../../../Components/candidateComp/LandingPage/AvatarBio'
import Description from '../../../Components/candidateComp/LandingPage/Description'
import Education from '../../../Components/candidateComp/LandingPage/Education'


const LandingPage = () => {
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
