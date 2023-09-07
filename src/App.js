import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './components/Landing_Page/LandingPage';
import Navbar from './components/Navbar/Navbar';
function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
              <Routes>
                <Route path='/' element={<LandingPage />} />
              </Routes>
            
        </BrowserRouter>
       
    </div>
  );
}

export default App;