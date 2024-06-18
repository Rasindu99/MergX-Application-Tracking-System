import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import { GrFormView } from "react-icons/gr";
import { IoBagCheckSharp } from "react-icons/io5";

export default function Wishlist() {
    const { user } = useContext(UserContext);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [interviewschedulesData, setinterviewschedules] = useState([]);
    

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
            console.log('sent invitation get successful');
            setinterviewschedules(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
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
                                    <td >
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
                                        <button><GrFormView  className='size-[45px] hover:opacity-45'/></button>
                                    </td>
                                    <td className='pr-12'>
                                        <button className='h-10 bg-orange-500 w-[250px] rounded-lg hover:opacity-40'>Submit Applicatio (CV)</button>
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
    );
}