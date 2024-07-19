import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import { IoMdClose } from 'react-icons/io';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function AnnouncementUpdatePopup({ visible, onClose }) {
    const { user } = useContext(UserContext);

    const [data, setData] = useState({
        user_fname: user ? user.fname : '',
        user_lname: user ? user.lname : '',
        user_email: user ? user.email : '',
        time: '',
        title: '',
        announce: '',
    });

    useEffect(() => {
        if (user) {
            setData({
                user_fname: user.fname,
                user_lname: user.lname,
                user_email: user.email,
                time: dayjs().format('HH:mm:ss'),
                title: '',
                announce: '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
            time: name === 'announce' ? dayjs().format('HH:mm:ss') : data.time,
        });
    };

    const announcementUpdate = async (e) => {
        e.preventDefault();


        if (!data.title && !data.announce) {
            toast.error('All fields must be filled!');
            return;
        }else if(!data.title){
            toast.error('Title field must be filled!');
            return;     
        }else if(!data.announce){
            toast.error('Announcement field must be filled!');
            return; 
        }

        if (user) {
            try {
                const response = await axios.post('/announcement/updateannouncement', data);
                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    setData({
                        user_fname: user.fname,
                        user_lname: user.lname,
                        user_email: user.email,
                        time: dayjs().format('HH:mm:ss'),
                        title: '',
                        announce: '',
                    });
                    onClose();
                    toast.success('Announcement updated successfully!');
                }
            } catch (error) {
                console.error('Error updating status:', error);
                toast.error('An error occurred while updating the announcement.');
            }
        }
    };

    if (!visible || !user) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
            <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-fit w-[500px] border-orange-700 border-[1px]">
                <button
                    className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                    onClick={onClose}
                >
                    <IoMdClose className="text-white hover:text-red-700" />
                </button>
                <form onSubmit={announcementUpdate}>
                    <div className='pb-2'>
                        <h1 className='text-orange-600'>Update your Announcement</h1>
                    </div>
                    <div className='pt-3'>
                        <textarea
                            placeholder='Title here.....'
                            className='text-white bg-white rounded-sm bg-opacity-10 w-[400px] px-3 py-1'
                            name='title'
                            value={data.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='pt-3'>
                        <textarea
                            placeholder='Announcement here......'
                            className='text-white bg-white rounded-sm bg-opacity-10 w-[400px] px-3 py-1'
                            name='announce'
                            value={data.announce}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='pt-5'>
                        <button type='submit' className='bg-orange-600 w-[100px] h-10 rounded-lg cursor-pointer'>SEND</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
