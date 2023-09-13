// Reviews.js
import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm/ReviewForm'; // Create this component later
import './Review.css';
const Review = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorsWithAppointments, setDoctorsWithAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Retrieve appointments from local storage
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);

    // Retrieve reviews from local storage
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(storedReviews);
  }, []);

  useEffect(() => {
    // Filter appointments to get unique doctors with appointments for the current user
    const currentUserEmail = sessionStorage.getItem('email');
    const uniqueDoctors = [...new Set(appointments.filter(appointment => appointment.userId === currentUserEmail).map(appointment => appointment.doctorId))];
  
    // Retrieve the doctorName and doctorSpeciality for each unique doctor
    const doctorsWithInfo = uniqueDoctors.map(doctorId => {
      const appointmentWithInfo = appointments.find(appointment => appointment.userId === currentUserEmail && appointment.doctorId === doctorId);
      if (appointmentWithInfo) {
        return {
          doctorId,
          doctorName: appointmentWithInfo.doctorName,
          doctorSpeciality: appointmentWithInfo.doctorSpeciality,
        };
      }
      return null; // Handle cases where appointment info is missing
    }).filter(doctorInfo => doctorInfo !== null);
  
    setDoctorsWithAppointments(doctorsWithInfo);
  }, [appointments]);
  const handleSubmit = () => {
    
  }
  

  useEffect(() => {
    console.log('doctor:', doctorsWithAppointments);
  }, [doctorsWithAppointments]);

  return (
    <div className='main'>
        <div className='table-heading'>
      <h1>Reviews</h1>
      </div>
      <div className='table-content'>
      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctorsWithAppointments.map((doctor, index) => (
            <tr key={doctor.doctorId}>
              <td>{index + 1}</td>
              <td>{doctor.doctorName}</td>
              <td>{doctor.doctorSpeciality}</td>
              <td className='review-form-button'>
                <ReviewForm doctor={doctor} onSubmit={handleSubmit} />
              </td>
              <td>
                {/* Display review if available */}
                {reviews.map((review) => {
                  if (review.doctorId === doctor.doctorId) {
                    return (
                      <div key={review.id}>
                        <p>Rating: {review.rating}</p>
                        <p>Review: {review.review}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Review;
