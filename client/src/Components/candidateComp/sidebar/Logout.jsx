import { BiLogOut } from 'react-icons/bi';
import React,{useContext} from 'react';
import { UserContext } from '../../../Context/UserContext';

export default function Logout() {
  const {logout} = useContext(UserContext);
  return (
    <div className='mb-7'>
      <button className='flex items-center justify-between h-12 px-4 mx-3 font-semibold text-white w-28 bg-amber-800 rounded-xl hover:bg-amber-700'  
      onClick={logout}
      >
        <BiLogOut className="text-xl" /> 
        Logout
      </button>
    </div>
  );
}

