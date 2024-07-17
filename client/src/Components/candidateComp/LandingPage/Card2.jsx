import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Card2 = (props) => {


  const [localAnouncementData, setLocalAnouncementData] = useState([]);
  const [filteredAnnouncementCount, setFilteredAnnouncementCount] = useState(0);

  const fetchData = async () => {
    try {
      const [statusResponse, announcementResponse] = await Promise.all([
        axios.get('/status/getstatus'),
        axios.get('/announcement/getannouncement')
      ]);

      window.localStorage.setItem('statusData', JSON.stringify(statusResponse.data));
      window.localStorage.setItem('announcementData', JSON.stringify(announcementResponse.data));

      setLocalAnouncementData(announcementResponse.data);

    } catch (error) {
      console.error('Error fetching data :', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const localReadAnnouncementData = JSON.parse(window.localStorage.getItem('readAnnouncements')) || [];
    const filteredInterviews = localAnouncementData.filter((interview) => 
      !localReadAnnouncementData.includes(interview._id)
    );
    setFilteredAnnouncementCount(filteredInterviews.length);
  }, [localAnouncementData]);


  return (
    <div className="[perspective:2000px]">
    <div 
       style={{ width: props.w ? `${props.w}px` : '200px', height: props.h ? `${props.h}px` : '200px' }}
       className={`hover:[transform:rotateY(15deg)_rotateX(5deg)] rounded-[15px] [box-shadow:0_10px_20px_rgba(0,_0,_0,_0.3),_0_6px_6px_rgba(0,_0,_0,_0.23)] [transition:transform_0.3s_ease-in-out] [transform:rotateY(0deg)] bg-[linear-gradient(to_top,_#100c08_0%,_#2B2B2B_100%)] 320px:rounded-[5px] 500px:rounded-[15px] sm:rounded-[30px] flex justify-center items-center`}
     >

       <div className="txt mx-auto my-0 text-center">
         <p className='text-lg text-white text-center  font-bold '>New<br/>Announcements</p>
         <h1 className='text-6xl text-[#EA7122] mt-3 text-center font-bold '>{filteredAnnouncementCount}</h1>
       </div>
     </div>
   </div>
  )
}

export default Card2