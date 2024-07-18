import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Images/Logo';
import Bgg from '../Images/Bgg';
import Userimg from '../Images/user.jpg'
import { IoArrowBackSharp } from "react-icons/io5";
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Forget() {
  const [setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone_number: '',
    role: 'candidate',
    education: 'null',
    bio: 'null',
    dob: '',
    gender: '',
    password: '',
    confirmPassword: '',
    image: Userimg
  });
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
      
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
        setData({ ...data, [name]: reader.result });
      };
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
    if (validateForm()) {
      try {
        const response = await axios.post('/register', data);
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setData({
            fname: '',
            lname: '',
            email: '',
            phone_number: '',
            password: '',
            confirmPassword: '',
            role: 'candidate',
            education: 'null',
            bio: 'null',
            dob: '',
            gender: '',
            image: Userimg
          });
          toast.success('Registration successful!');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('Registration failed. Please try again.');
      }
    }
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
    <div className='flex h-screen'>
      <div className='flex justify-center text-center bg-white md:w-3/12 sm:w-auto lg:w-5/12'>
        <div className='absolute items-center my-48 text-center'>
          <Logo className='' />
        </div>
        <div className='opacity-20 blur'>
          <Bgg />
        </div>
      </div>
      
      <div className='flex h-12 mx-6 my-6 text-left'>
        <Link to='/' className='text-4xl text-white opacity-40'><IoArrowBackSharp /></Link>
      </div>

      <section className='flex items-center justify-center md:w-screen lg:w-screen'>
        <div className='px-4 lg:w-[610px] md:px-12 lg:px-1 md:w-[500px]'>
          <div className=''>
            <form onSubmit={registerUser} className=''>
              <div className='py-2'>
                <h1 className='text-5xl'>Sign up as a candidate</h1>
              </div>
              <div className='pb-4 text-left opacity-30'>
                <h1 className='text-2xl'>It's quick and easy</h1>
              </div>
              <div className='mb-5 opacity-30'>
                <hr className=''></hr>
              </div>
              
              <div>
                <div className='md:justify-between lg:flex md:flex lg:justify-center sm:block md:w-96 lg:justify-between lg:w-full'>
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
                
                <div>
                  <div className='text-left'>
                    <label>Date Of Birth</label>
                  </div>
                  <div className='relative my-2'>
                    <input 
                      type='date'
                      className={`lg:w-full h-10 px-5 rounded-lg bg-[white] bg-opacity-10 ${errors.dob ? 'border-2 border-red-500' : ''}`}
                      value={data.dob}
                      onChange={handleChange}
                      name='dob'
                    />
                    {errors.dob && (
                      <span className="absolute top-0 text-lg text-red-500 right-2">*</span>
                    )}
                  </div>
                </div>

                <div>
                  <div className='text-left'>
                    <label>Gender</label>
                  </div>
                  <div className='relative my-2'>
                    <select 
                      name='gender'
                      className={`lg:w-full h-10 px-5 rounded-lg bg-[white] bg-opacity-10 ${errors.gender ? 'border-2 border-red-500' : ''}`}
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
              
              <div className='pt-10'>
                <button type='submit' className='w-full h-12 px-12 bg-orange-600 rounded-2xl md:w-auto'>SIGN UP</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Forget;