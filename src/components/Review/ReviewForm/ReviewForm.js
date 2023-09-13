import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./ReviewForm.css"

const ReviewForm = ({ doctor }) => {
  const [rating, setRating] = useState(0); // Initialize with 0 rating
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10)); // Parse the rating as an integer
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = () => {
    // Create a new review object
    const newReview = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      userName: sessionStorage.getItem('email'), // Add the username
      rating,
      review,
    };

    // Save the review to local storage (you can replace this logic with your preferred storage)
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const existingReview = storedReviews.find(
      (review) =>
        review.doctorId === newReview.doctorId &&
        review.userName === newReview.userName
    );

    if (existingReview) {
      // If an existing review is found, update it
      existingReview.rating = newReview.rating;
      existingReview.review = newReview.review;
    } else {
      // Otherwise, add the new review
      storedReviews.push(newReview);
    }

    localStorage.setItem('reviews', JSON.stringify(storedReviews));

    setSubmitted(true);
  };

  return (
    <div>
      <Popup
        trigger={<button className='review-form-button'>Click Here</button>}
        modal
        nested
        contentStyle={{
            maxWidth: '400px', // Set the maximum width of the popup
            textAlign: 'center', // Center-align the content
            
          }}
      >
        {(close) => (
          <div className='modal'>
            <button className='close' onClick={close}>
              &times;
            </button>
            <div className='header'>Give Your Feedback</div>
            <div className='content'>
              {submitted ? (
                <p>Thank you for your feedback!</p>
              ) : (
                <form>
                  <div>
                    <label htmlFor='rating'>Rating:</label>
                    <select id='rating' onChange={handleRatingChange} value={rating}>
                      <option value={0}>Select Rating</option>
                      <option value={1}>⭐</option>
                      <option value={2}>⭐⭐</option>
                      <option value={3}>⭐⭐⭐</option>
                      <option value={4}>⭐⭐⭐⭐</option>
                      <option value={5}>⭐⭐⭐⭐⭐</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor='review'>Review:</label>
                    <textarea
                      id='review'
                      onChange={handleReviewChange}
                      value={review}
                      rows='3'
                      cols='50'
                    />
                  </div>
                  <button type='button' onClick={() => { handleSubmit(); close(); }}>
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default ReviewForm;
