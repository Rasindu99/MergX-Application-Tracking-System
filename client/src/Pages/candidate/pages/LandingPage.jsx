import React from 'react'
import Card from '../../../Components/candidateComp/LandingPage/Card'
import AvatarBio from '../../../Components/candidateComp/LandingPage/AvatarBio'
import Description from '../../../Components/candidateComp/LandingPage/Description'
import Education from '../../../Components/candidateComp/LandingPage/Education'
import CardS from '../../../Components/hiringManagerCompo/CardS'


const LandingPage = () => {
  return (
    <div className='flex h-full flex-col gap-6 box-border items-center'>
      <AvatarBio />
      <div className='flex flex-col  w-1/3 min-w-fit items-start mb-5'>
        <Education />
        <Description />
      </div>
      <div className='flex flex-wrap gap-9 justify-center mb-3'>
        <CardS name="New Messages" val='6' w={150} h={150} />
        <CardS name="count" val='6' w={150} h={150} />
        <CardS name="New Messages" val='6' w={150} h={150} />
       
       
      </div>

    </div>
  )
}

export default LandingPage
