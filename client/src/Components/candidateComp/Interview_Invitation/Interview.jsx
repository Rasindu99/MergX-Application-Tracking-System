import { Reacte, useState } from 'react'
import { useInterviewContext } from '../../../Context/InterviewContext';
import { RiDeleteBin5Fill } from "react-icons/ri";


const Interview = ({ interview, isRead }) => {

  const {
    interviews,
    setInterviews,
    deletedInterviews,
    setDeletedInterviews,
    searchedInterview,
    setSearchedInterview,
    search,
    readInterviews,
    setReadInterviews,
    triggerUpdate
  } = useInterviewContext();

  const [detailsVisible, setDetailsVisible] = useState(false);

  // const toggleDetails = () => {
  //   setDetailsVisible(!detailsVisible);
  // };

  const handleDelete = (interview) => {
    const newDeletedInterview = [...deletedInterviews, interview._id];
    setDeletedInterviews(newDeletedInterview);


    const updatedInterviews = interviews.filter((item) => item._id !== interview._id);
    setInterviews(updatedInterviews);

    if (search) {
      const updatedSearchResults = searchedInterview.filter((item) => item._id !== interview._id);
      setSearchedInterview(updatedSearchResults);
    }
    console.log('item deleted');
    console.log(interview);
  }

  const handleRead = (interview) => {
    setDetailsVisible(!detailsVisible);
    if (detailsVisible) {
      setReadInterviews([...readInterviews, interview._id]);
    } else {
      if (!readInterviews.includes(interview._id)) {
        
        setReadInterviews(readInterviews.filter((id) => id !== interview._id));
      }
      console.log('item read', interview);
    }
  }

  const date = new Date(interview.createdAt);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  const formattedDate = date.toLocaleString(undefined, options).replace('at', '/');

  return (
    <div className={`interview-row transition-transform	ease-in-out duration-200 transform hover:scale-105 hover:opacity-80 p-4 ${isRead ? 'bg-neutral-800' : 'bg-neutral-700'}`} key={interview._id}  >
      <div className="summary flex justify-around items-center">
        <span className='w-2/5'>{interview.subject}</span>
        <span className='w-2/5'>{formattedDate}</span>
        <div className='flex justify-around w-1/5 z-10'>
          <button className=" bg-blue-500 text-white py-1 px-2 mr-3 rounded z-10" onClick={() => handleRead(interview)}> {detailsVisible ? 'View Less' : 'view More'}</button>
          <button onClick={() => handleDelete(interview)} className='w-9 h-9 z-10 border-0 border-y-cyan-950 bg-orange-700 rounded-full cursor-pointer'>
            <RiDeleteBin5Fill className='w-6 h-6 m-auto' />
          </button>
        </div>

      </div>
      {detailsVisible && (
        <div className="details mt-4">
          <p>Interview Date: 2024-06-20</p>
          <p>Position: Software Engineer</p>
          <p>Location: Remote</p>
          <a href="#" className="text-blue-500 underline">Full Details</a>
        </div>
      )}
    </div>
  )
}

export default Interview
