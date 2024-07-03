import React from 'react'

export default function CardL(props) {
  return (
    <div className="[perspective:1000px]">
      <div className="hover:[transform:rotateY(15deg)_rotateX(5deg)] w-[250px] h-[250px] bg-[linear-gradient(to_top,_#100c08_0%,_#2B2B2B_100%)] rounded-[20px]  [box-shadow:0_10px_20px_rgba(0,_0,_0,_0.3),_0_6px_6px_rgba(0,_0,_0,_0.23)] [transition:transform_0.3s_ease-in-out] [transform:rotateY(0deg)] flex justify-center items-center">
        <div className=" mx-auto my-0 text-center">
          <p className='text-2xl text-white text-center'>{props.name}<br/>{props.subName}</p>
          <h1 className='text-8xl text-[#EA7122] mt-4 text-center font-bold'>{props.val}</h1>
        </div>
      </div>
    </div>
  )
}
