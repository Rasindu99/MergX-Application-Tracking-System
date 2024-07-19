import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';

export default function CardS(props) {
  const [upcommingInterviews, setUpcommingInterviews] = useState([]);
  const [filteredUpcommingInterviews, setFilteredUpcommingInterviews] = useState(0);
  const {user} = useContext(UserContext);

  const fetchData = async () => {
    try {
      const response = await axios.get('/cv/getapprovedapplication');
      setUpcommingInterviews(response.data);
      
      const filteredData = upcommingInterviews.filter(item => user._id == item.user_id);
      setFilteredUpcommingInterviews(filteredData.length);
    } catch (error) {
      console.error('Error fetching data :', error);
    }
  };

  //
  useEffect(() => {
    fetchData();
  }, []);

  

  return (
    <div className="[perspective:2000px]">
    <div 
       style={{ width: props.w ? `${props.w}px` : '200px', height: props.h ? `${props.h}px` : '200px' }}
       className={`hover:[transform:rotateY(15deg)_rotateX(5deg)] rounded-[15px] [box-shadow:0_10px_20px_rgba(0,_0,_0,_0.3),_0_6px_6px_rgba(0,_0,_0,_0.23)] [transition:transform_0.3s_ease-in-out] [transform:rotateY(0deg)] bg-[linear-gradient(to_top,_#100c08_0%,_#2B2B2B_100%)] 320px:rounded-[5px] 500px:rounded-[15px] sm:rounded-[30px] flex justify-center items-center`}
     >

       <div className="txt mx-auto my-0 text-center">
         <p className='text-lg text-white text-center font-bold'>Upcomming<br/>Interviews</p>
         <h1 className='text-6xl text-[#EA7122] mt-3 text-center font-bold '>{filteredUpcommingInterviews}</h1>
       </div>
     </div>
   </div>
  )
}
