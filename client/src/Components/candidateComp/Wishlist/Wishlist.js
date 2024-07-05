import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import { GrFormView } from "react-icons/gr";
import { IoBagCheckSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-hot-toast';
import { MdCloudUpload } from "react-icons/md";
import { FaFileCircleCheck } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import { FaFileCirclePlus } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";

export default function Wishlist() {
    const { user } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlistItems, setWishlistItems] = useState([]);
    
    const [interviewschedulesData, setinterviewschedules] = useState([]);
    const [showjob, setShowjob] = useState(false);
    const [selectedjobinvitation, setSelectedjobinvitation] = useState(null);
    const [selectedWishlistItemId, setSelectedWishlistItemId] = useState(null);
    const [showapplicationupload, setShowapplicationupload] = useState(false);
    const [cv, setCv] = useState(null);
    const [show, setShow] = useState(false);

    // Function to handle file input change
    const handleFileChange = (e) => {
        setCv(e.target.files[0]);
    };

    useEffect(() => {
        if (showapplicationupload) {
            setTimeout(() => setShow(true), 50); // Delay to allow for transition
        } else {
            setShow(false);
        }
    }, [showapplicationupload]);

    const updatesubmitted = async (id) => {
        try {
            await axios.put(`/wishlist/updatesubmitted/${id}`, { submitted: true });
            console.log('Submitted status updated successfully');
            
            fetchWishlistItems(); // Re-fetch the wishlist items to get the updated list
        } catch (error) {
            console.error('Error updating submitted status:', error);
        }
    }

    // Function to upload application
    const uploadApplication = async (e) => {
        e.stopPropagation();
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
                setSelectedWishlistItemId(null);
                setCv(null);
                // Update the submitted status using the wishlist item ID
                updatesubmitted(selectedWishlistItemId);
                
            }
            
            
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error('Error submitting application');
        }
    };
    
    // Function to fetch wishlist items from backend
    const fetchWishlistItems = async () => {
        try {
            const response = await axios.get('wishlist/detailssubmittedfalse'); // Ensure the URL is correct
            setWishlistItems(response.data.data);
            console.log('wishList Items', response.data);
        } catch (error) {
            console.error('Error fetching wishlist items:', error);
        }
    };

   
    const getinvitationsendistrue = async () => {
        try {
            const response = await axios.get('/interview/getinterviewschedule');
            console.log('Sent invitation get successful',response.data);
            setinterviewschedules(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleModalClose = () => {
        setShowjob(false);
        setSelectedjobinvitation(null);
        setSelectedWishlistItemId(null);
        setShowapplicationupload(false);
        setCv(null);
    };

    const handleViewInvitation = (invitation) => {
        setSelectedjobinvitation(invitation);
        setShowjob(true);
    };

    const handleApplicationSubmit = (invitation, wishlistItemId) => {
        setSelectedjobinvitation(invitation);
        setSelectedWishlistItemId(wishlistItemId);
        setShowapplicationupload(true);
    };

    useEffect(() => {
        fetchWishlistItems();
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
        
        const query = searchQuery.toLowerCase();
        return jobTitle.includes(query) || subject.includes(query);
    });

    // File Upload area tools----------------------------

    const fileInputRef = useRef(null);

    const handleFormClick = (e) => {
        e.stopPropagation();
        fileInputRef.current.click();
      };

    const handleDeleteClick = (event) => {
        event.stopPropagation(); // Prevent the form click event from being triggered
        setCv(null);
    };

    const handleOnClose = () => {
        setShow(false);
        setTimeout(() => handleModalClose(), 200); 
    }

    return (
        <div className='flex justify-center'>
            <div>
                <div className="pt-10 pb-10">
                    <input
                    className="text-[#ffffff] bg-[#2B2B2B] h-[40px] w-[800px] rounded-3xl pl-3"
                    type="text"
                    placeholder="Search Jobs...."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div>
                <table>
                    <tbody>
                        {filterWishlistItems.map((item) => {
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
                                            <button onClick={() => handleApplicationSubmit(InterviewSchedule, item._id)} className='h-10 bg-orange-500 w-[250px] rounded-lg hover:opacity-40'>
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
                <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`flex flex-col items-center justify-around bg-[#1d1d1d] p-6 rounded-lg shadow-lg h-3/4 w-2/6 border-neutral-700 border-[1px] relative transition-transform duration-500 ${show ? 'transform scale-100' : 'transform scale-95'}`}>
                        <button
                            className="group flex justify-center items-center text-white bg-orange-500 text-center rounded-md hover:bg-orange-600 size-10 absolute right-4 top-4"
                            onClick={handleOnClose}
                        >
                            <IoMdClose className="text-white group-hover:text-black text-xl" />
                        </button>
                        
                        <div>
                            <h1 className="mb-4 text-2xl font-bold">{selectedjobinvitation.jobtitle}</h1>
                            <h1>{user.fname}</h1>
                            <h1>{selectedjobinvitation._id}</h1>
                        </div>

                        <form
                           
                            onClick={handleFormClick}
                            className='flex flex-col justify-around items-center border-3 border-dashed border-orange-500 h-[250px] w-[250px] cursor-pointer rounded-2xl relative '
                        >
                            <TiDelete className='absolute text-3xl right-2 top-2 text-orange-500 cursor-pointer hover:text-orange-700 z-10' onClick={handleDeleteClick}/>
                            { 
                                cv  ? 
                                    <div className='flex justify-around  h-3/5 flex-col items-center'>
                                        <FaFileCircleCheck className='text-8xl text-orange-500 ml-5' />
                                        <h1 className='text-lg font-semibold text-green-500'>File upload Successful</h1>
                                    </div>
                                    :
                                    <div className='flex justify-around  h-3/5 flex-col items-center '>
                                        <FaFileCirclePlus className='text-orange-300 text-8xl ml-5' />
                                        <h1 className='text-lg font-semibold text-neutral-500'>Browse File to upload</h1>
                                    </div>
                            }
                            <input type='file' onChange={handleFileChange} ref={fileInputRef} className="hidden" required />
                        </form>
                        <button type='submit' className='h-10 bg-orange-500 w-[250px] rounded-lg hover:opacity-40' onClick={uploadApplication}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
}
