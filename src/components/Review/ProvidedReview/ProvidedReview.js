// ProvidedReview.js
import React from 'react';

const ProvidedReview = ({ review, close }) => {
  return (
    <div>
      <h3>Review Given</h3>
      {/* Display review details */}
      <p>Doctor Name: {review.doctorName}</p>
      <p>Doctor Speciality: {review.doctorSpeciality}</p>
      <p>Rating: {review.rating}</p>
      <p>Comment: {review.comment}</p>
      {/* Close button */}
      <button onClick={close}>Close</button>
    </div>
  );
};

export default ProvidedReview;
