import React, { useState } from 'react';
import { FiPlus } from "react-icons/fi";
import { FaMinus } from "react-icons/fa6";

const SkillsForm = ({ skills, setSkills }) => {

  // Function to handle adding a new skill
  const handleAddSkill = () => {
    setSkills([...skills, { skill_title: '', skill_description: '' }]);
  };

  // Function to handle removing a skill
  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  // Function to handle input change for skills
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSkills = [...skills];
    updatedSkills[index][name] = value;
    setSkills(updatedSkills);
  };

  // Function to generate CV or any other action on form update
  const generateCV = () => {
    // Implement your logic for generating CV here
    console.log("Generating CV with updated skills:", skills);
  };

  return (
    <div className="cv-form-blk">
      <div className="bg-orange-700 p-2 mb-2 uppercase font-semibold text-3xl">
        <h3 className="text-neutral-200">skills</h3>
      </div>

      <div className="w-full flex flex-col items-start">
        <div className="repeater w-full" data-repeater-list="group-e">
          {skills.map((skill, index) => (
            <div key={index} data-repeater-item>
              <div className="p-5 my-2 border border-neutral-700 relative w-full">
                <div className="grid grid-cols-2 gap-4">

                  <div className="form-elem">
                    <label className="form-label">Title</label>
                    <input
                      name="skill_title"
                      type="text"
                      className="form-control achieve_title text-black"
                      value={skill.skill_title}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Skill Title"
                    />
                    <span className="form-text"></span>
                  </div>

                  <div className="form-elem">
                    <label className="form-label">Description</label>
                    <input
                      name="skill_description"
                      type="text"
                      className="form-control achieve_description text-black"
                      value={skill.skill_description}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Skill Description"
                    />
                    <span className="form-text"></span>
                  </div>

                </div>

                {index > 0 && ( // Show remove button for newly added skills
                  <button
                    type="button"
                    className="bg-orange-600 absolute top-2 right-2 rounded-full p-1 hover:bg-orange-500"
                    onClick={() => handleRemoveSkill(index)}
                  >
                    <FaMinus className="text-lg m-auto hover:text-black" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="bg-neutral-600 w-10 h-10 rounded-md text-2xl flex items-center justify-center hover:bg-orange-600"
          onClick={handleAddSkill}
        >
          <FiPlus className="mx-auto my-auto" />
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;
