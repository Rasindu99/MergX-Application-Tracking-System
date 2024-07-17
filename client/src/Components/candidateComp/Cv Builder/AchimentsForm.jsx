import React, { useState } from 'react';

const AchievementsForm = ({achievements, setAchievements}) => {
  //const [achievements, setAchievements] = useState([{ achieve_title: '', achieve_description: '' }]);

  // Function to handle adding a new achievement
  const handleAddAchievement = () => {
    setAchievements([...achievements, { achieve_title: '', achieve_description: '' }]);
  };

  // Function to handle removing an achievement
  const handleRemoveAchievement = (index) => {
    const updatedAchievements = [...achievements];
    updatedAchievements.splice(index, 1);
    setAchievements(updatedAchievements);
    console.log('Removed AchievementsForm',achievements);
  };

  // Function to handle input change for achievements
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAchievements = [...achievements];
    updatedAchievements[index][name] = value;
    setAchievements(updatedAchievements);
    console.log('AchievementsForm',achievements);
  };

  // Function to generate CV or any other action on form update

  return (
    <div className="cv-form-blk">
      <div className="cv-form-row-title">
        <h3>achievements</h3>
      </div>

      <div className="row-separator repeater">
        <div className="repeater" data-repeater-list="group-a">
          {achievements.map((achievement, index) => (
            <div key={index} data-repeater-item>
              <div className="cv-form-row cv-form-row-achievement">
                <div className="cols-2">
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Title</label>
                    <input
                      name="achieve_title"
                      type="text"
                      className="form-control achieve_title text-black"
                      value={achievement.achieve_title}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Achievement Title"
                    />
                    <span className="form-text"></span>
                  </div>
                  <div className="form-elem">
                    <label htmlFor="" className="form-label">Description</label>
                    <input
                      name="achieve_description"
                      type="text"
                      className="form-control achieve_description text-black"
                      value={achievement.achieve_description}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="e.g. Achievement Description"
                    />
                    <span className="form-text"></span>
                  </div>
                </div>
                {index > 0 && ( // Show remove button for newly added achievements
                  <button
                    type="button"
                    className="repeater-remove-btn"
                    onClick={() => handleRemoveAchievement(index)}
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
          onClick={handleAddAchievement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AchievementsForm;
