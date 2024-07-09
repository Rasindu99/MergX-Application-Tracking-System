import React, { useContext,useState,useEffect} from 'react';

import { UserContext } from '../../Context/UserContext';
import AdminNav from '../../Components/admincomp/AdminNav';
import Greatings from '../../Components/Greatings';
import Adminheadrightbar from '../../Components/admincomp/Adminheadrightbar';
import CardL from '../../Components/hiringManagerCompo/CardL';
import CardS from '../../Components/hiringManagerCompo/CardS';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';


function Admindash(resreq) {
  const { user } = useContext(UserContext); // Destructure user from context
  const [carddetails,setCardDetails] = useState({
    vacancies:0,
    hired:0,
    admins:0,
    interviwers:0,
    candidates:0,
    recruiters:0,
    hiringmanagers:0,
    newmessages:0,

});
const [searchTerm, setSearchTerm] = useState('');
const [filteredUsers, setFilteredUsers] = useState([]);
const [userDetails,setuserDetails] = useState([]);


const getUserDetails = async ()=>{
  try{
    const response = await axios.get('/dashboard/getuserdetails');
    setuserDetails(response.data.userdetails);
  }catch(err){
    console.log(err);
  }

}

const getadmincount = async ()=>{
  try{
      const response = await axios.get('/dashboard/getadmincount');
      setCardDetails((prevState)=>({
        ...prevState,
        admins:response.data.admincount
      }));
  }catch(err){
    console.log(err);
  }

}

const getrecruitercount=async (req,res)=>{

  try{
    const resposne = await axios.get('/dashboard/getrecruitercount');
    setCardDetails((prevState)=>({
      ...prevState,
      recruiters:resposne.data.recruitercount
    }));
  }
  catch(err){
     console.log(err);
  }

}

const gethiringmanagercount = async ()=>{
  const response = await axios.get('/dashboard/gethiringmanagers');
  setCardDetails((prevState)=>({
    ...prevState,
    hiringmanagers:response.data.hiringmanagercount
  }));
}
 const getinterviewercount = async ()=>{
  try{
    const response = await axios.get('/dashboard/getinterviewercount');
    setCardDetails((prevState)=>({
      ...prevState,
      interviwers:response.data.interviewercount
    }));  

  }catch(errr){
    console.log(errr);
  }
 }

 const getcandidatecount=async ()=>{
  try{
    const response = await axios.get('/dashboard/getcandidatecount');
    setCardDetails((prevState)=>({
      ...prevState,
      candidates:response.data.candidatecount
    }));

  }catch(err){
    console.log(err);
  }
 }
  
 const gethired = async ()=>{
  try{
      const response = await axios.get('/reporting/getallhiredcount');
      setCardDetails((prevState)=>({
        ...prevState,
        hired:response.data.hiredcount
      }));  
  }catch(err){
    console.log(err); 
  }
 }

 const gettotalvacancies = async ()=>{
  try{
    const response= await axios.get('/dashboard/totalvacancies');
    setCardDetails((prevState)=>({
      ...prevState,
      vacancies:response.data.totalVacancies
    }));  
  }catch(err){
    console.log(err);
  }

 }
useEffect(()=>{
  getUserDetails();
  getadmincount();
  getrecruitercount();
  gethiringmanagercount();
  getinterviewercount();
  getcandidatecount();
  gettotalvacancies();
  gethired();

},[]);

useEffect(() => {
  const matchedByFname = userDetails.filter(user =>
    user.fname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const matchedByLname = userDetails.filter(user =>
    user.lname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setFilteredUsers(
    matchedByFname.length > 0 ? matchedByFname : matchedByLname
  );
}, [searchTerm, userDetails]);

  return (
    <div>
      <div className='flex'>
        <div className=''>
          <AdminNav/>
        </div>

        <div className='w-screen '>
          
          {/* Check if user exists before accessing its properties */}
          {!!user && (
            <div className='flex justify-between pt-8 pb-8 pl-5'>
              <div className='flex'><Greatings/><h1 className='text-3xl'>, {user.fname}</h1></div>
              <div className='mr-5'> <Adminheadrightbar/></div>
              
            </div>
          )}
          {/* If user doesn't exist, you may want to display a message */}
          {/* {!user && <h1>No user found</h1>} */}
          <div className='flex flex-col pt-8 pb-8 pl-5'>
          <div className="card_container mt-[10px] flex flex-col gap-5 "> 
          <div className="flex justify-center gap-24 mb-6 card_container_1 ">
            
          <CardL  name="Vacancies"  val={carddetails.vacancies-carddetails.hired} />
          <CardL  name="Hired"  val={carddetails.hired} />
          <CardL name="New Messages" val={carddetails.newmessages} />
            </div>

            <div className="card_container_2 flex flex-row  mb-6 justify-center gap-14  sm:ml-[50px] sm:mr-[50px] lg:ml-[100px] lg:mr-[100px] ">

          <CardS  name="Admins" val={carddetails.admins} />           
            <CardS name="Candidates" val={carddetails.candidates} />
          <CardS  name="Interviwers" val={carddetails.interviwers} />
          <CardS name="Recruiters"  val={carddetails.recruiters} />
          <CardS  name="Hiring Managers"  val={carddetails.hiringmanagers} />
                </div> 

            </div>
           
            <div className="flex flex-col items-center mt-20">
        <div className="w-[60%] flex items-center justify-center mb-4 p-4 rounded-2xl border-2 border-[#2B2B2B]" style={{ background: 'linear-gradient(to bottom, #2B2B2B 0%, rgba(43, 43, 43, 0) 80%)' }} >  
          <input
            type="text"
            placeholder="Search Candidate's Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-white bg-transparent opacity-25 focus:outline-none"
          />
          <FaSearch className="ml-2 text-gray-500" />
        </div>
        <div className="w-[75%] max-h-[250px] overflow-y-auto scrollbar-hidden overflow-x-hidden">
          {filteredUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-around gap-[10px] p-4 mb-2 rounded border-x-2 border-[#2B2B2B]" style={{ background: 'linear-gradient(to bottom, #2B2B2B 0%, rgba(43, 43, 43, 0) 60%)' }}>
              <div className='items-center block '>
                <img src={user.image} alt='' className='rounded-full border-[2px] w-[50px] h-[50px]' />
              </div>
              <div className='text-left w-[80px] '>
                <p className="text-lg font-bold">{user.fname} {user.lname}</p>
              </div>
              <div className='text-left w-[100px]'>
                <p className="text-lg font-bold">{user.role}</p>
              </div>
              <div className='text-left w-[120px]'>
                <p className="text-sm">{user.email}</p>
              </div>
              <div className='text-left w-[80px]'>
                <p className="text-sm text-white opacity-25">{user.phone_number}</p>
              </div>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <p className="mt-4 text-center text-gray-500">No candidates found</p>
          )}
        </div>

        </div>

          </div>
          
          

           
        </div>
      </div>
    </div>
  );
}

export default Admindash;
