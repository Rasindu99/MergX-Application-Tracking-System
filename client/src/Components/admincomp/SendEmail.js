import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function SendEmail() {
    const [data, setData] = useState({
        to: '',
        subject: '',
        body: '',
        file: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleFileChange = (e) => {
        setData(prevData => ({
            ...prevData,
            file: e.target.files[0]
        }));
    }

    const sendEmail = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('to', data.to);
        formData.append('subject', data.subject);
        formData.append('body', data.body);
        if (data.file) {
            formData.append('file', data.file);
        }

        try {
            const response = await axios.post('/email/createemail', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success('Email Sent Successfully');
                setData({
                    to: '',
                    subject: '',
                    body: '',
                    file: null
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again.');
        }
    }

    const handleClear = () => {
        setData({
            to: '',
            subject: '',
            body: '',
            file: null
        });
    }

    return (
        <div>
            <form onSubmit={sendEmail}>
                <div>
                    <input
                        type='email'
                        placeholder='Enter emails'
                        className='bg-[#17171A]'
                        name='to'
                        value={data.to}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Subject'
                        className='bg-[#17171A]'
                        name='subject'
                        value={data.subject}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='body'
                        className='bg-[#17171A]'
                        name='body'
                        value={data.body}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type='file'
                        placeholder='Files'
                        className='bg-[#17171A]'
                        name='file'
                        onChange={handleFileChange}
                    />
                </div>
                <div className='flex justify-center'>
                    <div>
                        <button type='submit'>Send</button>
                    </div>
                    <div>
                        <button type='button' onClick={handleClear}>Clear</button>
                    </div>
                </div>
            </form>
        </div>
    )
}