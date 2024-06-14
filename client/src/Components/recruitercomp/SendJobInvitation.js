import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcInvite } from "react-icons/fc";
import { GrFormView } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";

export default function SendJobInvitation() {
    const [invitationsendisfalseData, setInvitationsendisfalseData] = useState([]);
    const [invitationsendistrueData, setInvitationsendistrueData] = useState([]);
    const [showInvitation, setShowInvitation] = useState(false);
    const [showsentInvitation, setShowsentInvitation] = useState(false);
    const [selectedInvitation, setSelectedInvitation] = useState(null);

    const handleModalClose = () => {
        setShowInvitation(false);
        setSelectedInvitation(null);
        setShowsentInvitation(false);
    }

    const handleViewInvitation = (invitation) => {
        setSelectedInvitation(invitation);
        setShowInvitation(true);
        
    }

    const handleViewSentInvitation = (invitation) => {
        setShowsentInvitation(true);
        setSelectedInvitation(invitation);
    }

    const getinvitationsendisfalse = async () => {
        try {
            const response = await axios.get('/invitation/sendinvitation');
            console.log('new invitation get successful');
            setInvitationsendisfalseData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getinvitationsendistrue = async () => {
        try {
            const response = await axios.get('/invitation/sentinvitation');
            console.log('sent invitation get successful');
            setInvitationsendistrueData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateSendStatus = async (id) => {
        try {
            await axios.put(`/invitation/send/${id}`, { send: true });
            console.log('Invitation sent successfully');
            // Refresh data
            getinvitationsendisfalse();
            getinvitationsendistrue();

             // Close the modal if it was sent from there
             handleModalClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getinvitationsendisfalse();
        getinvitationsendistrue();
    }, []);

    return (
        <div>
            <div className='flex py-8'>
                <div className='w-1/2 h-[680px]'>
                    <div>
                        <h1 className='text-2xl opacity-40'>New Job Interview Invitation</h1>
                    </div>
                    <div className='h-[600px] mt-10 overflow-y-scroll max-h-[600px] scrollbar-w-2 scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-thumb-hover-gray-700'>
                        <div className='flex justify-center text-center'>
                            <table>
                                <tbody>
                                    {invitationsendisfalseData.map((interviewschedules) => (
                                        <tr key={interviewschedules._id} className='border-b border-gray-500 h-[70px] bg-gradient-to-b from-[#2B2B2B] to-[#333333]'>
                                            <td className='w-[60px] pl-4'>
                                                <FcInvite className='size-[35px] opacity-85' />
                                            </td>
                                            <td className='pl-2 w-[300px] pr-2'>
                                                <h1>{interviewschedules.jobtitle}</h1>
                                            </td>
                                            <td>
                                                <button onClick={() => handleViewInvitation(interviewschedules)}><GrFormView className='size-[50px] hover:opacity-50' /></button>
                                            </td>
                                            <td className='pr-4'>
                                                <button
                                                    className='bg-orange-500 hover:bg-gray-500 w-[100px] h-10 rounded-lg'
                                                    onClick={() => updateSendStatus(interviewschedules._id)}
                                                >
                                                    Send
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='w-1/2 border-l border-orange-500 h-[680px]'>
                    <div>
                        <h1 className='text-2xl opacity-40'>Sent Job Interview Invitation</h1>
                    </div>
                    <div className='h-[600px] mt-10 overflow-y-scroll max-h-[600px] scrollbar-w-2 scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-thumb-hover-gray-700'>
                        <div className='flex justify-center text-center'>
                            <table>
                                <tbody>
                                    {invitationsendistrueData.map((interviewschedules) => (
                                        <tr key={interviewschedules._id} className='border-b border-gray-500 h-[70px] bg-gradient-to-b from-[#2B2B2B] to-[#333333]'>
                                            <td className='w-[60px] pl-4'>
                                                <FcInvite className='size-[35px] opacity-85' />
                                            </td>
                                            <td className='pl-2 w-[300px] pr-2'>
                                                <h1>{interviewschedules.jobtitle}</h1>
                                            </td>
                                            <td>
                                            <button onClick={() => handleViewSentInvitation(interviewschedules)}><GrFormView className='size-[50px] hover:opacity-50' /></button>
                                            </td>
                                            <td className='pr-4'>
                                                <div className='bg-gray-500 w-[100px] h-10 rounded-lg flex items-center justify-center'>
                                                    <h1 className='text-center'>Sent</h1>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {showInvitation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
                    <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[800px] w-[1000px] border-orange-700 border-[1px] ">
                        <button
                           className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                            onClick={handleModalClose}
                        >
                            <IoMdClose className="text-white hover:text-red-700" />
                        </button>
                        <div className='flex justify-center'>
                            <div className='border-b-[2px] w-[300px] pb-4'>
                                <h1 className='text-2xl opacity-30'>New interview invitation</h1>
                            </div>
                        </div>
                        <div className='pt-4'>
                            <h1 className='mb-2 text-xl font-semibold'>{selectedInvitation?.jobtitle}</h1>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>Description:</span> {selectedInvitation?.description}</p>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>Skills:</span> {selectedInvitation?.skills}</p>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>Link:</span> <a href={selectedInvitation?.link} className='text-blue-500 underline'>{selectedInvitation?.link}</a></p>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>Password:</span> {selectedInvitation?.password}</p>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>Date:</span> {selectedInvitation?.date}</p>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>Start:</span> {selectedInvitation?.start_time}</p>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>End:</span> {selectedInvitation?.end_time}</p>
                        </div>
                        <div>
                        <button
                                                    className='bg-orange-500 hover:bg-gray-500 w-[100px] h-10 rounded-lg'
                                                    onClick={() => updateSendStatus(selectedInvitation?._id)}
                                                >
                                                    Send
                                                </button>
                        </div>
                    </div>
                </div>
            )}
            {showsentInvitation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
                    <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[800px] w-[1000px] border-orange-700 border-[1px] ">
                        <button
                           className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                            onClick={handleModalClose}
                        >
                            <IoMdClose className="text-white hover:text-red-700" />
                        </button>
                        <div className='flex justify-center'>
                            <div className='border-b-[2px] w-[300px] pb-4'>
                                <h1 className='text-2xl opacity-30'>Sent interview invitation</h1>
                            </div>
                        </div>
                        <div className='pt-4'>
                            <h1 className='mb-2 text-xl font-semibold'>{selectedInvitation?.jobtitle}</h1>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>Description:</span> {selectedInvitation?.description}</p>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>Skills:</span> {selectedInvitation?.skills}</p>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>Link:</span> <a href={selectedInvitation?.link} className='text-blue-500 underline'>{selectedInvitation?.link}</a></p>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>Password:</span> {selectedInvitation?.password}</p>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>Date:</span> {selectedInvitation?.date}</p>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>Start:</span> {selectedInvitation?.start_time}</p>
                            <p className='mb-1 text-gray-300'><span className='font-semibold'>End:</span> {selectedInvitation?.end_time}</p>
                        </div>
                       
                    </div>
                </div>
            )}
        </div>
    );
}
