import React, { useContext, useState } from 'react';
import { useInterviewContext } from '../../../Context/InterviewContext';
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import toast from 'react-hot-toast';


const Interview = ({ interview, isRead, isWishListed }) => {
  
  const {
    interviews,
    setInterviews,
    deletedInterviews,
    setDeletedInterviews,
    searchedInterview,
    setSearchedInterview,
    search,
    readInterviews,
    setReadInterviews,
    wishListedInterviews,
    setWishListedInterviews
  } = useInterviewContext();

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [wishlistError, setWishlistError] = useState(null);
  const [wishlistSuccess, setWishlistSuccess] = useState(false);
  const { user  } = useContext(UserContext);

  const handleDelete = (interview) => {
    const newDeletedInterview = [...deletedInterviews, interview._id];
    setDeletedInterviews(newDeletedInterview);

    const updatedInterviews = interviews.filter((item) => item._id !== interview._id);
    setInterviews(updatedInterviews);

    if (search) {
      const updatedSearchResults = searchedInterview.filter((item) => item._id !== interview._id);
      setSearchedInterview(updatedSearchResults);
    }
    console.log('item deleted');
    console.log(interview);
  }

  const handleRead = (interview) => {
    setDetailsVisible(!detailsVisible);
    if (detailsVisible) {
      setReadInterviews([...readInterviews, interview._id]);
    } else {
      if (!readInterviews.includes(interview._id)) {
        setReadInterviews(readInterviews.filter((id) => id !== interview._id));
      }
      console.log('item read', interview);
    }
  }

  const handleAddToWishlist = async () => {

    if(isWishListed) {
      toast.error("Item already wishListed")
     return;
    }

    setIsAddingToWishlist(true);
    setWishlistError(null);
    setWishlistSuccess(false);

    try {
      const response = await axios.post('http://localhost:8000/wishlist/postaddwishlist', {
        job_invitation_id: interview._id,
        job_id: interview.jobId,
        candidate_id: user._id,
        candidate_email: user.email
      });
      setWishlistSuccess(true);

      setWishListedInterviews([...wishListedInterviews, interview._id]);
      console.log('new item added to wishList',interview._id);
      toast.success('Item wishListed !!');

      console.log('Item added to wishlist:', response.data);
    } catch (err) {
      setWishlistError('Failed to add item to wishlist. Please try again.');
      console.error('Error adding to wishlist:', err);
      if (err.response) {
        console.error('Error data:', err.response.data);
        console.error('Error status:', err.response.status);
        console.error('Error headers:', err.response.headers);
      } else if (err.request) {
        console.error('Error request:', err.request);
      } else {
        console.error('Error message:', err.message);
      }
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  const date = new Date(interview.createdAt);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  
  const formattedDate = date.toLocaleString(undefined, options).replace('at', '/');
  const gradientClass = isRead ? 'from-[#2B2B2B] to-[#333333]': 'from-[#5B5959] to-[#3D3D3D]'; 

  return (
    <div className={`interview-row hover:opacity-80 p-3 bg-gradient-to-b ${gradientClass}`} key={interview._id}>
      <div className="flex items-center justify-around summary">
        <span className='w-[200px]'>{interview.subject}</span>
        <span className='w-2/5'>{formattedDate}</span>

        <div className='z-10 flex justify-around w-1/5'>

          <button className="z-10 px-2 py-1 mr-3 text-white text-sm bg-orange-600 bg-opacity-90 rounded-md hover:bg-orange-400" onClick={() => handleRead(interview)}>
            {detailsVisible ? 'View Less' : 'View More'}
          </button>

          <button
            className="z-10 px-2 py-1 mr-3 text-white bg-orange-600 bg-opacity-90 rounded-md hover:bg-orange-400"
            onClick={handleAddToWishlist}
            disabled={isAddingToWishlist}
          >
            {
              isAddingToWishlist ? 'Adding...' : (
                wishlistSuccess || isWishListed ? (
                  <div className='flex items-center justify-between w-[90px]'>
                    <h1 className='text-sm pr-1'>WishListed</h1>
                    <MdFavorite className='text-white text-xl'/>
                  </div>
                ) : (
                  <div className='flex items-center justify-between w-[75px]'>
                    <h1 className='text-sm'>Wishlist</h1>
                    <MdOutlineFavoriteBorder className='text-white text-xl'/>
                  </div>
                )
              )
            }
          </button>
          <button onClick={() => handleDelete(interview)} className='z-10 border-2 border-red-600 bg-red-600 bg-opacity-30 rounded-full cursor-pointer w-9 h-9 hover:bg-red-800'>
            <RiDeleteBin5Fill className='w-5 h-5 m-auto' />
          </button>
        </div>
      </div>
      {detailsVisible && (
        <div className="mt-4 details">
          <p>Interview Date: {interview.interviewDate}</p>
          <p>Position: {interview.position}</p>
          <p>Location: {interview.location}</p>
          <a href="#" className="text-blue-500 underline">Full Details</a>
        </div>
      )}
    </div>
  )
}

export default Interview;