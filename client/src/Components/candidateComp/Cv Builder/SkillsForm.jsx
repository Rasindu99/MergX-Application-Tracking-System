import React, { useState } from 'react';

const SkillsForm = ({skills, setSkills}) => {

  // Function to handle adding a new skill
  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  // Function to handle removing a skill
  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  // Function to handle input change for skills
  const handleInputChange = (index, event) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = event.target.value;
    setSkills(updatedSkills);
  };

  // Function to generate CV or any other action on form update
  const generateCV = () => {
    // Implement your logic for generating CV here
    console.log("Generating CV with updated skills:", skills);
  };

  return (
    <div className="cv-form-blk">
      <div className="cv-form-row-title">
        <h3>skills</h3>
      </div>

      <div className="row-separator repeater">
        <div className="repeater" data-repeater-list="group-e">
          {skills.map((skill, index) => (
            <div key={index} data-repeater-item>
              <div className="cv-form-row cv-form-row-skills">
                <div className="form-elem">
                  <label htmlFor="" className="form-label">Skill</label>
                  <input
                    name="skill"
                    type="text"
                    className="form-control skill text-black"
                    value={skill}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Enter Skill"
                  />
                  <span className="form-text"></span>
                </div>

                {index > 0 && ( // Show remove button for newly added skills
                  <button
                    type="button"
                    className="repeater-remove-btn"
                    onClick={() => handleRemoveSkill(index)}
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
          onClick={handleAddSkill}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;
