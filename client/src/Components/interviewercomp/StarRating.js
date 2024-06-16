import React, { useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';

const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onChange(selectedRating);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index} onClick={() => handleStarClick(index)}>
          {index <= rating ? <BsStarFill color="#EA7122" size={30} /> : <BsStar color="#EA7122" size={30} />}
        </span>
      ))}
    </div>
  );
};

export default StarRating;