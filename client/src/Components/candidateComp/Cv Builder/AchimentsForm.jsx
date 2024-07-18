import React, { useState } from 'react';
import { FiPlus } from "react-icons/fi";
import { FaMinus } from "react-icons/fa6";



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
      <div class="bg-orange-700 p-2 mb-2 uppercase font-semibold text-3xl">
        <h3 className='text-neutral-200'>achievements</h3>
      </div>

      <div className="w-full flex flex-col items-start">
        <div className="repeater w-full" data-repeater-list="group-a">
          {achievements.map((achievement, index) => (
            <div key={index} data-repeater-item>
              <div class="p-5 my-2 border border-neutral-700 relative w-full">
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
                    className=" bg-orange-600 absolute top-2 right-2 rounded-full p-1 hover:bg-orange-500" 
                    onClick={() => handleRemoveAchievement(index)}
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
          onClick={handleAddAchievement}
        >
          <FiPlus className='mx-auto my-auto'/>
        </button>
      </div>
    </div>
  );
};

export default AchievementsForm;
