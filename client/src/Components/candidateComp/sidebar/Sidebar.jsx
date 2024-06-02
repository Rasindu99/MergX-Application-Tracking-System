import React from 'react';
import Avatar from '../../../Components/candidateComp/sidebar/Avatar';
import { LuLayoutDashboard } from "react-icons/lu";
import { TbUserEdit } from "react-icons/tb";
import { PiCircleDashedBold } from "react-icons/pi";
import { RiInboxArchiveLine } from "react-icons/ri";
import { RiFolderUploadLine } from "react-icons/ri";
import { BsPersonVideo3 } from "react-icons/bs";
import Logout from './Logout';
import { NavLink } from 'react-router-dom';



const Sidebar = () => {

  const navLinkStyles = ({isActive}) => {
    return {
      color: isActive ? 'rgb(156 163 175)' : 'rgb(82 82 82)',
      fontWeight: isActive ? 'bold' : 'normal',
      backgroundColor: isActive ? 'rgb(115 115 115)' : 'rgb(38 38 38)'
    }
  }

  return (
    
    <div className='flex flex-col items-center justify-between w-2/12 h-screen bg-neutral-800'>
      <Avatar />
      <div className='flex flex-col w-full divide-y divide-neutral-600 mb-9'>

        <NavLink style={navLinkStyles} to="/candidatedash/landingPage" >
          <div className='flex justify-start py-3 pt-3 pl-8 hover:bg-neutral-700 hover:text-gray-400'>
            <LuLayoutDashboard className='mr-5 text-2xl'/>
            Dashboard
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/editProfile'>
          <div className='flex justify-start py-3 pt-3 pl-8 hover:bg-neutral-700 hover:text-gray-400'>
            <TbUserEdit className='mr-5 text-2xl'/>
            Edit Profile
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/statusPage'>
          <div className='flex justify-start py-3 pt-3 pl-8 hover:bg-neutral-700 hover:text-gray-400'>  
            <PiCircleDashedBold className='mr-5 text-2xl ' />
            Status Updates
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/invitationPage'>
          <div className='flex justify-start py-3 pt-3 pl-8 hover:bg-neutral-700 hover:text-gray-400'>
            <RiInboxArchiveLine className='mr-5 text-2xl ' />
            Interview Invitations
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/submissionPage'>
          <div className='flex justify-start py-3 pt-3 pl-8 hover:bg-neutral-700 hover:text-gray-400'>
            <RiFolderUploadLine className='mr-5 text-2xl ' />
            Submit Application
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/sessionPage'>
          <div className='flex justify-start py-3 pt-3 pl-8 hover:bg-neutral-700 hover:text-gray-400'>
            <BsPersonVideo3 className='mr-5 text-2xl ' />
            Join Interview
          </div>
        </NavLink>

        <div className='flex justify-center pt-20 '>
          <Logout />
        </div>
       
      </div>
      
    </div>
    
  )
}


export default Sidebar
