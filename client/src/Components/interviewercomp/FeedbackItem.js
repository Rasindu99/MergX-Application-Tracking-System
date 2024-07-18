import React, { useState, useEffect } from 'react';
import { MdOutlineClose } from "react-icons/md";
import '../../Pages/interviewer/custom.css'
import PopUp from './Popup';
import StarRating from './StarRating';
import axios from 'axios';
import {toast} from 'react-hot-toast';

const FeedbackItem = ({ profile, name, date, position, userID }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState('');
  const [existingFeedbackList, setExistingFeedbackList] = useState([]);

  useEffect(() => {
    const fetchExistingFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/feedback?userId=${userID}`);
        if (response.data.length > 0) {
          setExistingFeedbackList(response.data);
        }
      } catch (error) {
        console.error('Error fetching existing feedback:', error);
      }
    };

    fetchExistingFeedback();
  }, [userID]);

  const togglePopup = () => {
    if (!feedback) {
      toast.error('Admin blocked temporarily');
      return;
    }
    setShowPopup(!showPopup);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    
    try {
      // Send feedback data to backend
      const response = await axios.post('http://localhost:8000/feedback', {
        rating: selectedRating,
        feedback: comment,
        userId: userID
      });

      console.log('Feedback submitted:', response.data);

      // Clear form and close popup
      setSelectedRating(0);
      setComment('');
      togglePopup();

      window.location.reload();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };



  const handleClear = () => {
    setSelectedRating(0);
    setComment('');
  };

  //access
  const [feedback, setfeedback] = useState(false);

  useEffect(() => {
    // Fetch the current state of join_interview from the backend
    const fetchJoinInterviewState = async () => {
      try {
        const response = await axios.get('/access/feedbacksubmissionget');
        setfeedback(response.data.feedback_submission);
      } catch (error) {
        console.error('Error fetching join interview state:', error);
      }
    };

    fetchJoinInterviewState();
  }, []);

  return (
    <div>
      <div id='interview-item' className='flex items-center justify-between px-8 py-4'>
        <div>
          <img src={profile} className='border-2 border-white rounded-full w-14 h-14' alt='Profile'></img>
        </div>
        <div className='text-left -translate-x-24 max-w-44 min-w-44'> 
          <h1>{name}</h1>
          <p className='text-sm opacity-50'>CANDIDATE</p>
        </div>
        <div className='-translate-x-24 max-w-36 min-w-36'>
          <p className='text-base opacity-50'>Date - {date}</p>
        </div>
        <div className='-translate-x-20 max-w-32 min-w-32'>
          <p className='text-base opacity-50'>{position}</p>
        </div>
        <div>
          {existingFeedbackList.some(feedback => feedback.userId === userID) ? (
              <button
                className='w-52 h-14 bg-[#EA7122] text-lg rounded-3xl opacity-70'
                onClick={togglePopup}
              >
                Update Feedback
              </button>
            ) : (
              <button
                className='w-52 h-14 bg-[#EA7122] text-lg rounded-3xl'
                onClick={togglePopup}
              >
                Submit Feedback
              </button>
            )}
        </div>
      </div>

      {showPopup && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-5 backdrop-blur'>
          <div id='pop-bg' className='bg-[#2B2B2BE5] opacity-90 relative'>
            <MdOutlineClose size={25} className='absolute cursor-pointer top-5 right-5' onClick={togglePopup} />
            <div className='flex items-center justify-around'>
              <p className='text-2xl bold'>Submit Your Feedback</p>
              <PopUp
               img = {profile}
               name = {name}
               role = 'CANDIDATE'
              />
            </div>
            <p className='mt-5 text-xl semi-bold'>Rate Your Expeirience</p>
            <p className='w-3/4 mx-auto mt-5 text-lg text-center'>We request you to share your feedback. This helps us to get the valuable point to the candidate</p>
            <div className='mx-auto mt-5'>
              <StarRating onChange={handleRatingChange} />
            </div>
            <div className='flex flex-col items-center justify-start mt-8'>
              <p className='text-left'>Add a Comment</p>
              <textarea
                className="block px-4 py-2 mt-5 bg-white border border-white border-opacity-25 rounded resize-none bg-opacity-5"
                placeholder="Enter your text here..."
                style={{ width: '45rem', height: '10rem'}}
                value={comment}
                onChange={handleCommentChange}
                rows="4"
              ></textarea>
            </div>
            <div className='flex items-center justify-center gap-3 mx-auto mt-6'>
              <button className='w-40 h-12 bg-[#EA7122] text-lg rounded-xl' onClick={handleSubmit}>Submit</button>
              <button className='w-40 h-12 bg-[#EA7122] text-lg rounded-xl bg-opacity-20' onClick={handleClear}>Clear</button>
            </div>
          </div>
        </div>
      )}
      <div></div>
    </div>
    
  );
};

export default FeedbackItem;