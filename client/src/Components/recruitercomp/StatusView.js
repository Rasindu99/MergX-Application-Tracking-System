import React, { useContext, useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { UserContext } from '../../Context/UserContext';
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';

export default function StatusView({ visible, onClose, status }) {
  const { users } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [localStatus, setLocalStatus] = useState(status || {});
  const [editedImage, setEditedImage] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    if (status) {
      setLocalStatus(status);
      setEditedImage(status.image || '');
      setEditedDescription(status.description || '');
    }
  }, [status]);

  const user = status ? users.find(user => status && user.email === status.user_email) : null;

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    if (localStatus) {
      setEditedImage(localStatus.image || '');
      setEditedDescription(localStatus.description || '');
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    try {
      const updatedStatus = {
        image: editedImage,
        description: editedDescription,
      };

      const response = await axios.put(`/status/editStatus/${status._id}`, updatedStatus);

      if (response.status === 200) {
        setEditing(false);
        console.log('status edited.')
        setLocalStatus(response.data.status);
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  if (!visible || !status || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
      <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-fit w-auto border-orange-700 border-[1px]">
        <button
          className="absolute px-4 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
          onClick={onClose}
        >
          <IoMdClose className="text-white hover:text-red-700" />
        </button>
        
        <div className='flex justify-between'>
          <div className='flex justify-left'>
            <div>
              {user && user.image ? (
                <img src={user.image} alt='user' className='h-[60px] w-[60px] rounded-full overflow-hidden border-orange-700 border-[2px]' />
              ) : (
                <div className='h-[60px] w-[60px] rounded-full overflow-hidden border-orange-700 border-[2px] bg-gray-700'></div>
              )}
            </div>
            <div className='pl-8 my-auto text-start'>
              <h1>{status.user_fname} {status.user_lname}</h1>
              <p className='text-sm text-gray-400'>{user ? user.role : 'Role not found'}</p>
            </div>
          </div>
          <div className='flex justify-center align-center'>
            {!editing && (
              <FaRegEdit size={30} className='text-right cursor-pointer' onClick={handleEditClick} />
            )}
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleSaveEdit} className='w-[800px] mt-4'>
            <div className='flex justify-center'>
              {editedImage ? (
                <div>
                  <img src={editedImage} alt="Uploaded" className="rounded-md w-[400px]" />
                </div>
              ) : (
                <img src='' alt='Upload' className="hidden" />
              )}
            </div>
            <div className='flex justify-center pt-3'>
              <div className='pt-2'>
                <input
                  accept='image/*'
                  type='file'
                  name='image'
                  className='rounded-lg h-10 w-[200px] pl-3 pr-3 text-white'
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div>
              <textarea
                placeholder='Type small text or description'
                className='text-white bg-white rounded-sm bg-opacity-10 w-[400px] px-3'
                name='description'
                value={editedDescription}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className='flex justify-center mt-4'>
              <button
                type='submit'
                className='px-4 py-2 bg-orange-500 text-white rounded-md mr-4 hover:bg-orange-600 cursor-pointer'
              >
                Save
              </button>
              <button
                type='button'
                className='px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 cursor-pointer'
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className='flex justify-center pt-4'>
              {localStatus && localStatus.image ? (
                <img src={localStatus.image} alt='status' className='h-[700px] w-auto rounded-md' />
              ) : (
                <div className='h-[700px] w-auto rounded-md bg-gray-700'></div>
              )}
            </div>
            <div className='pt-4 text-gray-400'>
              <h1>{localStatus ? localStatus.description : ''}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
