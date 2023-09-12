import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername((prevUsername) => {
        const username = storedUsername.split('@')[0];
        return username;
      });
    }

    const storedAppointmentData = JSON.parse(localStorage.getItem('appointments'));

    if (storedAppointmentData && Array.isArray(storedAppointmentData) && storedAppointmentData.length > 0) {
      // Format the date and time with a space for all appointments
      const formattedAppointments = storedAppointmentData.map((appointment) => {
        const dateTime = new Date(appointment.appointmentDataTime);
        const formattedDate = dateTime.toISOString().split('T')[0]; // Extract the date part
        const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return {
          doctorName: appointment.doctorName,
          date: formattedDate,
          time: formattedTime,
        };
      });

      setAppointmentData(formattedAppointments);
    }
  }, []);

 return (
    <div>
      <Navbar></Navbar>
      {children}
      {isLoggedIn && appointmentData && appointmentData.length > 0 && (
        <div className="appointment-notifications">
          {appointmentData.map((appointment, index) => (
            <div key={index} className="appointment-card">
              <h3 className="appointment-card__title">Your Appointments</h3>
              <div className="appointment-card__content">
                <p className="appointment-card__message">
                  <strong>User Name:</strong> {username}
                </p>
                <p className="appointment-card__message">
                  <strong>Doctor:</strong> {appointment.doctorName}
                </p>
                <p className="appointment-card__message">
                  <strong>Appointment Date:</strong> {appointment.date}
                </p>
                <p className="appointment-card__message">
                  <strong>Appointment Time:</strong> {appointment.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
