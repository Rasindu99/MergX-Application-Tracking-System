import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LOGOMERGEX from '../../Images/logo.png';
import BG from '../../Images/BG.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import Gangamina from '../../Images/Gangamina.jpg';
import Tharindu from '../../Images/Tharindu.JPG';
import Rasindu from '../../../src/Images/Rasindu.jpg';
import Pramudi from '../../Images/Pramudi.jpg';
import Piyushan from '../../Images/Piyushan.jpg';

export default function Landingpage() {
  const [data, setData] = useState({
    username:'',
    useremail:'',
    message:''
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const contactus = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/qanda/postqanda', data);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Message sent successfully!');
        setData({
          username: '',
          useremail: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };
  
  const features = [
    {
      title: "User Management",
      description: "Create, edit, and delete user accounts with role-based access control for recruiters, managers, and administrators."
    },
    {
      title: "Candidate Management",
      description: "Create and edit candidate profiles, upload resumes, assign status, and manage documents with automated notifications."
    },
    {
      title: "Job Posting and Management",
      description: "Post job openings, track status, archive filled positions, and implement job approval workflows for hiring managers."
    },
    {
      title: "Application Tracking",
      description: "Receive and manage applications, filter and search based on criteria, assign to recruiters, and track application sources."
    },
    {
      title: "Interview Scheduling",
      description: "Schedule interviews, send invitations and reminders, integrate with calendar tools, and collect feedback from interviewers."
    },
    {
      title: "Collaboration and Communication",
      description: "Internal messaging, email integration, notification center, and discussion threads on candidate profiles for team collaboration."
    }
  ];

  const teamMembers = [
    { name: "Gangamina", photo: Gangamina, role: "Group Leader", description: "214111K" },
    { name: "Tharindu", photo: Tharindu, role: "Group Member", description: "214061F" },
    { name: "Rasindu", photo: Rasindu, role: "Group Member", description: "214182C" },
    { name: "Pramudi", photo: Pramudi, role: "Group Member", description: "214115C" },
    { name: "Piyushan", photo: Piyushan, role: "Group Member", description: "214154T" }
  ];

  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="relative">
      {/* Fixed Background image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <nav className={`fixed top-0 left-0 right-0 flex items-center justify-between p-2 bg-white bg-opacity-90 transition-all duration-300 ${scrolled ? 'h-12' : 'h-20'}`}>
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: scrolled ? 0 : 1, x: scrolled ? -50 : 0 }}
            transition={{ duration: 0.3 }}
            className={`transition-all duration-300 ${scrolled ? 'w-0 overflow-hidden' : 'w-auto'}`}
          >
            <img src={LOGOMERGEX} alt='logo' className={`transition-all duration-300 ${scrolled ? 'w-0 h-0' : 'w-auto h-[100px]'}`} />
          </motion.div>
          <motion.div
            className='flex ml-auto space-x-4'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="#intro" className='text-[#19191A] cursor-pointer'>Intro</a>
            <a href="#features" className='text-[#19191A] cursor-pointer'>Features</a>
            <a href="#about" className='text-[#19191A] cursor-pointer'>About</a>
            <a href="#team" className='text-[#19191A] cursor-pointer'>Team</a>
            <a href="#contact" className='text-[#19191A] cursor-pointer'>Contact</a>
          </motion.div>
        </nav>

        {/* Introduction Section */}
        <section id="intro" className='flex items-center justify-center min-h-screen pt-20'>
          <motion.div className='flex items-center justify-center'>
            <motion.div
              className='text-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h1 className='mb-4 font-bold text-[#19191A] text-[150px]'>
                     Merge<span className="text-orange-500">X</span>
                </h1>
              <p className='mb-8 text-xl text-[#19191A] opacity-90'>Application Tracking System</p>
              <Link to='/login'>
              <motion.button
                className='px-6 py-2 text-lg text-white bg-orange-500 rounded'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Now
              </motion.button>
              </Link>
            </motion.div>
            <motion.div
              className='w-1/2'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={LOGOMERGEX} alt='logo' className='mx-auto w-[400px] h-[400px]' />
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className='py-20 overflow-hidden bg-white bg-opacity-80'>
          <div className='container px-4 mx-auto'>
            <h2 className='mb-8 text-3xl font-bold text-center text-orange-500'>Key Features</h2>
            <div className='relative w-full h-64'>
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentFeatureIndex}
                  className='absolute inset-0 flex items-center justify-center w-full'
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <div className='w-full px-4 text-center'>
                    <h3 className='mb-4 text-2xl font-semibold text-[#19191A]'>{features[currentFeatureIndex].title}</h3>
                    <p className='text-lg text-[#19191A] opacity-70'>{features[currentFeatureIndex].description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className='flex justify-center mt-8'>
              {features.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 ${index === currentFeatureIndex ? 'bg-orange-500' : 'bg-gray-300'}`}
                  animate={{ scale: index === currentFeatureIndex ? 1.2 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className='py-20 bg-[#19191A] bg-opacity-80'>
          <div className='container px-4 mx-auto'>
            <h2 className='mb-8 text-3xl font-bold text-center text-orange-500'>About MergeX</h2>
            <div className='flex items-center'>
              <motion.div
                className='w-full'
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className='text-lg text-white'>MergeX is an Applicant Tracking System where we can enhance the employee recruitment process of a company by automating and digitalizing the activities associated with candidates and their job applications.<br></br><span>
      In MergeX we are using the optical character recognition to track and analyze the candidate applications and provide a user-friendly environment for decision makers of the company to deal with job applicants.
</span></p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section id="team" className='py-20 bg-white bg-opacity-80'>
          <div className='container px-4 mx-auto'>
            <h2 className='mb-8 text-3xl font-bold text-center text-[#19191A]'>Our Team</h2>
            <div className='flex flex-wrap justify-around'>
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className='relative mb-4'
                  whileHover={{ scale: 1.1 }}
                >
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className='object-cover w-48 h-48 border-4 border-orange-500 rounded-full' 
                  />
                  <motion.div
                    className='absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 bg-black bg-opacity-75 rounded-full opacity-0'
                    whileHover={{ opacity: 1 }}
                  >
                    <p className='font-bold text-white'>{member.name}</p>
                    <p className='text-orange-500'>{member.role}</p>
                    <p className='px-2 text-sm text-center text-white'>{member.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className='pt-20 bg-[#19191A]'>
          <div className='container px-4 mx-auto'>
            <h2 className='mb-8 text-3xl font-bold text-center text-white'>Contact Us</h2>
            <form className='max-w-md mx-auto' onSubmit={contactus}>
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={handleChange}
                placeholder="Name"
                className='w-full p-2 mb-4 border rounded  bg-[white] bg-opacity-10'
                required
              />
              <input
                type="email"
                name="useremail"
                value={data.useremail}
                onChange={handleChange}
                placeholder="Email"
                className='w-full p-2 mb-4 border rounded  bg-[white] bg-opacity-10'
                required
              />
              <textarea
                name="message"
                value={data.message}
                onChange={handleChange}
                placeholder="Message"
                className='w-full p-2 mb-4 border rounded  bg-[white] bg-opacity-10'
                rows={4}
                required
              ></textarea>
              <motion.button
                type="submit"
                className='w-full px-6 py-2 text-white bg-orange-500 rounded'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send
              </motion.button>
            </form>
            <div className='pt-8 pb-2'>
              <h1 className='opacity-20'>MergeX</h1>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
}