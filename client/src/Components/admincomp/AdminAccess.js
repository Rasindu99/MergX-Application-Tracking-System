import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminAccess() {
  const [createUserAccount, setCreateUserAccount] = useState(false);
  const [modifyUserAccount, setModifyUserAccount] = useState(false);
  const [roleUpdate, setroleUpdate] = useState(false);
  const [deleteUserAccount, setDeleteUserAccount] = useState(false);

  useEffect(() => {
    // Fetch the current state of create_user_account from the backend
    const fetchCreateUserAccount = async () => {
      try {
        const response = await axios.get('/access/getcreateuseraccount');
        setCreateUserAccount(response.data.create_user_account);
      } catch (error) {
        console.error('Error fetching create user account state:', error);
      }
    };

    //fetch the modify_user account  from the backend
    const fetchModifyUserAccount = async () => {
      try {
        const response = await axios.get('/access/getmodifyuseraccount');
        setModifyUserAccount(response.data.modify_user_account);
      } catch (error) {
        console.error('Error fetching create user account state:', error);
      }
    };
    
     //fetch the role update  from the backend
     const fetchRoleUpdate = async () => {
      try {
        const response = await axios.get('/access/getupdaterole');
        setroleUpdate(response.data.role_update);
      } catch (error) {
        console.error('Error fetching create user account state:', error);
      }
    };
    
    //fetch get delete user
    const fetchDeleteUserAccount = async () => {
      try {
        const response = await axios.get('/access/getdeleteaccount');
        setDeleteUserAccount(response.data.delete_user_account);
      } catch (error) {
        console.error('Error fetching create user account state:', error);
      }
    };
    
    
    fetchModifyUserAccount();
    fetchCreateUserAccount();
    fetchRoleUpdate();
    fetchDeleteUserAccount();
  }, []);

  const handleRadioChange = async (value) => {
    setCreateUserAccount(value);

    try {
      await axios.put('/access/updatecreateuseraccount', {
        create_user_account: value
      });
    } catch (error) {
      console.error('Error updating create user account state:', error);
    }
  };

  const handleRadioChangemodifyuser = async (value) => {
    setModifyUserAccount(value);

    try {
      await axios.put('/access/modifyuseraccount', {
        modify_user_account: value
      });
    } catch (error) {
      console.error('Error updating create user account state:', error);
    }
  };

  const handleRadioChangeroleupdate = async (value) => {
    setroleUpdate(value);

    try {
      await axios.put('/access/updateroleaccess', {
        role_update: value
      });
    } catch (error) {
      console.error('Error updating create user account state:', error);
    }
  };
  const handleRadioChangedeleteuser = async (value) => {
    setDeleteUserAccount(value);

    try {
      await axios.put('/access/deleteuser', {
        delete_user_account: value
      });
    } catch (error) {
      console.error('Error updating create user account state:', error);
    }
  };



  return (
    <div className='flex justify-center'>
      <div className='pt-12' >
        <div className='pt-5 pb-3 mb-10 border-b'>
          <h1 className='text-2xl opacity-50'>Admin Accesses</h1>
        </div>
        <table className=' h-[300px] w-[550px]'>
          <thead>
            <tr>
              <th></th>
              <th className='pl-10'></th>
              <th className='pl-8 pr-8 text-orange-500'>Turn On</th>
              <th  className='text-orange-500'>Turn Off</th>
            </tr>
          </thead>

          <tbody>
            <tr className='pt-6'>
              <td >
                <div className='text-left'>
                  <label className='text-xl' >Create User Account</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={createUserAccount === true}
                    onChange={() => handleRadioChange(true)}
                  />
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={createUserAccount === false}
                    onChange={() => handleRadioChange(false)}
                  />
                </div>
              </td>
            </tr>
            {/* Repeat similar structure for other functionalities */}
            <tr className=''>
            <td>
                <div className='text-left'>
                  <label className='text-xl'>Modify Details User Account</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={modifyUserAccount === true}
                    onChange={() => handleRadioChangemodifyuser(true)}
                  />
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={modifyUserAccount === false}
                    onChange={() => handleRadioChangemodifyuser(false)}
                  />
                </div>
              </td>
            </tr>

            <tr>
            <td>
                <div className='text-left'>
                  <label className='text-xl'> Role Update User Account</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={roleUpdate === true}
                    onChange={() => handleRadioChangeroleupdate(true)}
                  />
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={roleUpdate === false}
                    onChange={() => handleRadioChangeroleupdate(false)}
                  />
                </div>
              </td>
            </tr>

            <tr>
            <td>
                <div className='text-xl text-left '>
                  <label>Delete User Account</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={deleteUserAccount === true}
                    onChange={() => handleRadioChangedeleteuser(true)}
                  />
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="radio"
                    checked={deleteUserAccount === false}
                    onChange={() => handleRadioChangedeleteuser(false)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
