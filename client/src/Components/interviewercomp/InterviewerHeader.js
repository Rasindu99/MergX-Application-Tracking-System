import React, { useState, useContext } from 'react';
import Popup from '../../Components/interviewercomp/Popup'
import { MdOutlineNotificationsActive } from "react-icons/md";
import Greatings from '../../Components/Greatings';
import { UserContext } from '../../Context/UserContext';

const Header = () => {

const { user } = useContext(UserContext);

  return (
    <div>
      <div id='header' className='flex justify-between'>
          <div className='flex w-1/2'>
            <Greatings/> <p className="text-3xl text-white font-medium ml-2"> Gangamina</p>
          </div>
          <div className='flex items-center justify-between'>
            <MdOutlineNotificationsActive size={50} className="hover:text-white hover:opacity-70 mt-4"/>
            {!!user && <Popup
              img = {user.image}
              name = {user?.lname}
              role = {user?.role}
             />}
          </div>
        </div>
    </div>
  );
};

export default Header;