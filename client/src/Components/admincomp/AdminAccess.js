import React, { useState } from 'react';

export default function AdminAccess() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='flex justify-center'>
      <h1>Admin Access</h1>
      <div>
      <div className='flex border'>
        <label>
            Create User Account
        </label>
        <label>
            <input
            type="radio"
            value="createon"
            checked={selectedOption === "createon"}
            onChange={handleOptionChange}
            />
            Turn On
        </label>
        <label>
            <input
            type="radio"
            value="createoff"
            checked={selectedOption === "createoff"}
            onChange={handleOptionChange}
            />
            Turn Off
        </label>
    </div>
    
    <div>
      <label>
        Modify  User Account
      </label>
      <label>
            <input
            type="radio"
            value="modifyon"
            checked={selectedOption === "modifyon"}
            onChange={handleOptionChange}
            />
            Turn On
        </label>
        <label>
            <input
            type="radio"
            value="modifyoff"
            checked={selectedOption === "modifyoff"}
            onChange={handleOptionChange}
            />
            Turn Off
        </label>
    </div>

     
    <div>
      <label>
        Role Assignment
      </label>
      <label>
            <input
            type="radio"
            value="roleon"
            checked={selectedOption === "roleon"}
            onChange={handleOptionChange}
            />
            Turn On
        </label>
        <label>
            <input
            type="radio"
            value="option2"
            checked={selectedOption === "roleoff"}
            onChange={handleOptionChange}
            />
            Turn Off
        </label>
    </div>

     
    <div>
      <label>
        Delete user account
      </label>
      <label>
            <input
            type="radio"
            value="option1"
            checked={selectedOption === "deleteon"}
            onChange={handleOptionChange}
            />
            Turn On
        </label>
        <label>
            <input
            type="radio"
            value="option2"
            checked={selectedOption === "deleteoff"}
            onChange={handleOptionChange}
            />
            Turn Off
        </label>
    </div>
    
      </div>
    
      

    </div>
  );
}
