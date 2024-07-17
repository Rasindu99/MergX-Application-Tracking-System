import React from 'react';

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
      <div className="cv-form-row-title">
        <h3>projects</h3>
      </div>

      <div className="row-separator repeater">
        <div className="repeater" data-repeater-list="group-d">
          {projects.map((project, index) => (
            <div key={index} data-repeater-item>
              <div className="cv-form-row cv-form-row-experience">
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
                    className="repeater-remove-btn"
                    onClick={() => handleRemoveProject(index)}
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="repeater-add-btn"
          onClick={handleAddProject}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProjectsForm;
