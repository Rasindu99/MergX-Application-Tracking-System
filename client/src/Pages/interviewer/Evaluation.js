import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import InterviewNav from "../../Components/interviewercomp/InterviewNav";
import { UserContext } from "../../Context/UserContext";
import Topbar from "../../Components/hiringManagerCompo/Topbar.jsx";
import PieCharts from "../../Components/interviewercomp/InputPieCharts";
import { toast } from "react-hot-toast";

export default function Evaluation() {
  const [selected, setselected] = useState(null);
  const [feedbackTab, setFeedbackTab] = useState(0);
  const [showDetails, setshowDetails] = useState(false);
  const [existEvolution, setexistEvolution] = useState([]);
  const [isexistevaluation, setisexistevaluation] = useState(false);
  const { user } = useContext(UserContext);
  const [application, setApplication] = useState([]);
  const [candidates, setCandidate] = useState([]);

  const [data, setData] = useState({
    candidatename: "",
    candidateid: "",
    candidateemail: "",
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
  });

  const handleClick = (value) => {
    setFeedbackTab(value);
  };


  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value) && Number(value) >= 0 && Number(value) <= 100) {
      setData((prevState)=>({
        ...prevState,
        [name]: Number(value),
      }));
    }
  };

  const getPost = async (job_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/evaluation/getpost/${job_id}`);
      setCandidate(prevState => prevState.map(candidate =>
        candidate.job_id === job_id ? { ...candidate, position: response.data.jobTitle } : candidate
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const getImg = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/evaluation/getimg/${user_id}`);
      setCandidate(prevState => prevState.map(candidate =>
        candidate.user_id === user_id ? { ...candidate, image: response.data.image } : candidate
      ));
    } catch (error) {
      console.error(error);
    }
  };

  
  const getApplications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/cv/getapplications');
      setApplication(response.data.applications);
      application.map(application => {
        console.log(application);
      }
      );
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const processApplications = () => {
    application.forEach(app => {
      const { job_id, user_id, user_name, user_email } = app;
      setCandidate(prevState => [...prevState, {
        job_id,
        user_id,
        username: user_name,
        email: user_email,
        image: '', // initial placeholder value
        position: '' // initial placeholder value
      }]);
      getPost(job_id);
      getImg(user_id);

    });
  };
  

  const createEvaluation = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/evaluation/createevaluation",
        data
      );
      if (response.data.error) {
        console.error("Error in creating Evaluations");
        toast.error("System Error");
      } else {
          clear();
        console.log("Evaluations Created Successfully");
        toast.success("Successfully submitted.");
        console.log(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("All fields must be filled.");
      console.log(data);
    }
  };

  const updateEvaluation = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/evaluation/updateevaluation/${existEvolution._id}`,
        data
      );
      if (response.data.error) {
        console.error("Error in updating Evaluations");
        toast.error("System Error");
      } else {
        clear();
        console.log("Evaluations Updated Successfully");
        toast.success("Successfully updated.");
      }
    } catch (error) {
      console.error("Error updating evaluation:", error);
      toast.error("All fields must be filled.");
    }
  };

  const clear = () => {
    setData({
      candidatename: "",
      candidateid: "",
      candidateemail: "",
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
    });
  };


  useEffect(() => {
    const fetchEvaluation = async () => {
      if (showDetails && selected) {
        try {
          console.log("Fetching evaluation for candidate ID:", selected.user_id);
          const response = await axios.get(
            `http://localhost:8000/evaluation?candidateid=${selected.user_id}`
          );

          if (response.data) {
            setexistEvolution(response.data);
            setData(response.data);
          }

          setisexistevaluation(true);
        //  console.log(selected.username);
        } catch (error) {
          console.error(error);
          clear();
          if (showDetails && selected) {
            setData((prevState) => ({
              ...prevState,
              candidatename: selected.username,
              candidateid: selected.user_id,
              candidateemail: selected.email,
              interviewername: user.fname,
              interviewerid: user._id,
            }));
            console.log("interviewername",data.interviewername);
          }
      
      //    console.log(selected);
          setisexistevaluation(false);
        }
      }
    };

    if (showDetails && selected) {
      setData((prevState) => ({
        ...prevState,
        candidatename: selected.username,
        candidateid: selected.user_id,
        candidateemail: selected.email,
        interviewername: user.fname,
        interviewerid: user._id,
      }));
      console.log("interviewername",data.interviewername);
    }

    fetchEvaluation();

     
    

  }, [showDetails, selected,application]);

  useEffect(() => {
    getApplications();
  }, []); // Empty dependency array means it runs once on mount

