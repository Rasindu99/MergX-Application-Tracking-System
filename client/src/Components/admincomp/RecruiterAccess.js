


import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecruiterAccess() {
  const [createJobPost, setCreateJobPost] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [createAnnouncement, setCreateAnnouncement] = useState(false);
  const [sendInvitation, setSendInvitation] = useState(false);

  useEffect(() => {
    // Fetch the current state of each access right from the backend
    const fetchAccessRights = async () => {
      try {
        const [jobPostResponse, statusResponse, announcementResponse, invitationResponse] = await Promise.all([
          axios.get('/access/getcreatejobpostaccess'),
          axios.get('/access/getcreatestatusaccess'),
          axios.get('/access/getcreateannouncementaccess'),
          axios.get('/access/getsendinvitationaccess'),
        ]);

        setCreateJobPost(jobPostResponse.data.create_job_post);
        setCreateStatus(statusResponse.data.create_status);
        setCreateAnnouncement(announcementResponse.data.create_announcement);
        setSendInvitation(invitationResponse.data.send_invitation);
      } catch (error) {
        console.error('Error fetching access rights:', error);
      }
    };

    fetchAccessRights();
  }, []);

  const handleRadioChange = async (value, type) => {
    switch (type) {
      case 'createJobPost':
        setCreateJobPost(value);
        await updateAccess('/access/createjobpostaccess', { create_job_post: value });
        break;
      case 'createStatus':
        setCreateStatus(value);
        await updateAccess('/access/createstatusaccess', { create_status: value });
        break;
      case 'createAnnouncement':
        setCreateAnnouncement(value);
        await updateAccess('/access/createannouncementaccess', { create_announcement: value });
        break;
      case 'sendInvitation':
        setSendInvitation(value);
        await updateAccess('/access/sendinvitationaccess', { send_invitation: value });
        break;
      default:
        break;
    }
  };

  const updateAccess = async (url, data) => {
    try {
      await axios.put(url, data);
    } catch (error) {
      console.error('Error updating access:', error);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='pt-12'>
        <div className='pt-5 pb-3 mb-10 border-b'>
          <h1 className='text-2xl opacity-50'>Recruiter Accesses</h1>
        </div>
        <table className='h-[300px] w-[550px]'>
          <thead>
            <tr>
              <th></th>
              <th className='pl-10'></th>
              <th className='pl-8 pr-8 text-orange-500'>Turn On</th>
              <th className='text-orange-500'>Turn Off</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Create Job Post</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={createJobPost === true}
                  onChange={() => handleRadioChange(true, 'createJobPost')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={createJobPost === false}
                  onChange={() => handleRadioChange(false, 'createJobPost')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Create Status</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={createStatus === true}
                  onChange={() => handleRadioChange(true, 'createStatus')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={createStatus === false}
                  onChange={() => handleRadioChange(false, 'createStatus')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Create Announcement</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={createAnnouncement === true}
                  onChange={() => handleRadioChange(true, 'createAnnouncement')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={createAnnouncement === false}
                  onChange={() => handleRadioChange(false, 'createAnnouncement')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Send Invitation</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={sendInvitation === true}
                  onChange={() => handleRadioChange(true, 'sendInvitation')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={sendInvitation === false}
                  onChange={() => handleRadioChange(false, 'sendInvitation')}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
