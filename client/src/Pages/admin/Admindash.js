import React, { useContext } from 'react';

import { UserContext } from '../../Context/UserContext';
import AdminNav from '../../Components/admincomp/AdminNav';
import Greatings from '../../Components/Greatings';
import Adminheadrightbar from '../../Components/admincomp/Adminheadrightbar';


function Admindash(resreq) {
  const { user } = useContext(UserContext); // Destructure user from context
  
  

  return (
    <div>
      <div className='flex'>
        <div>
          <AdminNav/>
        </div>

        <div className='w-screen '>
          
          {/* Check if user exists before accessing its properties */}
          {!!user && (
            <div className='flex justify-between pt-8 pb-8 pl-5'>
              <div className='flex'><Greatings/><h1 className='text-3xl'>, {user.fname}</h1></div>
              <div className='mr-5'> <Adminheadrightbar/></div>
              
            </div>
          )}
          {/* If user doesn't exist, you may want to display a message */}
          {!user && <h1>No user found</h1>}
        </div>
      </div>
    </div>
  );
}

export default Admindash;
