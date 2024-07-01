import React from 'react';

const CardL = ({ title, value }) => {
  return (
    <div className="w-[210px]">
      <div className='pt-8 w-58 h-58 rounded-3xl' style={{ background: 'linear-gradient(to bottom, #2B2B2B 0%, rgba(43, 43, 43, 0) 100%)' }}>
        <p className='text-2xl text-white text-center'>{title}</p>
        <h1 className='text-8xl text-[#EA7122] mt-4 text-center font-bold'>{value}</h1>
      </div>
    </div>
  );
};

export default CardL;