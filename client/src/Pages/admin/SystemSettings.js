import React from 'react'
import AdminNav from '../../Components/admincomp/AdminNav';
import Adminheadrightbar from '../../Components/admincomp/Adminheadrightbar';
import SendEmail from '../../Components/admincomp/SendEmail';

export default function SystemSettings() {
  return (
    <div>
      <div className='flex '>
        <div>
          <AdminNav />
        </div>
        <div className='w-screen'>
          
          <div className='flex justify-between pt-8 pb-8 pl-5'>
                <div className=''>
                  <h1 className='text-4xl'>Send Email</h1>
                </div>
                
                <div className='mr-5'>
                  <Adminheadrightbar/>
                </div>
          </div>
          <div >

            
           
            <div className='mx-[70px] bg-gradient-to-b from-[#272727] to-[#17171A] rounded-[30px] h-[780px] '>
            <SendEmail/>
            </div>
            
          </div>
          
        </div>
        
      </div>
    </div>
  )
}
