import React, { useContext, useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { UserContext } from '../../Context/UserContext';

export default function StatusView({ visible, onClose, status }) {
  const { users } = useContext(UserContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setTimeout(() => setShow(true), 50); // Delay to allow for transition
    } else {
      setShow(false);
    }
  }, [visible]);

  const handleOnClose = () => {
    setShow(false);
    setTimeout(() => onClose(), 200);
  }

  if (!visible || !status) return null;

  // Find the user with the same email as status.email
  const user = users.find(user => user.email === status.user_email);

  if (!user) return null; // If user not found, return null

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-neutral-00 bg-opacity-40 backdrop-filter backdrop-blur-sm z-20 transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`} >
      <div className={`bg-neutral-800 p-3 rounded-lg shadow-lg w-fit h-5/6 border-neutral-600 border-[1px] transform transition-transform duration-500 ease-in-out ${show ? 'scale-100' : 'scale-95'}`}>

        <div className='flex justify-between items-center w-full bg-gradient-to-r from-[#3f3f3f] to-[#272727] h-[10%] p-2 rounded'>
          <div className=' w-auto  flex justify-around'>
            <div className='mr-5'>
              <img src={user.image} alt='user' className='h-[50px] w-[50px] rounded-full overflow-hidden border-orange-500 border-[2px]' />
            </div>
            <div className='my-auto text-start'>
              <h1>{status.user_fname} {status.user_lname}</h1>
              <p className='text-sm text text-gray-400 font-bold'>{user.role}</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-around  w-full h-[90%] '>
          <div className='flex justify-center w-full h-[90%]'>
            <img src={status.image} alt='status' className='h-full w-full  rounded-md object-contain' />
          </div>
          <div className=' text-gray-400 bg-neutral-600 rounded bg-opacity-30 bg-gradient-to-r from-[#3f3f3f] to-[#272727] '>
            <span className='text-lg'> {status.description}</span>
          </div>
        </div>

      </div>

      <button
        className="group flex justify-center items-center text-white bg-orange-500 text-center rounded-md hover:bg-orange-600 size-10 absolute right-4 top-4"
        onClick={handleOnClose}
      >
        <IoMdClose className="text-white group-hover:text-black text-xl" />
      </button>
    </div>
  )
}
