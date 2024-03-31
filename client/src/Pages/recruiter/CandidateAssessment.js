import React, { useState } from 'react';
import PostTag from '../../Components/recruitercomp/PostTag.js';
// import PieCharts from '../Components/Shared/PieCharts.jsx';

export default function CandidateAssessment() {

  const [state, setState] = useState(1);
  const action = (index) => {
    setState(index);
  }

  return (

    <div className='w-full bg-[#191919] pl-5 pr-5 pb-5' >
      <div className='w-full bg-[#2B2B2B] h-200 rounded-[30px]'>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%' }}>
            <div className='candidates flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px] h-[110vh] sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]'>
              <p className='text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]'>Interviewed Candidates</p>
              <PostTag name='Rasindu' post='Software Engineer' ></PostTag>
              <PostTag name='Piyushan' post='UI Designer' ></PostTag>
              <PostTag name='Gangamina' post='Software Engineer' ></PostTag>
              <PostTag name='Pabasara' post='Software Engineer' ></PostTag>

            </div>
          </div>
          <div style={{ width: '75%' }}>
            <div className='details ' style={{ color: '#fff', marginTop: '2em',paddingLeft: '2em' }}>
              <p style={{ paddingBottom: '0.5em' }}>Rasindu Ranavaka</p>
              <p style={{ paddingBottom: '0.5em' }}>Software Engineer</p>
              <p style={{ paddingBottom: '0.5em' }}>Interviewers : W.K.Piyushan</p>
            </div>

            <div className="flex items-center justify-between bg-[#2B2B2B] bg-opacity-90 w-full h-20 text-center text-[15px]" style={{ marginTop: '1em' }}>
              <div onClick={() => action(1)} className={`text-center flex-1 cursor-pointer ${state === 1 ? 'bg-[#1E1E1E] text-white h-full flex items-center justify-center' : 'text-white opacity-25'}`}>
                Technical Details
              </div>
              <div onClick={() => action(2)} className={`text-center flex-1 cursor-pointer ${state === 2 ? 'bg-[#1E1E1E] text-white h-full flex items-center justify-center' : 'text-white opacity-25'}`}>
                Cultural Fit
              </div>
              <div onClick={() => action(3)} className={`text-center flex-1 cursor-pointer ${state === 3 ? 'bg-[#1E1E1E] text-white h-full flex items-center justify-center' : 'text-white opacity-25'}`}>
                Communication
              </div>
              <div onClick={() => action(4)} className={`text-center flex-1 cursor-pointer ${state === 4 ? 'bg-[#1E1E1E] text-white h-full flex items-center justify-center' : 'text-white opacity-25'}`}>
                Overall Impression
              </div>
            </div>

            <div>
              <div className={`pl-5 pr-5 pb-5 ${state === 1 ? 'bg-[#1E1E1E] text-white ' : 'hidden'}`}>
                <TechnicalDetails />
              </div>
              <div className={`p-5  ${state === 2 ? 'bg-[#1E1E1E] text-white ' : 'hidden'}`}>
                <CulturalFit />
              </div>
              <div className={`p-5  ${state === 3 ? 'bg-[#1E1E1E] text-white ' : 'hidden'}`}>
                <Communication />
              </div>
              <div className={`p-5  ${state === 4 ? 'bg-[#1E1E1E] text-white' : 'hidden'}`}>
                <OverallImpression />
              </div>
            </div>

            <div style={{ marginLeft: '1em', marginTop: '0.5em' }}>
              <p style={{ color: 'white', fontSize: '15px' }}>Add Comment</p>
              <div style={{ display: 'flex', marginTop: '1em' }}>
                <div style={{ width: '75%' }}>
                  <textarea rows={3} placeholder='Type Here' style={{ width: "100%", backgroundColor: "rgb(255,255,255,0.05)", border: '2px solid rgb(255,255,255,0.27)', borderRadius: "10px", color: "#fff", padding: "1em", outline: 'none' }} ></textarea>
                </div>
                <div style={{ width: '25%', display: 'flex', flexDirection: 'column', marginLeft: '1em' }}>
                  <button className='w-[100px] h-[50px] rounded-[10px] mr-5' style={{ backgroundColor: 'rgb(234, 113, 34,0.16)', marginBottom: '0.5em' }}>Clear</button>
                  <button className='bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] mr-5'>Submit</button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

function TechnicalDetails() {
  return (
    <div>
      <div className='flex p-[10px]'>
        {/* <div><PieCharts percentage='75' topic='Problem Solution' ></PieCharts></div>
        <PieCharts percentage='45' topic='Language Proficiency'></PieCharts> */}
      </div>
      <div style={{ width: '100%' }}>
        <textarea rows={3} placeholder='Type Here' style={{ width: "100%", backgroundColor: "rgb(255,255,255,0.05)", border: '2px solid rgb(255,255,255,0.27)', borderRadius: "10px", color: "#fff", padding: "1em", outline: 'none' }} ></textarea>
      </div>
    </div>
  )
}

function CulturalFit() {
  return (
    <div>
      <div className='flex  p-[10px]'>
        {/* <PieCharts percentage='90' topic='Leadership Style'></PieCharts>
        <PieCharts percentage='45' topic='Adoptability'></PieCharts> */}
      </div>
      <div style={{ width: '100%' }}>
        <textarea rows={3} placeholder='Type Here' style={{ width: "100%", backgroundColor: "rgb(255,255,255,0.05)", border: '2px solid rgb(255,255,255,0.27)', borderRadius: "10px", color: "#fff", padding: "1em", outline: 'none' }} ></textarea>
      </div>
    </div>
  )
}

function Communication() {
  return (
    <div>
      <div className='flex p-[10px]'>
        {/* <div><PieCharts percentage='50' topic='Clarity' ></PieCharts></div>
        <PieCharts percentage='45' topic='Presentation Skills'></PieCharts> */}
      </div>
      <div style={{ width: '100%' }}>
        <textarea rows={3} placeholder='Type Here' style={{ width: "100%", backgroundColor: "rgb(255,255,255,0.05)", border: '2px solid rgb(255,255,255,0.27)', borderRadius: "10px", color: "#fff", padding: "1em", outline: 'none' }} ></textarea>
      </div>
    </div>
  )
}

function OverallImpression() {
  return (
    <div>
      <div className='flex p-[10px]'>
        {/* <div><PieCharts percentage='75' topic='Technical' ></PieCharts></div>
        <PieCharts percentage='45' topic='Cultural'></PieCharts> */}
      </div>
      <div style={{ width: '100%' }}>
        <textarea rows={3} placeholder='Type Here' style={{ width: "100%", backgroundColor: "rgb(255,255,255,0.05)", border: '2px solid rgb(255,255,255,0.27)', borderRadius: "10px", color: "#fff", padding: "1em", outline: 'none' }} ></textarea>
      </div>
    </div>
  )
}
