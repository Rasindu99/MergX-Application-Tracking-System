import {React, useEffect, useState} from 'react';
import axios from 'axios';
import profileImg from '../../../Images/Profile.jpg';

const Avatar = () => {

  const [user, setUser] = useState(null);

  const fetchProfileData = () => {
    axios.get('/profile')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className=" flex flex-col items-center bg-neutral-800 font-sans mb-3">
      <div className=" h-[250px] w-[250px] rounded-full border-2 border-zinc-500 bg-center bg-cover mt-5 mb-4 overflow-hidden ">
        <img src={user?.image} alt='prifilepic'/>
      </div>
      <div className='bg-neutral-800 '>
        <p className='text-xl text-white'>{`${user?.fname} ${user?.lname}`}</p>
        <p className='text-sm text-neutral-500 font-bold uppercase'>{user?.role} </p>
      </div>
    </div>
  )
}

export default Avatar
