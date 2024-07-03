import React from 'react'

const Education = ({education}) => {

  const educationArray = education.split('\n');

  return (
    <div className='flex justify-center '>
      <div className='flex flex-col grow-1 justify-center  items-center w-1/3 min-w-fit'>
        <span className='slef-start mr-auto text-neutral-500 font-bold text-lg '> Education</span>
        <div className='flex flex-col items-start ml-9 text-sm text-neutral-300'>
          {
            educationArray.map((item, index) => (
              <span key={index} className='text-lg'>{item}</span>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Education
