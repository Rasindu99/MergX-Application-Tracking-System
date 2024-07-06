import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import { GrFormView } from "react-icons/gr";
import { IoBagCheckSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";


export default function SubmittedApplication() {
    const { user } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlistItems, setWishlistItems] = useState([]);
    const [interviewschedulesData, setinterviewschedules] = useState([]);
    const [showjob, setShowjob] = useState(false);
    const [selectedjobinvitation, setSelectedjobinvitation] = useState(null);
    
    

  
   

    // Function to fetch wishlist items from backend
    const fetchWishlistItemsfalse = async () => {
        try {
            const response = await axios.get('/wishlist/detailssubmittedtrue');
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
        
    };

    const handleViewInvitation = (invitation) => {
        setSelectedjobinvitation(invitation);
        setShowjob(true);
    };

   

    useEffect(() => {
        fetchWishlistItemsfalse(true);
        getinvitationsendistrue();
        
    }, []);

    const filterWishlistItems = wishlistItems.filter((item) => {
        const InterviewSchedule = interviewschedulesData.find(
            (interviewschedule) => interviewschedule._id === item.job_invitation_id
        );
        
        if (!InterviewSchedule) {
            return false;
        }
        
        const jobTitle = InterviewSchedule.jobtitle ? InterviewSchedule.jobtitle.toLowerCase() : '';
        const subject = InterviewSchedule.subject ? InterviewSchedule.subject.toLowerCase() : '';
        //const description = InterviewSchedule.description ? InterviewSchedule.description.toLowerCase() : '';
        
        const query = searchQuery.toLowerCase();
        return jobTitle.includes(query) || subject.includes(query) ;
    });

    return (
        <div className='flex justify-center overflow-hidden h-auto w-full'>
            <div className='w-full flex flex-col items-center max-h-[800px] overflow-y-auto'>
                <div className="pt-3 pb-3 w-full mb-3">
                    <input
                    className="text-[#ffffff] bg-[#2B2B2B] h-[45px] w-2/4 rounded-3xl pl-3 border border-neutral-700"
                    type="text"
                    placeholder="Search Jobs...."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className='overflow-y-auto h-3/4 w-[90%] rounded-2xl border border-neutral-700'>
                    <table className='overflow-y-auto w-full'>
                        <tbody className='overflow-y-auto w-full'>
                            {filterWishlistItems.map((item) => {
                                if (user._id === item.candidate_id) {
                                    const InterviewSchedule = interviewschedulesData && interviewschedulesData.find(
                                        (interviewschedule) => interviewschedule._id === item.job_invitation_id
                                    );

                                    return (
                                        <tr key={item._id} className='border-b border-neutral-700 h-[70px] bg-gradient-to-b from-[#2B2B2B] to-[#333333] w-2/4 hover:from-[#464646] hover:to-[#333333]  cursor-pointer'>
                                            <td className='pl-8 pr-3'>
                                                <IoBagCheckSharp className='text-4xl text-orange-500 opacity-40' />
                                            </td>
                                            <td>
                                                <h1 className='font-bold'>{InterviewSchedule?.jobtitle}</h1>
                                                <p className='opacity-40'>{InterviewSchedule?.subject || 'N/A'}</p>
                                            </td>
                                            <td className='pl-2 w-[500px] pr-2'>
                                                <h1 className='opacity-45'>
                                                    Submitted
                                                </h1>
                                            </td>
                                            <td className='pl-2 w-[200px] pr-2'>
                                                <h1>{InterviewSchedule?.posteddate || 'date'}</h1>
                                            </td>
                                            <td className='pl-2 w-[200px] pr-2'>
                                                <button onClick={() => handleViewInvitation(InterviewSchedule)}>
                                                    <GrFormView className='size-[45px] hover:opacity-45' />
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
            
        </div>
    );
}
