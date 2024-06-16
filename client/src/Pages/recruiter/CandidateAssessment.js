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
      <div className='w-full bg-[#2B2B2B] rounded-[30px]'>
      <div className="flex">
      <div className="w-1/4">
            <div className='candidates flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px] h-[94vh] sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]'>
              <p className='text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]'>Interviewed Candidates</p>
              <PostTag name='Rasindu' post='Software Engineer' ></PostTag>
            </div>
          </div>
          <div className="w-3/4">
          <div className="details text-white mt-8 pl-8 text-left">
          <p className="pb-2">Rasindu Ranavaka</p>
          <p className="pb-2">Software Engineer</p>
          <p className="pb-2">Interviewers : W.K.Piyushan</p>
            </div>

            <div className="flex items-center justify-between bg-[#2B2B2B] bg-opacity-90 w-full h-20 text-center text-[15px] mt-4">
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

            <div className="ml-4 mt-2">
            <p className="text-white text-[15px]">Add Comment</p>
              <div className="flex mt-4">
                <div className="w-3/4">
                  <textarea rows={3} placeholder='Type Here' className="w-full bg-white bg-opacity-5 border-2 border-white border-opacity-[0.27] rounded-[10px] text-white p-4 outline-none"></textarea>
                </div>
                <div className="w-1/4 flex flex-col ml-4"> 
                  <button className='w-[100px] h-[50px] rounded-[10px] mr-5 bg-[#CC6600] bg-opacity-[0.16] mb-2' >Clear</button>
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
    <div className="flex">
    <div className="w-2/5 flex justify-end">
        <CircularProgress skilltype="Problem Solution" percentage="60" circleWidth="200"/>
      </div>
      <div className="w-3/5 flex justify-center">
        <CircularProgress skilltype="Language Proficiency" percentage="85" circleWidth="200"/>
      </div>
    </div>
      <div className='w-full'>
        <textarea rows={3} placeholder='Type Here'   className="w-full bg-white bg-opacity-5 border-2 border-white border-opacity-[0.27] rounded-[10px] text-white p-4 outline-none"></textarea>
      </div>
    </div>
  )
}

function CulturalFit() {
  return (
    <div>
      <div className="flex justify-between">
        <CircularProgress skilltype="Problem Solution" percentage="60" circleWidth="180"/>
        <CircularProgress skilltype="Ability to collaborate effectively with team members" percentage="85" circleWidth="180"/>
        <CircularProgress skilltype="Adoptability" percentage="60" circleWidth="180"/>
      </div>
      <div className='flex'>
      <div className="w-2/5 flex justify-end">
          <CircularProgress skilltype="Decision Making Approach" percentage="60" circleWidth="180"/>
        </div>
        <div className="w-3/5 flex justify-center">
          <CircularProgress skilltype="Leadership Style" percentage="85" circleWidth="180"/>
        </div>
      </div>
      <div className='w-full'>
        <textarea rows={3} placeholder='Type Here' className="w-full bg-white bg-opacity-5 border-2 border-white border-opacity-[0.27] rounded-[10px] text-white p-4 outline-none"></textarea>
      </div>
    </div>
  )
}

function Communication() {
  return (
    <div>
      <div className="flex justify-between">
      <CircularProgress skilltype="Clarity" percentage="60" circleWidth="200"/>
      <CircularProgress skilltype="Active Listening" percentage="60" circleWidth="200"/>
      <CircularProgress skilltype="Empathy" percentage="60" circleWidth="200"/>
      <CircularProgress skilltype="Presentation Skills" percentage="60" circleWidth="200"/>
      </div>
      <div className='w-full'>
        <textarea rows={3} placeholder='Type Here' className="w-full bg-white bg-opacity-5 border-2 border-white border-opacity-[0.27] rounded-[10px] text-white p-4 outline-none"></textarea>
      </div>
    </div>
  )
}

function OverallImpression() {
  return (
    <div>
      <div className="flex justify-between">
      <CircularProgress skilltype="Technical Details" percentage="60" circleWidth="200"/>
      <CircularProgress skilltype="Cultural Fit" percentage="60" circleWidth="200"/>
      <CircularProgress skilltype="Communication" percentage="60" circleWidth="200"/>
      </div>
      <div className='w-full'>
        <textarea rows={3} placeholder='Type Here' className="w-full bg-white bg-opacity-5 border-2 border-white border-opacity-[0.27] rounded-[10px] text-white p-4 outline-none"></textarea>
      </div>
    </div>
  )
}

const CircularProgress = ({ skilltype, percentage, circleWidth }) => {
  const radius = 80;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  const splitText = (text) => {
    const words = text.split(' ');
    const maxLength = 23; // Maximum characters per line
    let lines = [''];
    let currentLine = 0;

    words.forEach(word => {
      if ((lines[currentLine] + ' ' + word).length <= maxLength || lines[currentLine].split(' ').length === 1) {
        // Add word to current line if it fits within maxLength or if it's the first word of a new line
        if (lines[currentLine]) {
          lines[currentLine] += ' ' + word;
        } else {
          lines[currentLine] = word;
        }
      } else {
        // Start a new line with the current word
        lines.push(word);
        currentLine++;
      }
    });

    return lines.map((line, index) => <tspan key={index} x="50%" dy={`${index ? 1 : 0}em`} textAnchor="middle">{line}</tspan>);
  };

  const skilltypeHeight = splitText(skilltype).length * 0.5;


  return (
    <div>
      <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>
        <circle cx={circleWidth / 2} cy={circleWidth / 2} strokeWidth="15px" r={radius} className="fill-none stroke-[#FFFFFF]" />
        <circle cx={circleWidth / 2} cy={circleWidth / 2} strokeWidth="15px" r={radius} className="fill-none stroke-[#EA7122]" style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset, strokeLinecap: "round", strokeLinejoin: "round" }} transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}/>
        <text x="50%" y={`${45 - (skilltypeHeight * 7)}%`} textAnchor="middle" className="font-bold fill-white text-[0.9rem]">
          {splitText(skilltype)}
        </text>
        <text x="50%" y={`${50 + (skilltypeHeight * 4)}%`} dy="1em" textAnchor="middle" className="font-bold fill-white opacity-25">
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

