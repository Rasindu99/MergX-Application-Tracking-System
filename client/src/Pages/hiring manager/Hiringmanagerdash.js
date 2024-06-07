import React ,{ useContext} from 'react'

import HiringmanagerNav from '../../Components/hiringManagerCompo/HiringManagerNav'
import GetApprovaljobs from '../../Components/hiringManagerCompo/GetApprovaljobs'
import Greatings from '../../Components/Greatings'
import { UserContext } from '../../Context/UserContext';

export default function Hiringmanagerdash() {
  const { user  } = useContext(UserContext);
  return (
    <div className='flex w-screen'>
      <div>
        <HiringmanagerNav/>
      </div>
      <div className='w-screen '>
          
          
          <div className='flex pt-8 pb-8 pl-5'>
            <div className=''>
            <Greatings/> 
            </div>
            <div>
              <h1 className='text-3xl'>{user.fname} {user.lname}</h1>
            </div>
            
            <div>
              <h1>hi</h1>
            </div>
          </div>
            
          
      <div>
        <GetApprovaljobs/> 
      </div>
         
          
                              
         
                  
                </div>
      
    </div>
  )
}
