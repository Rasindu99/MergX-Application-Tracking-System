import React, { useState, useEffect } from 'react';
import { PiBriefcase } from 'react-icons/pi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import Card from './Card';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ApprovedJobs() {
    const [jobPostings, setJobPostings] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);


    useEffect(() => {      
        axios.get('/job/getAllApprovedJobPostings')
            .then(response => {
                setJobPostings(response.data);
            })
            .catch(error => {
                console.log('Error fetching approved job postings:', error);
            });
    }, []);

    const handleExpiredChange = async (jobId, newExpiredValue) => {
        try {           
            await axios.put(`/job/updateExpiredStatus/${jobId}`, { expired: newExpiredValue });
                     
            if (selectedJob && selectedJob._id === jobId) {
                setSelectedJob(prevSelectedJob => ({ ...prevSelectedJob, expired: newExpiredValue }));
            }
            
            if (newExpiredValue) {
                toast.success('Job post marked as expired.');
            } else {
                toast.success('Job post marked as active.');
            }

        } catch (error) {
            toast.error('Failed to update expired status.');
        }
    };
    

    const handleJobBarClick = (job) => {
        setSelectedJob(job);
    };

    return (
        <div className="w-full flex text-left">
                <div className="w-[32.5%] m-0">
                    <div className="w-full m-0">
                        <style>
                            {`
                                .scrollbar-hidden::-webkit-scrollbar {
                                    display: none;
                                }
                                .scrollbar-hidden {
                                    scrollbar-width: none; /* Firefox */
                                    -ms-overflow-style: none; /* IE and Edge */
                                }
                            `}
                        </style>
                        <div className="flex flex-col w-[95%] m-0 max-h-[700px] overflow-y-auto scrollbar-hidden">
                            {jobPostings.map(job => (
                                <div key={job._id} className="meeting_container w-full flex cursor-pointer border-b border-white p-[10px]">
                                    <div className="title w-full flex justify-between">
                                        <div className='flex'>
                                            <PiBriefcase size={25} className='text-white opacity-25' />
                                            <p className="text-[14px]">{job.jobTitle}</p>
                                        </div>
                                        <div className='flex'>
                                            <div>
                                                <MdOutlineRemoveRedEye size={25} className='text-white opacity-25 cursor-pointer' onClick={() => handleJobBarClick(job)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            <div className='w-[67.5%] p-[1em] border-l-[1px] border-l-[rgba(234,113,34,0.25)]'>
                {selectedJob && (
                    <>
                        <div className='w-full'>
                            <div className="w-full flex">
                                <div className="w-1/2 text-white opacity-25">Job Title</div>
                                <div className="w-[5%] text-white opacity-25">-</div>
                                <div className="w-[45%] text-white">{selectedJob.jobTitle}</div>
                            </div>
                        </div>

                        <div className='w-full'>
                            <div className="w-full flex">
                                <div className="w-1/2 text-white opacity-25">Required Experience (Years)</div>
                                <div className="w-[5%] text-white opacity-25">-</div>
                                <div className="w-[45%] text-white">{selectedJob.requiredExperience}</div>
                            </div>
                        </div>

                        <div className='w-full'>
                            <div className="w-full flex">
                                <div className="w-1/2 text-white opacity-25">Required Skills</div>
                                <div className="w-[5%] text-white opacity-25">-</div>
                                <div className="w-[45%] text-white">{selectedJob.requiredSkills.join(', ')}</div>
                            </div>
                        </div>

                        <div className="w-full text-center justify-center p-8">
                            {selectedJob.description}
                        </div>

                        <div className="w-full flex justify-between font-bold">
                            <Card title="Vacancies" value={"0" + selectedJob.vacancies} />
                            <Card title="Selected Candidates" value="01" />
                            <Card title="Now Available Vacancies" value={"0" + Math.max(selectedJob.vacancies - 1, 0)} />
                        </div>


                        <div className="flex items-center mt-4 justify-center">
                            <label htmlFor="expiredCheckbox" className="mr-[2px]">Expired:</label>
                            <input type="checkbox" id="expired" checked={selectedJob.expired} onChange={(e) => handleExpiredChange(selectedJob._id, e.target.checked)} />
                        </div>

                    </>
                )}
            </div>
        </div>
    )
}
