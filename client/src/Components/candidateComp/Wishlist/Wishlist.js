import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import { GrFormView } from "react-icons/gr";
import { IoBagCheckSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-hot-toast';

export default function Wishlist() {
    const { user } = useContext(UserContext);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [interviewschedulesData, setinterviewschedules] = useState([]);
    const [showjob, setShowjob] = useState(false);
    const [selectedjobinvitation, setSelectedjobinvitation] = useState(null);
    const [showapplicationupload, setShowapplicationupload] = useState(false);
    const [cv, setCv] = useState(null);

    // Function to handle file input change
    const handleFileChange = (e) => {
        setCv(e.target.files[0]);
    };

    // Function to upload application
    const uploadApplication = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('invitation_id', selectedjobinvitation._id);
        formData.append('job_id', selectedjobinvitation.jobId);
        formData.append('user_id', user._id);
        formData.append('user_name', user.fname);
        formData.append('user_email', user.email);
        formData.append('cv', cv);

        try {
            const response = await axios.post('/cv/uploadapplication', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success('Application submitted successfully!');
                setShowapplicationupload(false);
                setSelectedjobinvitation(null);
                setCv(null);
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error('Error submitting application');
        }
    };

    // Function to fetch wishlist items from backend
    const fetchWishlistItems = async () => {
        try {
            const response = await axios.get('/wishlist/details');
            setWishlistItems(response.data.data);
        } catch (error) {
            console.error('Error fetching wishlist items:', error);
        }
    };

    const getinvitationsendistrue = async () => {
        try {
            const response = await axios.get('/interview/getinterviewschedule');
            console.log('Sent invitation get successful');
            setinterviewschedules(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleModalClose = () => {
        setShowjob(false);
        setSelectedjobinvitation(null);
        setShowapplicationupload(false);
        setCv(null);
    };

    const handleViewInvitation = (invitation) => {
        setSelectedjobinvitation(invitation);
        setShowjob(true);
    };

    const handleApplicationSubmit = (invitation) => {
        setSelectedjobinvitation(invitation);
        setShowapplicationupload(true);
    };

    useEffect(() => {
        fetchWishlistItems();
        getinvitationsendistrue();
    }, []);

    return (
        <div className='flex justify-center'>
            <div>
                <h1>Wishlist</h1>
                <table>
                    <tbody>
                        {wishlistItems.map((item) => {
                            if (user._id === item.candidate_id) {
                                const InterviewSchedule = interviewschedulesData && interviewschedulesData.find(
                                    (interviewschedule) => interviewschedule._id === item.job_invitation_id
                                );

                                return (
                                    <tr key={item._id} className='border-b border-gray-500 h-[70px] bg-gradient-to-b from-[#2B2B2B] to-[#333333]'>
                                        <td className='pl-8 pr-3'>
                                            <IoBagCheckSharp className='size-[70px] text-orange-500 opacity-40'/>
                                        </td>
                                        <td>
                                            <h1 className='font-bold'>{ InterviewSchedule?.jobtitle}</h1>
                                            <p className='opacity-40'>{InterviewSchedule?.subject || 'N/A'}</p>
                                        </td>
                                        <td className='pl-2 w-[500px] pr-2'>
                                            <h1>
                                                {InterviewSchedule?.description?.length > 60 
                                                    ? `${InterviewSchedule?.description.substring(0, 60)}...` 
                                                    : InterviewSchedule?.description}
                                            </h1>
                                        </td>
                                        <td className='pl-2 w-[200px] pr-2'>
                                            <h1>{InterviewSchedule?.posteddate || 'date'}</h1>
                                        </td>
                                        <td className='pl-2 w-[200px] pr-2'>
                                            <button onClick={() => handleViewInvitation(InterviewSchedule)}>
                                                <GrFormView className='size-[45px] hover:opacity-45'/>
                                            </button>
                                        </td>
                                        <td className='pr-12'>
                                            <button onClick={() => handleApplicationSubmit(InterviewSchedule)} className='h-10 bg-orange-500 w-[250px] rounded-lg hover:opacity-40'>
                                                Submit Application (CV)
                                            </button>
                                        </td>
                                    </tr>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </tbody>
                </table>
            </div> 
            {showjob && selectedjobinvitation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
                    <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[800px] w-[1000px] border-orange-700 border-[1px] relative">
                        <button
                            className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                            onClick={handleModalClose}
                        >
                            <IoMdClose className="text-white hover:text-red-700" />
                        </button>
                        
                        <h1 className="mb-4 text-2xl font-bold">{selectedjobinvitation.jobtitle}</h1>
                        <p className="mb-2 text-lg"><strong>Subject:</strong> {selectedjobinvitation.subject || 'N/A'}</p>
                        <p className="mb-2 text-lg"><strong>Description:</strong> {selectedjobinvitation.description}</p>
                        <p className="mb-2 text-lg"><strong>Posted Date:</strong> {selectedjobinvitation.posteddate || 'date'}</p>
                    </div>
                </div>
            )}
            {showapplicationupload && selectedjobinvitation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
                    <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[800px] w-[1000px] border-orange-700 border-[1px] relative">
                        <button
                            className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                            onClick={handleModalClose}
                        >
                            <IoMdClose className="text-white hover:text-red-700" />
                        </button>
                        
                        <h1 className="mb-4 text-2xl font-bold">{selectedjobinvitation.jobtitle}</h1>
                        <h1>{user.fname}</h1>
                        <h1>{selectedjobinvitation._id}</h1>

                        <form onSubmit={uploadApplication}>
                            <input type='file' onChange={handleFileChange} required />
                            <button type='submit' className='h-10 bg-orange-500 w-[250px] rounded-lg hover:opacity-40'>Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
