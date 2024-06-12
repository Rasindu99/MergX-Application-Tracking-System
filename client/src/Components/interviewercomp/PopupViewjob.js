import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';

export default function PopupViewjob({ visible, onClose }) {
    const [nonexpiredjobData, setNonexpiredjobData] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    const getnonexpiredjobs = async () => {
        try {
            const response = await axios.get('/job/getnotexpiredjobs');
            console.log('API response:', response.data); // Log the response data
            setNonexpiredjobData(response.data);
        } catch (error) {
            console.error('Error :', error);
        }
    };

    useEffect(() => {
        getnonexpiredjobs();
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
            <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[800px] w-[1000px] border-orange-700 border-[1px]">
                <button
                    className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                    onClick={onClose}
                >
                    <label className='text-white hover:text-red-700'><IoMdClose className='' /></label>
                </button>

                <div className='flex'>
                    <div className='border w-[300px] h-[750px]'>
                        <div>
                            <table>
                                <tbody>
                                    {
                                        nonexpiredjobData
                                            .reverse()
                                            .map((jobPosting) => (
                                                <tr key={jobPosting._id} className="border-b border-gray-500 h-[50px] bg-gradient-to-b from-[#2B2B2B] to-[#333333]">
                                                    <td>
                                                        <h1>{jobPosting.jobTitle}</h1>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => setSelectedJob(jobPosting)}>View</button>
                                                    </td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='border w-[650px] h-[750px] p-4'>
                        {selectedJob ? (
                            <div>
                                <h2 className='mb-4 text-xl text-white'>{selectedJob.jobTitle}</h2>
                                <p className='text-white'>Description: {selectedJob.description}</p>
                                <p className='text-white'>skills: {selectedJob.requiredSkills}</p>
                                <p className='text-white'>Salary: {selectedJob.salary}</p>
                                {/* Add other job details here */}

                                <div>
                                    <button className='bg-orange-500 h-[40px] w-[100px] rounded-lg'>Schedule</button>
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
