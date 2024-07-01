import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/hiringManagerCompo/Navbar.jsx';
import axios from 'axios';
import Topbar from '../../Components/hiringManagerCompo/Topbar.jsx';
import CardEsm from '../../Components/hiringManagerCompo/CardEsm.jsx';
import BarChart from '../../Components/hiringManagerCompo/BarCharts.jsx'
import TimelineToHire from '../../Components/hiringManagerCompo/TimelineToHire.jsx';
import PiechartWithIcon from '../../Components/hiringManagerCompo/PiechartWithIcon.jsx';
import { FaCheckCircle } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
import HiringmanagerNav from '../../Components/hiringManagerCompo/HiringManagerNav';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export default function Dashboard() {
  const [jobPostings, setJobPostings] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDetails, setshowDetails] = useState(false);
  const [source, setSource] = useState({
    allhiredcount: 0,
    hiredcountbyposition: 0,
    facedcountbyposition: 0,
    totalsubmittedapplications: 0,
    submittedapplicationsbyposition: 0,
    totalacceptedapplications: 0,
    acceptedapplicationsbyposition: 0,
    salary: 0,
    vacancies: 0,
    createdAt: null,
    updatedAt: null,
    requiredExperience: 0
  });

  const getApprovedJobs = async () => {
    try {
      const response = await axios.get('/reporting/getallapprovedjobpostingsid');
      setJobPostings(response.data);
    } catch (error) {
      console.log('Error fetching approved job postings:', error);
    }
  };

  const getAllHiredCount = async () => {
    try {
      const response = await axios.get('/reporting/getallhiredcount');
      setSource(prevState => ({ ...prevState, allhiredcount: response.data.hiredcount }));
    } catch (error) {
      console.log('Error fetching hired count:', error);
    }
  };

  const getHiredCountByPosition = async (jobId) => {
    try {
      const response = await axios.get(`/reporting/gethiredcountbyposition/${jobId}`);
      setSource(prevState => ({ ...prevState, hiredcountbyposition: response.data.count }));
    } catch (error) {
      console.log('Error fetching hired count by position:', error);
    }
  };

  const getTotalEvaluationsCountByPosition = async (jobId) => {
    try {
      const response = await axios.get(`/reporting/gettotalevaluationscountbyposition/${jobId}`);
      setSource(prevState => ({ ...prevState, facedcountbyposition: response.data.count }));
    } catch (error) {
      console.log('Error fetching faced count by position:', error);
    }
  };

  const getAllApplicationCount = async () => {
    try {
      const response = await axios.get('/reporting/getallapplicationcount');
      setSource(prevState => ({ ...prevState, totalsubmittedapplications: response.data.total }));
    } catch (error) {
      console.log('Error fetching all application count:', error);
    }
  };

  const getAllApplicationCountByJobId = async (jobId) => {
    try {
      const response = await axios.get(`/reporting/getallapplicationcountbyjobid/${jobId}`);
      setSource(prevState => ({ ...prevState, submittedapplicationsbyposition: response.data.count }));
    } catch (error) {
      console.log('Error fetching submitted applications by position:', error);
    }
  };

  const getAllAcceptedApplicationCount = async () => {
    try {
      const response = await axios.get('/reporting/getallacceptedapplicationcount');
      setSource(prevState => ({ ...prevState, totalacceptedapplications: response.data.total }));
    } catch (error) {
      console.log('Error fetching all accepted application count:', error);
    }
  };

  const getTotalAcceptedApplicationsByPosition = async (jobId) => {
    try {
      const response = await axios.get(`/reporting/gettotalacceptedapplicationsbyposition/${jobId}`);
      setSource(prevState => ({ ...prevState, acceptedapplicationsbyposition: response.data.count }));
    } catch (error) {
      console.log('Error fetching accepted applications by position:', error);
    }
  };

  const getJobDetails = async (jobId) => {
    try {
      const response = await axios.get(`/reporting/getjobdetails/${jobId}`);
      setSource(prevState => ({
        ...prevState,
        salary: response.data.salary,
        vacancies: response.data.vacancies,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
        requiredExperience: response.data.requiredExperience
      }));
    } catch (error) {
      console.log('Error fetching job details:', error);
    }
  };

  useEffect(() => {
    getApprovedJobs();
    getAllHiredCount();
    getAllApplicationCount();
    getAllAcceptedApplicationCount();
  }, []);

  useEffect(() => {
    console.log('Approved job postings:', jobPostings);
  }, [jobPostings]);

  useEffect(() => {
    console.log('Selected job:', selectedJob);
    if (selectedJob) {
      getHiredCountByPosition(selectedJob._id);
      getTotalEvaluationsCountByPosition(selectedJob._id);
      getAllApplicationCountByJobId(selectedJob._id);
      getJobDetails(selectedJob._id);
      getTotalAcceptedApplicationsByPosition(selectedJob._id);
    }
  }, [selectedJob]);

  useEffect(() => {
    console.log('Source:', source);
  }, [source]);

  return (
    <div className='flex w-screen '>
      <div className='fixed'>
        <HiringmanagerNav />
      </div>
      <div className='w-screen lg:ml-[320px] md:ml-72 ml-[260px] overscroll-x-none'>
        <Topbar title='Reporting' />
        <div className='content text-white flex flex-row p-[0px] bg-[#2b2b2b] m-[30px] h-fit rounded-[30px] 320px:text-[0.5rem] 450px:text-[0.8rem] sm:text-[0.9rem] 900px:text-[1.1rem] 1010px:text-[1.2rem] '>
          <div className='flex flex-col bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px] sm:w-auto 450px:w-[165px] 500px:w-[175px] lg:w-[250px] esm:w-[140px] sm:pl-[0px] sm:pr-[0px]'>
            <p className='text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] sm:pb-[25px] font-general-sans pt-[0px]'> Position </p>
            <div className='flex flex-col overflow-scroll h-[75vh] overflow-x-hidden '>
              {jobPostings.map((job, index) => (
                <button key={index}
                  onClick={() => {setSelectedJob(job); setshowDetails(true);}}
                  className='hover:scale-105 p-[10px] text-center text-[0.7rem] lg:text-[1rem] md:text-[0.9rem] 320px:text-[0.5rem] border-[1px] border-[solid] border-[grey] hover:bg-[#2b2b2b] m-[10px] my-[5px] items-center rounded-[30px] '>
                  <p>{job.jobTitle}</p>
                </button>
              ))}
            </div>
          </div>
          {showDetails ? (
          <div className='description flex flex-col w-full pt-[20px] box-border mb-[20px] h-[85vh] overflow-y-scroll '>
            <div className='details flex flex-row justify-around pb-[20px] '>
              <CardEsm name="Hired" val={source.hiredcountbyposition} numSize={'0.8rem'} />
              <CardEsm name="Approved Applications" val={source.acceptedapplicationsbyposition} numSize='20px' />
              <CardEsm name="Current Vacancies" val={source.vacancies - source.hiredcountbyposition} numSize='20px' />
            </div>
            <p className='bg-[#242424] pl-[20px] pt-[10px] pb-[10px] rounded-[20px]'>Recruitment Funnel</p>
            <div>
              <BarChart vacancies={source.vacancies} hired={source.hiredcountbyposition} faced={source.facedcountbyposition} accepted={source.acceptedapplicationsbyposition} totalapp={source.submittedapplicationsbyposition} />
            </div>
            <p className='bg-[#242424] pl-[20px] pt-[10px] pb-[10px] rounded-[20px]'>Job Post Details</p>
            <div className='m-auto mt-[40px] mb-[40px]'>
              {/* <TimelineToHire day1='7' day2='5' day3='10' day4='3' day5='8'></TimelineToHire> */}
              <table className='text-left '>
                <tbody>
                  <tr>
                    <th className='pr-[40px]'><span className='text-[#EA7122] mr-[5px] text-[20px]'>&#9679;</span>Salary</th>
                    <td>{source.salary}$</td>
                  </tr>
                  <tr>
                    <th className='pr-[40px]'><span className='text-[#EA7122] mr-[5px] text-[20px]'>&#9679;</span>Required experience</th>
                    <td>{source.requiredExperience} years</td>
                  </tr>
                  <tr>
                    <th className='pr-[40px]'><span className='text-[#EA7122] mr-[5px] text-[20px]'>&#9679;</span>Created Vacancies</th>
                    <td>{source.vacancies}</td>
                  </tr>
                  <tr>
                    <th className='pr-[40px]'><span className='text-[#EA7122] mr-[5px] text-[20px]'>&#9679;</span>Created at</th>
                    <td>{formatDate(source.createdAt)}</td>
                  </tr>
                  <tr>
                    <th className='pr-[40px]'><span className='text-[#EA7122] mr-[5px] text-[20px]'>&#9679;</span>Updated at</th>
                    <td>{formatDate(source.updatedAt)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className='bg-[#242424] pl-[20px] pt-[10px] pb-[10px] rounded-[20px]'>Application Rate Metrics </p>
            <div className='flex flex-row items-center justify-around mt-[20px]'>
              <div className='flex flex-col'>
                <PiechartWithIcon value={(source.hiredcountbyposition / source.acceptedapplicationsbyposition) * 100} name='Hiring Rate' icon={AiTwotoneLike} />
                <p className='text-white m-auto'>Hiring Rate</p>
              </div>
              <div className='flex flex-col'>
                <PiechartWithIcon value={(source.acceptedapplicationsbyposition / source.submittedapplicationsbyposition) * 100} name='Accepted Rate' icon={FaCheckCircle} />
                <p className='text-white m-auto'>Accepted Rate</p>
              </div>
              <div className='flex flex-col'>
                <PiechartWithIcon value={(source.hiredcountbyposition / source.allhiredcount) * 100} name='Hiring Rate with other post' icon={FaPeopleGroup} />
                <p className='text-white m-auto'>Hiring Rate with other post</p>
              </div>
              <div className='flex flex-col'>
                <PiechartWithIcon value={(source.submittedapplicationsbyposition / source.totalsubmittedapplications) * 100} name='Apply Rate' icon={PiCertificateFill} />
                <p className='text-white m-auto'>Apply Rate</p>
              </div>
            </div>
          </div>
        ) : (<div className='m-auto overflow-auto'>
          <p className='text-[#a3a3a3] text-center text-[28px]'>Select a job to view details</p>
        </div>)}
        </div>
      </div>
    </div>
  );
}
