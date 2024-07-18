import React from 'react';
import { FiPlus } from "react-icons/fi";
import { FaMinus } from "react-icons/fa6";


const ProjectsForm = ({projects, setProjects}) => {
  
  // Function to handle adding a new project
  const handleAddProject = () => {
    setProjects([...projects, {
      proj_title: '',
      proj_link: '',
      proj_description: ''
    }]);
  };

  // Function to handle removing a project
  const handleRemoveProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  // Function to handle input change for projects
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProjects = [...projects];
    updatedProjects[index][name] = value;
    setProjects(updatedProjects);
    console.log('ProjectForm - ',projects);
  };

  // Function to generate CV or any other action on form update
  const generateCV = () => {
    // Implement your logic for generating CV here
    console.log("Generating CV with updated data:", projects);
  };

  return (
    <div className="cv-form-blk">
      <div class="bg-orange-700 p-2 mb-2 uppercase font-semibold text-3xl">
        <h3 className='text-neutral-200'>projects</h3>
      </div>

      <div className="w-full flex flex-col items-start">
        <div className="repeater w-full" data-repeater-list="group-d">
          {projects.map((project, index) => (
            <div key={index} data-repeater-item>
              <div class="p-5 my-2 border border-neutral-700 relative w-full">
                <div className="cols-3">
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Project Name</label>
                    <input
                      name="proj_title"
                      type="text"
                      className="form-control proj_title text-black"
                      value={project.proj_title}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Project Name"
                    />
                    <span className="form-text"></span>
                  </div>
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Project link</label>
                    <input
                      name="proj_link"
                      type="text"
                      className="form-control proj_link text-black"
                      value={project.proj_link}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Project Link"
                    />
                    <span className="form-text"></span>
                  </div>
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Description</label>
                    <input
                      name="proj_description"
                      type="text"
                      className="form-control proj_description text-black"
                      value={project.proj_description}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Project Description"
                    />
                    <span className="form-text"></span>
                  </div>
                </div>

                {index > 0 && ( // Show remove button for newly added projects
                  <button
                    type="button"
                    className=" bg-orange-600 absolute top-2 right-2 rounded-full p-1 hover:bg-orange-500" 
                    onClick={() => handleRemoveProject(index)}
                  >
                    <FaMinus  className='text-lg m-auto hover:text-black'/>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="bg-neutral-600 w-10 h-10 rounded-md text-2xl text-center hover:bg-orange-600"
          onClick={handleAddProject}
        >
          <FiPlus className='mx-auto my-auto'/>
        </button>
      </div>
    </div>
  );
};

export default ProjectsForm;
