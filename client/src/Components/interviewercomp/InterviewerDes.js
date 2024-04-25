import React from 'react';
import Popup from '../../Components/interviewercomp/Popup';
import { MdOutlineNotificationsActive } from 'react-icons/md';

const Description = ({ name }) => {
  return (
    <div>
      <div id='header' className='flex justify-between'>
        <div className='flex w-1/2'>
          <p className="text-3xl text-white font-medium ml-2 text-opacity-50">{name}</p>
        </div>
        <div className='flex items-center justify-between'>
          <MdOutlineNotificationsActive size={50} className="hover:text-white hover:opacity-70 mt-4"/>
          <Popup />
        </div>
      </div>
    </div>
  );
};

export default Description;