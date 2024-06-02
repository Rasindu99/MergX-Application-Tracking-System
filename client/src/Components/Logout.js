import React,{useContext} from 'react';
import { UserContext } from '../Context/UserContext';


export default function Logout() {
  const {logout} = useContext(UserContext);
  return (
    <div>
      <div>
        
        <button onClick={logout}
         className='h-12 px-12 bg-orange-600 rounded-xl md:w-auto'>Logout</button>
      
        
      </div>
    </div>
  )
}
