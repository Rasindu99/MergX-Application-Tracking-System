import {React, useState, useEffect} from 'react'
import SingleJoinedInterview from './SingleJoinedInterview';
import axios from 'axios'

const JoinedInterviews = ({isjoinedTrue, user}) => {

  const[startedEvaluations, setStartedEvaluations] = useState([]);
  const [visibleInterviewId, setVisibleInterviewId] = useState(null);

  const handleToggleVisibility = (id) => {
    setVisibleInterviewId(prevId => prevId === id ? null : id);
  };

  useEffect(() => {
    axios.get('/evaluation/getEvaCandidatesByJobAndUser', {
      params:{user_id: user._id}
    })
    .then(response => {setStartedEvaluations(response.data);
    })
    .catch(error => {
      console.error('Error fetching JoinedInterviews Data :', error);
    })
  },[isjoinedTrue])


  return (
    <div>
      <div className='bg-gradient-to-b from-[#2B2B2B] to-[#333333] rounded-lg h-full w-[400px]'>
        <div className='h-full'>
          <div className='flex justify-center'>
            <div className='mt-2'>
              <h1 className='text-xl text-orange-500'>Joined Interview</h1>
              <div className='w-[180px] opacity-30 '>
                <hr className='opacity-50 '></hr>
              </div>
            </div>
          </div>
          <div className=' h-5/6 mt-3 overflow-y-auto'>
            <div className='mx-1 rounded-xl'>
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
                      />
                  ))
              ) : (
                <h1>empty</h1>
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
