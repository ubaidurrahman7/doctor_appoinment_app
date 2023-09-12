import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [appointmentData, setAppointmentData] = useState({
      doctorName: "",
      date: "",
      time:""
    });
  
    useEffect(() => {
      const storedUsername = sessionStorage.getItem('email');
      const username = storedUsername.split('@')[0];
      const storedAppointmentData = JSON.parse(localStorage.getItem('appointments'));
  
      if (storedUsername) {
        setIsLoggedIn(true);
        setUsername(username);
      }
  
      if (storedAppointmentData && Array.isArray(storedAppointmentData) && storedAppointmentData.length > 0) {
        // Access the first element of the array and retrieve properties
        const firstAppointment = storedAppointmentData[0];
        
        // Format the date and time with a space
        const dateTime = new Date(firstAppointment.appointmentDataTime);
        const formattedDate = dateTime.toISOString().split('T')[0]; // Extract the date part
        const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
        setAppointmentData({
          doctorName: firstAppointment.doctorName,
          date: formattedDate,
          time: formattedTime
        });
      }
    }, []);
  
    return (
      <div>
        <Navbar></Navbar>
        {children}
        {isLoggedIn && appointmentData && (
          <div className="appointment-card">
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                <strong>User Name:</strong> {username}
              </p>
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {appointmentData.doctorName}
              </p>
              <p className="appointment-card__message">
                <strong>Appointment Date:</strong> {appointmentData.date}
              </p>
              <p className="appointment-card__message">
                <strong>Appointment Time:</strong> {appointmentData.time}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Notification;
  