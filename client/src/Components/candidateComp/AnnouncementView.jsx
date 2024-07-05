import React, { useContext, useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { UserContext } from '../../Context/UserContext';

export default function AnnouncementView({visible, onClose, announcements}) {
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
    if (!visible || !announcements) return null;
    //find the user with the same email as status.email
    const user = users.find(user => user.email === announcements.user_email);
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-neutral-00 bg-opacity-40 backdrop-filter backdrop-blur-sm z-20 transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`} >
      <div className={`bg-neutral-800 p-3 rounded-lg shadow-lg w-fit h-fit border-neutral-600 border-[1px] transform transition-transform duration-500 ease-in-out ${show ? 'scale-100' : 'scale-95'}`}>

        <div className='flex justify-between items-center w-full bg-gradient-to-r from-[#3f3f3f] to-[#272727] h-[10%] p-2 rounded'>
          <div className=' w-auto  flex justify-around'>
            <div className='mr-5'>
              <img src={user.image} alt='user' className='h-[50px] w-[50px] rounded-full overflow-hidden border-orange-500 border-[2px]' />
            </div>
            <div className='my-auto text-start'>
              <h1>{announcements.user_fname} {announcements.user_lname}</h1>
              <p className='text-sm text text-gray-400 font-bold'>{user.role}</p>
            </div>
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
      <button
        className="group flex justify-center items-center text-white bg-orange-500 text-center rounded-md hover:bg-orange-600 size-10 absolute right-4 top-4"
        onClick={handleOnClose}
      >
        <IoMdClose className="text-white group-hover:text-black text-xl" />
      </button>

    </div>
  )
}