import React, { useState, useEffect } from 'react'
import axios from 'axios';
import user from '../../Images/user.jpg'
import { toast } from 'react-hot-toast';

export default function CreateUserAccountForm() {
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone_number: '',
        role: '',
        education: '',
        bio: '',
        dob: '',
        gender: '',
        password: '',
        confirmPassword: '',
        image: ''
    });

    const [createUserAccount, setCreateUserAccount] = useState(false);

    useEffect(() => {
        const fetchCreateUserAccount = async () => {
            try {
                const response = await axios.get('/access/getcreateuseraccount');
                setCreateUserAccount(response.data.create_user_account);
            } catch (error) {
                console.error('Error fetching create user account state:', error);
                toast.error('Failed to fetch user account creation state');
            }
        };

        fetchCreateUserAccount();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
                setData({ ...data, [name]: reader.result });
            }
        } else if (name === 'phone_number') {
            // Only allow numbers for phone number
            const numbersOnly = value.replace(/[^0-9]/g, '');
            setData({ ...data, [name]: numbersOnly });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!data.fname.trim()) {
            newErrors.fname = "First name is required";
            toast.error("First name is required");
            isValid = false;
        }

        if (!data.lname.trim()) {
            newErrors.lname = "Last name is required";
            toast.error("Last name is required");
            isValid = false;
        }

        if (!data.email.trim()) {
            newErrors.email = "Email is required";
            toast.error("Email is required");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = "Email is invalid";
            toast.error("Email is invalid");
            isValid = false;
        }

        if (!data.phone_number.trim()) {
            newErrors.phone_number = "Phone number is required";
            toast.error("Phone number is required");
            isValid = false;
        } else if (data.phone_number.length !== 10) {
            newErrors.phone_number = "Phone number must be 10 digits";
            toast.error("Phone number must be 10 digits");
            isValid = false;
        }

        if (!data.password) {
            newErrors.password = "Password is required";
            toast.error("Password is required");
            isValid = false;
        } else if (data.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            toast.error("Password must be at least 6 characters");
            isValid = false;
        }

        if (data.password !== data.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            toast.error("Passwords do not match");
            isValid = false;
        }

        if (!data.role) {
            newErrors.role = "Role is required";
            toast.error("Role is required");
            isValid = false;
        }

        if (!data.dob) {
            newErrors.dob = "Date of birth is required";
            toast.error("Date of birth is required");
            isValid = false;
        }

        if (!data.gender) {
            newErrors.gender = "Gender is required";
            toast.error("Gender is required");
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const registerUser = async (e) => {
        e.preventDefault();

        if (!createUserAccount) {
            toast.error('Admin blocked temporarily');
            return;
        }

        if (validateForm()) {
            try {
                const response = await axios.post('/register', data);
                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    clearFields();
                    toast.success('Registration successful!');
                }
            } catch (error) {
                console.error('Error registering user:', error);
                toast.error('Registration failed. Please try again.');
            }
        }
    };

    const clearFields = () => {
        setData({
            fname: '',
            lname: '',
            email: '',
            phone_number: '',
            role: '',
            education: '',
            bio: '',
            dob: '',
            gender: '',
            password: '',
            confirmPassword: '',
            image: ''
        });
        setImage(null);
        setErrors({});
    };

    const renderInput = (name, placeholder, type = 'text') => (
        <div className="relative">
            <input
                className={`lg:w-full h-10 px-5 rounded-lg bg-[white] bg-opacity-10 ${errors[name] ? 'border-2 border-red-500' : ''}`}
                placeholder={placeholder}
                value={data[name]}
                onChange={handleChange}
                name={name}
                type={type}
            />
            {errors[name] && (
                <span className="absolute top-0 text-lg text-red-500 right-2">*</span>
            )}
        </div>
    );

    return (
        <div>
            <form onSubmit={registerUser}>
                <div className='mx-[70px] bg-gradient-to-b from-[#272727] to-[#17171A] rounded-[30px] pt-12'>
                    <div className='flex justify-center'>
                        <div>
                            <div className='pt-8 pb-12'>
                                <div className='px-4 lg:w-[610px] md:px-12 lg:px-1 md:w-[500px]'>
                                    <div className=''>
                                        <div>
                                            <div className='md:justify-between lg:flex md:flex sm:block md:w-96 lg:justify-between lg:w-full'>
                                                <div className="w-full mr-2">
                                                    {renderInput('fname', 'First name')}
                                                </div>
                                                <div className='w-full ml-2'>
                                                    {renderInput('lname', 'Last name')}
                                                </div>
                                            </div>
                                            <div className='my-5'>
                                                {renderInput('email', 'Email', 'email')}
                                            </div>
                                            <div className='my-5'>
                                                {renderInput('phone_number', 'Contact Number', 'tel')}
                                            </div>
                                            <div className='my-5'>
                                                {renderInput('password', 'New Password', 'password')}
                                            </div>
                                            <div className='my-5'>
                                                {renderInput('confirmPassword', 'Re-Enter Password', 'password')}
                                            </div>
                                            <div className='my-5'>
                                                {renderInput('education', 'Education details')}
                                            </div>
                                            <div className='my-5'>
                                                {renderInput('bio', 'User details(Bio)')}
                                            </div>

                                            <div className='flex justify-between'>
                                                <div className='w-1/3 pr-2 text-left'>
                                                    <label>Select role</label>
                                                    <div className="relative">
                                                        <select name='role' 
                                                            className={`w-full h-10 px-5 text-left rounded-lg bg-[white] bg-opacity-10 ${errors.role ? 'border-2 border-red-500' : ''}`}
                                                            value={data.role}
                                                            onChange={handleChange}
                                                        >
                                                            <option value='' className='text-white bg-black bg-opacity-90'>-select-</option>
                                                            <option value='admin' className='text-white bg-black bg-opacity-90'>Admin</option>
                                                            <option value='recruiter' className='text-white bg-black bg-opacity-90'>Recruiter</option>
                                                            <option value='hiring manager' className='text-white bg-black bg-opacity-90'>Hiring Manager</option>
                                                            <option value='interviewer' className='text-white bg-black bg-opacity-90'>Interviewer</option>
                                                            <option value='candidate' className='text-white bg-black bg-opacity-90'>Candidate</option>
                                                        </select>
                                                        {errors.role && (
                                                            <span className="absolute top-0 text-lg text-red-500 right-2">*</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className='w-1/3 px-2 text-left'>
                                                    <label>Date Of Birth</label>
                                                    <div className="relative">
                                                        <input type='date' 
                                                            className={`w-full h-10 px-5 rounded-lg bg-[white] bg-opacity-10 ${errors.dob ? 'border-2 border-red-500' : ''}`}
                                                            value={data.dob}
                                                            onChange={handleChange}
                                                            name='dob'
                                                        />
                                                        {errors.dob && (
                                                            <span className="absolute top-0 text-lg text-red-500 right-2">*</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className='w-1/3 pl-2 text-left'>
                                                    <label>Gender</label>
                                                    <div className="relative">
                                                        <select name='gender' 
                                                            className={`w-full h-10 px-5 text-left rounded-lg bg-[white] bg-opacity-10 ${errors.gender ? 'border-2 border-red-500' : ''}`}
                                                            value={data.gender}
                                                            onChange={handleChange}
                                                        >
                                                            <option value='' className='text-white bg-black bg-opacity-90'>-select-</option>
                                                            <option value='male' className='text-white bg-black bg-opacity-90'>Male</option>
                                                            <option value='female' className='text-white bg-black bg-opacity-90'>Female</option>
                                                            <option value='other' className='text-white bg-black bg-opacity-90'>Other</option>
                                                        </select>
                                                        {errors.gender && (
                                                            <span className="absolute top-0 text-lg text-red-500 right-2">*</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-[40px]'></div>

                        <div className='w-[500px] justify-center items-center h-fit'>
                            <div className='flex justify-center'>
                                {image ? (
                                    <div className="">
                                        <img src={image} alt="Uploaded" className="rounded-full w-[400px] h-[400px]" />
                                    </div>
                                ) : (
                                    <img src={user} alt='user' className="rounded-full w-[400px] h-[400px]" />
                                )}
                            </div>

                            <div className='flex justify-center pt-3'>
                                <div className='pt-2'>
                                    <input
                                        accept='image/*'
                                        type='file'
                                        name='image'
                                        className='rounded-lg h-10 w-[200px] pl-3 pr-3 text-white'
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='h-fit pt-4 mx-[110px] pb-9'>
                            <div>
                                <button type='button' className='w-full h-12 px-12 bg-[#272727] hover:bg-[#333333] rounded-2xl md:w-auto' onClick={clearFields}>Clear</button>
                            </div>
                            <div className='pt-4'>
                                <button type='submit' className='w-full h-12 px-12 bg-orange-600 hover:bg-orange-500 rounded-2xl md:w-auto'>Create Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}