import React, { useEffect, useState, useCallback } from 'react';
import './InstantConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

      const getDoctorsDetails = useCallback(() => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then((res) => res.json())
            .then((data) => {
                // Generate unique IDs for all doctors and add them to the data
                const doctorsWithUniqueIds = data.map((doctor, index) => ({
                    ...doctor,
                    id: `doctor-${index + 1}`, // You can customize the ID format as needed
                }));
    
                setDoctors(doctorsWithUniqueIds);
    
                if (searchParams.get('speciality')) {
                    const filtered = doctorsWithUniqueIds.filter(
                        (doctor) =>
                            doctor.speciality.toLowerCase() ===
                            searchParams.get('speciality').toLowerCase()
                    );
                    setFilteredDoctors(filtered);
                    setIsSearched(true);
                } else {
                    setFilteredDoctors([]);
                    setIsSearched(false);
                }
            })
            .catch((err) => console.log(err));
    }, [searchParams]);
    
      

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(
                (doctor) =>
                doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        const getDoctorsAndRedirect = async () => {
            await getDoctorsDetails();
            const authtoken = sessionStorage.getItem("auth-token");
            if (!authtoken) {
                navigate("/login");
            }
        };

        getDoctorsAndRedirect();
    }, [searchParams, navigate, getDoctorsDetails]);

    return (
        <center>
            <div className="searchpage-container">
                <FindDoctorSearchIC onSearch={handleSearch} />
                <div className="search-results-container">
                    {isSearched ? (
                        <center>
                            <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                            <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor =>
                                <DoctorCardIC className="doctorcard"
                                name={doctor.name}
                                speciality={doctor.speciality}
                                experience={doctor.experience}
                                ratings={doctor.ratings}key={doctor.name}
                                profilePic={doctor.profilePic} 
                                doctorId= {doctor.id}/>
                                )
                            ) : (
                                <p>No doctors found.</p>
                            )}
                        </center>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </center>
    )
}

export default InstantConsultation;
