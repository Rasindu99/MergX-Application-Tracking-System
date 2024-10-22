import React from 'react'

const Description = ({description}) => {

  const descriptionArray = description.split('/n');

  return (
    <div className='h-1/6 '>
      <div className='flex justify-center '>
        <div className='flex flex-col justify-center  items-center w-1/3 min-w-fit '>
          <span className='slef-start mr-auto text-neutral-500 font-bold text-lg '> Discription</span>
          <div className='flex flex-col items-start ml-9 text-sm text-neutral-300'>
            {
              descriptionArray.map((item, index) => (
                <span key={index} className='text-lg'>{item}</span>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Description
