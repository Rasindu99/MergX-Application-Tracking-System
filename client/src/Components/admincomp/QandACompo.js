import axios from 'axios'
import React from 'react'

export default function QandACompo() {

  //get q and a
  const getQandAs = async () =>{
    try {
      const response = await axios.get("/qanda/")
    } catch (error) {
      
    }
  }
  
  return (
    <div className=''>
      <h1>hellow</h1>
      
      <div className='flex mx-8'>
        <div className='w-2/3 border'>
            <h1>hi</h1>
            <div>
              <h1>hi</h1>
            </div>
        </div>
        <div className='w-1/3 border'>
            <h1>how are you</h1>
            <div>
              <h1>hellow</h1>
            </div>
        </div>
      </div>
    </div>
  )
}
