import React from 'react'
import AdminNav from '../../Components/admincomp/AdminNav'

import CreateUserAccountForm from '../../Components/admincomp/CreateUserAccountForm'
import Adminheadrightbar from '../../Components/admincomp/Adminheadrightbar'



export default function CreateUserAccounts() {


  
  return (
    <div className='flex w-screen '>
      
        <div>
          <AdminNav/>
        </div>
        
        <div className='w-screen '>
          
          
          <div className='flex justify-between pt-8 pb-8 pl-5'>
            <div className=''>
              <h1 className='text-4xl'>Create User Account</h1>
            </div>
            
            <div className='mr-5'>
              <Adminheadrightbar/>
            </div>
          </div>
            
          
      <div>
        <CreateUserAccountForm/>
      </div>
         
          
                              
         
                  
                </div>
      
    </div>
  )
}
