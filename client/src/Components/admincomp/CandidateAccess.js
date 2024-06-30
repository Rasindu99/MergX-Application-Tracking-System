import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function CandidateAccess() {
  const [assistanceChatbot, setAssistanceChatbot] = useState(false);
  const [aiChatbot, setAiChatbot] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [viewStatus, setViewStatus] = useState(false);
  const [viewAnnouncement, setViewAnnouncement] = useState(false);
  const [addWishlist, setAddWishlist] = useState(false);
  const [uploadCv, setUploadCv] = useState(false);
  const [joinInterviews, setJoinInterviews] = useState(false);

  useEffect(() => {
    const fetchAccessCandidate = async () => {
      try {
        const [
          assistanceResponse,
          aiResponse,
          editResponse,
          statusResponse,
          announcementResponse,
          wishlistResponse,
          cvResponse,
          interviewResponse
        ] = await Promise.all([
          axios.get('/access/getassistancechatbot'),
          axios.get('/access/getaichatbot'),
          axios.get('/access/geteditprofile'),
          axios.get('/access/getviewstatus'),
          axios.get('/access/getviewannouncement'),
          axios.get('/access/getaddwishlist'),
          axios.get('/access/getuploadcv'),
          axios.get('/access/getjoininterviews')
        ]);

        console.log('Assistance Chatbot:', assistanceResponse.data);
        console.log('AI Chatbot:', aiResponse.data);
        console.log('Edit Profile:', editResponse.data);
        console.log('View Status:', statusResponse.data);
        console.log('View Announcement:', announcementResponse.data);
        console.log('Add Wishlist:', wishlistResponse.data);
        console.log('Upload CV:', cvResponse.data);
        console.log('Join Interviews:', interviewResponse.data);

        setAssistanceChatbot(assistanceResponse.data.assistance_chatbot);
        setAiChatbot(aiResponse.data.ai_chatbot);
        setEditProfile(editResponse.data.edit_profile);
        setViewStatus(statusResponse.data.view_status);
        setViewAnnouncement(announcementResponse.data.view_announcement);
        setAddWishlist(wishlistResponse.data.add_wishlist);
        setUploadCv(cvResponse.data.upload_cv);
        setJoinInterviews(interviewResponse.data.join_interviews);
      } catch (error) {
        console.error('Error fetching access rights:', error);
      }
    }
    fetchAccessCandidate();
  }, []);

  const handleRadioChange = async (value, type) => {
    switch (type) {
      case 'assistanceChatbot':
        setAssistanceChatbot(value);
        await updateAccess('/access/updateassistancechatbot', { assistance_chatbot: value });
        break;
      case 'aiChatbot':
        setAiChatbot(value);
        await updateAccess('/access/updateaichatbot', { ai_chatbot: value });
        break;
      case 'editProfile':
        setEditProfile(value);
        await updateAccess('/access/updateeditprofile', { edit_profile: value });
        break;
      case 'viewStatus':
        setViewStatus(value);
        await updateAccess('/access/updateviewstatus', { view_status: value });
        break;
      case 'viewAnnouncement':
        setViewAnnouncement(value);
        await updateAccess('/access/updateviewannouncement', { view_announcement: value });
        break;
      case 'addWishlist':
        setAddWishlist(value);
        await updateAccess('/access/updateaddwishlist', { add_wishlist: value });
        break;
      case 'uploadCv':
        setUploadCv(value);
        await updateAccess('/access/updateuploadcv', { upload_cv: value });
        break;
      case 'joinInterviews':
        setJoinInterviews(value);
        await updateAccess('/access/updatejoininterviews', { join_interviews: value });
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
          <h1 className='text-2xl opacity-50'>Candidate Accesses</h1>
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
                  <label className='text-xl'>Assistance Chatbot</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={assistanceChatbot === true}
                  onChange={() => handleRadioChange(true, 'assistanceChatbot')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={assistanceChatbot === false}
                  onChange={() => handleRadioChange(false, 'assistanceChatbot')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>AI Chatbot</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={aiChatbot === true}
                  onChange={() => handleRadioChange(true, 'aiChatbot')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={aiChatbot === false}
                  onChange={() => handleRadioChange(false, 'aiChatbot')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Edit Profile</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={editProfile === true}
                  onChange={() => handleRadioChange(true, 'editProfile')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={editProfile === false}
                  onChange={() => handleRadioChange(false, 'editProfile')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>View Status</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={viewStatus === true}
                  onChange={() => handleRadioChange(true, 'viewStatus')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={viewStatus === false}
                  onChange={() => handleRadioChange(false, 'viewStatus')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>View Announcement</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={viewAnnouncement === true}
                  onChange={() => handleRadioChange(true, 'viewAnnouncement')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={viewAnnouncement === false}
                  onChange={() => handleRadioChange(false, 'viewAnnouncement')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Add to Wishlist</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={addWishlist === true}
                  onChange={() => handleRadioChange(true, 'addWishlist')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={addWishlist === false}
                  onChange={() => handleRadioChange(false, 'addWishlist')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Upload CV</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={uploadCv === true}
                  onChange={() => handleRadioChange(true, 'uploadCv')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={uploadCv === false}
                  onChange={() => handleRadioChange(false, 'uploadCv')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Join Interviews</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={joinInterviews === true}
                  onChange={() => handleRadioChange(true, 'joinInterviews')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={joinInterviews === false}
                  onChange={() => handleRadioChange(false, 'joinInterviews')}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
