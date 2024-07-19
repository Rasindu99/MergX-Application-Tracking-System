import React, { useState, useContext, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { UserContext } from '../../Context/UserContext';
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AnnouncementView({ visible, onClose, announcements }) {
  const { users } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [localAnnouncement, setLocalAnnouncement] = useState(announcements);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedAnnounce, setEditedAnnounce] = useState('');

  useEffect(() => {
    if (announcements) {
      setLocalAnnouncement(announcements);
      setEditedTitle(announcements.title);
      setEditedAnnounce(announcements.announce);
    }
  }, [announcements]);

  // Find the user with the same email as announcements.user_email
  const user = users.find(user => announcements && user.email === announcements.user_email);

  // Handle edit button click
  const handleEditClick = () => {
    setEditing(true);
  };

  // Handle cancel edit button click
  const handleCancelEdit = () => {
    setEditing(false);
    // Reset edited fields to original values
    if (localAnnouncement) {
      setEditedTitle(localAnnouncement.title);
      setEditedAnnounce(localAnnouncement.announce);
    }
  };

  // Handle save button click
  const handleSaveEdit = async () => {
    try {
      const updatedAnnouncement = {
        title: editedTitle,
        announce: editedAnnounce,
      };

      // Make API call to update announcement
      const response = await axios.put(`/announcement/editAnnouncement/${announcements._id}`, updatedAnnouncement);

      // Handle success response
      if (response.status === 200) {
        setEditing(false);
        console.log('announcement edited.')
        // Update local state with new announcement details
        setLocalAnnouncement(response.data.announcement);
        
      } else {
        console.error('Failed to update announcement');
        // Optionally handle error state or display error message
      }
    } catch (error) {
      console.error('Error updating announcement', error);
      // Handle error state or display error message
    }
  };

  if (!visible || !announcements) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
      <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-fit w-auto border-orange-700 border-[1px] ">
        <button
          className="absolute px-4 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
          onClick={onClose}
        >
          <IoMdClose className="text-white hover:text-red-700" />
        </button>

        <div className='flex justify-between'>
          <div className='flex justify-left'>
            <div>
              <div>
                <img src={user?.image} alt='userimage' className='h-[60px] w-[60px] rounded-full overflow-hidden border-orange-700 border-[2px]'></img>
              </div>
            </div>
            <div className='my-auto ml-5 text-start'>
              <h1>{localAnnouncement?.user_fname} {localAnnouncement?.user_lname}</h1>
              <p className='text-sm text-gray-400'>{user?.role}</p>
            </div>
          </div>
          <div className='flex justify-center align-center'>
            {!editing && (
              <FaRegEdit size={30} className=' text-right cursor-pointer' onClick={handleEditClick} />
            )}
          </div>
        </div>

        {editing ? (
          <div className='w-[800px] mt-4 '>
            <div className='pt-3'>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className='text-white bg-white rounded-sm bg-opacity-10 w-[400px] px-3 py-1'
            />
            </div>
            <div className='pt-3'>
            <textarea
              value={editedAnnounce}
              onChange={(e) => setEditedAnnounce(e.target.value)}
              className='text-white bg-white rounded-sm bg-opacity-10 w-[400px] px-3 py-1'
            ></textarea>
            </div>
            <div className='flex justify-center mt-4'>
              <button
                className='px-4 py-2 bg-orange-500 text-white rounded-md mr-4 hover:bg-orange-600 cursor-pointer'
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className='px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 cursor-pointer'
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className='w-[800px] mt-4 '>
            <div className=''>
              <h1 className='text-2xl'>{localAnnouncement?.title}</h1>
            </div>
            <div className='mt-8 py-8 border-gray-200 border-[1px] border-opacity-10'>
              <p className='text-sm text-gray-400'>
                {localAnnouncement?.announce}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
