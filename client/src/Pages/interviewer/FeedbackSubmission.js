import React, { useState, useEffect } from 'react';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import FeedbackItem from '../../Components/interviewercomp/FeedbackItem';

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

        <div id='background' className="w-80 h-80vh rounded-3xl z-0 mt-24 mx-8">
          <div id='container' className='mt-8 px-6'>
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
    </div>
  )
}