import React, { useState } from 'react';

const AppointmentFormIC = ({ doctorId, doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Get the current date and time
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // Format the current date and time as a string suitable for the "min" attribute
    const minDateTime = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}T${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    const handleFormSubmit = (e) => {
        console.log(doctorId); 
        onSubmit({ doctorId, doctorName, name, doctorSpeciality, phoneNumber, appointmentDataTime: selectedSlot });
        setName('');
        setPhoneNumber('');
      }; 

    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="appointmentDate">Appointment Date:</label>
                <input
                    type="datetime-local"
                    id="appointmentDate"
                    value={selectedSlot}
                    onChange={(e) => handleSlotSelection(e.target.value)}
                    min={minDateTime} // Set the minimum date and time
                    required
                />
            </div>
            <button type="submit">Book Now</button>
        </form>
    );
};

export default AppointmentFormIC;
