import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    const [showEmailList, setShowEmailList] = useState(false);
    const inputRef = useRef(null);
    const emailListRef = useRef(null);

    useEffect(() => {
        fetchAllEmails();
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
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
            setShowEmailList(true);
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleClickOutside = (event) => {
        if (emailListRef.current && !emailListRef.current.contains(event.target)) {
            setShowEmailList(false);
        }
    };

    const handleBodyChange = (content) => {
        setData(prevData => ({
            ...prevData,
            body: content
        }));
    };

    const handleEmailSelect = (email) => {
        setData(prevData => ({
            ...prevData,
            to: [...prevData.to, email]
        }));
        setCurrentEmail('');
        setFilteredEmails([]);
        setShowEmailList(false);
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
        setFilteredEmails([]);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link'
    ];

    return (
        <div className="flex justify-center">
            <form onSubmit={sendEmail} className="w-full max-w-4xl pt-12 pb-12 space-y-4">
                <div className='text-left'>
                    <label className="block mb-1 text-sm font-medium text-orange-500">To:</label>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="flex-grow px-3 py-2 bg-[white] bg-opacity-10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="to"
                            value={currentEmail}
                            onChange={handleChange}
                            onFocus={() => setShowEmailList(true)}
                        />
                        <select 
                            className="ml-4 bg-[#202024] px-3 py-2 rounded-md text-white "
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
                    {showEmailList && filteredEmails.length > 0 && (
                        <div ref={emailListRef} className="absolute z-10 w-full max-w-2xl bg-[#19191A] mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {filteredEmails.map((email, index) => (
                                <div 
                                    key={index}
                                    className="px-3 py-2 hover:bg-[#2c2c30] cursor-pointer text-white"
                                    onClick={() => handleEmailSelect(email)}
                                >
                                    {email}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2 ">
                        {data.to.map((email, index) => (
                            <div key={index} className="flex items-center px-2 py-1 text-white bg-[white] bg-opacity-10 rounded-full">
                                {email}
                                <button type="button" onClick={() => handleRemoveEmail(index)} className="ml-2 focus:outline-none">
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='text-left'>
                    <label className="block mb-1 text-sm font-medium text-orange-500">Subject:</label>
                    <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-3 py-2 bg-[white] bg-opacity-10 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="subject"
                        value={data.subject}
                        onChange={handleChange}
                    />
                </div>
                <div className='text-left'>
                    <label className="block mb-1 text-sm font-medium text-orange-500">Body:</label>
                    <div className="bg-[#202024] rounded-md h-[250px]">
                        <ReactQuill 
                            theme="snow"
                            value={data.body}
                            onChange={handleBodyChange}
                            modules={modules}
                            formats={formats}
                            className="bg-[#202024] text-white rounded-md h-[200px]"
                        />
                    </div>
                </div>
                <div className="flex justify-center pt-6 ">
                    <div 
                        className={`w-full max-w-xl border-2 border-dashed border-orange-500 rounded-lg p-6 ${dragActive ? 'bg-[#2c2c30]' : ''} bg-[white] bg-opacity-10`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            id="fileInput"
                            className="hidden border"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="fileInput" className="block text-center cursor-pointer">
                            <p className="mb-2 text-gray-300">Drag and drop your file here or</p>
                            <button type="button" className="text-orange-500 hover:underline" onClick={handleButtonClick}>
                                Upload a file
                            </button>
                        </label>
                        {data.file && <p className="mt-2 text-sm text-gray-300">Selected file: {data.file.name}</p>}
                    </div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button type="submit" className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2">Send</button>
                    <button type="button" onClick={handleClear} className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Clear</button>
                </div>
            </form>
        </div>
    );
}