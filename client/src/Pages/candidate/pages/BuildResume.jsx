import React, {useState, useRef } from 'react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
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
import '../../../Components/candidateComp/Cv Builder/buildResume.css';
import { FaPhone } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";





const BuildResume = () => {

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
  const [skills, setSkills] = useState([{ skill_title: '', skill_description: '' }]);

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

  const divRef = useRef(null);

  const printAndDownloadPDF = () => {
    const div = divRef.current;
    console.log('Printing');

    html2canvas(div, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('download.pdf');
    });
  };
  

  const previewImage = (e) => {
    const file = e.target.files[0];
    // Implement image preview logic here if needed
  };

  console.log("CV Builder - ",formData);

  const SkillDisplay = ({ skill }) => {
    const descriptionLines = skill.skill_description.split('/');
  
    return (
      <div className="skill-display">
        <div className="skill-description">
          {descriptionLines.map((line, index) => (
            <p key={index}>* {line}</p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col justify-center items-center p-5 overflow-auto w-full my-comp relative'> 
      <div className='py-[64px] px-0' id ="about-sc" >
        <div className='container'>
          <div class="about-cnt">
            <form action="" class="cv-form" id="cv-form">

              <div class="cv-form-blk">
                <div class="bg-orange-700 p-2 mb-2 uppercase font-semibold text-3xl">
                  <h3 className='text-neutral-200'>about section</h3>
                </div>
                <div class="p-5 border border-neutral-700">
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
                      <label for="" class="form-label">Linkedin <span class="opt-text">(optional)</span></label>
                      <input
                        name="middlename"
                        type="text"
                        class="form-control middlename text-black"
                        id="middlename"
                        value={formData.middlename}
                        onChange={handleChange}
                        placeholder="www.linkdin.com/in"
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
                        class="p-[9px] border"
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

      <div id="preview-sc" class="print_area w-[794px] h-[1110px]" ref={divRef}>
        <div class="w-full h-full">
          <div class="preview-cnt w-full h-full">
            <div class=" bg-neutral-700 bg-opacity-70 text-white w-full flex flex-col justify-around">
              <div class="w-full h-1/5">
                <div class="preview-image">
                  <img src={formData.image || ''} alt="" id="image_dsp"/>
                </div>
                <div class="preview-item preview-item-name w-full">
                  <span class=" text-2xl" id="fullname_dsp">{`${formData.firstname} ${formData.lastname}`}</span>
                </div>
                <div class="preview-item">
                  <span class="font-bold uppercase text-sm text-neutral-500" id="designation_dsp">{formData.designation}</span>
                </div>
              </div>

              <div class="w-full h-1/5">
                <div class="w-full bg-neutral-400 bg-opacity-20 p-1 mb-3">
                  <h3 className='uppercase text-xl font-semibold text-start pl-5'>about</h3>
                </div>
                <div class="preview-blk-list">
                  <div class="preview-item">
                    <span class="flex  justify-start" id="phoneno_dsp">
                      <FaPhone className='text-base mx-5 text-center'/>
                      <h3 className='text-base'>{formData.phoneno}</h3>
                    </span>
                  </div>
                  <div class="preview-item">
                    <span class="flex justify-start" id="email_dsp">
                      <AiOutlineMail className='text-xl mx-5 text-center'/>
                      <h3 className='text-base'>{formData.email}</h3>
                    </span>
                  </div>
                  <div class="preview-item">
                    <span class="flex justify-start" id="address_dsp">
                      <FaLocationDot  className='text-xl mx-5 text-center'/>
                      <h3 className='text-base'>{formData.address}</h3>
                    </span>
                  </div>
                  <div class="preview-item">
                    <span class="flex justify-start" id="address_dsp">
                      <FaLinkedin className='text-xl mx-5 text-center'/>
                      <h3 className='text-base'>{formData.middlename}</h3>
                    </span>
                  </div>
                  <div class="mt-5">
                    <span class="preview-item-val" id="summary_dsp">
                      <h3 className='uppercase text-xl font-semibold text-start bg-neutral-400 bg-opacity-20 p-1 pl-5'>SUMMARY</h3>
                      <h3 className='text-xs mt-2'>{formData.summary}</h3>
                    </span>
                  </div>
                </div>
              </div>

              <div class="w-full h-2/5">
                <div class="preview-blk-title">
                  <h3 className='uppercase text-xl font-semibold text-start bg-neutral-400 bg-opacity-20 p-1 pl-5'>skills</h3>
                </div>
                <div class="skills-items preview-blk-list" id="skills_dsp">
                {skills.map((skill, index) => (
                  <div key={index} className='w-full mt-3'>
                    <div >
                      <h3 className='uppercase text-base font-semibold text-start bg-neutral-500 bg-opacity-20 p-1'>{skill.skill_title}</h3>
                    </div>
                    <div className=" text-neutral-300 w-full">
                      <h3 className='text-base font-semibold text-start flex justify-start pl-5'>
                          <SkillDisplay key={index} skill={skill} />
                      </h3>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>

            <div class="preview-cnt-r bg-white">

              <div class="flex flex-col items-start w-full ">
                <div className='w-full p-1 border-b border-neutral-700 mb-3'>
                  <h3 className='text-xl font-bold text-start text-neutral-700 uppercase'>Achievements</h3>
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
                <div className='w-full p-1 border-b border-neutral-700 mb-3'>
                  <h3 className='text-xl font-bold text-start text-neutral-700 uppercase'>EDUCATIONS</h3>
                </div>
                {educations.map((education, index) => (
                  <div key={index} className='w-full mt-3'>
                    <div className="bg-neutral-400 bg-opacity-10 w-full p-1">
                      <h3 className='text-base font-bold text-start text-neutral-800 uppercase opacity-50'>{education.edu_school}</h3>
                    </div>
                    <div className="flex flex-col text-black w-full ml-1 mt-2">
                      <div className='flex w-full justify-between'>
                        <h3 className='text-base font-bold text-start text-neutral-600'>{education.edu_degree}</h3>
                        <span>{education.edu_city}</span>
                        <div className='bg-orange-600 bg-opacity-50 px-1 py-[2px] rounded-lg'>{education.edu_start_date}</div>
                        <div className='bg-orange-600 bg-opacity-50 px-1 py-[2px] rounded-lg'>{education.edu_graduation_date}</div>
                      </div>
                      <div className='w-full text-start text-neutral-400 font-normal'>{education.edu_description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div class="flex flex-col items-start w-full  mb-3 mt-4">
                <div className='w-full p-1 border-b border-neutral-700 mb-3'>
                  <h3 className='text-xl font-bold text-start text-neutral-700 uppercase'>EXPERIENCES</h3>
                </div>
                {experiences.map((experience, index) => (
                  <div key={index} className='w-full mt-3'>
                    <div className="bg-neutral-400 bg-opacity-10 w-full p-1">
                      <h3 className='text-base font-bold text-start text-neutral-800 uppercase opacity-50'>{experience.exp_title}</h3>
                    </div>
                    <div className="flex flex-col text-black w-full ml-1 mt-2">
                      <div className='flex w-full justify-between'>
                        <h3 className='text-base font-bold text-start text-neutral-600'>{experience.exp_organization}</h3>
                        <span>{experience.exp_location}</span>
                        <div className='bg-orange-600 bg-opacity-50 px-1 py-[2px] rounded-lg'>{experience.exp_start_date}</div>
                        <div className='bg-orange-600 bg-opacity-50 px-1 py-[2px] rounded-lg'>{experience.exp_end_date}</div>
                      </div>
                      <div className='w-full text-start text-neutral-400 font-normal'>{experience.exp_description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div class="flex flex-col items-start w-full  mb-3 mt-4">
                <div className='w-full p-1 border-b border-neutral-700 mb-3'>
                  <h3 className='text-xl font-bold text-start text-neutral-700 uppercase'>PROJECTS</h3>
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

      <button type="button" class="bg-orange-700 p-2 rounded-md w-24 hover:bg-orange-600 cursor-pointer z-50 absolute bottom-10" onClick={printAndDownloadPDF}>Print CV</button>
      
    </div>
  )
}

export default BuildResume
