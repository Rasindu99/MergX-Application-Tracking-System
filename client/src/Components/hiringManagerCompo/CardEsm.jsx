import React from 'react'

export default function CardEsm(props) {
  const words = props.name.split(' ');
  const wordPairs = [];

  for (let i = 0; i < words.length; i += 2) {
    wordPairs.push(words.slice(i, i + 2).join(' '));
  }

  return (
    <div>
      <div className={`
        card_s p-[5px] w-[150px] h-[150px] 
        bg-[linear-gradient(180deg,_rgba(234,_113,_34,_0.2)_0%,_rgba(43,_43,_43,_0)_100%)] 
        320px:rounded-[5px] 500px:rounded-[15px] sm:rounded-[30px] 
        flex justify-center items-center
        shadow-lg shadow-black/20
        transform perspective-1000 rotate-x-1
        transition duration-300 ease-in-out
        hover:rotate-x-3
      `}>
        <div className="txt mx-[auto] my-[0] text-center">
          {wordPairs.map((pair, index) => (
            <p key={index} className='text-[#ffffff] sm:mt-[20px] md:mt-[0px]'>{pair}</p>
          ))}
          <h1 className={`text-[#ea7122] mt-[5px] 320px:text-[1rem] 450px:text-[1.4rem] sm:text-[3rem] 900px:text-[4rem] 1010px:text-[2rem]`}>{props.val}</h1>
        </div>
      </div>
    </div>
  )
}