import {React, useState} from 'react'
import InterviewLinkCard from '../../../Components/candidateComp/InterviewLinkCrad/InterviewLinkCard';
import { MdKeyboardAlt } from "react-icons/md";
import Draggable from 'react-draggable';
import CodeEditor from '../../../Components/candidateComp/TextEditor/CodeEditor';
import { IoMdClose } from "react-icons/io";


const Session = () => {

  const [isCompilarOpen, setIsCompilarOpen] = useState(false);

  const toggleCompilar = () => {
    setIsCompilarOpen(!isCompilarOpen);
  };

  const handleClose = async() => {
    setIsCompilarOpen(false);
  };

  return (
    <div className='flex justify-center items-center p-5 h-full overflow-auto w-full z-10'>
        <InterviewLinkCard/>
        <MdKeyboardAlt className='absolute size-[46px] text-neutral-400 right-[55px] bottom-24 hover:text-orange-600 cursor-pointer' onClick={toggleCompilar}/>
        {isCompilarOpen && (
        <Draggable handle=".draggable-header">
          <div className='fixed z-50 flex flex-col w-3/5 bg-neutral-400 border-[#393737] border-[3px] shadow-lg h-2/3 overflow-y-auto rounded-2xl bottom-0 right-5'>
            <div className='border-b-[1px] border-[#393737] flex items-center draggable-header bg-gradient-to-r from-[#2f2e2e] to-[#272727] h-[47px] w-full rounded-t-lg cursor-grab'>
              <button
                className="group flex justify-center items-center text-white bg-orange-500 text-center rounded-md hover:bg-orange-600 size-7 absolute right-2 top-2"
                onClick={handleClose}
              >
                <IoMdClose className="text-white group-hover:text-black text-xl" />
              </button>
              <h1 className='text-[#666666] ml-5 font-medium '>MergeX-inbuilt-IDE (version_1)</h1>
            </div>
            <div className='overflow-y-auto bg-neutral-800 h-full'>
              <CodeEditor />
            </div>
          </div>
        </Draggable>
      )}
    </div>
  )
}

export default Session
