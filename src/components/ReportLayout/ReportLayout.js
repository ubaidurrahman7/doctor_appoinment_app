// Reviews.js
import React, { useState, useEffect } from 'react';
import './ReportLayout.css';
import { Link } from 'react-router-dom';

const ReportLayuot = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorsWithAppointments, setDoctorsWithAppointments] = useState([]);

  useEffect(() => {
    // Retrieve appointments from local storage
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
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
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {doctorsWithAppointments.map((doctor, index) => (
              <tr key={doctor.doctorId}>
                <td>{index + 1}</td>
                <td>{doctor.doctorName}</td>
                <td>{doctor.doctorSpeciality}</td>
                <td className='review-form-button'>
                  
                    <div className='report-btn'>
                            <Link to='/reportpage' className='link'>View Report</Link>
                    </div>
                  
                </td>
                <td>
                <div className='report-btn'>
                            <Link to='/reportpage' className='link'>Download Report</Link>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportLayuot;
