import React from 'react';
import { PiBriefcase } from 'react-icons/pi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import Card from './Card';

export default function ApprovedJobs() {
    // Component logic remains the same
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

                <div style={{ display: 'flex', width: '100%', justifyContent: ' center', paddingBottom: '1rem', paddingTop:'1rem' }}>
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
