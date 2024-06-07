import React, {  useEffect, useState } from 'react';

import axios from 'axios';

export default function GetApprovaljobs() {
    
    const [approvalJobData, setApprovalJobData] = useState([]);

    const getApprovaljobs = async () => {
        try {
            const response = await axios.get('/job/getAllApprovedJobPostings');
            console.log('API response:', response.data); // Log the response data
            setApprovalJobData(response.data);
        } catch (error) {
            console.error('Error fetching status:', error);
        }
    };

    useEffect(() => {
        getApprovaljobs();
    }, []); // Add empty dependency array to only run once on mount

    useEffect(() => {
        console.log('Approval job data:', approvalJobData); // Log the approval job data
    }, [approvalJobData]);

    return (
        <div className='mx-[70px] bg-gradient-to-b from-[#272727] to-[#17171A] rounded-[30px] pt-12 h-[800px]'>
            <div className='flex justify-center text-center'>
              
                <table>
                    <tbody>
                        {approvalJobData
                            .reverse() // Reverse the array before mapping
                            .map((jobPosting) => (
                                <tr key={jobPosting._id} className="border-b border-gray-500 h-[50px] bg-gradient-to-b from-[#2B2B2B] to-[#333333]">
                                    <td>
                                        <h1>{jobPosting.jobTitle}</h1>
                                    </td>
                                   
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