useEffect(() => {
  processApplications();
 
},[application]);



useEffect(() => { 
  console.log(candidates);
}
,[candidates]);
useEffect(() => { 
  console.log(data);
}
,[data]);



   

 

  return (
    <div>
      <div className="flex w-screen">
        <div className="fixed">
          <InterviewNav />
        </div>

        <div className="w-screen lg:ml-[320px] md:ml-72 ml-[260px]">
          <Topbar
            msg="Interview Feedback"
            name="Piyushan"
            post="Hiring Manager"
          />
          <div
            className={`content max-h-[100vh] overflow-y-auto text-white flex flex-row p-[0px] bg-[#1E1E1E] m-[30px] h-fit rounded-[30px] 320px:text-[0.5rem] 450px:text-[0.8rem] sm:text-[0.9rem] 900px:text-[1.1rem] 1010px:text-[1.2rem] ${
              showDetails === false ? " justify-center" : null
            }`}
          >
            <div
              className={`candidates flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] rounded-tr-[0px] rounded-br-[0px] esm:p-[10px] 450px:p-[15px] sm:p-[25px] sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]`}
            >
              <p className="text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]">
                Interviewed Candidates
              </p>
              <div
                className={`max-h-[100vh] flex justify-center overflow-y-auto ${
                  showDetails === false ? "w-[600px]" : null
                }`}
              >
                <div>
                  {candidates.map((candidate,index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setshowDetails(true);
                        setselected(candidate);
                       
                      }}
                      className={`hover:scale-110 accLabel m-[10px] my-[5px] flex flex-row bg-[#2b2b2b] sm:pl-[5px] items-center rounded-[30px] sm:gap-[4px] esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px] sm:w-[150px] sm:h-[45px] lg:rounded-[25px] lg:gap-[12px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] ${
                        showDetails === false ? "lg:w-[500px] justify-between hover:scale-105" : null
                      }`}
                    >
                      <div
                        className={`${
                          showDetails === false ? "flex justify-evenly gap-[12px]" : "flex flex-row gap-[12px] justify-start"
                        }`}
                      >
                        <img
                          src={candidate.image}
                          alt=""
                          className="userImg rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px] 450px:w-[30px] 450px:h-[30px] sm:w-[35px] sm:h-[35px] border-[1.5px] lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
                        />
                        <div className="block">
                          <p className="name text-left text-[#ffffff] mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem] 320px:text-[0.5rem]">
                            {candidate.username}
                          </p>
                          <p className="post text-left text-[#ffffff] opacity-[30%] mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem] 320px:text-[0.5rem]">
                            {candidate.position}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`post ${
                          showDetails === false ? "block" : "hidden"
                        } mr-[60px] text-[#ffffff] opacity-[30%] mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem] 320px:text-[0.5rem]`}
                      >
                         {candidate.email}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>


            {showDetails ? (
              <div className="description flex flex-col w-full box-border">
                <div className="flex flex-row py-[20px] justify-center gap-5 border-[grey]  border-b-[2px] ">
                  <img
                    src={selected.image}
                    alt=""
                    className=" userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[100px] lg:h-[100px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
                  />
                  <div className="details flex flex-col justify-evenly w-[250px] ">
                    <p className="text-left">{selected.username}</p>
                    <p className="text-left text-[#ffffff] opacity-[30%] ">
                      {selected.position}
                    </p>
                    <p className="text-left text-[#ffffff] opacity-[30%] ">
                     {selected.email}
                    </p>
                  </div>
                </div>
                <div className="">
                  <p className="  bg-[#2b2b2b] pl-[20px] py-[15px]">
                    Interview Feedback
                  </p>

                  <div className="flex esm:flex-col md:flex-row esm:text-center  border-[grey]  border-t-[2px]  ">
                    <div
                      className={`technical esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]`}
                      style={{
                        backgroundColor:
                          feedbackTab === 0 ? "#1a1919" : "#1f1f1f",
                      }}
                      onClick={() => handleClick(0)}
                    >
                      <p>Technical</p>
                    </div>
                    <div
                      className="cultural esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]"
                      style={{
                        backgroundColor:
                          feedbackTab === 1 ? "#1a1919" : "#1f1f1f",
                      }}
                      onClick={() => handleClick(1)}
                    >
                      <p>Culturel Fit</p>
                    </div>
                    <div
                      className="communication esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]"
                      style={{
                        backgroundColor:
                          feedbackTab === 2 ? "#1a1919" : "#1f1f1f",
                      }}
                      onClick={() => handleClick(2)}
                    >
                      <p>Communication</p>
                    </div>
                    <div
                      className="overall 450px:p-[10px] esm:p-[5px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]"
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
                        <input
                          type="number"
                          value={data.addcomment}
                          onChange={handleInputChange}
                          name="addcomment"
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">Add Comment</p>
                      </div>
                      <div className="flex flex-col mb-[20px]">
                        <PieCharts percentage={data.collaboration}></PieCharts>
                        <input
                          type="number"
                          value={data.collaboration}
                          name="collaboration"
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">
                          Effective Collaboration
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-around">
                      <div className="flex flex-col m-auto mb-[20px]">
                        <PieCharts percentage={data.adoptability}></PieCharts>
                        <input
                          type="number"
                          name="adoptability"
                          value={data.adoptability}
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">Adoptability</p>
                      </div>
                      <div className="flex flex-col m-auto mb-[20px]">
                        <PieCharts percentage={data.decisionmaking}></PieCharts>
                        <input
                          type="number"
                          name="decisionmaking"
                          value={data.decisionmaking}
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">Decision Making</p>
                      </div>
                      <div className="flex flex-col m-auto mb-[20px]">
                        <PieCharts percentage={data.leadership}></PieCharts>
                        <input
                          type="number"
                          name="leadership"
                          value={data.leadership}
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">Leadership Style</p>
                      </div>
                    </div>

                    <div className="flex flex-raw  justify-center">
                      <button
                        type="submit"
                        onClick={clear}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                      >
                        Clear
                      </button>

                      <button
                        type="submit"
                        onClick={() => handleClick(2)}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                      >
                        next
                      </button>
                    </div>
                  </div>

                  <div
                    className={`flex flex-col  justify-around  py-[50px] bg-[#1a1919]   ${
                      feedbackTab === 0 ? "block" : "hidden"
                    } `}
                  >
                    {" "}
                    <div className="flex flex-row">
                      <div className="flex flex-col m-auto mb-[20px]">
                        <PieCharts
                          percentage={data.problemsolution}
                          topic="Problem Solution"
                        ></PieCharts>
                        <input
                          type="number"
                          name="problemsolution"
                          value={data.problemsolution}
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">Problem Solution</p>
                      </div>
                      <div className="flex flex-col m-auto mb-[20px]">
                        <PieCharts
                          percentage={data.languageproficiency}
                          topic="Language Proficiency"
                        ></PieCharts>
                        <input
                          type="number"
                          name="languageproficiency"
                          value={data.languageproficiency}
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">
                          Language Proficiency
                        </p>
                      </div>
                    </div>
                    <form>
                      <div>
                        <p className="p-[20px]">Add Comments</p>
                        <div className="p-[20px] m-[20px] rounded-[30px] bg-[#292929]">
                          <textarea
                            name="interviewercomments"
                            value={data.interviewercomments}
                            onChange={(e) => {
                              setData((prevData) => ({
                                ...prevData,
                                interviewercomments: e.target.value,
                              }));
                            }}
                            className="bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] "
                          />
                        </div>
                      </div>
                    </form>
                    <div className="flex flex-raw  justify-center">
                      <button
                        type="submit"
                        onClick={clear}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                      >
                        Clear
                      </button>
                      <button
                        type="submit"
                        onClick={() => handleClick(1)}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                      >
                        next
                      </button>
                    </div>
                  </div>

                  <div
                    className={`flex flex-col   justify-around   py-[50px] bg-[#1a1919] ${
                      feedbackTab === 3 ? "block" : "hidden"
                    }`}
                  >
                    <div className="flex flex-row">
                      <div className="flex flex-col m-auto mb-[20px]">
                        <PieCharts
                          percentage={data.technical}
                          topic="Technical details"
                        ></PieCharts>
                        <input
                          type="number"
                          name="technical"
                          value={data.technical}
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">Technical Details</p>
                      </div>
                      <div className="flex flex-col m-auto mb-[20px]">
                        <PieCharts
                          percentage={data.cultural}
                          topic="Culteral Fit"
                        ></PieCharts>
                        <input
                          type="number"
                          name="cultural"
                          value={data.cultural}
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">Culteral Fit </p>
                      </div>
                      <div className="flex flex-col m-auto mb-[20px]">
                        <PieCharts
                          percentage={data.communication}
                          topic="Communication"
                        ></PieCharts>
                        <input
                          type="number"
                          name="communication"
                          value={data.communication}
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">Communication</p>
                      </div>
                    </div>
                    <form>
                      <div>
                        <p className="p-[20px]">Additional Notes</p>
                        <div className="p-[20px] m-[20px] rounded-[30px] bg-[#292929]">
                          <textarea
                            name="overallcomment"
                            value={data.overallcomment}
                            onChange={(e) => {
                              setData((prevData) => ({
                                ...prevData,
                                overallcomment: e.target.value,
                              }));
                            }}
                            id=""
                            className="bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] "
                          />
                        </div>
                      </div>
                    </form>
                    <div className="flex flex-raw  justify-center">
                      <button
                        type="submit"
                        onClick={clear}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                      >
                        Clear
                      </button>
                      {/* <button type='submit' onClick={createEvaluation} className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">submit</button> */}

                      {isexistevaluation === true ? (
                        <button
                          type="submit"
                          onClick={updateEvaluation}
                          className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px]"
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          type="submit"
                          onClick={createEvaluation}
                          className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px]"
                        >
                          Submit
                        </button>
                      )}
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
                        <input
                          type="number"
                          name="clarity"
                          value={data.clarity}
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">Clarity</p>
                      </div>
                      <div className="flex flex-col m-auto mb-[20px]">
                        <PieCharts
                          percentage={data.activelistening}
                          topic="Active listening"
                        ></PieCharts>
                        <input
                          type="number"
                          name="activelistening"
                          value={data.activelistening}
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">Active listening</p>
                      </div>

                      <div className="flex flex-col m-auto mb-[20px]">
                        <PieCharts
                          percentage={data.empathy}
                          topic="Empathy"
                        ></PieCharts>
                        <input
                          type="number"
                          name="empathy"
                          value={data.empathy}
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">Empathy</p>
                      </div>
                      <div className="flex flex-col m-auto mb-[20px]">
                        <PieCharts
                          percentage={data.presentationskills}
                          topic="Presentation Skill"
                        ></PieCharts>
                        <input
                          type="number"
                          name="presentationskills"
                          value={data.presentationskills}
                          onChange={handleInputChange}
                          id=""
                          className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                        />
                        <p className="text-white m-auto">Presenation Skill</p>
                      </div>
                    </div>

                    <div className="flex flex-raw  justify-center">
                      <button
                        type="submit"
                        onClick={clear}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                      >
                        Clear
                      </button>
                      <button
                        type="submit"
                        onClick={() => handleClick(3)}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                      >
                        next
                      </button>
                    </div>
                  </div>
                  <div></div>

                  <br />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
