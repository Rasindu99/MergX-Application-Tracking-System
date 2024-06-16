import React from 'react';

const Card = ({ title, value }) => {
    return (
        <div className='rounded-[30px] flex justify-center items-center bg-[#191919] w-[170px] h-[170px]' style={{backgroundImage: 'linear-gradient(to bottom, #2B2B2B 0%, rgba(43, 43, 43, 0) 100%)'}}>
            <div>
                <p className="text-white text-[0.9rem] text-center">{title}</p>
                <h1 className="text-[#EA7122] text-[5rem] text-center">{value}</h1>
            </div>
        </div>
    );
};

export default Card;