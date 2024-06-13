import React, { useContext, useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

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

    const createschedule = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/interview/interviewschedule', data);
            if (response.data.error) {
                console.error('error');
            } else {
                setData({
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
                console.log('completed');
                setShowSchedule(false);
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
            <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[800px] w-[1000px] border-orange-700 border-[1px]">
                <button
                    className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600"
                    onClick={onClose}
                >
                    <label className='text-white hover:text-red-700'><IoMdClose /></label>
                </button>

                <div className='flex'>
                    <div className='border w-[300px] h-[750px] overflow-y-scroll'>
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
                    <div className='border w-[650px] h-[750px] p-4 overflow-y-scroll'>
                        {selectedJob && !showSchedule ? (
                            <div>
                                <h2 className='mb-4 text-xl text-white'>{selectedJob.jobTitle}</h2>
                                <p className='text-white'>Description: {selectedJob.description}</p>
                                <p className='text-white'>Skills: {selectedJob.requiredSkills}</p>
                                <p className='text-white'>Salary: {selectedJob.salary}</p>

                                <div>
                                    <button className='bg-orange-500 h-[40px] w-[100px] rounded-lg' onClick={handleScheduleClick}>Schedule</button>
                                </div>
                            </div>
                        ) : showSchedule ? (
                            <div className='p-4 mt-4 rounded-lg'>
                                <h3 className='mb-2 text-lg text-white'>Schedule Interview</h3>
                                <h1>Job Title: {selectedJob.jobTitle} </h1>
                                <h1>Experience: {selectedJob.requiredExperience}</h1>
                                <h1>Skills: {selectedJob.requiredSkills}</h1>
                                <h1>Description: {selectedJob.description}</h1>
                                
                                <div>
                                    <form onSubmit={createschedule}>
                                        <div className='pt-3'>
                                            <input
                                                type='text'
                                                className='bg-opacity-20 bg-slate-600'
                                                placeholder='Enter subject'
                                                name='subject'
                                                value={data.subject}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='pt-3'>
                                            <input
                                                type='text'
                                                className='bg-opacity-20 bg-slate-600'
                                                placeholder='Enter link'
                                                name='link'
                                                value={data.link}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='pt-3'>
                                            <input
                                                type='text'
                                                className='bg-opacity-20 bg-slate-600'
                                                placeholder='Enter meeting password'
                                                name='password'
                                                value={data.password}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='pt-3'>
                                            <input
                                                type='date'
                                                className='bg-opacity-20 bg-slate-600'
                                                placeholder='Date'
                                                name='date'
                                                value={data.date}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='pt-3'>
                                            <label className='text-white'>Start time</label>
                                            <input
                                                type='time'
                                                className='bg-opacity-20 bg-slate-600'
                                                name='start_time'
                                                value={data.start_time}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='pt-3'>
                                            <label className='text-white'>End time</label>
                                            <input
                                                type='time'
                                                className='bg-opacity-20 bg-slate-600'
                                                name='end_time'
                                                value={data.end_time}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='pt-3'>
                                            <button type='submit' className='bg-orange-500 h-[40px] w-[100px] rounded-lg'>Save</button>
                                            <button type='button' className='bg-blue-600 h-[40px] w-[100px] rounded-lg ml-2' onClick={() => setData({
                                                
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
                            <p className='text-white'>Select a job to view details</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
