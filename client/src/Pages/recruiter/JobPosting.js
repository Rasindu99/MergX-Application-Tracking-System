import React, { useState, useEffect } from 'react';
import { MdCheckCircle } from "react-icons/md";

import JobBar from '../../Components/recruitercomp/JobBar';
import { PiBriefcase } from "react-icons/pi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import Card from '../../Components/recruitercomp/Card';


export default function JobPosting() {
    const [state, setState] = useState(1);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const action = (index) => {
        setState(index);
    }

    const handleSuccessClose = () => {
        setShowSuccessMessage(false);
        clearForm();
    }

    const clearForm = () => {
        setJobTitle('');
        setVacancies('');
        setDescription('');
        setSalary('');
        setExperience('');
        setSkills('');
        setIsFormValid(false);
    }

    const [jobTitle, setJobTitle] = useState('');
    const [vacancies, setVacancies] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [experience, setExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(jobTitle && vacancies && description && salary && experience && skills);
    }, [jobTitle, vacancies, description, salary, experience, skills]);

    const handleSubmit = () => {
        if (isFormValid) {
            setShowSuccessMessage(true);
        }
    }

    return (
        <div className='w-full bg-[#191919] pl-5 pr-5' >
            <div className='w-full bg-[#525252] h-200 rounded-[30px]'>
                <div className="flex items-center justify-between bg-[#2B2B2B] bg-opacity-90 w-full h-20 rounded-t-[30px] text-center text-[18px]">
                    <div onClick={() => action(1)} className={`text-center flex-1 cursor-pointer ${state === 1 ? 'bg-[#2B2B2B] text-white h-full flex items-center justify-center rounded-tl-[30px]' : 'text-white opacity-25'}`}>
                        Job Posting
                    </div>
                    <div onClick={() => action(2)} className={`text-center flex-1 cursor-pointer ${state === 2 ? 'bg-[#2B2B2B] text-white h-full flex items-center justify-center' : 'text-white opacity-25'}`}>
                        Pending Jobs
                    </div>
                    <div onClick={() => action(3)} className={`text-center flex-1 cursor-pointer ${state === 3 ? 'bg-[#2B2B2B] text-white h-full flex items-center justify-center rounded-tr-[30px]' : 'text-white opacity-25'}`}>
                        Approved Jobs
                    </div>
                </div>
                {/* contents */}
                <div>
                    <div className={`pl-5 pr-5 pb-5 ${state === 1 ? 'bg-[#2B2B2B] text-white rounded-b-[30px]' : 'hidden'}`}>
                        <JobPostingForm
                            jobTitle={jobTitle}
                            setJobTitle={setJobTitle}
                            vacancies={vacancies}
                            setVacancies={setVacancies}
                            description={description}
                            setDescription={setDescription}
                            salary={salary}
                            setSalary={setSalary}
                            experience={experience}
                            setExperience={setExperience}
                            skills={skills}
                            setSkills={setSkills}
                            isFormValid={isFormValid}
                            setIsFormValid={setIsFormValid}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                    <div className={`p-5  ${state === 2 ? 'bg-[#2B2B2B] text-white rounded-b-[30px]' : 'hidden'}`}>
                        <PendingJobs />
                    </div>
                    <div className={`p-5  ${state === 3 ? 'bg-[#2B2B2B] text-white rounded-b-[30px]' : 'hidden'}`}>
                        <ApprovedJobs />
                    </div>
                </div>
            </div>

            {showSuccessMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-[#191919] rounded-lg p-20 text-center w-[40%]">
                        <MdCheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                        <h2 className="text-white opacity-25 text-xl font-bold mb-4">Successfully Submitted</h2>
                        <button onClick={handleSuccessClose} className="bg-[#EA7122] text-white rounded px-4 py-2">Close</button>
                    </div>
                </div>
            )}

        </div>
    )
}

