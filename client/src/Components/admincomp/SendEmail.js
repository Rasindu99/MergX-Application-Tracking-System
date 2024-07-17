import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function SendEmail() {
    const [data, setData] = useState({
        to: '',
        subject: '',
        body: '',
        file: null
    });
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    }

    const handleFile = (file) => {
        setData(prevData => ({
            ...prevData,
            file: file
        }));
    }

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }

    const handleButtonClick = () => {
        inputRef.current.click();
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
                handleClear();
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
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={sendEmail} className="space-y-4">
                <div className=''>
                    <div className='text-left'>
                        <label className='text-left'>To :</label>
                    </div>
                    <input
                        type='email'
                        placeholder='Enter emails'
                        className=' px-3 py-2 bg-[#202024] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[600px] '
                        name='to'
                        value={data.to}
                        onChange={handleChange}
                    />
                    
                    <select className='bg-[#202024]'>
                        <option>--Select Users--</option>
                        <option>All</option>
                        <option>Admin</option>
                        <option>Recruiters</option>
                        <option>Hiring managers</option>
                        <option>Interviewers</option>
                        <option>Candidates</option>
                    </select>
                    
                </div>
                <div>
                    <div className='text-left'>
                        <label className='text-left'>Subject :</label>
                    </div>
                    <input
                        type='text'
                        placeholder='Subject'
                        className=' px-3 py-2 bg-[#202024] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[1300px]'
                        name='subject'
                        value={data.subject}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className='text-left'>
                        <label className='text-left'>Body :</label>
                    </div>
                    <textarea
                        placeholder='Body'
                        className=' px-3 py-2 bg-[#202024] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 w-[1300px]' 
                        name='body'
                        value={data.body}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex justify-center'>
                    
                
                <div 
                    className={`w-[600px] border-2 border-dashed border-orange-500 rounded-lg p-6 ${dragActive ? 'bg-gray-100' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    
                    <input
                        ref={inputRef}
                        type='file'
                        id="fileInput"
                        className='hidden'
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput" className="text-center cursor-pointer">
                        <div>
                            <p className="mb-2 text-gray-500">Drag and drop your file here or</p>
                            <button type="button" className="text-blue-500 hover:underline" onClick={handleButtonClick}>
                                Upload a file
                            </button>
                        </div>
                    </label>
                    {data.file && <p className="mt-2 text-sm text-gray-500">Selected file: {data.file.name}</p>}
                </div>
                </div>
                <div className='flex justify-center space-x-4'>
                    <button type='submit' className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Send</button>
                    <button type='button' onClick={handleClear} className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Clear</button>
                </div>
            </form>
        </div>
    );
}