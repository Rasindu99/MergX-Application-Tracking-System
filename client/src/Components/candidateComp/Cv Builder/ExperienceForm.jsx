import React from 'react';
import { FiPlus } from "react-icons/fi";
import { FaMinus } from "react-icons/fa6";


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
      <div class="bg-orange-700 p-2 mb-2 uppercase font-semibold text-3xl">
        <h3 className='text-neutral-200'>experience</h3>
      </div>

      <div className="w-full flex flex-col items-start">
        <div className="repeater w-full" data-repeater-list="group-b">
          {experiences.map((experience, index) => (
            <div key={index} data-repeater-item>
              <div class="p-5 my-2 border border-neutral-700 relative w-full">
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
                    className=" bg-orange-600 absolute top-2 right-2 rounded-full p-1 hover:bg-orange-500" 
                    onClick={() => handleRemoveExperience(index)}
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
          onClick={handleAddExperience}
        >
          <FiPlus className='mx-auto my-auto'/>
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;
