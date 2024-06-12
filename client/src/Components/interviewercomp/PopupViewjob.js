import React from 'react'
import { IoMdClose } from "react-icons/io";

export default function PopupViewjob({visible, onClose}) {
    if (!visible ) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
      <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[800px] w-[500px] border-orange-700 border-[1px]  ">
       
       <button
         className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
         onClick={onClose}
       >
        <label className='text-white hover:text-red-700'><IoMdClose className='' /></label> 
       </button>

       

      
    </div>
    </div>
  )
}
