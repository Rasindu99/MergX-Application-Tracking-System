import React, { useContext } from 'react';
import { IoMdClose } from 'react-icons/io';
import { UserContext } from '../../Context/UserContext';

export default function AnnouncementView({visible, onClose, announcements}) {
  const { users } = useContext(UserContext);
    if (!visible || !announcements) return null;
    //find the user with the same email as status.email
    const user = users.find(user => user.email === announcements.user_email);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
        <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-fit w-auto border-orange-700 border-[1px] ">
        <button
          className="absolute px-4 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
          onClick={onClose}
        >
          <IoMdClose className="text-white hover:text-red-700" />
        </button>

      <div className='flex justify-left'>
        <div>
            <div>
              <img src={user.image} alt='userimage' className='h-[60px] w-[60px] rounded-full overflow-hidden border-orange-700 border-[2px]'></img>
            </div>
          </div>
          <div className='my-auto ml-5 text-start'>
            <h1>{announcements.user_fname} {announcements.user_lname}</h1>
            <p className='text-sm text-gray-400'>{user.role}</p> 
          </div>
      </div>
      <div className='w-[800px] mt-4 '>
        <div className=''>
          <h1 className='text-2xl'>{announcements.title}</h1>
        </div>
        <div className='mt-8 py-8 border-gray-200 border-[1px] border-opacity-10'>
          <p className='text-sm text-gray-400'>
            {announcements.announce}
          </p>
        </div>
      </div>
        

        </div>
      
    </div>
  )
}
