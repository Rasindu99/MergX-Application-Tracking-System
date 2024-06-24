import React, { useContext } from 'react';
import { IoMdClose } from 'react-icons/io';
import { UserContext } from '../../Context/UserContext';

export default function StatusView({ visible, onClose, status }) {
  const { users } = useContext(UserContext);

  if (!visible || !status) return null;

  // Find the user with the same email as status.email
  const user = users.find(user => user.email === status.user_email);

  if (!user) return null; // If user not found, return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
      <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-fit w-auto border-orange-700 border-[1px]">
        <button
          className="absolute px-4 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
          onClick={onClose}
        >
          <IoMdClose className="text-white hover:text-red-700" />
        </button>
        
        
        <div className='flex justify-center'>
            <div>
                <img src={user.image} alt='user' className='h-[60px] w-[60px] rounded-full overflow-hidden border-orange-700 border-[2px]' />  
            </div>
            <div className='pl-8 my-auto text-start'>
                <h1>{status.user_fname} {status.user_lname}</h1>
                <p className='text-sm text-gray-400'>{user.role}</p> 
            </div>  
        </div>
        
        
        <div className='flex justify-center pt-4'>
          <img src={status.image} alt='status' className='h-[700px] w-auto  rounded-md' />
        </div>
        <div className='pt-4 text-gray-400'>
            <h1>{status.description}</h1>
        </div>
      </div>
    </div>
  )
}
