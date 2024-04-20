import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

export default function RoleAssignment({ visible, onClose, user }) {
    const [formData, setFormData] = useState(() => {
        const storedFormData = localStorage.getItem('formData');
        return storedFormData ? JSON.parse(storedFormData) : { 
            role: '' 
        };
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                phone_number: user.phone_number,
                role: user.role,
                education: user.education,
                bio: user.bio,
                dob: user.dob,
                gender: user.gender,
                image: user.image,
            });
        }
    }, [user]);

    const handleRoleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/users/${user._id}`, formData);
            onClose();
            localStorage.removeItem('formData');
        } catch (error) {
            setError(error.message);
        }
    };
    
    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    if (!visible || !user) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
            <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[800px] w-[500px] border-orange-700 border-[1px]">
                <button
                    className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
                    onClick={onClose}
                >
                    <IoMdClose className="text-white hover:text-red-700" />
                </button>

                <div>
                    <div>
                        <h1>Select Role</h1>
                    </div>
                    <div className='flex justify-center border'>
                        <img src={user.image} alt='' className='w-[150px] h-[150px] rounded-full border-[2px]' />
                    </div>
                    <div>
                        <h1>{user.fname} {user.lname}</h1>
                        <label>{user.role}</label>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='text-left'>
                            <label>Select role</label>
                            <div>
                                <select
                                    name='role'
                                    className='lg:w-[150px] h-10 text-left rounded-lg bg-opacity-90 md:48 optional:bg-[#ffffff21]'
                                    value={formData.role || user.role}
                                    onChange={handleRoleChange}
                                >
                                    
                                    <option value='admin'>Admin</option>
                                    <option value='recruiter'>Recruiter</option>
                                    <option value='hiring manager'>Hiring Manager</option>
                                    <option value='interviewer'>Interviewer</option>
                                    <option value='candidate'>Candidate</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="px-4 py-2 font-bold text-white bg-orange-600 rounded hover:bg-orange-400">
                                Save
                            </button>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
