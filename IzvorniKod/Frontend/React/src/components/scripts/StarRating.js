import React, { useState } from 'react';
import '../styles/StarRating.css';

const StarRating = ({ rating, onRatingChange }) => {
   const [hoveredRating, setHoveredRating] = useState(null);

   const handleStarClick = (selectedRating) => {
      if (onRatingChange) {
         onRatingChange(selectedRating);
      }
   };

   return (
      <span>
         {[1, 2, 3, 4, 5].map((star) => (
            <span
               key={star}
               className={`star ${rating >= star ? 'filled' : ''} ${hoveredRating >= star ? 'hovered' : ''
                  }`}
               onClick={() => handleStarClick(star)}
               onMouseEnter={() => setHoveredRating(star)}
               onMouseLeave={() => setHoveredRating(null)}
            >
               &#9733;
            </span>
         ))}
      </span>
   );
};

export default StarRating;
