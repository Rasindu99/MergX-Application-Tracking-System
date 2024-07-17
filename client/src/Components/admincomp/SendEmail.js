import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function SendEmail() {
    const [data, setData] = useState({
        to: [],
        subject: '',
        body: '',
        file: null
    });
    const [currentEmail, setCurrentEmail] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [emailList, setEmailList] = useState([]);
    const [filteredEmails, setFilteredEmails] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        fetchAllEmails();
    }, []);

    const fetchAllEmails = async () => {
        try {
            const response = await axios.get('/email/allemails');
            setEmailList(response.data);
        } catch (error) {
            console.error('Error fetching emails:', error);
            toast.error('Failed to fetch email list');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'to') {
            setCurrentEmail(value);
            const filtered = emailList.filter(email => 
                email.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredEmails(filtered);
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleEmailSelect = (email) => {
        setData(prevData => ({
            ...prevData,
            to: [...prevData.to, email]
        }));
        setCurrentEmail('');
        setFilteredEmails([]);
    };

    const handleRemoveEmail = (index) => {
        setData(prevData => ({
            ...prevData,
            to: prevData.to.filter((_, i) => i !== index)
        }));
    };

    const handleUserGroupSelect = async (e) => {
        const selectedGroup = e.target.value;
        let endpoint = '';

        switch(selectedGroup) {
            case 'All':
                endpoint = '/email/allemails';
                break;
            case 'Admin':
                endpoint = '/email/getadminemails';
                break;
            case 'Recruiters':
                endpoint = '/email/getrecruiteremails';
                break;
            case 'Hiring managers':
                endpoint = '/email/gethiringmanageremails';
                break;
            case 'Interviewers':
                endpoint = '/email/getintervieweremails';
                break;
            case 'Candidates':
                endpoint = '/email/getcandidateemails';
                break;
            default:
                return;
        }

        try {
            const response = await axios.get(endpoint);
            setData(prevData => ({
                ...prevData,
                to: response.data
            }));
        } catch (error) {
            console.error('Error fetching emails:', error);
            toast.error('Failed to fetch user group emails');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleFile = (file) => {
        setData(prevData => ({
            ...prevData,
            file: file
        }));
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleButtonClick = () => {
        inputRef.current.click();
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('to', JSON.stringify(data.to));
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
    };

    const handleClear = () => {
        setData({
            to: [],
            subject: '',
            body: '',
            file: null
        });
        setCurrentEmail('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="flex justify-center">
            <form onSubmit={sendEmail} className="space-y-4">
                <div className=''>
                    <div className='text-left'>
                        <label className='text-left'>To :</label>
                    </div>
                    <div className="relative">
                        <input
                            type='email'
                            placeholder='Enter email'
                            className='px-3 py-2 bg-[#202024] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[600px]'
                            name='to'
                            value={currentEmail}
                            onChange={handleChange}
                        />
                        {filteredEmails.length > 0 && (
                            <div className="absolute z-10 w-full bg-[#202024] mt-1 rounded-md shadow-lg">
                                {filteredEmails.map((email, index) => (
                                    <div 
                                        key={index}
                                        className="px-3 py-2 hover:bg-[#2c2c30] cursor-pointer"
                                        onClick={() => handleEmailSelect(email)}
                                    >
                                        {email}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {data.to.map((email, index) => (
                            <div key={index} className="flex items-center px-2 py-1 text-white bg-blue-500 rounded-full">
                                {email}
                                <button type="button" onClick={() => handleRemoveEmail(index)} className="ml-2 focus:outline-none">
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <select 
                        className='bg-[#202024] mt-2 px-3 py-2 rounded-md'
                        onChange={handleUserGroupSelect}
                    >
                        <option value="">--Select Users--</option>
                        <option value="All">All</option>
                        <option value="Admin">Admin</option>
                        <option value="Recruiters">Recruiters</option>
                        <option value="Hiring managers">Hiring managers</option>
                        <option value="Interviewers">Interviewers</option>
                        <option value="Candidates">Candidates</option>
                    </select>
                </div>
                <div>
                    <div className='text-left'>
                        <label className='text-left'>Subject :</label>
                    </div>
                    <input
                        type='text'
                        placeholder='Subject'
                        className='px-3 py-2 bg-[#202024] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[1300px]'
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
                        className='px-3 py-2 bg-[#202024] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 w-[1300px]' 
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