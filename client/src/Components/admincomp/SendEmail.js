import React, { useState } from 'react'
import {toast} from 'react-hot-toast';
import axios from 'axios';

export default function SendEmail() {

    const [data, setData] = useState({
        to:'',
        subject:'',
        body:'',
        file:''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(prevData => ({
            ...prevData,
            [name] : value
        }));
    }
    
    const sendEmail = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/email/createemail', data);
                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    toast.success('Email Sent Successfully');
                    setData({
                        to:'',
                        subject:'',
                        body:'',
                        file:''
                    })
                    
                }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again.');
        }
    }
  return (
    <div>
        <form onSubmit={sendEmail}>
            <div>
                <input type='email' placeholder='Enter emails' className='bg-[#17171A]' 
                    name='to'
                    value={data.to}
                    onChange={handleChange}
                    ></input>
            </div>
            <div>
                <input type='text' placeholder='Subject' className='bg-[#17171A]'
                    name='subject'
                    value={data.subject}
                    onChange={handleChange}
                ></input>
            </div>
            <div>
                <input type='text' placeholder='body' className='bg-[#17171A]'
                    name='body'
                    value={data.body}
                    onChange={handleChange}
                ></input>
            </div>
            <div>
                <input type='text' placeholder='Files' className='bg-[#17171A]'
                    name='file'
                    value={data.file}
                    onChange={handleChange}
                ></input>
            </div>
            <div className='flex justify-center'>
                <div>
                    <button type='submit'>Send</button>
                </div>
                <div>
                    <button>Clear</button>
                </div>
            </div>
        </form>
    </div>
  )
}
