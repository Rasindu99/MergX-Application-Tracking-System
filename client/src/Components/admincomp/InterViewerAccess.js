import axios from 'axios';
import React, { useState, useEffect } from 'react'

export default function InterviewerAccess() {
  const [interviewScheduling, setInterviewScheduling] = useState(false);
  const [joinInterview, setJoinInterview] = useState(false);
  const [submitEvaluation, setSubmitEvaluation] = useState(false);
  const [feedbackSubmission, setFeedbackSubmission] = useState(false);

  useEffect(() => {
    // Fetch the current state of each access right from the backend
    const fetchAccessInterviewer = async () => {
      try {
        const [scheduleResponse, joinResponse, evaluationResponse, feedbackResponse] = await Promise.all([
          axios.get('/access/interviewscheduleget'),
          axios.get('/access/joininterviewget'),
          axios.get('/access/submitevalutionget'),
          axios.get('/access/feedbacksubmissionget')
        ]);

        setInterviewScheduling(scheduleResponse.data.interview_scheduling);
        setJoinInterview(joinResponse.data.join_interview);
        setSubmitEvaluation(evaluationResponse.data.submit_evaluation);
        setFeedbackSubmission(feedbackResponse.data.feedback_submission);
      } catch (error) {
        console.error('Error fetching access rights:', error);
      }
    }
    fetchAccessInterviewer();
  }, []);

  const handleRadioChange = async (value, type) => {
    switch (type) {
      case 'interviewScheduling':
        setInterviewScheduling(value);
        await updateAccess('/access/createinterviewschedule', { interview_scheduling: value });
        break;
      case 'joinInterview':
        setJoinInterview(value);
        await updateAccess('/access/joininterview', { join_interview: value });
        break;
      case 'submitEvaluation':
        setSubmitEvaluation(value);
        await updateAccess('/access/submitevalution', { submit_evaluation: value });
        break;
      case 'feedbackSubmission':
        setFeedbackSubmission(value);
        await updateAccess('/access/feedbacksubmission', { feedback_submission: value });
        break;
      default:
        break;
    }
  };

  const updateAccess = async (url, data) => {
    try {
      await axios.put(url, data);
    } catch (error) {
      console.error('Error updating access:', error);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='pt-12'>
        <div className='pt-5 pb-3 mb-10 border-b'>
          <h1 className='text-2xl opacity-50'>Interviewer Accesses</h1>
        </div>
        <table className='h-[300px] w-[550px]'>
          <thead>
            <tr>
              <th></th>
              <th className='pl-10'></th>
              <th className='pl-8 pr-8 text-orange-500'>Turn On</th>
              <th className='text-orange-500'>Turn Off</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Interview Scheduling</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={interviewScheduling === true}
                  onChange={() => handleRadioChange(true, 'interviewScheduling')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={interviewScheduling === false}
                  onChange={() => handleRadioChange(false, 'interviewScheduling')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Join Interview</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={joinInterview === true}
                  onChange={() => handleRadioChange(true, 'joinInterview')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={joinInterview === false}
                  onChange={() => handleRadioChange(false, 'joinInterview')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Submit Evaluation</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={submitEvaluation === true}
                  onChange={() => handleRadioChange(true, 'submitEvaluation')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={submitEvaluation === false}
                  onChange={() => handleRadioChange(false, 'submitEvaluation')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Feedback Submission</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={feedbackSubmission === true}
                  onChange={() => handleRadioChange(true, 'feedbackSubmission')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={feedbackSubmission === false}
                  onChange={() => handleRadioChange(false, 'feedbackSubmission')}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}