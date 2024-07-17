import {React, useState} from 'react'
import InterviewLinkCard from '../../../Components/candidateComp/InterviewLinkCrad/InterviewLinkCard';
import { MdKeyboardAlt } from "react-icons/md";
import Draggable from 'react-draggable';
import CodeEditor from '../../../Components/candidateComp/TextEditor/CodeEditor';
import { IoMdClose } from "react-icons/io";
import AchievementsForm from '../../../Components/candidateComp/Cv Builder/AchimentsForm';
import ExperienceForm from '../../../Components/candidateComp/Cv Builder/ExperienceForm';
import EducationForm from '../../../Components/candidateComp/Cv Builder/EducationForm';
import ProjectsForm from '../../../Components/candidateComp/Cv Builder/ProjectsForm';
import SkillsForm from '../../../Components/candidateComp/Cv Builder/SkillsForm';


const Session = () => {

  const [isCompilarOpen, setIsCompilarOpen] = useState(false);

  const toggleCompilar = () => {
    setIsCompilarOpen(!isCompilarOpen);
  };

  const handleClose = async() => {
    setIsCompilarOpen(false);
  };

  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    designation: '',
    address: '',
    email: '',
    phoneno: '',
    summary: '',
    image: null
  });

  const [img, setImage] = useState();

  const [achievements, setAchievements] = useState([{ achieve_title: '', achieve_description: '' }]);

  const [experiences, setExperiences] = useState([{ 
    exp_title: '', 
    exp_organization: '', 
    exp_location: '', 
    exp_start_date: '', 
    exp_end_date: '', 
    exp_description: '' 
  }]);

  const [educations, setEducations] = useState([{
    edu_school: '',
    edu_degree: '',
    edu_city: '',
    edu_start_date: '',
    edu_graduation_date: '',
    edu_description: ''
  }]);

  const [projects, setProjects] = useState([{
    proj_title: '',
    proj_link: '',
    proj_description: ''
  }]);

  const [skills, setSkills] = useState(['']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // generateCV(); // Call your function to update CV here if needed
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: reader.result
        }));
      };
    }
  };
  

  const previewImage = (e) => {
    const file = e.target.files[0];
    // Implement image preview logic here if needed
  };

  console.log("CV Builder - ",formData)

  return (
    <div className='flex flex-col justify-center items-center p-5 overflow-auto w-full z-10'>
        {/* <InterviewLinkCard/>
        <MdKeyboardAlt className='absolute size-[46px] text-neutral-400 right-[55px] bottom-24 hover:text-orange-600 cursor-pointer' onClick={toggleCompilar}/>
        {isCompilarOpen && (
        <Draggable handle=".draggable-header">
          <div className='fixed z-50 flex flex-col w-3/5 bg-neutral-400 border-[#393737] border-[3px] shadow-lg h-2/3 overflow-y-auto rounded-2xl bottom-0 right-5'>
            <div className='border-b-[1px] border-[#393737] flex items-center draggable-header bg-gradient-to-r from-[#2f2e2e] to-[#272727] h-[47px] w-full rounded-t-lg cursor-grab'>
              <button
                className="group flex justify-center items-center text-white bg-orange-500 text-center rounded-md hover:bg-orange-600 size-7 absolute right-2 top-2"
                onClick={handleClose}
              >
                <IoMdClose className="text-white group-hover:text-black text-xl" />
              </button>
              <h1 className='text-[#666666] ml-5 font-medium '>MergeX-inbuilt-IDE (version_1)</h1>
            </div>
            <div className='overflow-y-auto bg-neutral-800 h-full'>
              <CodeEditor />
            </div>
          </div>
        </Draggable>
      )} */}

      <div className='py-[64px] px-0' id ="about-sc" >
        <div className='container'>
          <div class="about-cnt">
            <form action="" class="cv-form" id="cv-form">

              <div class="cv-form-blk">
                <div class="cv-form-row-title">
                  <h3>about section</h3>
                </div>
                <div class="cv-form-row cv-form-row-about">
                  <div class="cols-3">
                    <div class="form-elem">
                      <label for="" class="form-label">First Name</label>
                      <input
                        name="firstname"
                        type="text"
                        class="form-control firstname text-black"
                        id="firstname" 
                        onChange={handleChange}
                        value={formData.firstname}
                        placeholder="e.g. John" 
                        />
                      <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                      <label for="" class="form-label">Middle Name <span class="opt-text">(optional)</span></label>
                      <input
                        name="middlename"
                        type="text"
                        class="form-control middlename text-black"
                        id="middlename"
                        value={formData.middlename}
                        onChange={handleChange}
                        placeholder="e.g. Herbert"
                      />
                      <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                      <label for="" class="form-label">Last Name</label>
                      <input
                        name="lastname"
                        type="text"
                        class="form-control lastname text-black"
                        id="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="e.g. Doe"
                      />
                      <span class="form-text"></span>
                    </div>
                  </div>

                  <div class="cols-3">
                    <div class="form-elem">
                      <label for="" class="form-label">Your Image</label>
                      <input
                        name="image"
                        type="file"
                        class="form-control image"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    <div class="form-elem">
                      <label for="" class="form-label">Designation</label>
                      <input
                        name="designation"
                        type="text"
                        class="form-control designation text-black"
                        id="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="e.g. Sr.Accountants"
                      />
                      <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                      <label for="" class="form-label">Address</label>
                      <input
                        name="address"
                        type="text"
                        class="form-control address text-black"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="e.g. Lake Street-23"
                      />
                      <span class="form-text"></span>
                    </div>
                  </div>

                  <div class="cols-3">
                    <div class="form-elem">
                      <label for="" class="form-label">Email</label>
                      <input
                        name="email"
                        type="text"
                        class="form-control email text-black"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. johndoe@gmail.com"
                      />
                      <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                      <label for="" class="form-label">Phone No:</label>
                      <input
                        name="phoneno"
                        type="text"
                        class="form-control phoneno text-black"
                        id="phoneno"
                        value={formData.phoneno}
                        onChange={handleChange}
                        placeholder="e.g. 456-768-798, 567.654.002"
                      />
                      <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                      <label for="" class="form-label">Summary</label>
                      <input
                        name="summary"
                        type="text"
                        class="form-control summary text-black"
                        id="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        placeholder="e.g. Doe"
                      />
                      <span class="form-text"></span>
                    </div>
                  </div>
                </div>
              </div>

              <AchievementsForm achievements={achievements} setAchievements={setAchievements}/>

              <ExperienceForm experiences={experiences} setExperiences={setExperiences}/>

              <EducationForm educations={educations} setEducations={setEducations}/>

              <ProjectsForm projects={projects} setProjects={setProjects}/>

              <SkillsForm skills={skills} setSkills={setSkills}/>

            </form>
          </div>
        </div>
      </div>

      <div id="preview-sc" class="print_area w-4/5">
        <div class="w-full">
          <div class="preview-cnt">
            <div class="preview-cnt-l bg-green text-white">
              <div class="preview-blk">
                <div class="preview-image">
                  <img src={formData.image || ''} alt="" id="image_dsp"/>
                </div>
                <div class="preview-item preview-item-name">
                  <span class="preview-item-val fw-6" id="fullname_dsp">{`${formData.firstname} ${formData.lastname}`}</span>
                </div>
                <div class="preview-item">
                  <span class="preview-item-val text-uppercase fw-6 ls-1" id="designation_dsp">{formData.designation}</span>
                </div>
              </div>

              <div class="preview-blk">
                <div class="preview-blk-title">
                  <h3 className='uppercase text-2xl font-bold text-start'>about</h3>
                </div>
                <div class="preview-blk-list">
                  <div class="preview-item">
                    <span class="preview-item-val" id="phoneno_dsp">{formData.phoneno}</span>
                  </div>
                  <div class="preview-item">
                    <span class="preview-item-val" id="email_dsp">{formData.email}</span>
                  </div>
                  <div class="preview-item">
                    <span class="preview-item-val" id="address_dsp">{formData.address}</span>
                  </div>
                  <div class="preview-item">
                    <span class="preview-item-val" id="summary_dsp"></span>
                  </div>
                </div>
              </div>

              <div class="preview-blk">
                <div class="preview-blk-title">
                  <h3>skills</h3>
                </div>
                <div class="skills-items preview-blk-list" id="skills_dsp">
                  
                </div>
              </div>
            </div>

            <div class="preview-cnt-r bg-white">

              <div class="flex flex-col items-start w-full ">
                <div className='w-full p-1 border-b border-neutral-500 mb-3'>
                  <h3 className='text-xl font-bold text-start text-neutral-600 uppercase'>Achievements</h3>
                </div>
                {achievements.map((achievement, index) => (
                  <div key={index} className='w-full mt-3'>
                    <div className="bg-neutral-400 bg-opacity-10 w-full p-1">
                      <h3 className='text-base font-bold text-start text-neutral-800 uppercase opacity-50'>{achievement.achieve_title}</h3>
                    </div>
                    <div className=" text-black w-full">
                      <h3 className='text-base font-semibold text-start text-neutral-600'>{achievement.achieve_description}</h3>
                    </div>
                  </div>
                ))}
              </div>

              <div class="flex flex-col items-start w-full  mb-3 mt-4">
                <div className='w-full p-1 border-b border-neutral-500 mb-3'>
                  <h3 className='text-xl font-bold text-start text-neutral-600 uppercase'>EDUCATIONS</h3>
                </div>
                {educations.map((education, index) => (
                  <div key={index} className='w-full mt-3'>
                    <div className="bg-neutral-400 bg-opacity-10 w-full p-1">
                      <h3 className='text-base font-bold text-start text-neutral-800 uppercase opacity-50'>{education.edu_school}</h3>
                    </div>
                    <div className="flex flex-col text-black w-3/5 ml-1 mt-2">
                      <div className='flex w-full justify-between'>
                        <h3 className='text-base font-bold text-start text-neutral-600'>{education.edu_degree}</h3>
                        <span>{education.edu_city}</span>
                        <div className='bg-emerald-600 bg-opacity-50 px-1 py-[2px] rounded-lg'>{education.edu_start_date}</div>
                        <div className='bg-emerald-600 bg-opacity-50 px-1 py-[2px] rounded-lg'>{education.edu_graduation_date}</div>
                      </div>
                      <div className='w-full text-start text-neutral-400 font-normal'>{education.edu_description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div class="flex flex-col items-start w-full  mb-3 mt-4">
                <div className='w-full p-1 border-b border-neutral-500 mb-3'>
                  <h3 className='text-xl font-bold text-start text-neutral-600 uppercase'>EXPERIENCES</h3>
                </div>
                {experiences.map((experience, index) => (
                  <div key={index} className='w-full mt-3'>
                    <div className="bg-neutral-400 bg-opacity-10 w-full p-1">
                      <h3 className='text-base font-bold text-start text-neutral-800 uppercase opacity-50'>{experience.exp_title}</h3>
                    </div>
                    <div className="flex flex-col text-black w-3/5 ml-1 mt-2">
                      <div className='flex w-full justify-between'>
                        <h3 className='text-base font-bold text-start text-neutral-600'>{experience.exp_organization}</h3>
                        <span>{experience.exp_location}</span>
                        <div className='bg-emerald-600 bg-opacity-50 px-1 py-[2px] rounded-lg'>{experience.exp_start_date}</div>
                        <div className='bg-emerald-600 bg-opacity-50 px-1 py-[2px] rounded-lg'>{experience.exp_end_date}</div>
                      </div>
                      <div className='w-full text-start text-neutral-400 font-normal'>{experience.exp_description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div class="flex flex-col items-start w-full  mb-3 mt-4">
                <div className='w-full p-1 border-b border-neutral-500 mb-3'>
                  <h3 className='text-xl font-bold text-start text-neutral-600 uppercase'>PROJECTS</h3>
                </div>
                {projects.map((project, index) => (
                  <div key={index} className='w-full mt-3'>
                    <div className="bg-neutral-400 bg-opacity-10 w-full p-1">
                      <h3 className='text-base font-bold text-start text-neutral-800 uppercase opacity-50'>{project.proj_title}</h3>
                    </div>
                    <div className="flex flex-col text-black w-5/6 ml-1 mt-2">
                      <div className='flex w-full justify-between'>
                        <h3 className='text-sm font-semibold text-start text-neutral-600'>{project.proj_description}</h3>
                      </div>
                      <div className='w-full text-start text-neutral-400 font-normal'>
                        <h3 className='text-base font-normal text-start text-blue-400 underline'>{project.proj_link}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="print-btn-sc w-4/5 flex justify-start">
        <div class=''>
          <button type="button" class="bg-orange-700 p-2 rounded-md w-24 hover:bg-orange-600" onclick="printCV()">Print CV</button>
        </div>
      </div>

    </div>
  )
}

export default Session
