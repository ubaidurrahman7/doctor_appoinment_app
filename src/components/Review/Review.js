// Reviews.js
import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm/ReviewForm';
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
      return null;
    }).filter(doctorInfo => doctorInfo !== null);

    setDoctorsWithAppointments(doctorsWithInfo);
  }, [appointments]);

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
                  {reviews.some(review => review.doctorId === doctor.doctorId) ? (
                    <div className='feedback-button-reviewed' disabled>
                            Reviewed
                    </div>
                  ) : (
                    <ReviewForm doctor={doctor} />
                  )}
                </td>
                <td>
                  {/* Display review content if available */}
                  {reviews.some(review => review.doctorId === doctor.doctorId) && (
                    <p>{reviews.find(review => review.doctorId === doctor.doctorId).reviewMsg}</p>
                  )}
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
