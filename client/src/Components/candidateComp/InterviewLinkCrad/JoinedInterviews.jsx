import {React, useState, useEffect} from 'react'
import SingleJoinedInterview from './SingleJoinedInterview';
import axios from 'axios'

const JoinedInterviews = ({isjoinedTrue, user}) => {

  const[startedEvaluations, setStartedEvaluations] = useState([]);
  const [visibleInterviewId, setVisibleInterviewId] = useState(null);
  const [feedBack, setFeedBack] = useState([]);

  const handleToggleVisibility = (id) => {
    setVisibleInterviewId(prevId => prevId === id ? null : id);
  };

  useEffect(() => {
    // Fetch evaluation candidates by job and user
    axios.get('/evaluation/getEvaCandidatesByJobAndUser', {
      params: { user_id: user._id }
    })
    .then(response => {
      setStartedEvaluations(response.data);
    })
    .catch(error => {
      console.error('Error fetching JoinedInterviews Data:', error);
    });

    // Fetch feedback data
    axios.get('/feedback/getFeedback')
    .then(response => {
      // Handle the feedback data as needed
      // console.log('Feedback Data:', response.data);
      setFeedBack(response.data);
      // You might want to store this data in the state as well
      // setFeedbackData(response.data);
    })
    .catch(error => {
      console.error('Error fetching feedback data:', error);
    });

  }, [user._id, isjoinedTrue]);


  return (
    <div>
      <div className='bg-gradient-to-b from-[#313131] to-[#262626] rounded-tr-3xl rounded-tl-lg h-full w-[400px] p-2 overflow-y-auto'>
        <div className='h-full'>
          <div className='flex justify-center'>
            <div className='mt-2'>
              <h1 className='text-xl text-orange-500'> Interview History</h1>
              <div className='w-[180px] opacity-30 '>
                <hr className='opacity-50 '></hr>
              </div>
            </div>
          </div>
          <div className=' h-5/6 mt-3 overflow-y-auto relative'>
            <div className=' rounded-xl'>
              {isjoinedTrue.length > 0 ? (
                isjoinedTrue
                  .filter(application => user._id === application.user_id)
                  .map(application => (
                    <SingleJoinedInterview 
                      key={application._id}
                      application={application} 
                      startedEvaluations={startedEvaluations}
                      isVisible={visibleInterviewId === application._id}
                      onToggleVisibility={() => handleToggleVisibility(application._id)}
                      user={user}
                      feedBack={feedBack}
                      />
                  ))
              ) : (
                  <div class="loader h-[100px]  absolute top-[27%] left-[45%]">
                    <div class="dot-spinner">
                      <div class="dot-spinner__dot"></div>
                      <div class="dot-spinner__dot"></div>
                      <div class="dot-spinner__dot"></div>
                      <div class="dot-spinner__dot"></div>
                      <div class="dot-spinner__dot"></div>
                      <div class="dot-spinner__dot"></div>
                      <div class="dot-spinner__dot"></div>
                      <div class="dot-spinner__dot"></div>
                    </div>
                  </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <div className="pt-2">
        {/* <Calendar className="w-full h-full" /> */}
      </div>
    </div>
  )
}

export default JoinedInterviews
