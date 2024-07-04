import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { MdOutlineClose } from "react-icons/md";

export default function PopupViewjob({ visible, onClose }) {
    const { user } = useContext(UserContext);
    const [nonexpiredjobData, setNonexpiredjobData] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showSchedule, setShowSchedule] = useState(false);
    const [data, setData] = useState({
        jobId: '',
        creatorId: '',
        jobtitle:'',
        date: '',
        start_time: '',
        end_time: '',
        subject: '',
        link: '',
        password: '',
        experience: '',
        skills: '',
        description: ''
    });

    const getnonexpiredjobs = async () => {
        try {
            const response = await axios.get('/job/getnotexpiredjobs');
            console.log('API response:', response.data);
            setNonexpiredjobData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const createschedule = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:8000/schedule/interviewschedule', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              jobId: selectedJob.jobid,
              jobtitle: selectedJob.jobTitle,
              creatorId: user._id,
              date: data.date,
              start_time: data.start_time,
              end_time: data.end_time,
              subject: data.subject,
              link: data.link,
              password: data.password,
              experience: selectedJob.requiredExperience,
              skills: selectedJob.requiredSkills, 
              description: selectedJob.description
            })
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Interview Schedule created successfully', data);
            setData({
                date: '',
                start_time: '',
                end_time: '',
                subject: '',
                link: '',
                password: '',
            });
            await Swal.fire({
                title: 'Success!',
                text: 'Interview Schedule created successfully',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                window.location.reload();
              });
          } else {
            console.error('Failed to create interview schedule');
            await Swal.fire({
                title: 'Error!',
                text: 'Failed to create interview schedule',
                icon: 'error',
                confirmButtonText: 'OK'
              });
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    useEffect(() => {
        getnonexpiredjobs();
    }, []);

    if (!visible) return null;

    const handleScheduleClick = () => {
        setShowSchedule(true);
        setData((prevData) => ({
            ...prevData,
            jobId: selectedJob._id,
            creatorId: user._id,
            experience: selectedJob.requiredExperience,
            skills: selectedJob.requiredSkills,
            description: selectedJob.description,
            jobtitle: selectedJob.jobTitle
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-5 backdrop-blur z-50">
            <div className="bg-[#2B2B2BE5] opacity-90 relative w-[80rem] h-[45rem] border-2 border-[#EA712287] rounded-3xl px-5">
                <MdOutlineClose size={25} className='absolute top-5 right-5 cursor-pointer' onClick={onClose} />

                <div className='flex'>
                    <div className='border-r pr-3 py-2 border-[#EA712287] w-[20rem] h-[716px] overflow-y-scroll'>
                        <table className='w-full'>
                            <tbody>
                                {
                                    nonexpiredjobData
                                        .reverse()
                                        .map((jobPosting) => (
                                            <tr key={jobPosting._id} className="border-b border-gray-500 h-[50px] bg-gradient-to-b from-[#2B2B2B] to-[#333333]">
                                                <td>
                                                    <h1 className='text-white'>{jobPosting.jobTitle}</h1>
                                                </td>
                                                <td>
                                                    <button className='text-white' onClick={() => { setSelectedJob(jobPosting); setShowSchedule(false); }}>View</button>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='py-5 w-[60rem] h-[44rem] p-4 overflow-y-scroll text-left'>
                        {selectedJob && !showSchedule ? (
                            <div className='px-40 relative'>
                                <h2 className='mt-10 mb-4 text-3xl text-white text-center'>{selectedJob.jobTitle}</h2>
                                <div className='flex items-start justify-between mt-10 mb-5'>
                                    <p className='text-white w-1/5'>Description</p>
                                    <p className='w-1/5'> - </p>
                                    <p className='w-4/5 text-left'>{selectedJob.description}</p>
                                </div>
                                <div className='flex items-start justify-between mt-10 mb-5'>
                                    <p className='text-white w-1/5'>Skills</p>
                                    <p className='w-1/5'> - </p>
                                    <p className='w-4/5 text-left'>{selectedJob.requiredSkills}</p>
                                </div>
                                <div className='flex items-start justify-between mt-10 mb-5'>
                                    <p className='text-white w-1/5'>Salary</p>
                                    <p className='w-1/5'> - </p>
                                    <p className='w-4/5 text-left'>{selectedJob.salary}</p>
                                </div>

                                <div className='flex items-center justify-center mt-40'>
                                    <button className='bg-orange-500 h-[50px] w-[200px] rounded-lg' onClick={handleScheduleClick}>Schedule</button>
                                </div>
                            </div>
                        ) : showSchedule ? (
                            <div className='p-4 mt-4 rounded-lg px-40'>
                                <h3 className='mb-2 text-3xl text-white text-center'>Schedule Interview</h3>
                                <div className='flex items-start justify-between mt-10 mb-5'>
                                    <p className='text-white w-1/5'>Job Title</p>
                                    <p className='w-1/5'> - </p>
                                    <p className='w-4/5 text-left'>{selectedJob.jobTitle}</p>
                                </div>
                                <div className='flex items-start justify-between mb-5'>
                                    <p className='text-white w-1/5'>Experience</p>
                                    <p className='w-1/5'> - </p>
                                    <p className='w-4/5 text-left'>{selectedJob.requiredExperience}</p>
                                </div>
                                <div className='flex items-start justify-between mb-5'>
                                    <p className='text-white w-1/5'>Skills</p>
                                    <p className='w-1/5'> - </p>
                                    <p className='w-4/5 text-left'>{selectedJob.requiredSkills}</p>
                                </div>
                                <div className='flex items-start justify-between mb-5'>
                                    <p className='text-white w-1/5'>Description</p>
                                    <p className='w-1/5'> - </p>
                                    <p className='w-4/5 text-left'>{selectedJob.description}</p>
                                </div>
                                
                                <div>
                                    <form onSubmit={createschedule}>
                                        <div className='flex items-start mb-5'>
                                            <label className='text-white w-1/5'>Subject</label>
                                            <p className='w-1/5'> - </p>
                                            <input
                                                type='text'
                                                className='bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-lg h-8 w-4/5'
                                                placeholder='Enter subject'
                                                name='subject'
                                                value={data.subject}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className='flex items-start mb-5'>
                                            <label className='text-white w-1/5'>Link</label>
                                            <p className='w-1/5'> - </p>
                                            <input
                                                type='text'
                                                className='bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-lg h-8 w-4/5'
                                                placeholder='Enter link'
                                                name='link'
                                                value={data.link}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className='flex items-start mb-5'>
                                            <label className='text-white w-1/5'>Password</label>
                                            <p className='w-1/5'> - </p>
                                            <input
                                                type='text'
                                                className='bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-lg h-8 w-4/5'
                                                placeholder='Enter meeting password'
                                                name='password'
                                                value={data.password}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className='flex items-start mb-5'>
                                            <label className='text-white w-1/5'>Date</label>
                                            <p className='w-1/5'> - </p>
                                            <input
                                                type='date'
                                                className='bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-lg h-8 w-4/5'
                                                placeholder='Date'
                                                name='date'
                                                value={data.date}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className='flex items-start mb-5'>
                                            <label className='text-white w-1/5'>Start Time</label>
                                            <p className='w-1/5'> - </p>
                                            <input
                                                type='time'
                                                className='bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-lg h-8 w-4/5'
                                                name='start_time'
                                                value={data.start_time}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className='flex items-start mb-5'>
                                            <label className='text-white w-1/5'>End Time</label>
                                            <p className='w-1/5'> - </p>
                                            <input
                                                type='time'
                                                className='bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-lg h-8 w-4/5'
                                                name='end_time'
                                                value={data.end_time}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className='pt-3 flex items-center justify-center mt-10 gap-5'>
                                            <button type='submit' className='bg-orange-500 h-[40px] w-[150px] rounded-lg'>Save</button>
                                            <button type='button' className='bg-blue-600 h-[40px] w-[150px] rounded-lg ml-2' onClick={() => setData({
                                                
                                                date: '',
                                                start_time: '',
                                                end_time: '',
                                                subject: '',
                                                link: '',
                                                password: ''
                                                
                                            })}>Clear</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <p className='mt-10 mb-4 text-3xl text-white text-center'>Select a job to view details</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
