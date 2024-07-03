import React from 'react';
import img1 from '../../../Images/Profile.jpg';


const AvatarBio = ({user}) => {

  if(!user) {
    return null; // Don't render the component if user is null
  }

  function formatDate(dob) {
    const date = new Date(dob);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  }

  const formattedDOB = formatDate(user.dob); 

  return (
    <div className='flex items-center justify-center h-2/6 0'>

      <div className="box-border h-28 w-28 rounded-full border-zinc-950 bg-center bg-cover overflow-hidden border-3 mr-5 ">
       <img src={user.image} alt='ProfileImg'/>
      </div>

      <div className='flex min-w-fit justify-around ml-5'>

        <div className='flex flex-col justify-between items-start text-neutral-500 font-semibold text-lg width-auto mr-3 '>
          <span >Name</span>
          <span>Email</span>
          <span>Contact Number</span>
          <span>Birthday</span>
        </div>
        
        <div className='flex flex-col justify-between items-start text-neutral-300 font-semibold text-base'> 
          <span>{`${user.fname} ${user.lname}`}</span>
          <span>{user.email}</span>
          <span>{user.phone_number}</span>
          <span>{formattedDOB}</span>
        </div>
      </div>
    </div>
  )
}

export default AvatarBio
