import React,{useContext,useState} from 'react';
import axios from 'axios';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import { UserContext } from '../../Context/UserContext';
import Topbar from '../../Components/hiringManagerCompo/Topbar.jsx'
import PieCharts from '../../Components/interviewercomp/InputPieCharts';


export default function Evaluation() {
  const name = 'Evaluation';
  const { users, setUsers } = useContext(UserContext); 
  const [feedbackTab,setFeedbackTab]=useState(0);
  const [showDetails,setshowDetails]=useState(false);

  const handleClick = (value) => {
    setFeedbackTab(value);
};
  const {user}=useContext(UserContext);
  const [data,setData]=useState({
    candidatename:'',
    candidateid:'',
    candidateemail:'',
    interviewername:'',
    interviewerid:'',
    problemsolution:0,
    languageproficiency:0,
    interviewercomments:'',
    addcomment:0,
    collaboration:0,
    adoptability:0,
    decisionmaking:0,
    leadership:0,
    clarity:0,
    activelistening:0,
    empathy:0,
    presentationskills:0,
    technical:0,
    cultural:0,
    communication:0,
    overallcomment:''
  });

  const createEvaluation = async (event)=>{
    event.preventDefault();
    try{
      const response = await axios.post('/evaluation/createevaluation',data);
      if(response.data.error){
        console.error("Error in creating Evaluations");
      }else{
        setData({
          candidatename:'', 
          candidateid:'',
          candidateemail:'',
          interviewername:'',
          interviewerid:'',
          problemsolution:0,
          languageproficiency:0,
          interviewercomments:'',
          addcomment:0,
          collaboration:0,
          adoptability:0,
          decisionmaking:0,
          leadership:0,
          clarity:0,
          activelistening:0,
          empathy:0,
          presentationskills:0,
          technical:0,
          cultural:0,
          communication:0,
          overallcomment:''
        });
        console.log('Evaluations Created Successfully');
      }
    }
    catch(error){
      console.error(error);
    } 

  }

  return (
    <div>
        <div className='flex w-screen'>
        <div className='fixed'>
          <InterviewNav/>
        </div>
        
        <div className='w-screen lg:ml-[320px] md:ml-72 ml-[260px] '>
       
      <Topbar msg='Interview Feedback' name='Piyushan'  post='Hiring Manager' ></Topbar>
      <div className=' content max-h-[100vh] overflow-y-auto text-white flex flex-row p-[0px]  bg-[#1E1E1E] m-[30px]  h-fit rounded-[30px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  '>
        <div className='candidates  flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] rounded-tr-[0px] rounded-br-[0px] esm:p-[10px] 450px:p-[15px] sm:p-[25px]  sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]'>
          <p className='text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]'>Interviewed Candidates</p>
          <div className=' max-h-[100vh] overflow-y-auto'>

    {users.map((user) => (
      <button  onClick={()=>{setshowDetails(false)}}   className='hover:scale-110 accLabel m-[10px] my-[5px]  flex flex-row flex  bg-[#2b2b2b] sm:pl-[5px]  items-center justify-start rounded-[30px]  sm:gap-[4px] esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]   sm:w-[150px] sm:h-[45px]  lg:rounded-[25px]  lg:gap-[8px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content]'>
            <img src={user.image} alt="" className='userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]' />
           <div className='block '>
           <p className='name text-[#ffffff] mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]'>{user.fname} </p>
            <p className='post text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]'>{user.role}</p>
           </div>
          </button>
    ) )}

     
    </div>
        

        </div>

        <div className='description flex flex-col w-full box-border'>
        <div  className='flex flex-row py-[20px] justify-center gap-5 border-[grey]  border-b-[2px] '>
              <img src={user.image} alt="" className=' userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[100px] lg:h-[100px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]' />
             <div className='details flex flex-col justify-evenly  '>
              <p className='text-left'>Rasindu Ranavaka</p>
              <p className='text-left'>Software Engineer</p>
              <p className='text-left'>Interviewers : W.K.Piyushan</p>
             </div>
             </div>
             <div className='' >
              
                <p className='  bg-[#2b2b2b] pl-[20px] py-[15px]'>Interview Feedback</p>
              
              <div className='flex esm:flex-col md:flex-row esm:text-center  border-[grey]  border-t-[2px]  '>
                <div className={`technical esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]`} style={{backgroundColor:feedbackTab === 0  ? '#1a1919':'#1f1f1f'}} onClick={() => handleClick(0)}><p>Technical</p></div>
                <div className="cultural esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]" style={{backgroundColor:feedbackTab === 1  ? '#1a1919':'#1f1f1f'}} onClick={() => handleClick(1)}><p>Culturel Fit</p></div>
                <div className='communication esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]' style={{backgroundColor:feedbackTab === 2  ? '#1a1919':'#1f1f1f'}} onClick={() => handleClick(2)}><p>Communication</p></div>
                <div className="overall 450px:p-[10px] esm:p-[5px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]" style={{backgroundColor:feedbackTab === 3  ? '#1a1919':'#1f1f1f'}} onClick={() => handleClick(3)}><p>Overall</p></div>

              </div>
              
              <div className={` flex flex-col py-[50px]  bg-[#1a1919]   ${
      feedbackTab ===1 ? 'block' : 'hidden'
    } `}>
                 
              <div className='flex flex-col justify-center gap-48  md:flex-row  pb-[10px]'>
              <div className='flex flex-col mb-[20px]'>
              <PieCharts percentage='65'  topic='Communication'></PieCharts>
              <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
              <p className='text-white m-auto'>Problem Solution</p>
              </div>
              <div className='flex flex-col mb-[20px]'>
              <PieCharts percentage='65'  topic='Communication'></PieCharts>
              <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
              <p className='text-white m-auto'>Effective Collaboration</p>
              </div>
             
           
              </div> 
 

              <div className='flex flex-col md:flex-row justify-around'>
              <div className='flex flex-col m-auto mb-[20px]'> 
              <PieCharts percentage='75' topic='Technical details' ></PieCharts>
              <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
              <p className='text-white m-auto'>Adoptability</p>
            </div>
            <div className='flex flex-col m-auto mb-[20px]'> 
              <PieCharts percentage='45' topic='Culteral Fit'></PieCharts>
              <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
              <p className='text-white m-auto'>Decision Making</p>
            </div>
            <div className='flex flex-col m-auto mb-[20px]'> 
              <PieCharts percentage='65'  topic='Communication'></PieCharts>
              <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
              <p className='text-white m-auto'>Leadership Style</p>
            </div>
              </div>
              
             
              
              </div>

              <div className={`flex flex-col  justify-around  py-[50px] bg-[#1a1919]   ${
      feedbackTab ===0 ? 'block' : 'hidden'
    } `}>       <div className='flex flex-row'>
               <div className='flex flex-col m-auto mb-[20px]'> 
                <PieCharts percentage='45' topic='Problem Solution' ></PieCharts>
                <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
                <p className='text-white m-auto'>Problem Solution</p>
            </div>
            <div className='flex flex-col m-auto mb-[20px]'> 
              <PieCharts percentage='15' topic='Language Proficiency'></PieCharts>
              <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
              <p className='text-white m-auto'>Language Proficiency</p>
            </div> 
            </div>
            <form >
             <div>
              <p className='p-[20px]'>Interview Feedbacks</p>
              <div className='p-[20px] m-[20px] rounded-[30px] bg-[#292929]'>
                <textarea  name="" id="" defaultValue='Feedback'  className='bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] '  />
              </div>
             </div>
            
            
             <button type='submit' className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">Submit</button>
             </form>
              </div>

             <div className={`flex flex-col   justify-around   py-[50px] bg-[#1a1919] ${
      feedbackTab ===3 ? 'block' : 'hidden'
    }`}>
            <div  className='flex flex-row'>
            <div className='flex flex-col m-auto mb-[20px]'> 
            <PieCharts percentage='75' topic='Technical details' ></PieCharts>
            <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
            <p className='text-white m-auto'>Technical Details</p>
            </div> 
            <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='45' topic='Culteral Fit'></PieCharts>
              <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
            <p className='text-white m-auto'>Culteral Fit </p>
            </div>
            <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='65'  topic='Communication'></PieCharts>
              <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
              <p className='text-white m-auto'>Communication</p>
              </div>
            </div>
              <form >
             <div>
              <p className='p-[20px]'>Interview Feedbacks</p>
              <div className='p-[20px] m-[20px] rounded-[30px] bg-[#292929]'>
                <textarea  name="" id="" defaultValue='Feedback'  className='bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] '  />
              </div>
             </div>
            
            
             <button type='submit' className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">Submit</button>
             </form>
              </div>
              
              <div className={`flex flex-col  py-[50px] bg-[#1a1919]   ${
      feedbackTab ===2 ? 'block' : 'hidden'
    } `}>
                 
              <div className='flex flex-col  md:flex-row justify-around'>
              <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='65'  topic='Clarity'></PieCharts>
              <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
              <p className='text-white m-auto'>Clarity</p>
              </div> 
              <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='65'  topic='Active listening'></PieCharts>
              <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
              <p className='text-white m-auto'>Active listening</p>
              </div>
             
              <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='75' topic='Empathy' ></PieCharts>
              <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
              <p className='text-white m-auto'>Empathy</p>
              </div>
              <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='45' topic='Presentation Skill'></PieCharts>
              <input type="text" name="" id="" className='border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] ' />
              <p className='text-white m-auto'>Presenation Skill</p>
              </div>
              </div>
              
             
              
              </div>
              <div>

              </div>
           
             
           <br />
              
               
          
             </div>
              
        </div>
       
       
      </div>
      </div>
        </div>

      
    </div>
  )
}