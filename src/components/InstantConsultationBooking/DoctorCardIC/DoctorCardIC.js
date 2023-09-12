import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ doctorId, name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const hasAppointmentsForDoctor = appointments.some((appointment) => appointment.doctorId === doctorId);

  useEffect(() => {
    // Retrieve appointments for this doctor from local storage
    const storedUsername = sessionStorage.getItem('email');
    const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Filter appointments for the logged-in user and the specific doctor
    const userAppointments = allAppointments.filter(
      (appointment) => appointment.userId === storedUsername && appointment.doctorId === doctorId
    );

    setAppointments(userAppointments);
  }, [doctorId]);

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);

    // Update local storage with the updated list of appointments
    const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const updatedAllAppointments = allAppointments.filter((appointment) => appointment.id !== appointmentId);
    localStorage.setItem('appointments', JSON.stringify(updatedAllAppointments));
  };

  const handleFormSubmit = (appointmentData) => {
    const storedUsername = sessionStorage.getItem('email');

    // Check if the user has already booked an appointment with this doctor
    const existingAppointment = appointments.find(
      (appointment) => appointment.doctorId === doctorId
    );

    if (existingAppointment) {
      // If an appointment already exists, update it instead of creating a new one
      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.id === existingAppointment.id) {
          return {
            ...appointment,
            ...appointmentData,
          };
        }
        return appointment;
      });

      setAppointments(updatedAppointments);

      // Update local storage with the updated list of appointments
      const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const updatedAllAppointments = allAppointments.map((appointment) => {
        if (appointment.id === existingAppointment.id) {
          return {
            ...appointment,
            ...appointmentData,
          };
        }
        return appointment;
      });

      localStorage.setItem('appointments', JSON.stringify(updatedAllAppointments));
    } else {
      // If no existing appointment is found, create a new one
      const newAppointment = {
        id: uuidv4(),
        userId: storedUsername, // Include the user's identifier
        doctorId: doctorId, // Include the doctor's identifier
        ...appointmentData,
      };

      const updatedAppointments = [...appointments, newAppointment];
      setAppointments(updatedAppointments);

      // Update local storage with the updated list of appointments
      const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const updatedAllAppointments = [...allAppointments, newAppointment];
      localStorage.setItem('appointments', JSON.stringify(updatedAllAppointments));
    }

    setShowModal(false);
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
        {/* for reference  */}
        {/* <div>
              <button className='book-appointment-btn'>                    
                <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>
              </div> */}
      </div>


      <div className="doctor-card-options-container">
       <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button className={`book-appointment-btn ${hasAppointmentsForDoctor ? 'cancel-appointment' : ''}`}>
            {hasAppointmentsForDoctor ? (
              <div>Cancel Appointment</div>
            ) : (
              <div>Book Appointment</div>
            )}
            <div>No Booking Fee</div>
          </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentFormIC
        doctorId={doctorId} 
        doctorName={name}
        doctorSpeciality={speciality}
        onSubmit={handleFormSubmit}
        existingAppointments={appointments}
      />
              )}
            </div>
          )}
        </Popup> 
      </div>
    </div>
  );
};

export default DoctorCardIC;