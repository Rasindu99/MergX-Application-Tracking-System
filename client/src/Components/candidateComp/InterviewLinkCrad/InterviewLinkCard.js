import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import { IoIosLink } from "react-icons/io";
import { GrFormView } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import Calendar from 'react-calendar';
import { FaLaptopFile } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";

export default function InterviewLinkCard() {
    const { user } = useContext(UserContext);
    const [approvedJobs, setApprovedJobs] = useState([]);
    const [isjoinedTrue, setIsjoinedTrue] = useState([]);
    const [showInterview, setShowInterview] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);

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

    return (
        <div>
            <div className='flex justify-center pt-3'>
                <div className='bg-gradient-to-b from-[#2B2B2B] to-[#333333] rounded-lg w-2/3 h-[780px]'> 
                    <div className='flex justify-center mt-3'>
                        <div>
                            <h1 className='text-2xl text-orange-500'>Up Coming</h1>
                             <div className='w-[400px] '>
                                 <hr className='opacity-50 text-[2px]'></hr>
                            </div>
                        </div>
                    </div>
                    <div className=' rounded-xl mx-5 mt-12  h-[650px] overflow-y-auto'>
                        <div className=''>
                                {approvedJobs.length > 0 ? (
                                    approvedJobs
                                        .filter(application => user._id === application.user_id)
                                        .map(application => (
                                            <div key={application._id} className='bg-gradient-to-b from-[#2B2B2B] to-[#272727] '>
                                                <div className='flex items-center justify-between mx-12'>
                                                    <div>
                                                        <h1><IoIosLink className='size-[100px]' /></h1>
                                                    </div>
                                                    <div>
                                                        <h3>{application.interviewSchedule?.jobtitle || 'N/A'}</h3>
                                                        <p>Date: {formatDate(application.interviewSchedule?.date)}</p>
                                                        <p>Time: {application.interviewSchedule?.start_time} - {application.interviewSchedule?.end_time}</p>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => handleJoinInterview(application)} className='bg-orange-500 h-14 w-[150px] rounded-lg'>Join Interview</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <h3>empty</h3>
                                )}
                        </div>
                        
                    </div>
                </div>

                <div className='w-[30px]'></div>

                <div>
                    <div className='bg-gradient-to-b from-[#2B2B2B] to-[#333333] rounded-lg h-[320px]'>
                        <div>
                        <div className='flex justify-center'>
                        <div className='mt-2'>
                            <h1 className='text-xl text-orange-500'>Joined Interview</h1>
                             <div className='w-[180px] opacity-30 '>
                                 <hr className='opacity-50 '></hr>
                            </div>
                        </div>
                    </div>
                    <div className=' h-[250px] mt-3 overflow-y-auto '>
                        <div className='mx-1 rounded-xl'>
                                {isjoinedTrue.length > 0 ? (
                                    isjoinedTrue
                                        .filter(application => user._id === application.user_id)
                                        .map(application => (
                                            <div key={application._id} className=' border-opacity-30 bg-gradient-to-b from-[#2B2B2B] to-[#272727]'>
                                                <div className='flex items-center justify-between mx-2'>
                                                    <div>
                                                        <h1><FaLaptopFile className='size-[30px]' /></h1>
                                                    </div>
                                                    <div className='w-[300px] '>
                                                        <h3> {application.interviewSchedule?.jobtitle || 'N/A'}</h3>
                                                    </div>
                                                    <div>
                                                        <button><GrFormView className='size-[40px]'/></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <h1>empty</h1>
                                )}
                            </div>
                    </div>
                            
                        </div>
                    </div>
                    <div className="pt-2">
                        <Calendar className="w-full h-full" />
                    </div>
                </div>
                
                {showInterview && selectedInterview && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
                        <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-fit w-[700px] border-orange-700 border-[1px]">
                            <button
                                className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                                onClick={handleModalClose}
                            >
                                <IoMdClose className="text-white hover:text-red-700" />
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
                                ><div className='flex items-center justify-between'>
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