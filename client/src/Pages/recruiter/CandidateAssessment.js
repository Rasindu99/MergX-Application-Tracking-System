import React, { useContext, useState, useEffect } from "react";
import PieCharts from "../../Components/hiringManagerCompo/PieCharts.jsx";
import axios from "axios";
import { UserContext } from "../../Context/UserContext.js";
import { toast } from "react-hot-toast";
import { IoChevronBackCircle } from "react-icons/io5";


export default function CandidateAssessment() {

  const [selected, setselected] = useState(null);
  const { users, setUsers } = useContext(UserContext);
  const [showDetails, setshowDetails] = useState(false);
  const [feedbackTab, setFeedbackTab] = useState(0);
  const [existEvolution, setexistEvolution] = useState([]);
  const [evoluations, setEvoluations] = useState([]);
  const [candidates, setCandidate] = useState([]);
  const [showEvaluated,setShowEvaluated] = useState(false);
  const [checkedEvaluations,setCheckedEvaluations] = useState([]);
  const  [checkedCandidates,setCheckedCandidates] = useState([]);

  const clearcandiates = ()=>{
    setCandidate([]);
    setEvoluations([]);
  }

  const clearcheckedcandiates = ()=>{
    setCheckedCandidates([]);
    setCheckedEvaluations([]);
    setexistEvolution([]);
  }

  const [data, setData] = useState({
    candidatename: "",
    candidateid: "",
    candidateemail: "",
    position:"",
    interviewername: "",
    interviewerid: "",
    problemsolution: 0,
    languageproficiency: 0,
    interviewercomments: "",
    addcomment: 0,
    collaboration: 0,
    adoptability: 0,
    decisionmaking: 0,
    leadership: 0,
    clarity: 0,
    activelistening: 0,
    empathy: 0,
    presentationskills: 0,
    technical: 0,
    cultural: 0,
    communication: 0,
    overallcomment: "",
    hiringManagerComment: "",
    recruiterComment: "",
    isHired:false
  });

  const updatecheckedrecruiter = async (application_id) => {
    if(!application_id) {
      console.error("Application ID is missing");
      return;
    }
      try{
        const response = await axios.put(`http://localhost:8000/evaluation/updatecheckedrecruiter/${application_id}`);
        if(response.data.error){
          console.error("Error in updating isEvaluated");
          
        }else{
          console.log("isEvaluated Updated Successfully");
        }
      }
      catch(error){
        console.error(error);
      }
    }


 const getInterviewdCandidates = async () => {
  try{
    const resposne = await axios.get('http://localhost:8000/evaluation/getRecruiterUnCheckedEvaluations');
    setEvoluations(resposne.data);
    
  }
  catch(error){
    console.error(" Can't get evoluations",error);
  }
  };

  const getChekedEvaluations = async ()=>{
    try{
      const response = await axios.get('http://localhost:8000/evaluation/getRecruitercheckedEvaluations');
      setCheckedEvaluations(response.data);
    }
    catch(error){
      console.error("Can't get checked evaluations",error);
    }
  }

    const getImg = async (user_id) => {
      if (!user_id){
        console.error("User ID is required");
        return;
      }
    try {
      const response = await axios.get(`http://localhost:8000/evaluation/getimg/${user_id}`);
      setCandidate(prevState => prevState.map(candidate =>
        candidate.userid === user_id ? { ...candidate, image: response.data.image } : candidate
      ));

      
    } catch (error) {
      console.error(error);
    }
  };

  const checkedgetImg = async (user_id) => {
    if (!user_id){
      console.error("User ID is required");
      return;
    }
  try {
    const response = await axios.get(`http://localhost:8000/evaluation/getimg/${user_id}`);
    setCheckedCandidates(prevState => prevState.map(candidate =>
      candidate.userid === user_id ? { ...candidate, image: response.data.image } : candidate
    ));

    
  } catch (error) {
    console.error(error);
  }
};



    const processCandidates = async () => {
    
    evoluations.forEach((evoluation)=>{
      const { _id,candidateid, candidatename, candidateemail, position} = evoluation;
      setCandidate(prevState => [...prevState, {
        _id,
        userid:candidateid,
        username: candidatename,
        email: candidateemail,
        image: '', // initial placeholder value
        post: position // initial placeholder value
      }]);
      getImg(candidateid);
      
    });

  };
  const processcheckedCandidates = async () => {
    
    checkedEvaluations.forEach((evoluation)=>{
      const { _id,candidateid, candidatename, candidateemail, position} = evoluation;
      setCheckedCandidates(prevState => [...prevState, {
        _id,
        userid:candidateid,
        username: candidatename,
        email: candidateemail,
        image: '', // initial placeholder value
        post: position // initial placeholder value
      }]);
      checkedgetImg(candidateid);
      
    });

  };


  const handleClick = (value) => {
    setFeedbackTab(value);
  };

  useEffect(() => {
    const fetchEvaluation = async () => {
      if (showDetails && selected) {
        // Check if showDetails is true and selected._id is defined before fetching
        try {
          console.log("Fetching evaluation for candidate ID:", selected.userid); // Debug log
          const response = await axios.get(
            `http://localhost:8000/evaluation?candidateid=${selected.userid}&position=${encodeURIComponent(selected.post)}`
          );
          console.log("Evaluation response:", response); // Debug log

          if (response.data) {
            setData(response.data);
            setexistEvolution(response.data);
            console.log(" geting data from databse",response.data)
            // Use response.data directly
          }
        } catch (error) {
          console.error(error);
          console.log(selected);
        }
      }
    };

    fetchEvaluation();
  }, [showDetails, selected]);

 //updating evolutions

 const updateEvaluation = async (event) => {
  event.preventDefault();
  if(data.recruiterComment.trim() === ""){
    toast.error("Please enter your comment");
    return;
}

  try {
    const response = await axios.put(
      `http://localhost:8000/hmfeedback/update/${existEvolution._id}`,
      data
    );
    if (response.data.error) {
      console.error("Error in updating Evaluations");
      toast.error("Error.Not updated",response.data.error);
    } else {
     
      console.log("send data to database" ,data);
      toast.success("Successsfully submitted.");
      updatecheckedrecruiter(selected._id);
    }
  } catch (error) {
    console.error("Error updating evaluation:", error);
    toast.error("System Error");
  }
};




const setshowEvaluatedtrue = () => {
  setShowEvaluated(true);
}

const setshowEvaluatedfalse = ()=>{
  setShowEvaluated(false);
}

  // useEffect(()=>{
  //   getInterviewdCandidates();
    
  // },[]);
  useEffect(() => {
    console.log("Evoluations data:",evoluations);
  }
  ,[evoluations]);

  useEffect(() => {
    processCandidates();
  }, [evoluations]);

  useEffect(()=>{
    processcheckedCandidates();
  },[checkedEvaluations])

  useEffect(() => {
    console.log("Candidates data:",candidates);
  }
  ,[candidates]);

 
useEffect(()=>{
if(showEvaluated){
  getChekedEvaluations();
  clearcandiates();
}else{
  getInterviewdCandidates();
  clearcheckedcandiates();
}
},[showEvaluated]);



  return (

    <div

    className={`content ml-[340px]  text-white flex flex-row p-[0px]   bg-[#212121]  mt-[5px]  rounded-[30px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  ${
      showDetails === false ? " justify-center " : null

    }`}
  >

{!showDetails ? (<div>{!showEvaluated ? ( <button className="absolute right-[60px] top-[120px] p-[10px] rounded-[10px] bg-[#EA7122]" onClick={setshowEvaluatedtrue}>Show Checked Cadidates</button>):( <button className="absolute right-[60px] top-[120px] p-[10px] rounded-[10px] bg-[#EA7122]" onClick={setshowEvaluatedfalse}>Show Unchecked Cadidates</button>)} </div>):(<IoChevronBackCircle  onClick={()=>{setshowDetails(false)}}  className="absolute right-[60px] top-[120px] w-[50px] h-[50px] text-[#EA7122]" />)}     

    <div className="candidates h-[90vh]  flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px]  sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]">
      <p className="text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]">
        Interviewed Candidates
      </p>
      {/* <PostTag></PostTag> */}
      <div
        className={`max-h-[220vh] flex justify-center overflow-y-auto ${
          showDetails === false ? "w-[600px] max-h-[75vh]" : null
        }`}
      >
        <div className="max-h-[700px] overflow-y-auto scrollbar-hidden">
        {showEvaluated ? (<div>{checkedCandidates.map((candidate,index) => (
          <button
              key={index}
              onClick={() => {
                setshowDetails(true);
                setselected(candidate);
              }}
              className={` hover:scale-105 accLabel m-[10px] my-[5px]  flex flex-row   bg-[#2b2b2b] sm:pl-[5px]  items-center   rounded-[30px]  sm:gap-[4px] esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]   sm:w-[150px] sm:h-[45px]  lg:rounded-[25px]  lg:gap-[12px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] ${
                showDetails === false
                  ? "lg:w-[500px] justify-between  m-[30px]"
                  : null
              }`}
            >
              <div
                className={` ${
                  showDetails === false
                    ? "flex justify-evenly gap-[12px]"
                    : " flex flex-row  gap-[12px] justify-start"
                } `}
              >
                <img
                  src={candidate.image}
                  alt=""
                  className="userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
                />
                <div className="block ">
                  <p className="name text-left text-[#ffffff] mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]">
                    {candidate.username}{" "}
                  </p>
                  <p className="post text-left text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]">
                    {candidate.post}
                  </p>
                </div>
              </div>
              <p
                className={`post ${
                  showDetails === false ? "block" : "hidden"
                } mr-[60px] text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]`}
              >
                {candidate.email}
              </p>
            </button>
                  ))}</div>):(<div> {candidates.map((candidate,index) => (
                    <button
              key={index}
              onClick={() => {
                setshowDetails(true);
                setselected(candidate);
              }}
              className={` hover:scale-105 accLabel m-[10px] my-[5px]  flex flex-row   bg-[#2b2b2b] sm:pl-[5px]  items-center   rounded-[30px]  sm:gap-[4px] esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]   sm:w-[150px] sm:h-[45px]  lg:rounded-[25px]  lg:gap-[12px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] ${
                showDetails === false
                  ? "lg:w-[500px] justify-between  m-[30px]"
                  : null
              }`}
            >
              <div
                className={` ${
                  showDetails === false
                    ? "flex justify-evenly gap-[12px]"
                    : " flex flex-row  gap-[12px] justify-start"
                } `}
              >
                <img
                  src={candidate.image}
                  alt=""
                  className="userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
                />
                <div className="block ">
                  <p className="name text-left text-[#ffffff] mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]">
                    {candidate.username}{" "}
                  </p>
                  <p className="post text-left text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]">
                    {candidate.post}
                  </p>
                </div>
              </div>
              <p
                className={`post ${
                  showDetails === false ? "block" : "hidden"
                } mr-[60px] text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]`}
              >
                {candidate.email}
              </p>
            </button>
                  ))}
   </div>)}
           
        </div>
      </div>
    </div>

    {showDetails ? (
      <div className="description flex flex-col w-full pt-[20px] box-border max-h-[800px] overflow-y-auto  ">
        <div className="flex flex-row py-[20px] justify-center gap-5 border-[grey]  border-b-[2px] ">
          <img
            src={selected.image}
            alt=""
            className=" userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[100px] lg:h-[100px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
          />
          <div className="details flex flex-col justify-evenly  ">
            <p className="text-left">{selected.username}</p>
            <p className="text-left text-[#ffffff] opacity-[30%] ">
              Position : {selected.post}
            </p>
            <p className="text-left text-[#ffffff] opacity-[30%] ">
              Interviewer Name : {data.interviewername}
            </p>
          </div>
        </div>
        <div className="">
          <p className="  bg-[#2b2b2b] pl-[20px] py-[15px]">
            Interview Feedback
          </p>

          <div className="flex esm:flex-col md:flex-row esm:text-center  border-[grey]  border-t-[2px]  ">
            <div
              className={`technical esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919] cursor-pointer`}
              style={{
                backgroundColor:
                  feedbackTab === 0 ? "#1a1919" : "#1f1f1f",
              }}
              onClick={() => handleClick(0)}
            >
              <p>Technical</p>
            </div>
            <div
              className="cultural esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919] cursor-pointer"
              style={{
                backgroundColor:
                  feedbackTab === 1 ? "#1a1919" : "#1f1f1f",
              }}
              onClick={() => handleClick(1)}
            >
              <p>Culturel Fit</p>
            </div>
            <div
              className="communication esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919] cursor-pointer"
              style={{
                backgroundColor:
                  feedbackTab === 2 ? "#1a1919" : "#1f1f1f",
              }}
              onClick={() => handleClick(2)}
            >
              <p>Communication</p>
            </div>
            <div
              className="overall 450px:p-[10px] esm:p-[5px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919] cursor-pointer"
              style={{
                backgroundColor:
                  feedbackTab === 3 ? "#1a1919" : "#1f1f1f",
              }}
              onClick={() => handleClick(3)}
            >
              <p>Overall</p>
            </div>
          </div>

          <div
            className={` flex flex-col py-[50px]  bg-[#1a1919]   ${
              feedbackTab === 1 ? "block" : "hidden"
            } `}
          >
            <div className="flex flex-col justify-center gap-48  md:flex-row  pb-[10px]">
              <div className="flex flex-col mb-[20px]">
                <PieCharts percentage={data.addcomment}></PieCharts>
                <p className="text-white m-auto">Add Comment</p>
              </div>
              <div className="flex flex-col mb-[20px]">
                <PieCharts percentage={data.collaboration}></PieCharts>
                <p className="text-white m-auto">
                  Effective Collaboration
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-around">
              <div className="flex flex-col m-auto mb-[20px]">
                <PieCharts percentage={data.adoptability}></PieCharts>
                <p className="text-white m-auto">Adoptability</p>
              </div>
              <div className="flex flex-col m-auto mb-[20px]">
                <PieCharts percentage={data.decisionmaking}></PieCharts>
                <p className="text-white m-auto">Decision Making</p>
              </div>
              <div className="flex flex-col m-auto mb-[20px]">
                <PieCharts percentage={data.leadership}></PieCharts>
                <p className="text-white m-auto">Leadership Style</p>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col  justify-around  py-[50px] bg-[#1a1919]   ${
              feedbackTab === 0 ? "block" : "hidden"
            } `}
          >
            <div className="flex flex-row">
              <div className="flex flex-col m-auto mb-[20px]">
                <PieCharts
                  percentage={data.problemsolution}
                  topic="Problem Solution"
                ></PieCharts>
                <p className="text-white m-auto">Problem Solution</p>
              </div>
              <div className="flex flex-col m-auto mb-[20px]">
                <PieCharts
                  percentage={data.languageproficiency}
                  topic="Language Proficiency"
                ></PieCharts>
                <p className="text-white m-auto">Language Proficiency</p>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col   justify-around   py-[50px] bg-[#1a1919] ${
              feedbackTab === 3 ? "block" : "hidden"
            }`}
          >
            {" "}
            <div className="flex flex-row">
              <div className="flex flex-col m-auto mb-[20px]">
                <PieCharts
                  percentage={data.technical}
                  topic="Technical details"
                ></PieCharts>
                <p className="text-white m-auto">Technical Details</p>
              </div>
              <div className="flex flex-col m-auto mb-[20px]">
                <PieCharts
                  percentage={data.cultural}
                  topic="Culteral Fit"
                ></PieCharts>
                <p className="text-white m-auto">Culteral Fit </p>
              </div>
              <div className="flex flex-col m-auto mb-[20px]">
                <PieCharts
                  percentage={data.communication}
                  topic="Communication"
                ></PieCharts>
                <p className="text-white m-auto">Communication</p>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col  py-[50px] bg-[#1a1919]   ${
              feedbackTab === 2 ? "block" : "hidden"
            } `}
          >
            <div className="flex flex-col  md:flex-row justify-around">
              <div className="flex flex-col m-auto mb-[20px]">
                <PieCharts
                  percentage={data.clarity}
                  topic="Clarity"
                ></PieCharts>
                <p className="text-white m-auto">Clarity</p>
              </div>
              <div className="flex flex-col m-auto mb-[20px]">
                <PieCharts
                  percentage={data.activelistening}
                  topic="Active listening"
                ></PieCharts>
                <p className="text-white m-auto">Active listening</p>
              </div>

              <div className="flex flex-col m-auto mb-[20px]">
                <PieCharts
                  percentage={data.empathy}
                  topic="Empathy"
                ></PieCharts>
                <p className="text-white m-auto">Empathy</p>
              </div>
              <div className="flex flex-col m-auto mb-[20px]">
                <PieCharts
                  percentage={data.presentationskills}
                  topic="Presentation Skill"
                ></PieCharts>
                <p className="text-white m-auto">Presenation Skill</p>
              </div>
            </div>
          </div>
          <div></div>

          <form>
            <div>
              <p className="bg-[#2b2b2b] pl-[20px] py-[15px] text-left  border-[grey]  border-y-[2px]">
                Interviewer's Feedbacks
              </p>
              <p className="p-[20px]">Feedbacks</p>
              <div className="px-[20px] mx-[20px] rounded-[30px] bg-[#292929] ">
                <p className="bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] text-left ">
                  {data.interviewercomments}{" "}
                </p>
              </div>
              <p className="p-[20px]">Additional notes</p>
              <div className="px-[20px] mx-[20px] rounded-[30px] bg-[#292929] mb-[20px]">
                <p className="bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] text-left ">
                  {" "}
                  {data.overallcomment}
                </p>
              </div>
            </div>
           
            <div>
              <p className="bg-[#2b2b2b] pl-[20px] py-[15px] text-left  border-[grey]  border-y-[2px]">
                Add Comment
              </p>
              <div className="p-[20px] m-[20px] rounded-[30px] bg-[#292929]">
                <textarea
                  name=""
                  id=""
                  value={data.recruiterComment}
                  onChange={(e) => {
                    setData((prevData) => ({
                      ...prevData,
                      recruiterComment: e.target.value,
                    }));
                  }}
                  className="bg-[#292929] h-[20vh] w-full border-none outline-none p-[10px] "
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={updateEvaluation}
              className="mb-5 float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
            >
              Submit
            </button>
          </form>

          <br />
        </div>
        {/* <ProgressTimeline  ></ProgressTimeline> */}
      </div>
    ) : null}
  </div>  );
};

