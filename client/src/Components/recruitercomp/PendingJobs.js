import React, { useState } from 'react';
import JobBar from './JobBar';

export default function PendingJobs() {
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleSaveClick = () => {
        setIsEditMode(false);
    };

    const handleCancelClick = () => {
        setIsEditMode(false);
    };

    return (
        <div style={{ display: 'flex', width: '100%', margin: 0, textAlign:'left' }} >

            <div style={{ width: '32.5%', margin: 0, height: '50px', }}>
                <div style={{ display: 'flex', width: '95%', height: '20px', margin: 0 }}>
                    <JobBar onEditClick={handleEditClick} />
                </div>
            </div>

            <div style={{ width: '67.5%', borderLeft: '1px solid rgb(234, 113, 34, 0.25) ' }}>
                <div className='flex w-full p-4'>
                    <div className='w-[50%]'>
                        <div className='mb-3'><label>Job Title</label></div>
                        <div><input type="text" defaultValue="Software Engineer" className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]  ${isEditMode ? 'text-white' : 'text-white opacity-25'}`} disabled={!isEditMode} /></div>
                    </div>
                    <div className='w-[50%]'>
                        <div className='mb-3'><label>Available Vacancies</label></div>
                        <div><input type="text" defaultValue="04" className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%] ${isEditMode ? 'text-white' : 'text-white opacity-25'}`} disabled={!isEditMode} /></div>
                    </div>
                </div>
                <div className='w-full p-4'>
                    <div className='mb-3'><label>Job Description</label></div>
                    <div><textarea cols="121" rows="5" defaultValue="Design, develop, and maintain software solutions." className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[90%] ${isEditMode ? 'text-white' : 'text-white opacity-25'}`} disabled={!isEditMode} ></textarea></div>
                </div>
                <div className='flex w-full p-4 '>
                    <div className='w-[50%]'>
                        <div className='mb-3'><label>Salary Package</label></div>
                        <div><input type="text" defaultValue="70000" className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%] ${isEditMode ? 'text-white' : 'text-white opacity-25'}`} disabled={!isEditMode} /></div>
                    </div>
                    <div className='w-[50%]'>
                        <div className='mb-3'><label>Required Experience (Years)</label></div>
                        <div><input type="text" defaultValue="4" className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%] ${isEditMode ? 'text-white' : 'text-white opacity-25'}`} disabled={!isEditMode} /></div>
                    </div>
                </div>
                <div className='w-full p-4'>
                    <div className='mb-3'><label>Required Skills</label></div>
                    <div><textarea cols="121" rows="5" defaultValue="Experience with Agile methodologies is a plus.
                Excellent problem-solving and analytical skills." className={`rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[90%] ${isEditMode ? 'text-white' : 'text-white opacity-25'}`} disabled={!isEditMode}></textarea></div>
                </div>

                {isEditMode && (
                    <div className='flex justify-center w-[100%] bg-red '>
                        <button onClick={handleSaveClick} className='bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] mr-5'>Save</button>
                        <button onClick={handleCancelClick} className='bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] mr-5'>Cancel</button>
                    </div>
                )}

            </div>
        </div>

    )
}
