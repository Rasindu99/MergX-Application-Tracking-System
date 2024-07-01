import React from 'react'

export default function CardS(props) {
  return (
    <div className="[perspective:2000px]">
      <div className={`hover:[transform:rotateY(20deg)_rotateX(5deg)] w-[150px] h-[150px]  rounded-[15px] [box-shadow:0_10px_20px_rgba(0,_0,_0,_0.3),_0_6px_6px_rgba(0,_0,_0,_0.23)] [transition:transform_0.3s_ease-in-out] [transform:rotateY(0deg)] 350px:w-[35px] 350px:h-[35px] 450px:w-[50px] 450px:h-[50px] 500px:w-[60px] 500px:h-[60px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] 900px:w-[140px] 900px:h-[140px] 1140px:w-[180px] 1140px:h-[180px] 1300px:w-[160px] 1300px:h-[160px] 1010px:w-[160px] 1010px:h-[160px] 2xl:w-[150px] 2xl:h-[150px] bg-[linear-gradient(to_top,_#100c08_0%,_#2B2B2B_100%)] 320px:rounded-[5px] 500px:rounded-[15px] sm:rounded-[30px] flex justify-center items-center`}>

        <div className="txt mx-auto my-0 text-center">
          <p className='text-lg text-white text-center'>{props.name}</p>
          <h1 className='text-6xl text-[#EA7122] mt-4 text-center font-bold'>{props.val}</h1>
        </div>
      </div>
    </div>
  )
}
