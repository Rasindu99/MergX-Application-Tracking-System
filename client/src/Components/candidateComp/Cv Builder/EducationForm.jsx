import React, { useState } from 'react';

const EducationForm = ({educations, setEducations}) => {
  
  // Function to handle adding a new education
  const handleAddEducation = () => {
    setEducations([...educations, {
      edu_school: '',
      edu_degree: '',
      edu_city: '',
      edu_start_date: '',
      edu_graduation_date: '',
      edu_description: ''
    }]);
  };

  // Function to handle removing an education
  const handleRemoveEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

  // Function to handle input change for educations
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEducations = [...educations];
    updatedEducations[index][name] = value;
    setEducations(updatedEducations);
    console.log('EducationForm - ',educations);
  };

  // Function to generate CV or any other action on form update
  const generateCV = () => {
    // Implement your logic for generating CV here
    console.log("Generating CV with updated data:", educations);
  };

  return (
    <div className="cv-form-blk">
      <div className="cv-form-row-title">
        <h3>education</h3>
      </div>

      <div className="row-separator repeater">
        <div className="repeater" data-repeater-list="group-c">
          {educations.map((education, index) => (
            <div key={index} data-repeater-item>
              <div className="cv-form-row cv-form-row-experience">
                <div className="cols-3">
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">School</label>
                    <input
                      name="edu_school"
                      type="text"
                      className="form-control edu_school text-black"
                      value={education.edu_school}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. School Name"
                    />
                    <span className="form-text"></span>
                  </div>
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Degree</label>
                    <input
                      name="edu_degree"
                      type="text"
                      className="form-control edu_degree text-black"
                      value={education.edu_degree}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Degree"
                    />
                    <span className="form-text"></span>
                  </div>
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">City</label>
                    <input
                      name="edu_city"
                      type="text"
                      className="form-control edu_city text-black"
                      value={education.edu_city}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. City"
                    />
                    <span className="form-text"></span>
                  </div>
                </div>

                <div className="cols-3">
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Start Date</label>
                    <input
                      name="edu_start_date"
                      type="date"
                      className="form-control edu_start_date text-black"
                      value={education.edu_start_date}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                    <span className="form-text"></span>
                  </div>
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Graduation Date</label>
                    <input
                      name="edu_graduation_date"
                      type="date"
                      className="form-control edu_graduation_date text-black"
                      value={education.edu_graduation_date}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                    <span className="form-text"></span>
                  </div>
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Description</label>
                    <input
                      name="edu_description"
                      type="text"
                      className="form-control edu_description text-black"
                      value={education.edu_description}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Description"
                    />
                    <span className="form-text"></span>
                  </div>
                </div>

                {index > 0 && ( // Show remove button for newly added educations
                  <button
                    type="button"
                    className="repeater-remove-btn"
                    onClick={() => handleRemoveEducation(index)}
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
          onClick={handleAddEducation}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
