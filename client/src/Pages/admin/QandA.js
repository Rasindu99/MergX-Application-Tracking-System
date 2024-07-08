import React from 'react'
import AdminNav from '../../Components/admincomp/AdminNav'
import Adminheadrightbar from '../../Components/admincomp/Adminheadrightbar'
import QandACompo from '../../Components/admincomp/QandACompo'

export default function QandA() {
  return (
    <div className='flex w-screen'>
      <div>
        <AdminNav/>
      </div>
      
      <div className='w-screen '>
          <div className='flex justify-between pt-8 pb-8 pl-5'>
            <div className=''>
              <h1 className='text-4xl'>Q and A</h1>
            </div>
            
            <div className='mr-5'>
              <Adminheadrightbar/>
            </div>
          </div>
            
          
      <div>
        <QandACompo/>
      </div>
    </div>
      
    </div>
  )
}
