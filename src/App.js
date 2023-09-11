import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './components/Landing_Page/LandingPage';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import SignUp from './components/Sign_Up/SignUp';
import InstantConsultation from './components/InstantConsultationBooking/InstantConsultation';
import Notification from './components/Notification/Notification';
function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          <Notification>
              <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/sign_up' element={<SignUp />} />
                <Route path='/instant-consultation' element={ <InstantConsultation />} />
              </Routes>
          </Notification>
            
        </BrowserRouter>
       
    </div>
  );
}

export default App;