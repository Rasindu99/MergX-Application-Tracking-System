import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import UpCommingInt from './UpCommingInt';
import JoinedInterviews from './JoinedInterviews';

export default function InterviewLinkCard() {
    const { user } = useContext(UserContext);
    const [approvedJobs, setApprovedJobs] = useState([]);
    const [isjoinedTrue, setIsjoinedTrue] = useState([]);
    const [showInterview, setShowInterview] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [show, setShow] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return 'Not scheduled';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // This will give you 'yyyy-mm-dd'
    };

    const getApproveApplications = async () => {
        try {
            const response = await axios.get('/cv/getapprovedapplication');
            setApprovedJobs(response.data);
        } catch (error) {
            console.error('cant get approved application :', error);
        }
    };

    const getisjoinedtrue = async() => {
        try {
            const response = await axios.get('/cv/getapprovedisjoinedtrue');
            setIsjoinedTrue(response.data)
        } catch (error) {
            console.error('cant get isjoined true interview data')
        }
    }

    const openInterviewLink = (link) => {
        if (link) {
            const formattedLink = link.startsWith('http://') || link.startsWith('https://')
                ? link
                : `https://${link}`;
            window.open(formattedLink, '_blank');
        } else {
            console.error('Invalid interview link');
        }
    };

    const handleJoinInterview = (application) => {
        setSelectedInterview(application);
        setShowInterview(true);
    };

    const handleModalClose = () => {
        setShowInterview(false);
        setSelectedInterview(null);
    };

    const handleJoinFromPopup = async () => {
        if (selectedInterview && selectedInterview.interviewSchedule?.link) {
            openInterviewLink(selectedInterview.interviewSchedule.link);
            try {
                await updateisjoined(selectedInterview._id);
                await getApproveApplications();
                await getisjoinedtrue();
                handleModalClose();
            } catch (error) {
                console.error('Error updating isjoined status:', error);
            }
        }
    };

    const copyLinkToClipboard = () => {
        if (selectedInterview && selectedInterview.interviewSchedule?.link) {
            navigator.clipboard.writeText(selectedInterview.interviewSchedule.link)
                .then(() => alert('Link copied to clipboard!'))
                .catch(err => console.error('Failed to copy link: ', err));
        }
    };

    const updateisjoined = async(id) => {
        try {
            await axios.put(`/cv/updateisjoinedtrue/${id}`, { isjoined: true });
            console.log('Joined interview');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getApproveApplications();
        getisjoinedtrue();
    }, []);

    useEffect(() => {
        if (showInterview) {
            setTimeout(() => setShow(true), 50); // Delay to allow for transition
        } else {
            setShow(false);
        }
    }, [showInterview]);

    const handleOnClose = () => {
        setShow(false);
        setTimeout(() => handleModalClose(), 100);
    }

    return (
        <div className='h-full w-full'>
            <div className='flex justify-center h-full w-full'>
                
                <UpCommingInt approvedJobs={approvedJobs} formatDate={formatDate} handleJoinInterview={handleJoinInterview} />
                
                <JoinedInterviews user={user} isjoinedTrue={isjoinedTrue} />
                
                {showInterview && selectedInterview && (
                    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
                        <div className={`bg-[#19191A] p-6 rounded-lg shadow-lg h-fit w-[700px] border-orange-700 border transition-transform duration-500 ${show ? 'transform scale-100' : 'transform scale-95'}`}>
                            <button
                                className="group flex justify-center items-center text-white bg-orange-500 text-center rounded-md hover:bg-orange-600 size-10 absolute right-4 top-4"
                                onClick={handleOnClose}
                            >
                                <IoMdClose className="text-white group-hover:text-black text-xl" />
                            </button>
              
                            <h1 className="mb-4 text-2xl font-bold text-orange-500">{selectedInterview.interviewSchedule?.jobtitle || 'N/A'}</h1>
                            
                            <p className=''><strong className='opacity-30'>Link:</strong> {selectedInterview.interviewSchedule?.link || 'Not available'}</p>
                            <p><strong className='opacity-30'>Password:</strong> {selectedInterview.interviewSchedule?.password || 'Not available'}</p>
                            
                            <div className="mt-4 space-x-4">
                                <button 
                                    onClick={handleJoinFromPopup}
                                    className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
                                >
                                    Join Interview
                                </button>
                                <button 
                                    onClick={copyLinkToClipboard}
                                    className="px-4 py-2 text-white rounded bg-[#171711A] hover:text-orange-600"
                                >
                                    <div className='flex items-center justify-between'>
                                        <FaCopy className='mr-2'  />
                                        Copy Link
                                    </div>
                                </button>
                            </div>
                            
                            <p className='pt-10 opacity-30'>"Opportunities don't happen, you create them." — Chris Grosser</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
