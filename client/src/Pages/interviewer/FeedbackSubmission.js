import React, { useState, useEffect } from 'react';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import FeedbackItem from '../../Components/interviewercomp/FeedbackItem';
import AdminChatBotBottom from '../../Components/admincomp/AdminChatBotBottom';

export default function FeedbackSubmission() {
  const name = 'Feedback Submission';
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/getusers');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); 
  }, []);

  return (
    <div>
        <div className='flex'>
        <div>
          <InterviewNav/>
        </div>
        <div>
           <Description name={name} />
        </div>

        <div id='background' className="z-0 mx-8 mt-24 w-80 h-80vh rounded-3xl">
          <div id='container' className='px-6 mt-8'>
          {users.map((user, index) => (
            <FeedbackItem
             key={index}
             profile={user.image}
             name= {user.fname + " " + user.lname}
             date= '2023/12/07'
             position= 'UI / UX'
             userID = {user._id}
            />
          ))}
          </div>
        </div>
        </div>
         {/* Move AdminChatBotBottom here and wrap it in a positioned div */}
      <div className="absolute bottom-0 right-0 z-50">
        <AdminChatBotBottom/>
      </div>
    </div>
  )
}