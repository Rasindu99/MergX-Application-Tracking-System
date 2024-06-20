import React from 'react'
import AdminNav from '../../Components/admincomp/AdminNav'
import AccessCompo from '../../Components/admincomp/AccessCompo'
import Adminheadrightbar from '../../Components/admincomp/Adminheadrightbar';


export default function AccessControl() {
 
  return (

    <div>
      <div className='flex '>
        <div>
          <AdminNav />
        </div>
        <div className='w-screen'>
          
          <div className='flex justify-between pt-8 pb-8 pl-5'>
                <div className=''>
                  <h1 className='text-4xl'>Access Control</h1>
                </div>
                
                <div className='mr-5'>
                  <Adminheadrightbar/>
                </div>
          </div>
          <div >

            
           
            <div>
            <AccessCompo/>
            </div>
            
          </div>
          
        </div>
        
      </div>
    </div>



    
    
  )
}