function JobPostingForm({ jobTitle, setJobTitle, vacancies, setVacancies, description, setDescription, salary, setSalary, experience, setExperience, skills, setSkills, isFormValid, setIsFormValid, handleSubmit }) {
    const clearForm = () => {
        setJobTitle('');
        setVacancies('');
        setDescription('');
        setSalary('');
        setExperience('');
        setSkills('');
        setIsFormValid(false);
    }

    return (
        <div style={{textAlign: 'left', paddingLeft: '6%'}}>
            <div className='flex w-full p-4' >
                <div className='w-[50%]'>
                    <div className='mb-3'><label>Job Title</label></div>
                    <div><input type="text" placeholder='Type here...' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]" /></div>
                </div>
                <div className='w-[50%]'> 
                    <div className='mb-3'><label>Available Vacancies</label></div>
                    <div><input type="text" placeholder='Type here...' value={vacancies} onChange={(e) => setVacancies(e.target.value)} className="rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]" /></div>
                </div>
            </div>
            <div className='w-full p-4'>
                <div className='mb-3'><label>Job Description</label></div>
                <div><textarea cols="163" rows="5" placeholder='Type here...' value={description} onChange={(e) => setDescription(e.target.value)} className='rounded-[10px] px-4 py-2 bg-white bg-opacity-5'></textarea></div>
            </div>
            <div className='flex w-full p-4 '>
                <div className='w-[50%]'>
                    <div className='mb-3'><label>Salary Package</label></div>
                    <div><input type="text" placeholder='Type here...' value={salary} onChange={(e) => setSalary(e.target.value)} className="rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]" /></div>
                </div>
                <div className='w-[50%]'>
                    <div className='mb-3'><label>Required Experience (Years)</label></div>
                    <div><input type="text" placeholder='Type here...' value={experience} onChange={(e) => setExperience(e.target.value)} className="rounded-[10px] px-4 py-2 bg-white bg-opacity-5 w-[80%]" /></div>
                </div>
            </div>
            <div className='w-full p-4'>
                <div className='mb-3'><label>Required Skills</label></div>
                <div><textarea cols="163" rows="5" placeholder='Type here...' value={skills} onChange={(e) => setSkills(e.target.value)} className=' rounded-[10px] px-4 py-2 bg-white bg-opacity-5'></textarea></div>
            </div>

            <div className="flex justify-center mt-5">
                <button onClick={clearForm} className='bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] mr-5'>Clear</button>
                <button onClick={handleSubmit} className={`bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] ${isFormValid ? '' : 'opacity-50 cursor-not-allowed'}`} disabled={!isFormValid}>Submit</button>
            </div>
        </div>
    )
}


function PendingJobs() {
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


function ApprovedJobs() {
    return (
        <div style={{ width: '100%', display: 'flex', textAlign:'left'}}>
            <div style={{ width: '32.5%', margin: 0 }}>
                <div style={{ width: '100%', margin: 0, height: '50px' }}>
                    <div style={{ display: 'flex', width: '95%', height: '20px', margin: 0 }}>
                        <div className="meeting_container" style={{ width: '100%', display: 'flex' }}>
                            <div className="title" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <div className='flex'>
                                    <PiBriefcase size={25} className='text-white opacity-25'/>
                                    <p style={{ fontSize: 14 }}>Software Engineer</p>
                                </div>
                                <div className='flex'>
                                    <div><MdOutlineRemoveRedEye size={25} className='text-white opacity-25 cursor-pointer' /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: '67.5%', padding: '1em', borderLeft: '1px solid rgb(234, 113, 34, 0.25) ' }}>
                <div style={{ width: '100%' }}>
                    <div style={{ width: '100%', display: 'flex' }}>
                        <div style={{ width: '50%', color: '#fff', opacity: '0.25' }}>Job Title</div>
                        <div style={{ width: '5%', color: '#fff', opacity: '0.25' }}>-</div>
                        <div style={{ width: '45%', color: '#fff' }}>Software Engineer</div>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <div style={{ width: '100%', display: 'flex' }}>
                        <div style={{ width: '50%', color: '#fff', opacity: '0.25' }}>Required Experience (Years)</div>
                        <div style={{ width: '5%', color: '#fff', opacity: '0.25' }}>-</div>
                        <div style={{ width: '45%', color: '#fff' }}>01</div>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <div style={{ width: '100%', display: 'flex' }}>
                        <div style={{ width: '50%', color: '#fff', opacity: '0.25' }}>Required Skills</div>
                        <div style={{ width: '5%', color: '#fff', opacity: '0.25' }}>-</div>
                        <div style={{ width: '45%', color: '#fff' }}>Python</div>
                    </div>
                </div>

                <div style={{ width: '100%', textAlign: 'center', justifyContent: 'center', padding: '2em' }}>
                    A software engineer is a professional who designs, develops, and maintains software applications, systems, and programs. They possess expertise in programming languages, algorithms, and problem-solving techniques to create efficient and functional software solutions. Software engineers collaborate with cross-functional teams, including designers and product managers, to understand requirements and deliver high-quality software products. They are adept at debugging and troubleshooting issues, ensuring the smooth functioning of the software throughout its lifecycle. Continuous learning and staying updated with emerging technologies are integral aspects of a software engineer's role to adapt to the dynamic and evolving landscape of the tech industry.
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <Card title="Vacancies" value="04" />
                    <Card title="Selected Candidates" value="04" />
                    <Card title="Now Available Vacancies" value="00" />
                </div>

                <div style={{ display: 'flex', width: '100%', justifyContent: ' center', paddingBottom: '1rem' }}>
                    <div style={{ marginRight: '1em' }}>Expired Tag</div>
                    <div style={{marginRight: '1em'}}>-</div>

                    <div className='flex'>
                        <div className='flex' style={{ marginRight: '1em', }}>
                            <label for="on" style={{ marginRight: '0.5em' }}>ON</label>
                            <input type="radio" id="on" name="toggle" checked />
                        </div>

                        <div className='flex' style={{ marginRight: '1em' }}>
                            <label for="off" style={{ marginRight: '0.5em' }}>OFF</label>
                            <input type="radio" id="off" name="toggle" />
                        </div>
                    </div>

                </div>

                <div className='flex justify-center w-[100%] bg-red '>
                    <button className='bg-[#EA7122] w-[100px] h-[50px] rounded-[10px] mr-5'>Save</button>
                </div>

            </div>
        </div>
    )
}