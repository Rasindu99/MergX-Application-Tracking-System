import React from 'react'
import Sidebar from './Components/sidebar/Sidebar'
import RightContainer from './Components/rightContainer/RightContainer'
import '../candidate/customStyle.css'





export default function Candidatedash() {
  return (
      <div className='flex'>
        <Sidebar />
        <RightContainer />
      </div>
  )
}
