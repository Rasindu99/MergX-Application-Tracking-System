import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import ViewJobButton from '../../Components/interviewercomp/ViewJobButton';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import ScheduledInterviews from '../../Components/interviewercomp/ScheduledInterviews';
import { MdOutlineClose } from "react-icons/md";
import AdminChatBotBottom from '../../Components/admincomp/AdminChatBotBottom';

export default function Scheduling() {

  const name = 'Interview Scheduling'; 
  const { user } = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const [interviewSchedules, setInterviewSchedules] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/getusers');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchInterviewSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:8000/schedule/getinterviewschedule'); 
      setInterviewSchedules(response.data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  useEffect(() => {

    fetchUsers();
    fetchInterviewSchedules(); 

  }, []);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });

  const selectedDateSchedules = interviewSchedules.filter(schedule =>
    new Date(schedule.date).toLocaleDateString() === date.toLocaleDateString()
    && (schedule.primary_interviewer === user._id || schedule.second_interviewer === user._id)
  );

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [formData, setFormData] = useState({
    jobId: 'null',
    jobtitle: 'null',
    primary_interviewer: user._id,
    date: date.toISOString(),
    startTime: '',
    endTime: '',
    meetingLink: '',
    password: '',
    subject: '',
    second_interviewer: '',
    experience: '',
    skills: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      date: date.toISOString(),
      startTime: '',
      endTime: '',
      meetingLink: '',
      password: '',
      subject: '',
      experience: '',
      skills: '',
      description: ''
    });
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!'
      });
  
      if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:8000/schedule/deleteinterviewschedule/${id}`);
        if (response.status === 200) {
          setInterviewSchedules(interviewSchedules.filter(schedule => schedule._id !== id));
          await Swal.fire({
            title: 'Deleted!',
            text: 'Interview Schedule deleted successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          fetchInterviewSchedules();
        } else {
          console.error('Failed to delete interview schedule');
          await Swal.fire({
            title: 'Error!',
            text: 'Failed to delete interview schedule',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        await Swal.fire({
          title: 'Cancelled',
          text: 'Your interview schedule is safe',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error deleting interview schedule:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'An error occurred while deleting the interview schedule',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('http://localhost:8000/schedule/interviewschedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobId: formData.jobId,
          jobtitle: formData.jobtitle,
          primary_interviewer: formData.primary_interviewer,
          date: date.toISOString(),
          start_time: formData.startTime,
          end_time: formData.endTime,
          subject: formData.subject,
          second_interviewer: formData.second_interviewer || null,
          link: formData.meetingLink,
          password: formData.password,
          experience: formData.experience,
          skills: formData.skills.split(',').map(skill => skill.trim()),
          description: formData.description
        })
      });

      if (response.ok) {
        const newInterview = await response.json();
        console.log('Interview Schedule created successfully', newInterview);
        await Swal.fire({
          title: 'Success!',
          text: 'Interview Schedule created successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        handleClear();
        fetchInterviewSchedules();
        togglePopup();
      } else {
        console.error('Failed to create interview schedule');
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to create interview schedule',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const response = await axios.put(`http://localhost:8000/schedule/updateinterviewschedule/${id}`, {
        date: new Date(formData.date).toISOString(),
        start_time: formData.startTime,
        end_time: formData.endTime,
        subject: formData.subject,
        assign: formData.assign,
        link: formData.meetingLink,
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        const updatedSchedule = response.data.interviewschedule;
        setInterviewSchedules(interviewSchedules.map(schedule => schedule._id === id ? updatedSchedule : schedule));
        await Swal.fire({
          title: 'Updated!',
          text: 'Interview Schedule updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        fetchInterviewSchedules();
      } else {
        console.error('Failed to update interview schedule');
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to update interview schedule',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error updating interview schedule:', error);
    }
  };
  
  const tileClassName = ({ date }) => {
    const formattedDate = date.toLocaleDateString();
    const today = new Date().toLocaleDateString();

    return formattedDate !== today && 
      interviewSchedules.filter(schedule =>
      schedule.primary_interviewer === user._id || schedule.second_interviewer === user._id).some(schedule => 
      new Date(schedule.date).toLocaleDateString() === formattedDate
    ) ? 'react-calendar__tile--has-interviews' : null;
  };

  return (
    <>
      <div className='flex'>
          <div>
            <InterviewNav/>
          </div>
          <div>
            <Description name={name} />
          </div>

          <div id='background' className="z-0 grid grid-cols-3 mx-8 mt-24 w-80 h-80vh rounded-3xl">
            <div className='flex flex-col items-start col-span-1 px-5 py-10'>
              <div className='pl-5'>
                 <ViewJobButton/>
              </div>
              <div className='pl-5 mt-14'>
                <p className='mb-8 text-2xl text-left text-white text-opacity-50'>Calender</p>
                <Calendar
                  onChange={setDate}
                  value={date}
                  tileClassName={tileClassName}
                />
              </div>
            </div>
            <div className='col-span-2 px-5 py-10'>
              <div>
                <p className='text-3xl'>{formattedDate}</p>
                <div className='mt-10 overflow-y-auto h-[450px]'>
                {selectedDateSchedules.length > 0 ? (
                  selectedDateSchedules
                    .sort((a, b) => new Date(`1970-01-01T${a.start_time}Z`) - new Date(`1970-01-01T${b.start_time}Z`))
                    .map((schedule, index) => (
                      <ScheduledInterviews
                        key={index}
                        interviewTitle={schedule.subject}
                        interviewTime={`${schedule.start_time} - ${schedule.end_time}`}
                        onDelete={() => handleDelete(schedule._id)}
                        onUpdate={(id, formData) => handleUpdate(id, formData)}
                        interview={schedule}
                      />
                    ))
                ) : (
                  <p className='text-xl text-center'>No Scheduled Interviews</p>
                )}
                </div>
                <button className='h-[50px] bg-orange-500 rounded-xl w-[200px] text-2xl hover:bg-orange-700 mt-14'
                onClick={togglePopup}>
                  Schedule +
                </button>
              </div>
            </div>
          </div>
      </div>

      {showPopup && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-5 backdrop-blur'>
          <div className='bg-[#2B2B2BE5] opacity-90 relative w-[60rem] h-[46rem] border-2 border-[#EA712287] rounded-3xl px-5'>
            <MdOutlineClose size={25} className='absolute cursor-pointer top-5 right-5' onClick={togglePopup} />
            <p className='mt-5 text-3xl text-center bold'>{formattedDate}</p>
            <form className='p-8' onSubmit={handleSubmit}>
              <div className='flex items-center justify-between'>
               <label className='flex items-center gap-10 text-white'>
                  Start Time:
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className='block w-2/4 mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                  />
                </label>
                <label className='flex items-center gap-10 text-white'>
                  End Time:
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    className='block w-2/4 mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                  />
                </label>

              </div>
              <div className='grid items-center gap-4 mt-5'>
                <div className='flex items-center'>
                  <label className='flex items-center w-48 gap-10 text-white'>Meeting Link</label>
                  <input
                      type="url"
                      name="meetingLink"
                      value={formData.meetingLink}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='flex items-center w-48 gap-10 text-white'>Password</label>
                  <input
                      type="text"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='flex items-center w-48 gap-10 text-white'>Subject</label>
                  <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='flex items-center w-48 gap-10 text-white'>Interviewer</label>
                  <select 
                    type="text"
                    name="second_interviewer"
                    value={formData.second_interviewer}
                    onChange={handleChange}
                    className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'>
                      <option value="" disabled>Select Interviewer</option>
                    {users
                      .filter(users => users.role === 'interviewer' && users._id !== user._id)
                      .map(interviewer => (
                        <option key={interviewer._id} value={interviewer._id}>
                          {interviewer.fname}  {interviewer.lname}
                        </option>
                      ))}
                  </select>
                </div>
                <div className='flex items-center'>
                  <label className='flex items-center w-48 gap-10 text-white'>Expirience</label>
                  <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='flex items-center w-48 gap-10 text-white'>Skills</label>
                  <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='flex items-start w-48 gap-10 text-white'>Description</label>
                  <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl h-20 resize-none'
                    />
                </div>
                <div className='flex items-center justify-center gap-5 px-10 mt-5'>
                  <button type="button" onClick={handleClear} className='w-44 h-12 rounded-full bg-[#EA712229]'>Clear</button>
                  <button type="submit" className='bg-[#EA7122] w-44 h-12 rounded-full'>Schedule</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        )
      }
       {/* Move AdminChatBotBottom here and wrap it in a positioned div */}
       <div className="absolute bottom-0 right-0 z-50">
        <AdminChatBotBottom/>
      </div>
    </>
  );
}