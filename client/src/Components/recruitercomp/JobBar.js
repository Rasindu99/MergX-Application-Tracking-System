import React from 'react';
import { PiBriefcase } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const JobBar = ({ onEditClick }) => {
    return (
        <div className="meeting_container" style={{width:'100%', display:'flex'}}>
            <div className="title" style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                <div className='flex'>
                <PiBriefcase size={25} className='text-white opacity-25'/>
                    <p style={{fontSize: 14}}>Software Engineer</p>
                </div>
                <div className='flex'>
                    <div onClick={onEditClick}><FaRegEdit size={25} className='text-white opacity-25 cursor-pointer'/></div>
                    <div><RiDeleteBinLine size={25} className='text-white opacity-25 cursor-pointer' /></div>
                </div>
            </div>
        </div>
    );
};

export default JobBar;
