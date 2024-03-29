import React, { useContext } from 'react';
import Logout from '../../Components/Logout';
import { UserContext } from '../../Context/UserContext';
import AdminNav from '../../Components/admincomp/AdminNav';

function Admindash() {
  const { user } = useContext(UserContext); // Destructure user from context
  const date = new Date();
  const currentTime = date.getHours();

  let greeting;

  if (currentTime >= 0 && currentTime <= 12) {
    greeting = "Good Morning";
  } else if (currentTime > 12 && currentTime <= 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "code review karana ayyata dewi pihitai";
  }

  return (
    <div>
      <div className='flex'>
        <div>
          <AdminNav/>
        </div>

        <div>
          <Logout />
          {/* Check if user exists before accessing its properties */}
          {!!user && (
            <div>
              <h1>{greeting}</h1>
              <h1>Hi {user.fname} {user.lname} {user.gender} {user.email}</h1>
              
            </div>
          )}
          {/* If user doesn't exist, you may want to display a message */}
          {!user && <h1>No user found</h1>}
        </div>
      </div>
    </div>
  );
}

export default Admindash;
