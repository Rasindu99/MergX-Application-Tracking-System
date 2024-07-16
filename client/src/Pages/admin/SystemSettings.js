import React from 'react'
import AdminNav from '../../Components/admincomp/AdminNav';
import Adminheadrightbar from '../../Components/admincomp/Adminheadrightbar';

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

            
           
            <div>
            <h1>hii</h1>
            </div>
            
          </div>
          
        </div>
        
      </div>
    </div>
  )
}
