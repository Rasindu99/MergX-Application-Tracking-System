import React,{useContext} from 'react'
import PopUp from './PopUp'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../../Context/UserContext'


const RightContainer = () => {

  const {user} = useContext(UserContext);

  const date = new Date();
    const currentTime = date.getHours();

    let greeting;

    if(currentTime >= 0 && currentTime <= 12)
    {
        greeting = "Good Morning !";
    }
    else if(currentTime >12 && currentTime< 14)
    {
        greeting = "Good Afternoon !"
    }
    else
    {
        greeting = "Good Evening !"
    }

  return (
    <div className='w-10/12 h-screen bg-zinc-900'>

      <div className='flex justify-between items-center8 bg-zinc-900' style={{height:'10%'}}>
        <div className='flex items-center mx-5'>
          <p className='text-4xl'>
            <span className='text-neutral-500 mr-2'>{greeting}</span>
            <span className='text-neutral-300 font-semibold'>{ user.fname}</span>
          </p>
        </div>
        <PopUp/>
      </div>

      <div className='box-content bg-neutral-800 overflow-auto rounded-3xl mx-5 my-5' style={{height:'86%'}}>
        <Outlet/>
      </div>
      

    </div>
  )
}

export default RightContainer
