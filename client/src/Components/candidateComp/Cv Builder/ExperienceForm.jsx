import React, { useState } from 'react';

const ExperienceForm = ({experiences, setExperiences}) => {
  
  // Function to handle adding a new experience
  const handleAddExperience = () => {
    setExperiences([...experiences, {
      exp_title: '', 
      exp_organization: '', 
      exp_location: '', 
      exp_start_date: '', 
      exp_end_date: '', 
      exp_description: ''
    }]);
  };

  // Function to handle removing an experience
  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
    console.log('Removed Experience - ',experiences);
  };

  // Function to handle input change for experiences
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExperiences = [...experiences];
    updatedExperiences[index][name] = value;
    setExperiences(updatedExperiences);
    console.log('ExperienceForm - ',experiences);
  };

  return (
    <div className="cv-form-blk">
      <div className="cv-form-row-title">
        <h3>experience</h3>
      </div>

      <div className="row-separator repeater">
        <div className="repeater" data-repeater-list="group-b">
          {experiences.map((experience, index) => (
            <div key={index} data-repeater-item>
              <div className="cv-form-row cv-form-row-experience">
                <div className="cols-3">
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Title</label>
                    <input
                      name="exp_title"
                      type="text"
                      className="form-control exp_title text-black"
                      value={experience.exp_title}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Experience Title"
                    />
                    <span className="form-text"></span>
                  </div>
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Company / Organization</label>
                    <input
                      name="exp_organization"
                      type="text"
                      className="form-control exp_organization text-black"
                      value={experience.exp_organization}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Company Name"
                    />
                    <span className="form-text"></span>
                  </div>
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Location</label>
                    <input
                      name="exp_location"
                      type="text"
                      className="form-control exp_location text-black"
                      value={experience.exp_location}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Location"
                    />
                    <span className="form-text"></span>
                  </div>
                </div>

                <div className="cols-3">
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Start Date</label>
                    <input
                      name="exp_start_date"
                      type="date"
                      className="form-control exp_start_date text-black"
                      value={experience.exp_start_date}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                    <span className="form-text"></span>
                  </div>
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">End Date</label>
                    <input
                      name="exp_end_date"
                      type="date"
                      className="form-control exp_end_date text-black"
                      value={experience.exp_end_date}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                    <span className="form-text"></span>
                  </div>
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Description</label>
                    <input
                      name="exp_description"
                      type="text"
                      className="form-control exp_description text-black"
                      value={experience.exp_description}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Experience Description"
                    />
                    <span className="form-text"></span>
                  </div>
                </div>

                {index > 0 && ( // Show remove button for newly added experiences
                  <button
                    type="button"
                    className="repeater-remove-btn"
                    onClick={() => handleRemoveExperience(index)}
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
          onClick={handleAddExperience}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;
