import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './components/Landing_Page/LandingPage';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import SignUp from './components/Sign_Up/SignUp';
function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
              <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/sign_up' element={<SignUp />} />
              </Routes>
            
        </BrowserRouter>
       
    </div>
  );
}

export default App;