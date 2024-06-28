import axios from 'axios';
import React, { useState, useEffect } from 'react'

export default function HiringManagerAccess() {
  const [jobapproval, setJobapproval] = useState(false);
  const [viewfeedback, setViewfeedback] = useState(false);
  const [makedecision, setMakedecision] = useState(false);

  useEffect(() =>{
    //fetch the current state of each access right from the backend
    const fetchAccesshiringmanager = async () => {
      try {
        const [jobapprovalResponse, viewfeedbackResponse, makedecisionResponse] = await Promise.all([
          axios.get('/access/getjobapproval'),
          axios.get('/access/getviewfeedback'),
          axios.get('/access/getmakedecision')
        ]);

        setJobapproval(jobapprovalResponse.data.job_approval);
        setViewfeedback(viewfeedbackResponse.data.view_feedback);
        setMakedecision(makedecisionResponse.data.make_decision);
      } catch (error) {
        console.error('Error fetching access rights:', error);
      }
    }
    fetchAccesshiringmanager();
  }, []);

  const handleRadioChange = async (value, type) => {
    switch (type) {
      case 'jobapproval':
        setJobapproval(value);
        await updateAccess('/access/updatejobapproval', {job_approval: value });
        break;
      case 'viewfeedback':
        setViewfeedback(value);
        await updateAccess('/access/updateviewfeedback', {view_feedback: value });
        break;
      case 'makedecision':
        setMakedecision(value);
        await updateAccess('/access/updatemakedecision', { make_decision: value });
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
          <h1 className='text-2xl opacity-50'>Hiring Manager Accesses</h1>
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
                  <label className='text-xl'>Job Approval</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={jobapproval === true}
                  onChange={() => handleRadioChange(true, 'jobapproval')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={jobapproval === false}
                  onChange={() => handleRadioChange(false, 'jobapproval')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>View Feedback</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={viewfeedback === true}
                  onChange={() => handleRadioChange(true, 'viewfeedback')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={viewfeedback === false}
                  onChange={() => handleRadioChange(false, 'viewfeedback')}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className='text-left'>
                  <label className='text-xl'>Make Decisions</label>
                </div>
              </td>
              <td>
                <h1>-</h1>
              </td>
              <td>
                <input
                  type="radio"
                  checked={makedecision === true}
                  onChange={() => handleRadioChange(true, 'makedecision')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  checked={makedecision === false}
                  onChange={() => handleRadioChange(false, 'makedecision')}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
